import { NextResponse } from 'next/server';
import { ProcessedRelease, GitHubAsset, GitHubRelease, ReleaseChannel, determineReleaseType } from '@/lib/api';

// 服务器端获取版本信息的函数
async function getLatestReleaseFromGitHub(): Promise<ProcessedRelease | null> {
  try {
    // 先尝试获取最新的正式版本
    let response = await fetch(
      "https://api.github.com/repos/mkdir700/echolab/releases/latest",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "EchoLab-Website",
        },
        // 添加缓存控制
        next: { revalidate: 300 }, // 5分钟缓存
      }
    );

    // 声明 release 变量 / Declare release variable
    let release: GitHubRelease;

    // 如果没有正式版本，获取所有版本中的第一个（包括预发布版本）
    if (!response.ok) {
      console.log("No stable release found, trying to get the most recent release...");
      response = await fetch(
        "https://api.github.com/repos/mkdir700/echolab/releases?per_page=1",
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "EchoLab-Website",
          },
          next: { revalidate: 300 },
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch release data:", response.statusText);
        return null;
      }

      const releases: GitHubRelease[] = await response.json();
      if (!releases || releases.length === 0) {
        console.error("No releases found");
        return null;
      }

      release = releases[0];
    } else {
      release = await response.json();
    }

    // 处理 GitHub 数据为我们需要的格式，包括 assets
    const platforms = {
      windows: [] as ReleaseChannel[],
      macos: [] as ReleaseChannel[],
      linux: [] as ReleaseChannel[],
    };

    // 如果有 assets，处理下载链接
    if (release.assets && release.assets.length > 0) {
      // 过滤掉小于 2MB 的文件（通常不是可执行文件）
      const validAssets = release.assets.filter((asset: GitHubAsset) =>
        asset.size >= 2 * 1024 * 1024 && // 大于等于 2MB
        !asset.name.includes('.blockmap') && // 排除 blockmap 文件
        !asset.name.includes('.yml') && // 排除 yml 配置文件
        !asset.name.includes('.yaml') // 排除 yaml 配置文件
      );

      // Windows 资源：优先 .exe，如果没有再考虑 .zip
      const windowsExeAssets = validAssets.filter((asset: GitHubAsset) =>
        asset.name.includes('.exe') || asset.name.includes('setup')
      );
      const windowsZipAssets = validAssets.filter((asset: GitHubAsset) =>
        asset.name.includes('.zip') && (asset.name.includes('win') || asset.name.includes('x64') || asset.name.includes('arm64'))
      );
      const windowsAssets = windowsExeAssets.length > 0 ? windowsExeAssets : windowsZipAssets;

      // macOS 资源：优先 .dmg，如果没有再考虑 .zip
      const macosDmgAssets = validAssets.filter((asset: GitHubAsset) =>
        asset.name.includes('.dmg')
      );
      const macosZipAssets = validAssets.filter((asset: GitHubAsset) =>
        asset.name.includes('.zip') && (asset.name.includes('mac') || asset.name.includes('darwin'))
      );
      const macosAssets = macosDmgAssets.length > 0 ? macosDmgAssets : macosZipAssets;

      // Linux 资源：包含 .AppImage 和 .deb 包，以及其他 Linux 格式
      const linuxAssets = validAssets.filter((asset: GitHubAsset) =>
        asset.name.includes('.AppImage') ||
        asset.name.includes('.deb') ||
        ((asset.name.includes('linux') || asset.name.includes('amd64')) &&
         !asset.name.includes('.AppImage') &&
         !asset.name.includes('.deb'))
      );

      // 处理 Windows 资源
      if (windowsAssets.length > 0) {
        platforms.windows.push({
          name: "GitHub Release",
          primary: true,
          desc: "官方发布渠道",
          variants: windowsAssets.map((asset: GitHubAsset) => {
            let arch = 'x64';
            let archName = 'x64';
            if (asset.name.includes('arm64')) {
              arch = 'arm64';
              archName = 'ARM64';
            }

            return {
              arch,
              archName,
              size: `${(asset.size / 1024 / 1024).toFixed(1)} MB`,
              url: asset.browser_download_url,
              recommended: arch === 'x64',
              downloadCount: asset.download_count || 0,
            };
          })
        });
      }

      // 处理 macOS 资源
      if (macosAssets.length > 0) {
        platforms.macos.push({
          name: "GitHub Release",
          primary: true,
          desc: "官方发布渠道",
          variants: macosAssets.map((asset: GitHubAsset) => {
            return {
              arch: 'universal',
              archName: 'Universal (Intel & Apple Silicon)',
              size: `${(asset.size / 1024 / 1024).toFixed(1)} MB`,
              url: asset.browser_download_url,
              recommended: true,
              downloadCount: asset.download_count || 0,
            };
          })
        });
      }

      // 处理 Linux 资源
      if (linuxAssets.length > 0) {
        platforms.linux.push({
          name: "GitHub Release",
          primary: true,
          desc: "官方发布渠道",
          variants: linuxAssets.map((asset: GitHubAsset) => {
            let arch = 'x64';
            let archName = 'x64';

            // 基于文件名判断架构
            if (asset.name.includes('arm64')) {
              arch = 'arm64';
              archName = 'ARM64';
            } else if (asset.name.includes('amd64') || asset.name.includes('x64')) {
              arch = 'x64';
              archName = 'x64';
            }

            // 添加格式信息和推荐标识
            let formatSuffix = '';
            let isRecommended = false;

            if (asset.name.includes('.deb')) {
              formatSuffix = ' - DEB 包';
              isRecommended = arch === 'x64';
            } else if (asset.name.includes('.AppImage')) {
              formatSuffix = ' - AppImage';
              isRecommended = arch === 'x64';
            }

            return {
              arch: asset.name.includes('.deb') ? `${arch}-deb` : `${arch}-appimage`,
              archName: `${archName}${formatSuffix}`,
              size: `${(asset.size / 1024 / 1024).toFixed(1)} MB`,
              url: asset.browser_download_url,
              recommended: isRecommended,
              downloadCount: asset.download_count || 0,
            };
          })
        });
      }
    }

    return {
      version: release.tag_name,
      name: release.name || release.tag_name,
      description: release.body || "",
      releaseType: determineReleaseType(release.tag_name, release.prerelease),
      publishedAt: release.published_at,
      htmlUrl: release.html_url,
      platforms,
    };
  } catch (error) {
    console.error("Error fetching release data:", error);
    return null;
  }
}

export async function GET() {
  try {
    const releaseData = await getLatestReleaseFromGitHub();
    
    if (!releaseData) {
      return NextResponse.json(
        { error: "Failed to fetch release data" },
        { status: 500 }
      );
    }

    return NextResponse.json(releaseData, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

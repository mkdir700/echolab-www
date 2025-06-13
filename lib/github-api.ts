import {
  ProcessedRelease,
  GitHubAsset,
  GitHubRelease,
  determineReleaseType,
} from "@/lib/api";

// 从 GitHub API 获取最新版本信息的函数
// Function to fetch latest release information from GitHub API
export async function getLatestReleaseFromGitHub(): Promise<ProcessedRelease | null> {
  try {
    // 先尝试获取最新的正式版本
    // First try to get the latest stable release
    let response = await fetch(
      "https://api.github.com/repos/mkdir700/echolab/releases/latest",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "EchoLab-Website",
        },
        // 添加缓存控制
        // Add cache control
        next: { revalidate: 300 }, // 5分钟缓存 / 5 minutes cache
      }
    );

    // 声明 release 变量 / Declare release variable
    let release: GitHubRelease;

    // 如果没有正式版本，获取所有版本中的第一个（包括预发布版本）
    // If no stable release found, get the first release (including pre-releases)
    if (!response.ok) {
      console.log(
        "No stable release found, trying to get the most recent release..."
      );
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

    // 初始化平台数据结构
    // Initialize platform data structure
    const platforms: ProcessedRelease["platforms"] = {
      windows: [],
      macos: [],
      linux: [],
    };

    // 如果有 assets，处理下载链接
    // If assets exist, process download links
    if (release.assets && release.assets.length > 0) {
      // 过滤掉小于 2MB 的文件（通常不是可执行文件）
      // Filter out files smaller than 2MB (usually not executable files)
      const validAssets = release.assets.filter(
        (asset: GitHubAsset) =>
          asset.size >= 2 * 1024 * 1024 && // 大于等于 2MB / >= 2MB
          !asset.name.includes(".blockmap") && // 排除 blockmap 文件 / Exclude blockmap files
          !asset.name.includes(".yml") && // 排除 yml 配置文件 / Exclude yml config files
          !asset.name.includes(".yaml") // 排除 yaml 配置文件 / Exclude yaml config files
      );

      // Windows 资源：优先 .exe，如果没有再考虑 .zip
      // Windows assets: prioritize .exe, then consider .zip
      const windowsExeAssets = validAssets.filter(
        (asset: GitHubAsset) =>
          asset.name.includes(".exe") || asset.name.includes("setup")
      );
      const windowsZipAssets = validAssets.filter(
        (asset: GitHubAsset) =>
          asset.name.includes(".zip") &&
          (asset.name.includes("win") ||
            asset.name.includes("x64") ||
            asset.name.includes("arm64"))
      );

      // macOS 资源
      // macOS assets
      const macosAssets = validAssets.filter(
        (asset: GitHubAsset) =>
          asset.name.includes(".dmg") ||
          asset.name.includes("mac") ||
          asset.name.includes("darwin")
      );

      // Linux 资源
      // Linux assets
      const linuxAssets = validAssets.filter(
        (asset: GitHubAsset) =>
          asset.name.includes(".deb") ||
          asset.name.includes(".AppImage") ||
          asset.name.includes("linux")
      );

      // 选择 Windows 资源（优先 exe）
      // Select Windows assets (prioritize exe)
      const windowsAssets =
        windowsExeAssets.length > 0 ? windowsExeAssets : windowsZipAssets;

      // 处理 Windows 资源
      // Process Windows assets
      if (windowsAssets.length > 0) {
        platforms.windows.push({
          name: "GitHub Release",
          primary: true,
          desc: "官方发布渠道",
          variants: windowsAssets.map((asset: GitHubAsset) => {
            let arch = "x64";
            let archName = "x64";
            if (asset.name.includes("arm64")) {
              arch = "arm64";
              archName = "ARM64";
            }

            return {
              arch,
              archName,
              size: `${(asset.size / 1024 / 1024).toFixed(1)} MB`,
              url: asset.browser_download_url,
              recommended: arch === "x64",
              downloadCount: asset.download_count || 0,
            };
          }),
        });
      }

      // 处理 macOS 资源
      // Process macOS assets
      if (macosAssets.length > 0) {
        platforms.macos.push({
          name: "GitHub Release",
          primary: true,
          desc: "官方发布渠道",
          variants: macosAssets.map((asset: GitHubAsset) => {
            let arch = "x64";
            let archName = "x64";
            if (asset.name.includes("arm64")) {
              arch = "arm64";
              archName = "ARM64";
            }

            return {
              arch: arch,
              archName: archName,
              size: `${(asset.size / 1024 / 1024).toFixed(1)} MB`,
              url: asset.browser_download_url,
              recommended: true,
              downloadCount: asset.download_count || 0,
            };
          }),
        });
      }

      // 处理 Linux 资源
      // Process Linux assets
      if (linuxAssets.length > 0) {
        platforms.linux.push({
          name: "GitHub Release",
          primary: true,
          desc: "官方发布渠道",
          variants: linuxAssets.map((asset: GitHubAsset) => {
            let arch = "x64";
            let archName = "x64";

            // 基于文件名判断架构
            // Determine architecture based on filename
            if (asset.name.includes("arm64")) {
              arch = "arm64";
              archName = "ARM64";
            } else if (
              asset.name.includes("amd64") ||
              asset.name.includes("x64")
            ) {
              arch = "x64";
              archName = "x64";
            }

            // 添加格式信息和推荐标识
            // Add format info and recommendation flag
            let formatSuffix = "";
            let isRecommended = false;

            if (asset.name.includes(".deb")) {
              formatSuffix = " - DEB 包";
              isRecommended = arch === "x64";
            } else if (asset.name.includes(".AppImage")) {
              formatSuffix = " - AppImage";
              isRecommended = arch === "x64";
            }

            return {
              arch: asset.name.includes(".deb")
                ? `${arch}-deb`
                : `${arch}-appimage`,
              archName: `${archName}${formatSuffix}`,
              size: `${(asset.size / 1024 / 1024).toFixed(1)} MB`,
              url: asset.browser_download_url,
              recommended: isRecommended,
              downloadCount: asset.download_count || 0,
            };
          }),
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
    console.error("Error fetching release data from GitHub:", error);
    return null;
  }
}

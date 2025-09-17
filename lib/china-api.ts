import { ProcessedRelease, determineReleaseType } from '@/lib/api';

// 中国API的响应接口
// China API response interface
interface ChinaApiResponse {
  name: string;
  body: string;
  created_at: string;
  prerelease: boolean;
  tag_name: string;
  target_commitish: string;
  assets: Array<{
    name: string;
    browser_download_url: string;
    type: string; // "source" | "attach"
  }>;
}

// 从中国API获取版本信息
// Fetch release information from China API
export async function getLatestReleaseFromChinaApi(): Promise<ProcessedRelease | null> {
  try {
    console.log('Fetching release data from China API...');
    
    const response = await fetch('http://release.echoplayer.z2blog.com/api/alpha/releases', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'EchoLab-Website',
      },
      // 设置超时时间
      // Set timeout
      signal: AbortSignal.timeout(10000), // 10秒超时
    });

    if (!response.ok) {
      console.error('China API request failed:', response.status, response.statusText);
      return null;
    }

    const release: ChinaApiResponse = await response.json();

    if (!release) {
      console.error('No release data from China API');
      return null;
    }

    console.log('Successfully fetched release from China API:', release.version);

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
      // 过滤掉源码文件和配置文件，只保留可执行文件
      // Filter out source files and config files, keep only executable files
      const validAssets = release.assets.filter(
        (asset) =>
          asset.type === "attach" && // 只要附件，不要源码 / Only attachments, not source
          !asset.name.includes(".blockmap") && // 排除 blockmap 文件 / Exclude blockmap files
          !asset.name.includes(".yml") && // 排除 yml 配置文件 / Exclude yml config files
          !asset.name.includes(".yaml") && // 排除 yaml 配置文件 / Exclude yaml config files
          !asset.name.includes(".zip") && // 排除zip文件 / Exclude zip files
          (asset.name.includes(".exe") || 
           asset.name.includes(".dmg") || 
           asset.name.includes(".deb") || 
           asset.name.includes(".AppImage")) // 只保留主要的可执行文件 / Keep only main executable files
      );

      // Windows 资源：分别处理 setup 和 portable 包
      // Windows assets: handle setup and portable packages separately
      const windowsSetupAssets = validAssets.filter(
        (asset) =>
          (asset.name.includes(".exe") || asset.name.includes("setup")) &&
          !asset.name.includes("portable")
      );
      const windowsPortableAssets = validAssets.filter(
        (asset) =>
          asset.name.toLowerCase().includes("portable")
      );

      // macOS 资源
      // macOS assets
      const macosAssets = validAssets.filter(
        (asset) =>
          asset.name.includes(".dmg") ||
          asset.name.includes("mac") ||
          asset.name.includes("darwin")
      );

      // Linux 资源
      // Linux assets
      const linuxAssets = validAssets.filter(
        (asset) =>
          asset.name.includes(".deb") ||
          asset.name.includes(".AppImage") ||
          asset.name.includes("linux")
      );

      // 处理 Windows Setup 安装包
      // Process Windows Setup packages
      if (windowsSetupAssets.length > 0) {
        platforms.windows.push({
          name: "安装包 (Setup) - 中国镜像",
          primary: true,
          desc: "推荐首次安装使用，自动管理快捷方式和文件关联 | 中国镜像源，更快下载",
          variants: windowsSetupAssets.map((asset) => {
            let arch = "x64";
            let archName = "x64 安装版";
            if (asset.name.includes("arm64")) {
              arch = "arm64";
              archName = "ARM64 安装版";
            }

            return {
              arch,
              archName,
              packageType: 'setup' as const,
              size: "未知大小", // 中国API不提供size信息 / China API doesn't provide size info
              url: asset.browser_download_url,
              recommended: arch === "x64",
              downloadCount: 0, // 中国API不提供下载次数 / China API doesn't provide download count
            };
          }),
        });
      }

      // 处理 Windows Portable 便携包
      // Process Windows Portable packages
      if (windowsPortableAssets.length > 0) {
        platforms.windows.push({
          name: "便携版 (Portable) - 中国镜像",
          primary: false,
          desc: "免安装，解压即用，适合便携使用或临时体验 | 中国镜像源，更快下载",
          variants: windowsPortableAssets.map((asset) => {
            let arch = "x64";
            let archName = "x64 便携版";
            if (asset.name.includes("arm64")) {
              arch = "arm64";
              archName = "ARM64 便携版";
            }

            return {
              arch,
              archName,
              packageType: 'portable' as const,
              size: "未知大小", // 中国API不提供size信息 / China API doesn't provide size info
              url: asset.browser_download_url,
              recommended: false, // 便携版不作为默认推荐
              downloadCount: 0, // 中国API不提供下载次数 / China API doesn't provide download count
            };
          }),
        });
      }

      // 处理 macOS 资源
      // Process macOS assets
      if (macosAssets.length > 0) {
        platforms.macos.push({
          name: "China Mirror",
          primary: true,
          desc: "中国镜像源 - 更快的下载速度",
          variants: macosAssets.map((asset) => {
            let arch = "universal";
            let archName = "通用版";
            
            if (asset.name.includes("arm64") || asset.name.includes("apple")) {
              arch = "apple-silicon";
              archName = "Apple Silicon";
            } else if (asset.name.includes("intel") || asset.name.includes("x64")) {
              arch = "intel";
              archName = "Intel";
            }

            return {
              arch: arch,
              archName: archName,
              size: "未知大小", // 中国API不提供size信息 / China API doesn't provide size info
              url: asset.browser_download_url,
              recommended: true,
              downloadCount: 0, // 中国API不提供下载次数 / China API doesn't provide download count
            };
          }),
        });
      }

      // 处理 Linux 资源
      // Process Linux assets
      if (linuxAssets.length > 0) {
        platforms.linux.push({
          name: "China Mirror",
          primary: true,
          desc: "中国镜像源 - 更快的下载速度",
          variants: linuxAssets.map((asset) => {
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
              size: "未知大小", // 中国API不提供size信息 / China API doesn't provide size info
              url: asset.browser_download_url,
              recommended: isRecommended,
              downloadCount: 0, // 中国API不提供下载次数 / China API doesn't provide download count
            };
          }),
        });
      }
    }

    return {
      version: release.tag_name || release.name,
      name: release.name || release.tag_name,
      description: release.body || "",
      releaseType: determineReleaseType(release.tag_name || release.name, release.prerelease),
      publishedAt: release.created_at,
      htmlUrl: `https://gitcode.com/mkdir700/EchoPlayer/releases/tag/${release.tag_name}`,
      platforms,
    };
  } catch (error) {
    console.error("Error fetching release data from China API:", error);
    return null;
  }
}
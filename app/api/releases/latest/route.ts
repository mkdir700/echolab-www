import { NextResponse } from 'next/server';
import {
  GitHubRelease,
  ProcessedRelease,
  formatFileSize,
  determineReleaseType,
  detectPlatformFromFilename,
  isExecutableFile,
  ReleaseVariant,
  ReleaseChannel
} from '@/lib/api';

// GitHub repository configuration
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'mkdir700'; // 替换为你的 GitHub 用户名/组织名
const GITHUB_REPO = process.env.GITHUB_REPO || 'echolab'; // 替换为你的仓库名
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // 可选：用于提高 API 限制

async function fetchLatestRelease(): Promise<GitHubRelease> {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'EchoLab-Website',
  };
  
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  console.log(`Fetching releases from: ${GITHUB_OWNER}/${GITHUB_REPO}`);

  // 直接获取所有发布版本（包括预发布版本），参考测试脚本的实现
  const allReleasesResponse = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases?per_page=20`,
    {
      headers,
      next: { revalidate: 300 }, // Cache for 5 minutes
    }
  );
  
  if (!allReleasesResponse.ok) {
    throw new Error(`GitHub API error: ${allReleasesResponse.status} ${allReleasesResponse.statusText}`);
  }
  
  const allReleases: GitHubRelease[] = await allReleasesResponse.json();
  
  if (allReleases.length === 0) {
    throw new Error('No releases found in repository');
  }

  console.log(`Found ${allReleases.length} releases`);
  
  // 过滤掉草稿版本
  const validReleases = allReleases.filter(release => !release.draft);
  
  if (validReleases.length === 0) {
    throw new Error('No valid releases found (all are drafts)');
  }

  // 智能选择版本：优先选择稳定版本，如果没有稳定版本则选择最新的预发布版本
  const stableReleases = validReleases.filter(release => !release.prerelease);
  const preReleases = validReleases.filter(release => release.prerelease);
  
  let latestRelease: GitHubRelease;
  
  if (stableReleases.length > 0) {
    // 有稳定版本，选择最新的稳定版本
    latestRelease = stableReleases[0];
    console.log(`Using latest stable release: ${latestRelease.tag_name}`);
  } else if (preReleases.length > 0) {
    // 没有稳定版本，选择最新的预发布版本
    latestRelease = preReleases[0];
    console.log(`No stable releases found, using latest prerelease: ${latestRelease.tag_name}`);
  } else {
    // 这种情况理论上不会发生，但作为保险
    latestRelease = validReleases[0];
    console.log(`Using latest available release: ${latestRelease.tag_name}`);
  }
  
  // 记录发布版本概览（类似测试脚本）
  console.log('Release overview:');
  validReleases.slice(0, 5).forEach((release, index) => {
    console.log(`  ${index + 1}. ${release.tag_name} (${release.prerelease ? 'prerelease' : 'stable'}) - ${release.published_at}`);
  });
  
  console.log(`Selected release: ${latestRelease.tag_name} (prerelease: ${latestRelease.prerelease})`);
  console.log(`Assets count: ${latestRelease.assets.length}`);
  
  return latestRelease;
}

function processRelease(release: GitHubRelease): ProcessedRelease {
  console.log(`Processing release: ${release.tag_name}`);
  console.log(`Total assets: ${release.assets.length}`);
  
  // 过滤掉非可执行文件
  const executableAssets = release.assets.filter(asset => {
    const isExecutable = isExecutableFile(asset.name);
    if (!isExecutable) {
      console.log(`  Filtered out non-executable: ${asset.name}`);
    }
    return isExecutable;
  });
  
  console.log(`Executable assets after filtering: ${executableAssets.length}`);
  
  const platforms: ProcessedRelease['platforms'] = {
    windows: [],
    macos: [],
    linux: [],
  };
  
  // 测试平台检测逻辑（类似测试脚本）
  console.log('Platform detection results:');
  executableAssets.forEach(asset => {
    const detection = detectPlatformFromFilename(asset.name);
    console.log(`  ${asset.name} -> Platform: ${detection.platform}, Arch: ${detection.arch}`);
  });
  
  // Group assets by platform
  const assetsByPlatform = {
    windows: executableAssets.filter(asset => {
      const { platform } = detectPlatformFromFilename(asset.name);
      return platform === 'windows';
    }),
    macos: executableAssets.filter(asset => {
      const { platform } = detectPlatformFromFilename(asset.name);
      return platform === 'macos';
    }),
    linux: executableAssets.filter(asset => {
      const { platform } = detectPlatformFromFilename(asset.name);
      return platform === 'linux';
    }),
  };
  
  console.log('Assets grouped by platform:');
  Object.entries(assetsByPlatform).forEach(([platform, assets]) => {
    console.log(`  ${platform}: ${assets.length} assets`);
    assets.forEach(asset => {
      console.log(`    - ${asset.name} (${formatFileSize(asset.size)})`);
    });
  });
    // Process each platform
  Object.entries(assetsByPlatform).forEach(([platformKey, assets]) => {
    if (assets.length === 0) return;
    
    const platform = platformKey as keyof ProcessedRelease['platforms'];
    
    // Group assets by architecture to handle duplicates
    const assetsByArch = new Map<string, typeof assets>();
    
    assets.forEach(asset => {
      const { arch } = detectPlatformFromFilename(asset.name);
      if (!assetsByArch.has(arch)) {
        assetsByArch.set(arch, []);
      }
      assetsByArch.get(arch)!.push(asset);
    });
    
    // For each architecture, pick the preferred package type
    const githubVariants: ReleaseVariant[] = [];
    
    assetsByArch.forEach((archAssets, arch) => {
      let selectedAsset = archAssets[0]; // Default to first asset
      
      if (archAssets.length > 1) {
        // Define preference order for package types
        const preferenceOrder = [
          // Windows preferences: installer > portable
          '.exe', '.msi',
          // macOS preferences: dmg > pkg
          '.dmg', '.pkg',
          // Linux preferences: appimage > deb > rpm > tar.gz
          '.appimage', '.deb', '.rpm', '.tar.gz', '.tar.xz',
          // Fallback: zip (portable)
          '.zip'
        ];
        
        // Find the most preferred asset
        for (const ext of preferenceOrder) {
          const preferred = archAssets.find(asset => 
            asset.name.toLowerCase().endsWith(ext)
          );
          if (preferred) {
            selectedAsset = preferred;
            break;
          }
        }
        
        console.log(`  ${platform} ${arch}: Found ${archAssets.length} packages, selected ${selectedAsset.name}`);
        archAssets.forEach(asset => {
          if (asset !== selectedAsset) {
            console.log(`    Skipped: ${asset.name}`);
          }
        });
      }
      
      // Determine architecture display name
      let archName = arch;
      if (arch === 'x64') {
        archName = platform === 'windows' ? 'x64 (推荐)' : 'x64 (推荐)';
      } else if (arch === 'arm64') {
        archName = 'ARM64';
      } else if (arch === 'apple-silicon') {
        archName = 'Apple Silicon (M1/M2/M3)';
      } else if (arch === 'intel') {
        archName = 'Intel x64';
      } else if (arch === 'universal') {
        archName = 'Universal (通用版)';
      } else {
        archName = arch === 'unknown' ? '通用版' : arch;
      }
      
      githubVariants.push({
        arch,
        archName,
        size: formatFileSize(selectedAsset.size),
        url: selectedAsset.browser_download_url,
        recommended: arch === 'x64' || arch === 'apple-silicon',
        downloadCount: selectedAsset.download_count,
      });
    });
    
    const githubChannel: ReleaseChannel = {
      name: 'GitHub Release',
      primary: true,
      desc: '官方发布渠道',
      variants: githubVariants,
    };
    
    platforms[platform].push(githubChannel);
  });
  
  const processedRelease = {
    version: release.tag_name,
    name: release.name || release.tag_name,
    description: release.body || '',
    releaseType: determineReleaseType(release.tag_name, release.prerelease),
    publishedAt: release.published_at,
    htmlUrl: release.html_url,
    platforms,
  };
  
  console.log(`Processed release summary:`);
  console.log(`  Version: ${processedRelease.version}`);
  console.log(`  Type: ${processedRelease.releaseType}`);
  console.log(`  Platforms: ${Object.keys(platforms).filter(p => platforms[p as keyof typeof platforms].length > 0).join(', ')}`);
  
  return processedRelease;
}

export async function GET() {
  try {
    const release = await fetchLatestRelease();
    const processedRelease = processRelease(release);
    
    return NextResponse.json(processedRelease, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching latest release:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch latest release',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

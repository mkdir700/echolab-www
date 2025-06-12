import { NextRequest, NextResponse } from 'next/server';
import {
  GitHubRelease,
  ProcessedRelease,
  formatFileSize,
  determineReleaseType,
  detectPlatformFromFilename,
  ReleaseVariant,
  ReleaseChannel
} from '@/lib/api';

// GitHub repository configuration
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'echolab';
const GITHUB_REPO = process.env.GITHUB_REPO || 'echolab-app';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function fetchAllReleases(limit: number = 10): Promise<GitHubRelease[]> {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'EchoLab-Website',
  };
  
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }
  
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases?per_page=${limit}`,
    {
      headers,
      next: { revalidate: 600 }, // Cache for 10 minutes
    }
  );
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

function processRelease(release: GitHubRelease): ProcessedRelease {
  const platforms: ProcessedRelease['platforms'] = {
    windows: [],
    macos: [],
    linux: [],
  };
  
  // Group assets by platform
  const assetsByPlatform = {
    windows: release.assets.filter(asset => {
      const { platform } = detectPlatformFromFilename(asset.name);
      return platform === 'windows';
    }),
    macos: release.assets.filter(asset => {
      const { platform } = detectPlatformFromFilename(asset.name);
      return platform === 'macos';
    }),
    linux: release.assets.filter(asset => {
      const { platform } = detectPlatformFromFilename(asset.name);
      return platform === 'linux';
    }),
  };
  
  // Process each platform
  Object.entries(assetsByPlatform).forEach(([platformKey, assets]) => {
    if (assets.length === 0) return;
    
    const platform = platformKey as keyof ProcessedRelease['platforms'];
    
    // Create GitHub Release channel
    const githubVariants: ReleaseVariant[] = assets.map(asset => {
      const { arch } = detectPlatformFromFilename(asset.name);
      
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
      }
      
      return {
        arch,
        archName,
        size: formatFileSize(asset.size),
        url: asset.browser_download_url,
        recommended: arch === 'x64' || arch === 'apple-silicon',
        downloadCount: asset.download_count,
      };
    });
    
    const githubChannel: ReleaseChannel = {
      name: 'GitHub Release',
      primary: true,
      desc: '官方发布渠道',
      variants: githubVariants,
    };
    
    platforms[platform].push(githubChannel);
  });
  
  return {
    version: release.tag_name,
    name: release.name || release.tag_name,
    description: release.body || '',
    releaseType: determineReleaseType(release.tag_name, release.prerelease),
    publishedAt: release.published_at,
    htmlUrl: release.html_url,
    platforms,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const includePrerelease = searchParams.get('prerelease') === 'true';
    
    const releases = await fetchAllReleases(limit);
    
    // Filter releases based on prerelease parameter
    const filteredReleases = includePrerelease 
      ? releases 
      : releases.filter(release => !release.prerelease);
    
    const processedReleases = filteredReleases.map(processRelease);
    
    return NextResponse.json(processedReleases, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
      },
    });
  } catch (error) {
    console.error('Error fetching releases:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch releases',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

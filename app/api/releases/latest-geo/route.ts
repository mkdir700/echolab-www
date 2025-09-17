import { NextResponse } from 'next/server';
import { getLatestReleaseFromGitHub } from '@/lib/github-api';
import { getLatestReleaseFromChinaApi } from '@/lib/china-api';
import { detectLocationFromHeaders } from '@/lib/ip-detection';
import { ProcessedRelease } from '@/lib/api';

// 内存缓存存储 / In-memory cache storage
interface CacheEntry {
  data: ProcessedRelease;
  timestamp: number;
  etag: string;
  source: 'github' | 'china';
}

// 分别为GitHub和中国API缓存
// Separate cache for GitHub and China API
let githubCache: CacheEntry | null = null;
let chinaCache: CacheEntry | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存 / 5 minutes cache

// 生成 ETag 的函数 / Function to generate ETag
function generateETag(data: ProcessedRelease, source: string): string {
  const content = JSON.stringify(data) + source;
  // 简单的哈希函数，基于内容生成 ETag / Simple hash function to generate ETag based on content
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 转换为32位整数 / Convert to 32bit integer
  }
  return `"${Math.abs(hash).toString(16)}"`;
}

// 检查缓存是否有效 / Check if cache is valid
function isCacheValid(cache: CacheEntry | null): boolean {
  if (!cache) return false;
  const now = Date.now();
  return (now - cache.timestamp) < CACHE_DURATION;
}

export async function GET(request: Request) {
  try {
    // 检测用户位置
    // Detect user location
    const locationInfo = detectLocationFromHeaders(request);
    const isChina = locationInfo.isChina;
    
    console.log('User location detection:', {
      country: locationInfo.country,
      countryCode: locationInfo.countryCode,
      isChina: isChina,
      userAgent: request.headers.get('user-agent')?.substring(0, 100) + '...',
      acceptLanguage: request.headers.get('accept-language'),
    });

    // 获取请求头中的 If-None-Match / Get If-None-Match from request headers
    const ifNoneMatch = request.headers.get('if-none-match');

    // 根据用户位置选择API源和缓存
    // Select API source and cache based on user location
    const useChina = isChina;
    const cache = useChina ? chinaCache : githubCache;
    const source = useChina ? 'china' : 'github';

    // 如果缓存有效，直接返回缓存数据 / If cache is valid, return cached data directly
    if (isCacheValid(cache) && cache) {
      // 检查 ETag 是否匹配 / Check if ETag matches
      if (ifNoneMatch && ifNoneMatch === cache.etag) {
        return new NextResponse(null, {
          status: 304, // Not Modified
          headers: {
            'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=600',
            'ETag': cache.etag,
            'X-Geo-Source': source,
          },
        });
      }

      // 返回缓存的数据 / Return cached data
      return NextResponse.json(cache.data, {
        headers: {
          'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=600',
          'ETag': cache.etag,
          'X-Cache': 'HIT', // 标识缓存命中 / Mark cache hit
          'X-Geo-Source': source, // 标识数据源 / Mark data source
          'X-Geo-Country': locationInfo.countryCode,
        },
      });
    }

    // 缓存无效或不存在，获取新数据 / Cache invalid or doesn't exist, fetch new data
    console.log(`Fetching fresh data from ${source} API...`);
    
    let releaseData: ProcessedRelease | null = null;
    
    if (useChina) {
      // 中国用户使用中国API，失败时回退到GitHub
      // China users use China API, fallback to GitHub if failed
      try {
        releaseData = await getLatestReleaseFromChinaApi();
        if (!releaseData) {
          console.log('China API failed, falling back to GitHub API...');
          releaseData = await getLatestReleaseFromGitHub();
        }
      } catch (error) {
        console.error('China API error, falling back to GitHub:', error);
        releaseData = await getLatestReleaseFromGitHub();
      }
    } else {
      // 非中国用户使用GitHub API
      // Non-China users use GitHub API
      releaseData = await getLatestReleaseFromGitHub();
    }

    if (!releaseData) {
      return NextResponse.json(
        { error: "Failed to fetch release data from all sources" },
        { status: 500 }
      );
    }

    // 生成新的 ETag / Generate new ETag
    const etag = generateETag(releaseData, source);

    // 更新对应的缓存 / Update corresponding cache
    const newCacheEntry: CacheEntry = {
      data: releaseData,
      timestamp: Date.now(),
      etag: etag,
      source: source as 'github' | 'china',
    };

    if (useChina) {
      chinaCache = newCacheEntry;
    } else {
      githubCache = newCacheEntry;
    }

    console.log(`Cache updated with version ${releaseData.version}, source: ${source}, ETag: ${etag}`);

    // 检查客户端的 ETag 是否匹配新数据 / Check if client's ETag matches new data
    if (ifNoneMatch && ifNoneMatch === etag) {
      return new NextResponse(null, {
        status: 304, // Not Modified
        headers: {
          'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=600',
          'ETag': etag,
          'X-Geo-Source': source,
          'X-Geo-Country': locationInfo.countryCode,
        },
      });
    }

    // 返回新数据 / Return new data
    return NextResponse.json(releaseData, {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=600',
        'ETag': etag,
        'X-Cache': 'MISS', // 标识缓存未命中 / Mark cache miss
        'X-Geo-Source': source, // 标识数据源 / Mark data source
        'X-Geo-Country': locationInfo.countryCode, // 标识检测到的国家 / Mark detected country
      },
    });
  } catch (error) {
    console.error("Geo API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
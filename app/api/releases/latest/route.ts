import { NextResponse } from 'next/server';
import { getLatestReleaseFromGitHub } from '@/lib/github-api';
import { ProcessedRelease } from '@/lib/api';

// 内存缓存存储 / In-memory cache storage
interface CacheEntry {
  data: ProcessedRelease;
  timestamp: number;
  etag: string;
}

let cache: CacheEntry | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存 / 5 minutes cache

// 生成 ETag 的函数 / Function to generate ETag
function generateETag(data: ProcessedRelease): string {
  const content = JSON.stringify(data);
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
function isCacheValid(): boolean {
  if (!cache) return false;
  const now = Date.now();
  return (now - cache.timestamp) < CACHE_DURATION;
}

export async function GET(request: Request) {
  try {
    // 获取请求头中的 If-None-Match / Get If-None-Match from request headers
    const ifNoneMatch = request.headers.get('if-none-match');

    // 如果缓存有效，直接返回缓存数据 / If cache is valid, return cached data directly
    if (isCacheValid() && cache) {
      // 检查 ETag 是否匹配 / Check if ETag matches
      if (ifNoneMatch && ifNoneMatch === cache.etag) {
        return new NextResponse(null, {
          status: 304, // Not Modified
          headers: {
            'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=600',
            'ETag': cache.etag,
          },
        });
      }

      // 返回缓存的数据 / Return cached data
      return NextResponse.json(cache.data, {
        headers: {
          'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=600',
          'ETag': cache.etag,
          'X-Cache': 'HIT', // 标识缓存命中 / Mark cache hit
        },
      });
    }

    // 缓存无效或不存在，从 GitHub API 获取新数据 / Cache invalid or doesn't exist, fetch new data from GitHub API
    console.log('Fetching fresh data from GitHub API...');
    const releaseData = await getLatestReleaseFromGitHub();

    if (!releaseData) {
      return NextResponse.json(
        { error: "Failed to fetch release data" },
        { status: 500 }
      );
    }

    // 生成新的 ETag / Generate new ETag
    const etag = generateETag(releaseData);

    // 更新缓存 / Update cache
    cache = {
      data: releaseData,
      timestamp: Date.now(),
      etag: etag,
    };

    console.log(`Cache updated with version ${releaseData.version}, ETag: ${etag}`);

    // 检查客户端的 ETag 是否匹配新数据 / Check if client's ETag matches new data
    if (ifNoneMatch && ifNoneMatch === etag) {
      return new NextResponse(null, {
        status: 304, // Not Modified
        headers: {
          'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=600',
          'ETag': etag,
        },
      });
    }

    // 返回新数据 / Return new data
    return NextResponse.json(releaseData, {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=600',
        'ETag': etag,
        'X-Cache': 'MISS', // 标识缓存未命中 / Mark cache miss
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

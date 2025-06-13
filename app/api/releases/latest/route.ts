import { NextResponse } from 'next/server';
import { getLatestReleaseFromGitHub } from '@/lib/github-api';

export async function GET() {
  try {
    console.log("API route: Fetching release data...");
    const releaseData = await getLatestReleaseFromGitHub();

    if (!releaseData) {
      console.error("API route: No release data returned from GitHub API");
      return NextResponse.json(
        {
          error: "Failed to fetch release data",
          details: "No release data available from GitHub API"
        },
        { status: 500 }
      );
    }

    console.log(`API route: Successfully returning release data for ${releaseData.version}`);
    return NextResponse.json(releaseData, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error("API route error:", error);
    // 提供更详细的错误信息
    // Provide more detailed error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        error: "Internal server error",
        details: errorMessage
      },
      { status: 500 }
    );
  }
}

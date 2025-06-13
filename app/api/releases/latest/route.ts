import { NextResponse } from 'next/server';
import { getLatestReleaseFromGitHub } from '@/lib/github-api';

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

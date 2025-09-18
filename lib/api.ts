// Data fetching utilities and API configuration
import axios from 'axios';

// API base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens, etc.
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        // Redirect to login if needed
      }
    }
    return Promise.reject(error);
  }
);

// Subtitle data types
export interface SubtitleItem {
  id: number;
  start: number;
  end: number;
  en: string;
  zh: string;
}

export interface SubtitleResponse {
  data: SubtitleItem[];
  meta: {
    total: number;
    duration: number;
  };
}

// GitHub Release data types
export interface GitHubAsset {
  id: number;
  name: string;
  label: string | null;
  content_type: string;
  size: number;
  download_count: number;
  browser_download_url: string;
  created_at: string;
  updated_at: string;
}

export interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  prerelease: boolean;
  draft: boolean;
  created_at: string;
  published_at: string;
  assets: GitHubAsset[];
  html_url: string;
  zipball_url: string;
  tarball_url: string;
}

// Processed release data for our app
export interface ReleaseVariant {
  arch: string;
  archName: string;
  packageType?: 'setup' | 'portable';
  size: string;
  url: string;
  recommended?: boolean;
  downloadCount: number;
}

export interface ReleaseChannel {
  name: string;
  primary: boolean;
  desc: string;
  variants: ReleaseVariant[];
}

export interface ProcessedRelease {
  version: string;
  name: string;
  description: string;
  releaseType: 'stable' | 'beta' | 'alpha' | 'rc';
  publishedAt: string;
  htmlUrl: string;
  platforms: {
    windows: ReleaseChannel[];
    macos: ReleaseChannel[];
    linux: ReleaseChannel[];
  };
}

// API endpoints
export const apiEndpoints = {
  subtitles: {
    getAll: () => api.get<SubtitleResponse>('/subtitles'),
    getById: (id: string) => api.get<SubtitleItem>(`/subtitles/${id}`),
  },
  releases: {
    getLatest: () => api.get<ProcessedRelease>('/releases/latest'),
    getAll: () => api.get<ProcessedRelease[]>('/releases'),
  },
  // Add more endpoints as needed
} as const;

// Generic fetch function for server-side data fetching
export async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Utility functions for processing releases
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function determineReleaseType(tagName: string, prerelease: boolean): 'stable' | 'beta' | 'alpha' | 'rc' {
  if (prerelease) {
    if (tagName.includes('alpha')) return 'alpha';
    if (tagName.includes('beta')) return 'beta';
    if (tagName.includes('rc')) return 'rc';
    return 'beta'; // Default for prerelease
  }
  return 'stable';
}

// Check if a file is an executable/installable file
export function isExecutableFile(filename: string): boolean {
  const lower = filename.toLowerCase();
  
  // Executable file extensions for different platforms
  const executableExtensions = [
    '.exe',      // Windows executable
    '.msi',      // Windows installer
    '.dmg',      // macOS disk image
    '.pkg',      // macOS package
    '.appimage', // Linux AppImage
    '.deb',      // Debian package
    '.rpm',      // Red Hat package
    '.zip',      // Portable/archive (only if not a blockmap)
    '.tar.gz',   // Linux tarball
    '.tar.xz',   // Linux tarball
  ];
  
  // Files to exclude (not executable)
  const excludeExtensions = [
    '.blockmap',    // Electron updater file
    '.yml',         // Configuration file
    '.yaml',        // Configuration file
    '.json',        // Configuration file
    '.sig',         // Signature file
    '.asc',         // ASCII signature
    '.sha256',      // Checksum file
    '.sha512',      // Checksum file
    '.md5',         // Checksum file
    '.txt',         // Text file
  ];
  
  // Check for excluded extensions first
  for (const ext of excludeExtensions) {
    if (lower.endsWith(ext)) {
      return false;
    }
  }
  
  // Check for executable extensions
  for (const ext of executableExtensions) {
    if (lower.endsWith(ext)) {
      // Special case: zip files ending with .blockmap are not executable
      if (ext === '.zip' && lower.includes('.blockmap')) {
        return false;
      }
      return true;
    }
  }
  
  return false;
}

export function detectPlatformFromFilename(filename: string): {
  platform: 'windows' | 'macos' | 'linux' | null;
  arch: string;
  packageType?: 'setup' | 'portable';
} {
  const lower = filename.toLowerCase();

  // Platform detection - 改进平台检测逻辑
  let platform: 'windows' | 'macos' | 'linux' | null = null;
  let packageType: 'setup' | 'portable' | undefined = undefined;

  // Windows 检测
  if (lower.includes('.exe') || lower.includes('windows') || lower.includes('win') || lower.includes('setup') || lower.includes('portable')) {
    platform = 'windows';
    // 检测包类型
    if (lower.includes('portable')) {
      packageType = 'portable';
    } else if (lower.includes('.exe') && (lower.includes('setup') || lower.includes('-setup.'))) {
      packageType = 'setup';
    } else if (lower.includes('.exe')) {
      // 默认 exe 文件为安装包
      packageType = 'setup';
    }
  }
  // macOS 检测
  else if (lower.includes('.dmg') || lower.includes('macos') || lower.includes('darwin') || lower.includes('mac.yml')) {
    platform = 'macos';
  }
  // Linux 检测
  else if (lower.includes('.appimage') || lower.includes('linux') || lower.includes('.deb') || lower.includes('.rpm') || lower.includes('.tar.gz')) {
    platform = 'linux';
  }
  // 不再处理普通的 zip 文件，只处理明确标注为 portable 的文件
  
  // Architecture detection - 改进架构检测逻辑
  let arch = 'unknown';
  if (lower.includes('x64') || lower.includes('amd64')) {
    arch = 'x64';
  } else if (lower.includes('arm64') || lower.includes('aarch64')) {
    if (platform === 'macos') {
      arch = 'apple-silicon';
    } else {
      arch = 'arm64';
    }
  } else if (lower.includes('intel') && platform === 'macos') {
    arch = 'intel';
  } else if (lower.includes('universal') && platform === 'macos') {
    arch = 'universal';
  } else if (platform === 'windows' && (lower.includes('setup.exe') || lower.includes('-setup.exe'))) {
    // Windows 安装程序通常是 x64，除非明确标注架构
    arch = 'x64';
  } else if (platform === 'macos' && lower.includes('.dmg')) {
    // macOS DMG 文件如果没有明确架构，假设是 universal 或 x64
    arch = 'universal';
  } else if (platform === 'linux' && lower.includes('.appimage')) {
    // Linux AppImage 如果没有明确架构，假设是 x64
    arch = 'x64';
  }
  
  return { platform, arch, packageType };
}

export default api;

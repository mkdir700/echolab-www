// Custom hooks for data fetching using TanStack Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiEndpoints, type SubtitleItem, type SubtitleResponse } from '@/lib/api';

// Query keys for consistent cache management
export const queryKeys = {
  subtitles: ['subtitles'] as const,
  subtitle: (id: string) => ['subtitle', id] as const,
} as const;

// Mock data for development (can be removed when API is ready)
const mockSubtitleData: SubtitleItem[] = [
  { id: 1, start: 0, end: 3, en: "Welcome to EchoLab", zh: "欢迎使用 EchoLab" },
  {
    id: 2,
    start: 3,
    end: 7,
    en: "The professional language learning video player",
    zh: "专业的语言学习视频播放器",
  },
  {
    id: 3,
    start: 7,
    end: 11,
    en: "Experience sentence-by-sentence listening",
    zh: "体验逐句精听功能",
  },
  {
    id: 4,
    start: 11,
    end: 15,
    en: "Control playback speed easily",
    zh: "轻松控制播放速度",
  },
  {
    id: 5,
    start: 15,
    end: 19,
    en: "Switch between day and night modes",
    zh: "在白天和黑夜模式间切换",
  },
  {
    id: 6,
    start: 19,
    end: 23,
    en: "Use keyboard shortcuts for efficiency",
    zh: "使用快捷键提高效率",
  },
];

// Hook to fetch all subtitles
export function useSubtitles() {
  return useQuery({
    queryKey: queryKeys.subtitles,
    queryFn: async (): Promise<SubtitleResponse> => {
      // For now, return mock data
      // In production, this would call: apiEndpoints.subtitles.getAll()
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      return {
        data: mockSubtitleData,
        meta: {
          total: mockSubtitleData.length,
          duration: 23,
        },
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}

// Hook to fetch a single subtitle by ID
export function useSubtitle(id: string) {
  return useQuery({
    queryKey: queryKeys.subtitle(id),
    queryFn: async (): Promise<SubtitleItem | undefined> => {
      // For now, return mock data
      // In production, this would call: apiEndpoints.subtitles.getById(id)
      await new Promise(resolve => setTimeout(resolve, 200));
      
      return mockSubtitleData.find(item => item.id === parseInt(id));
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Hook for mutations (creating, updating, deleting subtitles)
export function useSubtitleMutations() {
  const queryClient = useQueryClient();

  const addSubtitle = useMutation({
    mutationFn: async (newSubtitle: Omit<SubtitleItem, 'id'>): Promise<SubtitleItem> => {
      // In production, this would call the API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const subtitle: SubtitleItem = {
        ...newSubtitle,
        id: Date.now(), // Simple ID generation for mock
      };
      
      return subtitle;
    },
    onSuccess: () => {
      // Invalidate and refetch subtitles
      queryClient.invalidateQueries({ queryKey: queryKeys.subtitles });
    },
  });

  const updateSubtitle = useMutation({
    mutationFn: async (subtitle: SubtitleItem): Promise<SubtitleItem> => {
      // In production, this would call the API
      await new Promise(resolve => setTimeout(resolve, 1000));
      return subtitle;
    },
    onSuccess: (updatedSubtitle) => {
      // Update the cache directly
      queryClient.setQueryData(queryKeys.subtitle(updatedSubtitle.id.toString()), updatedSubtitle);
      queryClient.invalidateQueries({ queryKey: queryKeys.subtitles });
    },
  });

  const deleteSubtitle = useMutation({
    mutationFn: async (id: string): Promise<void> => {
      // In production, this would call the API
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.subtitle(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.subtitles });
    },
  });

  return {
    addSubtitle,
    updateSubtitle,
    deleteSubtitle,
  };
}

// Generic hook for any data fetching needs
export function useApiData<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  }
) {
  return useQuery({
    queryKey,
    queryFn,
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
    gcTime: options?.gcTime ?? 10 * 60 * 1000,
    enabled: options?.enabled ?? true,
  });
}

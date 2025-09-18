"use client";

import { useState, useEffect } from 'react';
import { detectUserLocation, type IPInfo } from '@/lib/ip-detection';

// 客户端检测用户位置的Hook
// Client-side hook for user location detection
export function useUserLocation() {
  const [location, setLocation] = useState<IPInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const detectLocation = async () => {
      try {
        setLoading(true);
        setError(null);

        const locationInfo = await detectUserLocation();
        
        if (mounted) {
          setLocation(locationInfo);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to detect location');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    detectLocation();

    return () => {
      mounted = false;
    };
  }, []);

  return { location, loading, error };
}
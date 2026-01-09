"use client"

import { useRef, useCallback } from 'react';

interface CachedData {
  data: any[];
  total: number;
  success: boolean;
}

// Global cache store that persists across component remounts
const globalCache = new Map<string, CachedData>();

export const useProTableCache = (cacheKey: string) => {
  const hasFetchedRef = useRef(false);

  const wrapRequest = useCallback((originalRequest: any) => {
    return async (params: any, sort: any, filter: any) => {
      // Check if we have cached data and haven't fetched yet in this mount
      const cached = globalCache.get(cacheKey);
      if (cached && !hasFetchedRef.current) {
        hasFetchedRef.current = true;
        return cached;
      }

      // Make the actual request
      const result = await originalRequest(params, sort, filter);

      // Cache the successful result
      if (result.success) {
        globalCache.set(cacheKey, result);
        hasFetchedRef.current = true;
      }

      return result;
    };
  }, [cacheKey]);

  const clearCache = useCallback(() => {
    globalCache.delete(cacheKey);
    hasFetchedRef.current = false;
  }, [cacheKey]);

  return {
    wrapRequest,
    clearCache,
  };
};

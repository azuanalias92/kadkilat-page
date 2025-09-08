import { useState, useEffect, useCallback } from 'react';

interface ImagePreloaderOptions {
  preloadCount?: number;
  cacheSize?: number;
}

interface ImageCache {
  [url: string]: {
    loaded: boolean;
    element: HTMLImageElement;
    timestamp: number;
  };
}

export function useImagePreloader(imageUrls: string[], options: ImagePreloaderOptions = {}) {
  const { preloadCount = 5, cacheSize = 20 } = options;
  const [imageCache, setImageCache] = useState<ImageCache>({});
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());

  const preloadImage = useCallback((url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if already cached
      if (imageCache[url]?.loaded) {
        resolve();
        return;
      }

      // Check if already loading
      if (loadingImages.has(url)) {
        resolve();
        return;
      }

      setLoadingImages(prev => new Set(prev).add(url));

      const img = new Image();
      img.onload = () => {
        setImageCache(prev => {
          const newCache = { ...prev };
          
          // Clean up old cache entries if cache is full
          const cacheEntries = Object.entries(newCache);
          if (cacheEntries.length >= cacheSize) {
            // Remove oldest entries
            const sortedEntries = cacheEntries.sort((a, b) => a[1].timestamp - b[1].timestamp);
            const entriesToRemove = sortedEntries.slice(0, cacheEntries.length - cacheSize + 1);
            entriesToRemove.forEach(([key]) => {
              delete newCache[key];
            });
          }

          newCache[url] = {
            loaded: true,
            element: img,
            timestamp: Date.now()
          };
          
          return newCache;
        });
        
        setLoadingImages(prev => {
          const newSet = new Set(prev);
          newSet.delete(url);
          return newSet;
        });
        
        resolve();
      };
      
      img.onerror = () => {
        setLoadingImages(prev => {
          const newSet = new Set(prev);
          newSet.delete(url);
          return newSet;
        });
        reject(new Error(`Failed to load image: ${url}`));
      };
      
      img.src = url;
    });
  }, [imageCache, loadingImages, cacheSize]);

  const preloadImages = useCallback(async (startIndex: number = 0) => {
    const imagesToPreload = imageUrls.slice(startIndex, startIndex + preloadCount);
    
    try {
      await Promise.allSettled(
        imagesToPreload.map(url => preloadImage(url))
      );
    } catch (error) {
      console.warn('Some images failed to preload:', error);
    }
  }, [imageUrls, preloadCount, preloadImage]);

  const isImageCached = useCallback((url: string) => {
    return imageCache[url]?.loaded || false;
  }, [imageCache]);

  const isImageLoading = useCallback((url: string) => {
    return loadingImages.has(url);
  }, [loadingImages]);

  // Preload initial images on mount
  useEffect(() => {
    if (imageUrls.length > 0) {
      preloadImages(0);
    }
  }, [imageUrls, preloadImages]);

  return {
    preloadImages,
    isImageCached,
    isImageLoading,
    cacheSize: Object.keys(imageCache).length
  };
}
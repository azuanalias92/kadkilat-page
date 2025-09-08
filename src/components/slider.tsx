"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Virtual } from "swiper/modules";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { useImagePreloader } from "../hooks/useImagePreloader";

// Import Swiper styles
import "swiper/css";
import "swiper/css/virtual";
import "../styles/slider.css";

interface SliderData {
  id: number;
  name: string;
  url: string;
  category?: string;
}

interface SliderProps {
  data: SliderData[];
}

export default function Slider({ data }: SliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageUrls = data.map(item => item.url);
  
  const { preloadImages, isImageCached, isImageLoading } = useImagePreloader(imageUrls, {
    preloadCount: 5,
    cacheSize: 25
  });
  
  const handleSlideChange = useCallback((swiper: any) => {
    const newIndex = swiper.activeIndex;
    setActiveIndex(newIndex);
    
    // Preload images around the current slide
    const preloadStart = Math.max(0, newIndex - 2);
    preloadImages(preloadStart);
  }, [preloadImages]);

  // Render slide content with optimized loading
  const renderSlide = useCallback((item: SliderData, index: number) => {
    const isActive = index === activeIndex;
    const isAdjacent = Math.abs(index - activeIndex) <= 2;
    const isCached = isImageCached(item.url);
    const isLoading = isImageLoading(item.url);
    
    return (
      <div className="flex flex-col h-full w-full">
        <div className="relative h-3/4 w-full">
          {isAdjacent ? (
            <>
              <Image 
                src={item.url} 
                alt={item.name} 
                fill
                className={`object-cover transition-opacity duration-300 ${
                  isCached ? 'opacity-100' : 'opacity-0'
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 3}
                loading={index < 3 ? "eager" : "lazy"}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                onLoad={() => {
                  // Image loaded successfully
                }}
              />
              {(isLoading || !isCached) && (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <div className="animate-pulse text-gray-500">
                    {isLoading ? 'Loading...' : 'Preparing...'}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-gray-500">Slide {index + 1}</div>
            </div>
          )}
        </div>
        <div className="flex text-5xl text-center h-1/4 items-center justify-center">
          <label>{item.name}</label>
        </div>
      </div>
    );
  }, [activeIndex, isImageCached, isImageLoading]);

  return (
    <Swiper 
      effect={"cards"} 
      grabCursor={true} 
      modules={[EffectCards, Virtual]} 
      className="mySwiper h-full w-full rounded-2xl"
      virtual={{
        enabled: true,
        addSlidesAfter: 2,
        addSlidesBefore: 2,
      }}
      onSlideChange={handleSlideChange}
      watchSlidesProgress={true}
    >
      {data.map((item, index) => (
        <SwiperSlide key={item.id} virtualIndex={index}>
          {renderSlide(item, index)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

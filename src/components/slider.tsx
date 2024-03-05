/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-async-client-component */
"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "../styles/slider.css";

export default async function Slider(props: any) {
  console.log("data slider", props.data);
  return (
    <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]} className="mySwiper h-full w-full rounded-2xl">
      {props.data.map((data: any, index: number) => {
        return (
          <SwiperSlide key={index}>
            <div className="flex flex-col h-full w-full">
              <img src={data.url} alt={data.name} className="object-fill h-3/4 w-full"/>
              <div className="flex text-5xl text-center h-1/4 items-center justify-center">
                <label>{data.name}</label>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

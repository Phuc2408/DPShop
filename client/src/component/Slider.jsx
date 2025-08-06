import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import '../index.css';

import ErnieBall from '../assets/banner/ErnieBall.webp'
import Ibanez from '../assets/banner/Ibanez.webp'
import Jackson from '../assets/banner/Jackson.webp'
import PRS from '../assets/banner/PRS.webp'

const slides = [
  {
    image: Ibanez, 
    brand: 'Ibanez'
  },
  {
    image: Jackson, 
    brand: 'Jackson'
  },
  {
    image: ErnieBall, 
    brand: 'Ernie Ball'
  },
  {
    image: PRS, 
    brand: 'PRS'
  }
];

export default function Slider() {
    return (
        <div className='relative w-full h-85'>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{ delay: 3000 }}
                className="h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={slide.image}
                            alt={slide.brand}
                            className="w-full h-full object-contain rounded-2xl"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
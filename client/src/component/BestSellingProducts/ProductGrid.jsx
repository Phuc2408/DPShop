import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
    return (
        <>
            <style>
                {`
                    .best-selling-swiper .swiper-button-prev,
                    .best-selling-swiper .swiper-button-next {
                        top: 45%; 
                        transform: translateY(-50%);
                        color: #333;
                        --swiper-navigation-size: 30px;
                    }
                `}
            </style>

            <div className="relative">
                <Swiper
                    modules={[Navigation]}
                    slidesPerView={4}
                    spaceBetween={24}
                    navigation
                    className="mySwiper best-selling-swiper h-full"
                >
                    {products.map(product => (
                        <SwiperSlide key={product.id}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Img1 from "../../assets/hero-carousel/img1.jpg";
import Img2 from "../../assets/hero-carousel/img2.jpg";
import Img3 from "../../assets/hero-carousel/img3.jpg";
import Img4 from "../../assets/hero-carousel/img4.jpg";

import "swiper/css";

import { Autoplay } from "swiper/modules";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:gap-14 gap-8">
      <div className="md:w-1/2 w-full text-center">
        <h1 className="md:text-5xl text-3xl font-bold md:leading-tight">
          Let's discuss it, Let's enjoy it.
        </h1>
        <p className="py-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci,
          enim sit, error, voluptate nisi earum exercitationem aliquam totam
          impedit fuga eaque. Et eveniet provident voluptatibus consectetur!
          Doloribus exercitationem enim qui.
        </p>
      </div>

      <div className="md:w-1/2 w-full mx-auto">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={Img1} alt="" className="w-full lg:[420px] sm:h-96 h-80" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img2} alt="" className="w-full lg:[420px] sm:h-96 h-80" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img3} alt="" className="w-full lg:[420px] sm:h-96 h-80" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img4} alt="" className="w-full lg:[420px] sm:h-96 h-80" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;

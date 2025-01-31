import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { testimonials } from '../assets/assets';

const TestimonialSlider = () => {
  return (
    <div className='w-full py-3 bg-gray-800 text-white'>
      <h2 className='text-center text-3xl font-bold mb-6'>
        What Our Users Say
      </h2>

      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className='w-11/12 mx-auto'
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className='p-4'>
            <div className='bg-gray-800 p-6 rounded-xl shadow-lg text-center'>
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className='w-20 h-20 rounded-full mx-auto mb-4 border-4 border-purple-400'
              />
              <h3 className='text-xl font-semibold'>{testimonial.name}</h3>
              <p className='text-purple-400'>{testimonial.role}</p>
              <p className='mt-2 text-gray-300 italic'>
                "{testimonial.review}"
              </p>
              <div className='mt-2'>{'⭐'.repeat(testimonial.rating)}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;

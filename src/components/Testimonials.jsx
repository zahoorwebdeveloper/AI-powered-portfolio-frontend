import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";

const testimonialsData = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Product Manager",
    feedback:
      "The project was completed on schedule, and the code quality was excellent. The AI integration added real value to our platform.",
    avatar:
      "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 2,
    name: "zaheer khan",
    role: "CEO and founder",
    feedback:
      "Professional, responsive, and highly skilled. Our website became faster, easier to maintain, and provided a much better user experience. Highly recommended!",
    avatar:
      "https://plus.unsplash.com/premium_photo-1661297460381-f75b8ae69a0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    name: "Catherine Jenkins",
    role: "senior developer",
    feedback:
      "Working with Zahoor was a smooth experience. He understood our requirements quickly, suggested better solutions, and delivered a fast, modern website.",
    avatar:
      "https://media.istockphoto.com/id/2248733996/photo/confident-businesswoman-smiling-showing-professionalism-and-success-in-a-modern-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=I17iWzbfuk4paAuAmxtpx7Tm_ZJ3av1DrKnWrdAQv68=",
  },
  {
    id: 4,
    name: "Gerald Garcia",
    role: "DevOps Engineer",
    feedback:
      "Our landing page looks fantastic and loads incredibly fast. The overall user experience improved significantly after the redesign.",
    avatar:
      "https://images.unsplash.com/photo-1624797432677-6f803a98acb3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fHww",
  },
  {
    id: 5,
    name: "Zachary Jones",
    role: "Sales Manager",
    feedback:
      " The AI chatbot integration saved our support team valuable time and provided an excellent experience for our users.",
    avatar:
      "https://images.unsplash.com/photo-1600878459138-e1123b37cb30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 6,
    name: "Betty Smith",
    role: "CEO",
    feedback:
      "From frontend animations to backend APIs, every aspect of the project was handled professionally. Highly impressed with the quality of work..",
    avatar:
      "https://media.istockphoto.com/id/2219635385/photo/smiling-professional-seated-at-a-desk-with-a-laptop-in-an-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=qgm64fuyQbQMktuqOOrvj2TKZQMdEl2WfWmTsJrytO4=",
  },
];

function Testimonials() {
  return (
    <div
      id="testimonials"
      className="relative my-12 sm:my-16 lg:my-[75px] flex flex-col items-center overflow-hidden px-4 sm:px-6"
    >
     
      <div
        className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-orange-400 blur-[100px] opacity-20 pointer-events-none"
        style={{ top: "10%" }}
      />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative flex flex-col items-center w-full max-w-md sm:max-w-lg md:max-w-2xl text-center"
      >
        <h1 className="text-3xl sm:text-4xl font-bold font-Outfit mb-3 sm:mb-4">
          Testimonials
        </h1>
        <p className="text-sm sm:text-base text-center text-gray-500">
          I believe great software is built through clear communication,
          transparency, and a genuine commitment to delivering results. Every
          project is an opportunity to create lasting value for clients by
          combining modern technologies with thoughtful problem-solving. Here
          are a few experiences shared by people I've worked with, reflecting
          the quality, professionalism, and dedication I bring to every
          collaboration.
        </p>
      </motion.div>

      
      <div className="relative mt-8 sm:mt-10 w-full max-w-[300px] xs:max-w-[340px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[500px]">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards, Pagination]}
          pagination={{ clickable: true }}
          className="mySwiper overflow-visible pb-10"
        >
          {testimonialsData.map((item) => (
            <SwiperSlide key={item.id} className="rounded-2xl shadow-xl">
              <div className="flex h-72 sm:h-80 md:h-96 flex-col justify-between border border-gray-100 bg-white p-6 sm:p-7 md:p-8 rounded-2xl">
                {/* Quotation Icon */}
                <span className="text-4xl sm:text-5xl font-serif text-[#FD6F00] leading-none">
                  &ldquo;
                </span>

                {/* Testimonial Feedback Text */}
                <p className="text-gray-600 italic leading-relaxed text-sm sm:text-base line-clamp-5 sm:line-clamp-none">
                  {item.feedback}
                </p>

                
                <div className="mt-4 sm:mt-6 flex items-center gap-3 sm:gap-4 border-t border-gray-100 pt-3 sm:pt-4">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border-2 border-[#FD6F00] shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Testimonials;

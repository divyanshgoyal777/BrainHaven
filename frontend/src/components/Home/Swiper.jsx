import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FeaturedRoadmaps = () => {
  return (
    <section className="featured-roadmaps my-24 flex flex-col justify-center items-center text-center w-full px-4">
      <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 bg-gradient-to-r from-cyan-300 via-purple-400 to-indigo-500 text-transparent bg-clip-text drop-shadow-lg">
        Featured Roadmaps 🚀
      </h2>
      <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mb-8">
        Explore hand-picked roadmaps that will guide you step-by-step through
        your coding journey.
      </p>

      <div className="relative w-full max-w-6xl">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          spaceBetween={20}
          loop={true}
          centeredSlides={true}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5 },
            1280: { slidesPerView: 3 },
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          effect="coverflow"
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 120,
            modifier: 1.1,
            slideShadows: true,
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
        >
          {[
            {
              title: "Full-Stack Web Development",
              description:
                "Master the MERN stack with this structured roadmap.",
              link: "/roadmaps/full-stack-development",
              bg: "from-indigo-500 to-purple-700",
            },
            {
              title: "DevOps",
              description: "Optimize and automate workflows with DevOps tools.",
              link: "/roadmaps/devops",
              bg: "from-gray-700 to-gray-900",
            },
            {
              title: "Data Structures & Algorithms",
              description: "Ace coding interviews with this roadmap.",
              link: "/roadmaps/data-structures-and-algorithms",
              bg: "from-green-500 to-teal-700",
            },
            {
              title: "AI and Machine Learning",
              description: "Start your journey into AI and ML.",
              link: "/roadmaps/ai-and-machine-learning",
              bg: "from-purple-500 to-pink-600",
            },
            {
              title: "Cybersecurity",
              description: "Protect systems with this cybersecurity roadmap.",
              link: "/roadmaps/cybersecurity",
              bg: "from-gray-900 to-red-700",
            },
            {
              title: "Blockchain Development",
              description: "Learn to build secure decentralized apps.",
              link: "/roadmaps/blockchain",
              bg: "from-yellow-500 to-amber-700",
            },
          ].map((roadmap, index) => (
            <SwiperSlide key={index}>
              <div
                className={`p-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br ${roadmap.bg} text-white border border-white/20 relative overflow-hidden`}
              >
                <h3 className="text-2xl font-bold mb-4">{roadmap.title}</h3>
                <p className="text-gray-200">{roadmap.description}</p>
                <Link to={roadmap.link}>
                  <button className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all transform hover:scale-105 shadow-md">
                    View Roadmap
                  </button>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="custom-prev absolute top-1/2 left-2 md:-left-10 transform -translate-y-1/2 text-white text-3xl md:text-4xl bg-black bg-opacity-50 p-3 md:p-4 rounded-full hover:bg-opacity-70 transition-all shadow-lg z-10">
          <FaArrowLeft />
        </button>
        <button className="custom-next absolute top-1/2 right-2 md:-right-10 transform -translate-y-1/2 text-white text-3xl md:text-4xl bg-black bg-opacity-50 p-3 md:p-4 rounded-full hover:bg-opacity-70 transition-all shadow-lg z-10">
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default FeaturedRoadmaps;

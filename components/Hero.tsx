import React, { useState, useEffect } from 'react';
import { TranslationContent } from '../types';
import { ChevronLeft, ChevronRight, Users, GraduationCap, School, Heart } from 'lucide-react';

interface HeroProps {
  t: TranslationContent;
}

const carouselImages = [
  {
    url: '/assets/images/carousel1.jpg',
    title: 'Empowering Students',
    subtitle: 'Building bright futures through quality education'
  },
  {
    url: '/assets/images/carousel2.jpg',
    title: 'Dedicated Teachers',
    subtitle: 'Guiding the next generation with passion'
  },
  {
    url: '/assets/images/carousel3.jpg',
    title: 'Engaged Parents',
    subtitle: 'Partners in every child\'s educational journey'
  }
];

const Hero: React.FC<HeroProps> = ({ t }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % carouselImages.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + carouselImages.length) % carouselImages.length);

  const stats = [
    { num: '50K+', label: 'Schools', icon: School },
    { num: '1M+', label: 'Parents', icon: Users },
    { num: '2M+', label: 'Students', icon: GraduationCap },
    { num: '100%', label: 'Commitment', icon: Heart }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-24 md:pt-32 md:pb-32 overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0 z-0">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover scale-105"
            />
          </div>
        ))}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent"></div>
      </div>

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-8 top-1/3 md:top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} className="md:w-6 md:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-8 top-1/3 md:top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={20} className="md:w-6 md:h-6" />
      </button>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            {/* Slide Info Badge */}
            <div className="inline-flex items-center gap-2 mb-6 bg-tn-green/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold border border-tn-green/30">
              <span className="w-2 h-2 bg-tn-green rounded-full animate-pulse"></span>
              {carouselImages[currentSlide].title}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              {t.title}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl font-medium text-tn-yellow mb-3 md:mb-4">
              {t.tagline}
            </p>

            <p className="text-base md:text-lg text-gray-300 mb-6 md:mb-8 max-w-xl leading-relaxed">
              {t.intro}
            </p>

            {/* Carousel Indicators */}
            <div className="flex items-center gap-3">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 ${index === currentSlide
                    ? 'w-8 h-2 bg-tn-green rounded-full'
                    : 'w-2 h-2 bg-white/40 rounded-full hover:bg-white/60'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Stats Grid - Desktop */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
                >
                  <stat.icon className="w-8 h-8 text-tn-yellow mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-4xl font-bold text-white mb-1">{stat.num}</h3>
                  <p className="text-sm font-medium text-gray-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 mb-16 lg:hidden">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/15 backdrop-blur-md p-4 rounded-xl text-center border border-white/20">
              <stat.icon className="w-6 h-6 text-tn-yellow mx-auto mb-2" />
              <h3 className="text-2xl sm:text-xl font-bold text-white">{stat.num}</h3>
              <p className="text-xs text-gray-300 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg
          className="relative block w-full h-[60px] md:h-[100px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
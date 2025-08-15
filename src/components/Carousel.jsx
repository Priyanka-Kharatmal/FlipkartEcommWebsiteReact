import React, { useState, useEffect } from "react";
import localImg1 from "../img/img1.jpg";

const images = [
  { src: localImg1, interval: 3000 },
  { src: "https://as1.ftcdn.net/jpg/03/96/22/30/1000_F_396223022_FTKz5R48RubhaMjUhE4wsibA5lde47sA.jpg", interval: 2000 },
  { src: "https://st2.depositphotos.com/1001877/7590/i/450/depositphotos_75904895-stock-photo-home-appliances-gas-cooker-tv.jpg", interval: 5000 }
];

export default function TailwindCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, images[currentIndex].interval);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full  mx-auto overflow-hidden rounded-lg shadow-lg">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img.src}
            alt={`Slide ${idx + 1}`}
            className="w-full flex-shrink-0"
          />
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
      >
        ❯
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}


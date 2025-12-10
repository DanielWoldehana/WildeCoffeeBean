"use client";

import { useState, useEffect } from "react";
import Lottie from "lottie-react";

export default function LoadingSpinner({ message = "Loading...", className = "" }) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Load CoffeeLoading animation
    fetch("/animations/CoffeeLoading.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.text();
      })
      .then((text) => {
        try {
          const data = JSON.parse(text);
          setAnimationData(data);
        } catch (parseError) {
          console.error("Failed to parse CoffeeLoading Lottie JSON:", parseError);
        }
      })
      .catch((err) => console.error("Failed to load CoffeeLoading Lottie animation:", err));
  }, []);

  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          {animationData ? (
            <div className="h-16 w-16 sm:h-20 sm:w-20">
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="h-16 w-16 sm:h-20 sm:w-20 animate-spin rounded-full border-4 border-solid border-[var(--lime-green)] border-r-transparent"></div>
          )}
        </div>
        <p className="text-[var(--coffee-brown)]">{message}</p>
      </div>
    </div>
  );
}


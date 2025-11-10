"use client";
import { useEffect, useState } from "react";

interface AnimatedHeroTextProps {
  staticText: string;
  rotatingWords: string[];
  endingText?: string;
  className?: string;
}

export default function AnimatedHeroText({ staticText, rotatingWords, endingText, className = "" }: AnimatedHeroTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  return (
    <h1 className={className}>
      {staticText}{" "}
      <span
        className={`inline-block transition-all duration-500 ${
          isAnimating ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
        }`}
        style={{
          background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {rotatingWords[currentWordIndex]}
      </span>
      {endingText && <span className="font-bold"> {endingText}</span>}
    </h1>
  );
}

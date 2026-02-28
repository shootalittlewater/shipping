"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const carouselSlides = [
  {
    id: 1,
    title: "Welcome to Our Platform",
    description: "Experience the future of data visualization and analytics",
    image: "🚀",
    gradient: "from-purple-600 via-pink-600 to-orange-600",
    bgGradient: "from-purple-50 via-pink-50 to-orange-50",
  },
  {
    id: 2,
    title: "Powerful Analytics",
    description: "Transform your data into actionable insights with beautiful charts",
    image: "📊",
    gradient: "from-blue-600 via-cyan-600 to-teal-600",
    bgGradient: "from-blue-50 via-cyan-50 to-teal-50",
  },
  {
    id: 3,
    title: "Real-Time Updates",
    description: "Stay connected with live data synchronization and instant updates",
    image: "⚡",
    gradient: "from-green-600 via-emerald-600 to-lime-600",
    bgGradient: "from-green-50 via-emerald-50 to-lime-50",
  },
  {
    id: 4,
    title: "Seamless Integration",
    description: "Connect all your tools in one unified dashboard experience",
    image: "🔗",
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
    bgGradient: "from-indigo-50 via-purple-50 to-pink-50",
  },
];

const features = [
  { icon: "📈", title: "Advanced Charts", description: "Beautiful data visualizations" },
  { icon: "🎨", title: "Custom Themes", description: "Personalize your experience" },
  { icon: "⚙️", title: "Easy Setup", description: "Get started in minutes" },
  { icon: "🔒", title: "Secure", description: "Enterprise-grade security" },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState<"left" | "right">("right");

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying]);

  const nextSlide = () => {
    setDirection("right");
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setDirection("left");
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? "right" : "left");
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <NavigationMenu>
              <NavigationMenuList className="gap-6">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#"
                    className="text-sm font-medium hover:text-purple-600 transition-colors"
                  >
                    Dashboard
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#"
                    className="text-sm font-medium hover:text-purple-600 transition-colors"
                  >
                    Analytics
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#"
                    className="text-sm font-medium hover:text-purple-600 transition-colors"
                  >
                    Hash
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#"
                    className="text-sm font-medium hover:text-purple-600 transition-colors"
                  >
                    Settings
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section with Carousel */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            Component Integration
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            Mixing overlays, menus, and navigation in a single view.
          </p>

          {/* Carousel */}
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Slides Container */}
            <div className="relative h-[500px]">
              {carouselSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === currentSlide
                      ? "opacity-100 translate-x-0 scale-100"
                      : index < currentSlide
                      ? "opacity-0 -translate-x-full scale-95"
                      : "opacity-0 translate-x-full scale-95"
                  }`}
                >
                  <div
                    className={`h-full bg-gradient-to-br ${slide.bgGradient} dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-12`}
                  >
                    <div className="text-center space-y-6 max-w-3xl">
                      <div className="text-9xl mb-6 animate-bounce">{slide.image}</div>
                      <h2
                        className={`text-6xl font-bold bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent`}
                      >
                        {slide.title}
                      </h2>
                      <p className="text-2xl text-gray-700 dark:text-gray-300">
                        {slide.description}
                      </p>
                      <div className="flex gap-4 justify-center pt-6">
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
                          Get Started
                        </Button>
                        <Button
                          variant="outline"
                          className="px-8 py-6 text-lg rounded-full hover:scale-105 transition-all"
                        >
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 rounded-full p-4 shadow-lg transition-all hover:scale-110 group"
              aria-label="Previous slide"
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white group-hover:text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 rounded-full p-4 shadow-lg transition-all hover:scale-110 group"
              aria-label="Next slide"
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white group-hover:text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide
                      ? "w-12 h-3 bg-purple-600"
                      : "w-3 h-3 bg-gray-400 hover:bg-gray-600"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200/50">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
                style={{
                  width: `${((currentSlide + 1) / carouselSlides.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* User Actions Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            User Actions
          </h2>
          <div className="flex gap-4 justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-6 py-3">
                  Open Action Dialog
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Action Dialog</DialogTitle>
                  <DialogDescription>
                    This is where you can perform various actions on your account.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Button className="w-full" variant="outline">
                    Action 1
                  </Button>
                  <Button className="w-full" variant="outline">
                    Action 2
                  </Button>
                  <Button className="w-full" variant="outline">
                    Action 3
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" className="px-6 py-3">
              View Quick Info
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
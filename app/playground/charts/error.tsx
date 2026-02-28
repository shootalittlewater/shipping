"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-950 dark:to-orange-950 p-8 overflow-hidden relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-red-400/20 dark:bg-red-600/20"
            style={{
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div
        className={`max-w-2xl text-center space-y-8 relative z-10 transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Glitch effect error icon */}
        <div className="relative inline-block">
          <div className="text-9xl animate-bounce">⚠️</div>
          <div className="absolute inset-0 text-9xl animate-pulse opacity-50">
            ⚠️
          </div>
        </div>

        {/* Glitch text effect */}
        <div className="relative">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent animate-pulse">
            Something went wrong!
          </h1>
          <h1
            className="absolute inset-0 text-6xl font-bold text-red-600 opacity-20"
            style={{
              animation: "glitch 1s linear infinite",
            }}
          >
            Fuck!
          </h1>
        </div>

        <p className="text-xl text-gray-700 dark:text-gray-300 animate-fade-in">
          What a load of bollocks, innit? ☕
        </p>

        {/* Error details card with glassmorphism */}
        <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg p-6 text-sm text-left shadow-2xl hover:shadow-red-500/20 transition-all duration-300 hover:scale-105">
          <div className="font-mono text-red-700 dark:text-red-400 break-all">
            <span className="text-gray-600 dark:text-gray-400">Error: </span>
            {error.message}
          </div>
          {error.digest && (
            <div className="mt-2 text-gray-500 dark:text-gray-500 font-mono text-xs">
              Digest: {error.digest}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <Button
            variant="outline"
            onClick={() => reset()}
            className="group relative overflow-hidden bg-white dark:bg-gray-800 hover:scale-110 transition-transform duration-300"
          >
            <span className="relative z-10">🔄 Try again</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity" />
          </Button>

          <Button
            variant="default"
            asChild
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-red-500/50"
          >
            <a href="/">🏠 Fuck Off</a>
          </Button>
        </div>

        {/* Fun error codes */}
        <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1 animate-fade-in-delay">
          <p>Error Code: {Math.floor(Math.random() * 1000) + 1000}</p>
          <p className="italic">
            "{getRandomErrorQuote()}"
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out 0.3s both;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.6s both;
        }
      `}</style>
    </div>
  );
}

function getRandomErrorQuote() {
  const quotes = [
    "It's not a bug, it's an unexpected feature!",
    "404: Humor not found",
    "Error: Coffee levels critically low",
    "This page is on a coffee break",
    "We're experiencing technical difficulties... aka Tuesday",
    "Houston, we have a problem",
    "Ctrl+Z didn't work this time",
    "The hamsters powering our servers are taking a nap",
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}
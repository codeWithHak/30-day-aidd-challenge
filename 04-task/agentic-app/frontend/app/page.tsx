'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Storyboard } from "@/components/Storyboard";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main 
      ref={containerRef}
      className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-start"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-black" />
      
      {/* Animated light orb that follows cursor */}
      <div
        className="absolute w-96 h-96 bg-gray-500/10 blur-3xl pointer-events-none transition-transform duration-200"
        style={{
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
        }}
      />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(107, 114, 128, 0.05) 25%, rgba(107, 114, 128, 0.05) 26%, transparent 27%, transparent 74%, rgba(107, 114, 128, 0.05) 75%, rgba(107, 114, 128, 0.05) 76%, transparent 77%, transparent),
                          linear-gradient(90deg, transparent 24%, rgba(107, 114, 128, 0.05) 25%, rgba(107, 114, 128, 0.05) 26%, transparent 27%, transparent 74%, rgba(107, 114, 128, 0.05) 75%, rgba(107, 114, 128, 0.05) 76%, transparent 77%, transparent)`,
        backgroundSize: '50px 50px'
      }} />

      <Navbar />

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 mt-24 px-4">
        {/* Badge */}
        {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 animate-fade-in">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-300 tracking-wide">AI-POWERED QUIZ GENERATION</span>
        </div> */}

        {/* Main headline */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight animate-slide-up">            
            The Quiz Generator Your <span className="text-gray-300">
              Teacher
            </span> Uses
            <br />
            
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto animate-slide-up-delay">
            Get AI Generated Quizzes from Any PDF or Text within Seconds
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12 animate-slide-up-delay-2">
          <Link href="/pdf-to-quiz">
            <Button 
              className="group relative px-8 py-3 bg-white hover:bg-gray-100 text-black font-semibold text-lg border-0 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/50"
            >
              <span className="flex items-center gap-2">
                Generate Quiz
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Storyboard Section */}
      <div className="relative z-10 w-full mt-12 border-t border-gray-800/50 bg-black/50 backdrop-blur-sm">
        <Storyboard />
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
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

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-slide-up-delay {
          animation: slide-up 0.8s ease-out 0.1s both;
        }

        .animate-slide-up-delay-2 {
          animation: slide-up 0.8s ease-out 0.2s both;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.3s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s both;
        }

        .animate-slide-down {
          animation: slide-down 1.5s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
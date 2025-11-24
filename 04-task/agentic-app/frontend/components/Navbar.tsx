'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative z-20 w-full max-w-6xl mx-auto flex justify-between items-center py-6 px-8">
      <div className="flex items-center gap-2 group">
        <span className="text-xl font-bold tracking-tight text-white">QUIZLER</span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-1">
        <Link href="/pdf-to-quiz">
          <Button 
            variant="ghost" 
            className="text-gray-300 hover:text-white hover:bg-gray-800/50 bg-transparent border-0 transition-all duration-300"
          >
            PDF to Quiz
          </Button>
        </Link>
        <Link href="/text-to-quiz">
          <Button 
            variant="ghost" 
            className="text-gray-300 hover:text-white hover:bg-gray-800/50 bg-transparent border-0 transition-all duration-300"
          >
            Text to Quiz
          </Button>
        </Link>
        <Link href="/pdf-to-text">
          <Button 
            variant="ghost" 
            className="text-gray-300 hover:text-white hover:bg-gray-800/50 bg-transparent border-0 transition-all duration-300"
          >
            PDF to Text
          </Button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-300 hover:text-white hover:bg-gray-800/50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 z-50 bg-black/95 border-b border-gray-800 p-4 md:hidden flex flex-col gap-2 animate-in slide-in-from-top-2">
          <Link href="/pdf-to-quiz" onClick={() => setIsMenuOpen(false)}>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50"
            >
              PDF to Quiz
            </Button>
          </Link>
          <Link href="/text-to-quiz" onClick={() => setIsMenuOpen(false)}>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50"
            >
              Text to Quiz
            </Button>
          </Link>
          <Link href="/pdf-to-text" onClick={() => setIsMenuOpen(false)}>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50"
            >
              PDF to Text
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}

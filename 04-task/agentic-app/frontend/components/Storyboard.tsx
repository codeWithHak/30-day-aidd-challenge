'use client';

import { ArrowRight, FileText, FileType, BrainCircuit, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Storyboard() {
  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4">
      {/* Main Container with Whitish/Grayish Background */}
      <div className="relative bg-gray-100 rounded-xl p-8 md:p-12 overflow-hidden border border-white/50 shadow-2xl">
        
        {/* Subtle Background Pattern for the Container */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Connecting Line - Aligned with Cards (p-12 = 3rem, h-80/2 = 10rem -> top = 13rem = top-52) */}
        <div className="absolute top-52 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent hidden md:block" />

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {/* Step 1: PDF */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative group perspective-1000">
              {/* Card Shadow/Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-400 to-gray-300 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500" />
              
              {/* Dark Card - Sharper Corners */}
              <div className="w-64 h-80 bg-gray-900 rounded-lg p-6 flex flex-col items-center justify-center relative overflow-hidden border border-gray-800 shadow-xl transition-all duration-500 transform group-hover:-translate-y-2 group-hover:rotate-x-2">
                
                <div className="relative z-10 flex flex-col items-center w-full">
                  <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center mb-8 shadow-inner border border-gray-700 group-hover:border-blue-500/30 transition-colors duration-500">
                    <FileType className="w-10 h-10 text-blue-400" strokeWidth={1.5} />
                  </div>
                  
                  <div className="w-full space-y-3">
                    <div className="h-1.5 bg-gray-800 rounded-full w-3/4 mx-auto overflow-hidden">
                      <div className="h-full bg-blue-500/50 w-1/2 animate-[shimmer_2s_infinite]" />
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full w-1/2 mx-auto" />
                    <div className="h-1.5 bg-gray-800 rounded-full w-2/3 mx-auto" />
                  </div>
                </div>

                <div className="absolute bottom-6 flex items-center gap-2 text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-950/30 px-3 py-1 rounded-full border border-blue-500/20">
                  <Sparkles className="w-3 h-3" />
                  Input Source
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2 text-gray-900">Upload PDF</h3>
              <p className="text-gray-500 text-sm">Drag & drop your study material</p>
            </div>
          </motion.div>

          {/* Arrow 1 - Aligned with Cards */}
          <div className="hidden md:flex items-center justify-center absolute left-[28%] top-52 -translate-y-1/2 z-20">
            {/* <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 shadow-lg">
              <ArrowRight className="w-5 h-5" />
            </div> */}
          </div>

          {/* Step 2: Text Extraction */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative group perspective-1000">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-400 to-gray-300 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500" />
              
              {/* Dark Card - Sharper Corners */}
              <div className="w-64 h-80 bg-gray-900 rounded-lg p-6 flex flex-col relative overflow-hidden border border-gray-800 shadow-xl transition-all duration-500 transform group-hover:-translate-y-2 group-hover:rotate-x-2">
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8 border-b border-gray-800 pb-4">
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
                      <FileText className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Processing</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="h-1.5 bg-gray-800 rounded-full w-full" />
                      <div className="h-1.5 bg-gray-800 rounded-full w-5/6" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-1.5 bg-purple-500/20 rounded-full w-full animate-pulse" />
                      <div className="h-1.5 bg-purple-500/20 rounded-full w-4/5 animate-pulse" style={{ animationDelay: '150ms' }} />
                    </div>
                    <div className="space-y-2">
                      <div className="h-1.5 bg-gray-800 rounded-full w-11/12" />
                    </div>
                  </div>

                  <div className="mt-auto flex gap-2 justify-end">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" />
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '100ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '200ms' }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2 text-gray-900">AI Analysis</h3>
              <p className="text-gray-500 text-sm">Smart text extraction & processing</p>
            </div>
          </motion.div>

          {/* Arrow 2 - Aligned with Cards */}
          <div className="hidden md:flex items-center justify-center absolute right-[28%] top-52 -translate-y-1/2 z-20">
            {/* <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 shadow-lg">
              <BrainCircuit className="w-5 h-5" />
            </div> */}
          </div>

          {/* Step 3: Quiz */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative group perspective-1000">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-400 to-gray-300 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500" />
              
              {/* Dark Card - Sharper Corners */}
              <div className="w-64 h-80 bg-gray-900 rounded-lg p-6 flex flex-col relative overflow-hidden border border-gray-800 shadow-xl transition-all duration-500 transform group-hover:-translate-y-2 group-hover:rotate-x-2">
                
                <div className="relative z-10">
                  <div className="mb-6">
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/30 px-2 py-1 rounded-full uppercase tracking-wider border border-emerald-500/20">Question 1/10</span>
                    <h4 className="text-sm font-bold mt-4 text-gray-200 leading-snug">What is the powerhouse of the cell?</h4>
                  </div>
                  
                  <div className="space-y-2.5">
                    <div className="p-2.5 rounded-lg border border-gray-700 bg-gray-800/50 text-xs text-gray-400 flex items-center gap-3 hover:bg-gray-800 transition-colors cursor-pointer">
                      <div className="w-3 h-3 rounded-full border border-gray-600" />
                      <span>Nucleus</span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-xs text-white flex items-center gap-3 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span className="font-medium">Mitochondria</span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-gray-700 bg-gray-800/50 text-xs text-gray-400 flex items-center gap-3 hover:bg-gray-800 transition-colors cursor-pointer">
                      <div className="w-3 h-3 rounded-full border border-gray-600" />
                      <span>Ribosome</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2 text-gray-900">Ready to Quiz</h3>
              <p className="text-gray-500 text-sm">Interactive study session</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

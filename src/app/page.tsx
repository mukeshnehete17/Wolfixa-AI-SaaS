"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Target, Zap } from "lucide-react";
import { useState } from "react";

export default function LandingPage() {
  const [isNavigating, setIsNavigating] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black flex flex-col font-sans">
      
      {/* Top Navigation Bar */}
      <nav className="absolute top-0 w-full p-6 z-50 flex items-center justify-between max-w-7xl mx-auto left-0 right-0">
        <Link href="/dashboard" className="flex items-center gap-3 group transition-transform active:scale-95">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#6C3BEA] to-[#9D72FF] shadow-xl group-hover:shadow-xl transition-all">
            <span className="text-xl font-bold tracking-tighter text-white">W</span>
          </div>
          <span className="text-2xl font-heading font-bold tracking-tight text-white">Wolfixa AI</span>
        </Link>
        <Link href="/login">
          <button className="text-sm font-medium text-white/70 hover:text-white transition-colors">Log In</button>
        </Link>
      </nav>

      {/* Background Glows (optimized) */}
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-white/5 blur-[150px] rounded-full pointer-events-none" style={{ willChange: 'transform' }} />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-white/5 blur-[150px] rounded-full pointer-events-none" style={{ willChange: 'transform' }} />
      
      <div className="absolute inset-0 bg-black opacity-5 mix-blend-overlay pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col flex-1 items-center justify-center min-h-screen pt-20">
        
        {/* Trusted Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-sm text-white/80"
        >
          <span className="flex h-2 w-2 rounded-full bg-black animate-pulse"></span>
          Trusted by 500+ growing businesses
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 mb-6 font-heading leading-tight">
            Reach the Right <br className="hidden md:block"/> Customers with <span className="text-gradient-primary">AI</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            Wolfixa AI — Marketing Engine for Smart Growth. Stop guessing and start converting with data-driven AI campaigns.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="w-full sm:w-auto" onClick={() => setIsNavigating(true)}>
              <button disabled={isNavigating} className="w-full sm:w-auto min-w-[240px] glow-button bg-gradient-to-r from-[#6C3BEA] to-[#804dfa] text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-2 shadow-xl disabled:opacity-80">
                {isNavigating ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Start Growing with AI 🚀
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <button disabled={isNavigating} className="w-full sm:w-auto min-w-[240px] glass hover:bg-white/10 text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 active:scale-95">
                See Live AI Dashboard
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Floating UI Mockups (Simplified animations for performance) */}
        <div className="relative w-full mt-24 mb-10 h-[300px] sm:h-[400px] flex justify-center items-center perspective-1000">
          
          {/* Main Dashboard Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute z-20 w-[90%] max-w-3xl glass-card border border-white/10 p-6 rounded-2xl shadow-2xl bg-white/5 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-sm font-medium text-white/50 font-mono">Campaign Performance</div>
            </div>
            {/* Fake Chart Lines */}
            <div className="h-32 flex items-end gap-2 justify-between px-2">
              {[40, 70, 45, 90, 65, 110, 85, 120].map((h, i) => (
                <div 
                  key={i}
                  style={{ height: `${h}px` }}
                  className="w-full bg-gradient-to-t from-[#6C3BEA]/20 to-[#6C3BEA] rounded-t-sm"
                ></div>
              ))}
            </div>
          </motion.div>

          {/* Floating Element 1 (Static but lifted for performance) */}
          <div className="absolute z-30 left-[5%] md:left-[15%] top-[-10%] glass-card p-4 flex items-center gap-4 transform -translate-y-2">
            <div className="p-3 bg-white/5 rounded-lg text-[#9D72FF]">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">AI Segmentation</div>
              <div className="text-xs text-white/50">+24% CTR increase</div>
            </div>
          </div>

          {/* Floating Element 2 */}
          <div className="absolute z-30 right-[5%] md:right-[15%] bottom-[-15%] glass-card p-4 flex items-center gap-4 transform translate-y-2">
            <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Campaign Engine</div>
              <div className="text-xs text-white/50">Auto-optimized daily</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BarChart3, Target, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0B0F] flex flex-col items-center justify-center">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#6C3BEA]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#9D72FF]/20 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Optional Noise Texture (simulate with simple css or keep clean) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 flex flex-col pt-32 lg:pt-40 items-center justify-center min-h-[90vh]">
        
        {/* Trusted Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-sm text-white/80"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#6C3BEA] animate-pulse"></span>
          Trusted by 500+ growing businesses
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 mb-6 font-heading leading-tight">
            Reach the Right <br className="hidden md:block"/> Customers with <span className="text-gradient-primary">AI</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            Wolfixa AI — Marketing Engine for Smart Growth. Stop guessing and start converting with data-driven AI campaigns.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="w-full sm:w-auto">
              <button className="w-full glow-button bg-gradient-to-r from-[#6C3BEA] to-[#804dfa] text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(108,59,234,0.4)]">
                Start Growing with AI 🚀
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <button className="w-full glass hover:bg-white/10 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300">
                See Live AI Dashboard
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Floating UI Mockups to simulate the product */}
        <div className="relative w-full mt-24 mb-10 h-[300px] sm:h-[400px] flex justify-center items-center perspective-1000">
          
          {/* Main Dashboard Card */}
          <motion.div 
            initial={{ opacity: 0, y: 100, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="absolute z-20 w-[90%] max-w-3xl glass-card border border-white/10 p-6 rounded-2xl shadow-2xl bg-[#12121A]/80 backdrop-blur-xl"
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
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}px` }}
                  transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                  className="w-full bg-gradient-to-t from-[#6C3BEA]/20 to-[#6C3BEA] rounded-t-sm"
                ></motion.div>
              ))}
            </div>
          </motion.div>

          {/* Floating Element 1 */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-30 left-[5%] md:left-[15%] top-[-10%] glass-card p-4 flex items-center gap-4"
          >
            <div className="p-3 bg-[#6C3BEA]/20 rounded-lg text-[#9D72FF]">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">AI Segmentation</div>
              <div className="text-xs text-white/50">+24% CTR increase</div>
            </div>
          </motion.div>

          {/* Floating Element 2 */}
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute z-30 right-[5%] md:right-[15%] bottom-[-15%] glass-card p-4 flex items-center gap-4"
          >
            <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Campaign Engine</div>
              <div className="text-xs text-white/50">Auto-optimized daily</div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
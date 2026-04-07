"use client";

import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function LoginPage() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // Automatically redirects to the origin/dashboard in local or prod
        redirectTo: `${window.location.origin}/dashboard`
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-[#0B0B0F] font-sans">
      
      {/* LEFT PANEL - Branding & Visuals (Hidden on small screens) */}
      <div className="relative hidden lg:flex flex-1 flex-col justify-between overflow-hidden bg-gradient-to-br from-[#1A0B2E] via-[#0B0B0F] to-[#2D1B54] p-12 text-white">
        {/* Animated Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#6C3BEA]/30 blur-[140px] rounded-full mix-blend-screen pointer-events-none animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#9D72FF]/20 blur-[140px] rounded-full mix-blend-screen pointer-events-none animate-blob animation-delay-2000" />
        
        {/* Top Logo Area */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#6C3BEA] to-[#9D72FF] shadow-[0_0_20px_rgba(108,59,234,0.5)]">
            <span className="text-xl font-bold tracking-tighter text-white">W</span>
          </div>
          <span className="text-2xl font-heading font-bold tracking-tight">Wolfixa AI</span>
        </div>

        {/* Center Motivation */}
        <div className="relative z-10 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="mb-6 text-4xl font-heading font-bold leading-tight">
              Let’s launch your first <br/>
              <span className="text-gradient-primary">AI-powered campaign 🚀</span>
            </h1>
            <p className="text-lg text-white/60">
              Welcome to the future of data-driven marketing. Join top startups scaling their growth unconditionally.
            </p>
          </motion.div>
          
          {/* Floating UI Element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 glass-card p-6 border-white/10"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex justify-center items-center">
                <span className="text-white font-bold opacity-90">↑ 34%</span>
              </div>
              <div>
                <div className="text-sm font-medium text-white/80">Average conversion boost</div>
                <div className="text-xs text-white/50">in the first 30 days</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Credits */}
        <div className="relative z-10 text-sm text-white/40">
          © {new Date().getFullYear()} Wolfixa AI. All rights reserved.
        </div>
      </div>

      {/* RIGHT PANEL - Authentication */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:px-24 border-l border-white/5 relative bg-[#0B0B0F]/95">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-full max-w-sm relative z-10"
        >
          {/* Mobile Logo Logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#6C3BEA] to-[#9D72FF] shadow-[0_0_20px_rgba(108,59,234,0.5)]">
              <span className="text-xl font-bold tracking-tighter text-white">W</span>
            </div>
            <span className="text-2xl font-heading font-bold text-white tracking-tight">Wolfixa AI</span>
          </div>

          <div className="text-center lg:text-left mb-8">
            <h2 className="text-3xl font-heading font-extrabold text-white mb-2 tracking-tight">Welcome back</h2>
            <p className="text-white/60">Your growth journey continues here.</p>
          </div>

          <div className="mt-10">
            <button
              disabled={isLoading}
              onClick={handleGoogleLogin}
              className="group relative flex w-full justify-center items-center gap-3 rounded-xl bg-white px-4 py-3.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" />
              ) : (
                <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                  <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                  <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                  <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                </svg>
              )}
              <span>Continue with Google</span>
              <span className="absolute right-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                →
              </span>
            </button>
            
            <p className="mt-8 text-center text-xs text-white/40">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
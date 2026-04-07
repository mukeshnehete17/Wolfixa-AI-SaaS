"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Target, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut,
  Sparkles
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Campaigns", href: "/campaigns", icon: Target },
  { name: "Insights", href: "/insights", icon: BarChart3 },
  { name: "Segments", href: "/segments", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#0B0B0F] overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <nav className="w-64 flex-shrink-0 flex flex-col border-r border-white/5 bg-[#0B0B0F]/50 backdrop-blur-3xl relative z-20">
        
        {/* LOGO */}
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#6C3BEA] to-[#9D72FF] shadow-[0_0_15px_rgba(108,59,234,0.4)]">
              <span className="text-sm font-bold tracking-tighter text-white">W</span>
            </div>
            <span className="text-xl font-heading font-bold text-white tracking-tight">Wolfixa AI</span>
          </Link>
        </div>

        {/* NAV LINKS */}
        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link key={item.name} href={item.href}>
                <div className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 active:scale-95 group ${isActive ? 'text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                  
                  {/* Active Indicator Glow */}
                  {isActive && (
                    <div className="absolute inset-0 bg-[#6C3BEA]/10 rounded-xl" />
                  )}
                  {isActive && (
                    <div className="absolute left-0 w-1 h-5 bg-[#9D72FF] rounded-r-full shadow-[0_0_10px_#9D72FF]"></div>
                  )}

                  <item.icon className="w-5 h-5 relative z-10" />
                  <span className="relative z-10 font-medium text-sm">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* PRO UPGRADE CARD */}
        <div className="p-4">
          <div className="relative overflow-hidden rounded-xl p-4 border border-[#6C3BEA]/30 bg-gradient-to-br from-[#6C3BEA]/10 to-transparent">
            <div className="absolute top-[-20%] right-[-20%] w-20 h-20 bg-[#9D72FF]/30 blur-xl rounded-full"></div>
            <Sparkles className="w-5 h-5 text-[#9D72FF] mb-2" />
            <div className="text-sm font-semibold text-white mb-1">Upgrade to Pro</div>
            <div className="text-xs text-white/50 mb-3">Unlock advanced AI models</div>
            <Link href="/pricing">
              <button className="w-full py-1.5 rounded-lg bg-gradient-to-r from-[#6C3BEA] to-[#804dfa] text-white text-xs font-semibold shadow-[0_0_15px_rgba(108,59,234,0.3)] transition-all duration-150 active:scale-95 hover:opacity-90">
                View Plans
              </button>
            </Link>
          </div>
        </div>

        {/* USER DROPDOWN (MOCK) */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 w-full px-2 py-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer text-white/70 hover:text-white">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0"></div>
            <div className="flex-1 truncate">
              <div className="text-sm font-medium text-white truncate">Growth Team</div>
              <div className="text-xs text-white/40 truncate">Free Plan</div>
            </div>
          </div>
        </div>

      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {/* Subtle top glow for the whole app */}
        <div className="absolute top-0 left-[20%] w-[60%] h-[100px] bg-[#6C3BEA]/10 blur-[100px] rounded-full pointer-events-none z-0" />
        
        <div className="flex-1 overflow-y-auto relative z-10 custom-scrollbar">
          {children}
        </div>
      </main>

    </div>
  );
}
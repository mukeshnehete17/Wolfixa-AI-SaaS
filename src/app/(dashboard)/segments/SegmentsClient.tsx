"use client"

import { Users, UserPlus, ShieldAlert, Sparkles, Filter, ChevronRight } from "lucide-react"

export default function SegmentsClient() {
  const segments = [
    { name: "High Value SaaS Users", count: "12,450", trend: "+12%", desc: "Users who visited pricing page + spent >5m", icon: Sparkles, color: "text-[#9D72FF]", bg: "bg-[#9D72FF]/10", border: "border-[#9D72FF]/20" },
    { name: "Recent Signups (7d)", count: "842", trend: "+4%", desc: "New trial users actively onboarding", icon: UserPlus, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
    { name: "Churn Risk", count: "145", trend: "-2%", desc: "Inactive for 14 days, low engagement score", icon: ShieldAlert, color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20" },
    { name: "All Active Users", count: "45,210", trend: "+8%", desc: "General audience for broad updates", icon: Users, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">Audience Segments</h1>
          <p className="text-white/50 mt-1">Smart, AI-driven customer groupings based on real-time behavior.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors active:scale-95">
            <Filter className="w-4 h-4" />
          </button>
          <button className="glow-button bg-gradient-to-r from-[#6C3BEA] to-[#804dfa] text-white px-4 py-2 rounded-lg font-medium shadow-[0_0_15px_rgba(108,59,234,0.3)] text-sm">
            Create AI Segment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {segments.map((s, i) => (
          <div key={i} className="glass-card p-6 flex flex-col group cursor-pointer hover:border-white/20">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex justify-center items-center mb-4`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <h3 className="text-white font-medium mb-1 group-hover:text-[#9D72FF] transition-colors">{s.name}</h3>
            <p className="text-white/40 text-xs mb-4 flex-1">{s.desc}</p>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-2xl font-bold text-white font-heading">{s.count}</div>
                <div className="text-xs font-semibold text-emerald-400 mt-1 flex items-center gap-1">{s.trend} this week</div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 border-white/10 mt-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-[-50%] right-[-10%] w-[40%] h-[200%] bg-[#6C3BEA]/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-xl">
          <h2 className="text-xl font-heading font-bold text-white mb-2">Want to reach hidden audiences?</h2>
          <p className="text-white/60 text-sm">
            Wolfixa AI can analyze your entire database and automatically discover non-obvious segments with high purchasing intent.
          </p>
        </div>
        <button className="relative z-10 whitespace-nowrap bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors active:scale-95 text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          Run Smart Discovery ✨
        </button>
      </div>

    </div>
  )
}
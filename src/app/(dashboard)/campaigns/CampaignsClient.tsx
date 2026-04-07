"use client"

import { Plus, Search, Filter, MoreHorizontal, Play, Pause, AlertCircle } from "lucide-react"

export default function CampaignsClient() {
  const dummyCampaigns = [
    { id: 1, name: "Q3 Strategy Mailer", status: "Active", leads: 1240, spent: "$450", roi: "+24%", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
    { id: 2, name: "LinkedIn Retargeting Base", status: "Active", leads: 820, spent: "$1,200", roi: "+12%", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
    { id: 3, name: "Welcome Sequence (EU)", status: "Paused", leads: 430, spent: "$120", roi: "+5%", color: "text-orange-400 bg-orange-400/10 border-orange-400/20" },
    { id: 4, name: "Black Friday Promo Draft", status: "Draft", leads: 0, spent: "$0", roi: "0%", color: "text-slate-400 bg-slate-400/10 border-slate-400/20" },
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">Campaigns</h1>
          <p className="text-white/50 mt-1">Manage and monitor your active marketing flows.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder="Search campaigns..." 
              className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#6C3BEA]/50 transition-colors w-64"
            />
          </div>
          <button className="p-2 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors active:scale-95">
            <Filter className="w-4 h-4" />
          </button>
          <button className="glow-button bg-gradient-to-r from-[#6C3BEA] to-[#804dfa] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-[0_0_15px_rgba(108,59,234,0.3)] text-sm">
            <Plus className="w-4 h-4" /> New Campaign
          </button>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 font-medium text-white/60">Name</th>
              <th className="px-6 py-4 font-medium text-white/60">Status</th>
              <th className="px-6 py-4 font-medium text-white/60 w-32 text-right">Leads</th>
              <th className="px-6 py-4 font-medium text-white/60 w-32 text-right">Spent</th>
              <th className="px-6 py-4 font-medium text-white/60 w-32 text-right">Est. ROI</th>
              <th className="px-6 py-4 font-medium text-white/60 w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {dummyCampaigns.map(camp => (
              <tr key={camp.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-medium text-white group-hover:text-[#9D72FF] transition-colors">{camp.name}</div>
                  <div className="text-xs text-white/40 mt-0.5">Updated 2 days ago</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${camp.color} flex items-center gap-1.5 w-fit`}>
                    {camp.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                    {camp.status === 'Paused' && <Pause className="w-3 h-3" />}
                    {camp.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-medium text-white/80">{camp.leads.toLocaleString()}</td>
                <td className="px-6 py-4 text-right font-medium text-white/80">{camp.spent}</td>
                <td className="px-6 py-4 text-right font-medium text-emerald-400">{camp.roi}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-white/40 hover:text-white transition-colors p-1 active:scale-95">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs text-white/40 bg-white/5">
          <span>Showing 4 of 4 campaigns</span>
          <button className="hover:text-white disabled:opacity-50 transition-colors">Next page →</button>
        </div>
      </div>
    </div>
  )
}

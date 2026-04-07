"use client"

import { BarChart3, TrendingUp, TrendingDown, Activity, Monitor, Smartphone, Globe } from "lucide-react"

export default function InsightsClient() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-2">
            AI Insights <span className="text-[10px] text-orange-400 border border-orange-400/20 bg-orange-400/10 px-2 py-0.5 rounded-full self-start mt-2">BETA</span>
          </h1>
          <p className="text-white/50 mt-1">Deep analysis of your marketing performance across all funnels.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-white/10">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>This Year</option>
          </select>
          <button className="glow-button bg-gradient-to-r from-[#6C3BEA] to-[#804dfa] text-white px-4 py-2 rounded-lg font-medium shadow-xl text-sm">
            Generate Report
          </button>
        </div>
      </div>

      {/* Top Value Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <div className="text-white/50 text-sm font-medium mb-2">Predicted Churn Rate</div>
          <div className="text-3xl font-heading font-bold text-white mb-2">2.4%</div>
          <div className="text-emerald-400 text-xs font-medium flex items-center gap-1">
            <TrendingDown className="w-3 h-3" /> Improved by 0.5%
          </div>
          <p className="text-xs text-white/40 mt-4 leading-relaxed">
            AI Analysis: Customer retention campaigns on LinkedIn have successfully reduced churn probability in the SaaS segment.
          </p>
        </div>

        <div className="glass-card p-6">
          <div className="text-white/50 text-sm font-medium mb-2">Growth Trajectory</div>
          <div className="text-3xl font-heading font-bold text-[#9D72FF] mb-2">+142%</div>
          <div className="text-emerald-400 text-xs font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Extremely Positive
          </div>
          <p className="text-xs text-white/40 mt-4 leading-relaxed">
            AI Analysis: Your Q3 Strategy Mailer is generating conversions at 3x the standard baseline for your industry.
          </p>
        </div>

        <div className="glass-card p-6 border-white/10 bg-white/5">
          <div className="flex items-center gap-2 text-white/50 text-sm font-medium mb-2">
            <Activity className="w-4 h-4 text-[#9D72FF]" /> Next Best Action
          </div>
          <div className="text-lg font-heading font-bold text-white mb-2 leading-tight">Increase budget on Instagram Retargeting</div>
          <button className="text-xs font-semibold text-[#9D72FF] bg-white/5 px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors mt-2 active:scale-95">
            Apply Recommendation
          </button>
        </div>
      </div>

      {/* Device & Demographics Mock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-heading font-bold text-white mb-6">Traffic by Device</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white flex items-center gap-2"><Smartphone className="w-4 h-4 text-emerald-400" /> Mobile</span>
                <span className="text-white/70">64%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '64%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white flex items-center gap-2"><Monitor className="w-4 h-4 text-blue-400" /> Desktop</span>
                <span className="text-white/70">31%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <div className="bg-blue-400 h-full rounded-full" style={{ width: '31%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white flex items-center gap-2"><Globe className="w-4 h-4 text-orange-400" /> Tablet & Other</span>
                <span className="text-white/70">5%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <div className="bg-orange-400 h-full rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl" />
          <h3 className="font-heading font-bold text-white mb-6">Top Performing Regions</h3>
          <div className="space-y-4 relative z-10">
            {[
              { region: "North America", value: "48%", rev: "$12.4k" },
              { region: "Europe (EU)", value: "32%", rev: "$8.2k" },
              { region: "Asia Pacific", value: "15%", rev: "$3.1k" },
              { region: "Other", value: "5%", rev: "$1.2k" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                <div className="flex items-center gap-3">
                  <div className="w-6 text-center text-xs text-white/40">#{i + 1}</div>
                  <div className="text-sm font-medium text-white">{item.region}</div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-sm text-white/50">{item.value}</div>
                  <div className="text-sm font-medium text-[#9D72FF] w-12 text-right">{item.rev}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

"use client"

import Link from "next/link"
import { Check, Sparkles, ArrowLeft } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0F] animate-in fade-in duration-300 relative overflow-hidden font-sans">
      {/* Background glow */}
      <div className="absolute top-[-20%] left-[20%] w-[60%] h-[40%] bg-[#6C3BEA]/20 blur-[150px] rounded-full pointer-events-none will-change-transform" />
      
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 active:scale-95">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 tracking-tight">Simple, transparent pricing</h1>
          <p className="text-lg text-white/50">Unlock the full power of Wolfixa AI and scale your marketing automatically.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          {/* Starter Plan */}
          <div className="glass-card p-8 border-white/5 flex flex-col">
            <h3 className="text-xl font-heading font-bold text-white mb-2">Starter</h3>
            <div className="text-white/50 text-sm mb-6">Perfect for early stage startups.</div>
            <div className="text-4xl font-bold text-white mb-6">$29<span className="text-lg text-white/40 font-normal">/mo</span></div>
            <button className="w-full py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all active:scale-95 mb-8">
              Current Plan
            </button>
            <div className="space-y-4 flex-1">
              {['Up to 5 active campaigns', 'Basic segmentation', '7-day analytics retention', 'Community support'].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-sm text-white/70">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Plan */}
          <div className="glass-card p-8 border-[#6C3BEA]/30 bg-gradient-to-b from-[#6C3BEA]/10 to-transparent relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(108,59,234,0.15)] flex flex-col">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#6C3BEA] to-[#9D72FF]" />
            <div className="inline-flex items-center gap-1.5 bg-[#6C3BEA]/20 text-[#9D72FF] text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">
              <Sparkles className="w-3 h-3" /> MOST POPULAR
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">Professional</h3>
            <div className="text-white/50 text-sm mb-6">For growing teams moving fast.</div>
            <div className="text-4xl font-bold text-white mb-6">$99<span className="text-lg text-white/40 font-normal">/mo</span></div>
            <button className="w-full py-3 glow-button bg-gradient-to-r from-[#6C3BEA] to-[#804dfa] rounded-lg text-white font-medium shadow-[0_0_15px_rgba(108,59,234,0.3)] mb-8">
              Upgrade to Pro
            </button>
            <div className="space-y-4 flex-1">
              {['Unlimited campaigns', 'Advanced AI segmentation', 'Predictive churn analytics', 'Priority email support', 'Custom brand domains'].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#9D72FF] shrink-0" />
                  <span className="text-sm text-white">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="glass-card p-8 border-white/5 flex flex-col">
            <h3 className="text-xl font-heading font-bold text-white mb-2">Enterprise</h3>
            <div className="text-white/50 text-sm mb-6">Custom limits and dedicated support.</div>
            <div className="text-4xl font-bold text-white mb-6">Custom</div>
            <button className="w-full py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all active:scale-95 mb-8">
              Contact Sales
            </button>
            <div className="space-y-4 flex-1">
              {['Everything in Pro', 'Dedicated account manager', 'Custom AI model training', 'SSO & Advanced Security', 'API Access (10k req/min)'].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-white/40 shrink-0" />
                  <span className="text-sm text-white/70">{feature}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

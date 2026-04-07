"use client"

import { User, Bell, Shield, Key, Save } from "lucide-react"

export default function SettingsClient() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      <div>
        <h1 className="text-3xl font-heading font-bold text-white">Settings</h1>
        <p className="text-white/50 mt-1">Manage your account preferences and configurations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Settings Navigation */}
        <div className="w-full md:w-64 space-y-2">
          {[
            { icon: User, name: "Profile", active: true },
            { icon: Bell, name: "Notifications", active: false },
            { icon: Shield, name: "Security", active: false },
            { icon: Key, name: "API Keys", active: false },
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${item.active ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
              <item.icon className={`w-4 h-4 ${item.active ? 'text-[#9D72FF]' : ''}`} />
              {item.name}
            </button>
          ))}
        </div>

        {/* Settings Form */}
        <div className="flex-1 glass-card p-8 border-white/10">
          <h2 className="text-lg font-bold text-white mb-6">Profile Information</h2>
          
          <div className="space-y-6">
            <div className="flex items-center gap-6 pb-6 border-b border-white/5">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0 border-4 border-[#0B0B0F] shadow-lg flex justify-center items-center">
                <span className="text-2xl font-bold text-white">W</span>
              </div>
              <div>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white font-medium transition-colors active:scale-95">
                  Change Avatar
                </button>
                <p className="text-xs text-white/40 mt-2 whitespace-nowrap">JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">First Name</label>
                <input type="text" defaultValue="Growth" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#6C3BEA]/50 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Last Name</label>
                <input type="text" defaultValue="Team" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#6C3BEA]/50 transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Email Address</label>
              <input type="email" defaultValue="hello@wolfixa.com" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#6C3BEA]/50 transition-colors" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Company Name</label>
              <input type="text" defaultValue="Wolfixa AI" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#6C3BEA]/50 transition-colors" />
            </div>

            <div className="pt-6 flex justify-end">
              <button className="glow-button bg-gradient-to-r from-[#6C3BEA] to-[#804dfa] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-[0_0_15px_rgba(108,59,234,0.3)] text-sm">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

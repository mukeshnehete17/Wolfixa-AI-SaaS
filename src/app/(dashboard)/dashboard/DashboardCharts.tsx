"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, AreaChart, Area } from 'recharts'

export function DashboardCharts({ barChartData, lineChartData, isDemoMode = false }: { barChartData: any[], lineChartData: any[], isDemoMode?: boolean }) {
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0B0B0F]/90 border border-white/10 backdrop-blur-md p-3 rounded-lg shadow-xl">
          <p className="text-white font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-white/70 capitalize">{entry.name}:</span>
              <span className="text-white font-bold">{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="glass-card p-6 border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 right-[25%] w-32 h-32 bg-[#6C3BEA]/5 rounded-full blur-[50px] pointer-events-none" />
        
        <div className="mb-6">
          <h3 className="font-heading font-bold text-lg text-white">Platform Performance</h3>
          <p className="text-white/50 text-sm">Total leads and conversions by digital channel.</p>
        </div>
        
        <div className="h-[300px] w-full relative z-10">
          {barChartData && barChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }} />
                
                {/* Glow/Gradient for Bars */}
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6C3BEA" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#6C3BEA" stopOpacity={0.4}/>
                  </linearGradient>
                  <linearGradient id="colorConvs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34D399" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#34D399" stopOpacity={0.4}/>
                  </linearGradient>
                </defs>
                
                <Bar dataKey="leads" fill="url(#colorLeads)" radius={[4, 4, 0, 0]} name="Leads" />
                <Bar dataKey="conversions" fill="url(#colorConvs)" radius={[4, 4, 0, 0]} name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full flex items-center justify-center p-4">
               <div className="w-full h-full bg-white/5 rounded-xl border border-white/5 animate-pulse flex items-center justify-center">
                  <span className="text-white/40 text-sm">Awaiting campaign data...</span>
               </div>
            </div>
          )}
        </div>
      </div>

      <div className="glass-card p-6 border-white/5 relative overflow-hidden group">
         <div className="absolute bottom-0 left-[25%] w-32 h-32 bg-[#9D72FF]/5 rounded-full blur-[50px] pointer-events-none" />
        
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-white">Leads Growth</h3>
            <p className="text-white/50 text-sm">Leads generated over the last 30 days.</p>
          </div>
          {isDemoMode && <div className="text-[10px] text-emerald-400 border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 rounded-full">Simulated</div>}
        </div>
        
        <div className="h-[300px] w-full relative z-10">
          {lineChartData && lineChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineChartData} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeadsArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9D72FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#9D72FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="#9D72FF" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorLeadsArea)" 
                  name="Total Leads"
                  activeDot={{ r: 6, fill: "#9D72FF", stroke: "#0B0B0F", strokeWidth: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full flex items-center justify-center p-4">
               <div className="w-full h-full bg-white/5 rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite] -translate-x-full"></div>
                  <span className="text-white/40 text-sm">Visualizing growth...</span>
               </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

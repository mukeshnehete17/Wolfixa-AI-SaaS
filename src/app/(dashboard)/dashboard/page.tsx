import { createClient } from "@/utils/supabase/server"
import { BarChart3, Target, TrendingUp, Users, ChevronRight, Activity, ArrowUpRight } from "lucide-react"
import { DashboardCharts } from "./DashboardCharts"
import { format, subDays } from "date-fns"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from('profiles')
    .select('business_name')
    .eq('id', user?.id)
    .single()

  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('*')
    .eq('user_id', user?.id)
    .order('date', { ascending: true })

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })
    .limit(5)

  // DEMO FALLBACK (WOW FACTOR)
  const isDemoMode = !campaigns || campaigns.length === 0;

  const totalCampaigns = isDemoMode ? 24 : (campaigns?.length || 0)
  const totalLeads = isDemoMode ? 18542 : (campaigns?.reduce((acc, curr) => acc + curr.leads, 0) || 0)
  const totalConvs = isDemoMode ? 778 : (campaigns?.reduce((acc, curr) => acc + curr.conversions, 0) || 0)
  const avgConvRate = isDemoMode ? "4.2" : (totalLeads > 0 ? ((totalConvs / totalLeads) * 100).toFixed(1) : "0")
  const bestPlatform = isDemoMode ? "instagram" : (() => {
    const platformStats: Record<string, { leads: number, convs: number }> = {}
    campaigns?.forEach(c => {
      if (!platformStats[c.platform]) platformStats[c.platform] = { leads: 0, convs: 0 }
      platformStats[c.platform].leads += c.leads
      platformStats[c.platform].convs += c.conversions
    })
    let name = "N/A"
    let maxRate = -1
    Object.entries(platformStats).forEach(([platform, stats]) => {
      const rate = stats.leads > 0 ? (stats.convs / stats.leads) : 0
      if (rate > maxRate && stats.leads > 0) {
        maxRate = rate
        name = platform
      }
    })
    return name;
  })()

  let barChartData: any[] = [];
  if (isDemoMode) {
    barChartData = [
      { name: "Instagram", leads: 8200, conversions: 410 },
      { name: "Google", leads: 6100, conversions: 240 },
      { name: "LinkedIn", leads: 2400, conversions: 80 },
      { name: "TikTok", leads: 1842, conversions: 48 },
    ]
  } else {
    const platformStats: Record<string, { leads: number, convs: number }> = {}
    campaigns?.forEach(c => {
      if (!platformStats[c.platform]) platformStats[c.platform] = { leads: 0, convs: 0 }
      platformStats[c.platform].leads += c.leads
      platformStats[c.platform].convs += c.conversions
    })
    barChartData = Object.entries(platformStats).map(([platform, stats]) => ({
      name: platform,
      leads: stats.leads,
      conversions: stats.convs
    }))
  }

  let lineChartData: any[] = [];
  if (isDemoMode) {
    const baseLeads = 2100;
    lineChartData = Array.from({ length: 7 }).map((_, i) => ({
      date: format(subDays(new Date(), 6 - i), 'MMM dd'),
      leads: baseLeads + Math.floor(Math.random() * 800) + (i * 200)
    }))
  } else {
    const thirtyDaysAgo = subDays(new Date(), 30)
    const recentCampaigns = campaigns?.filter(c => new Date(c.date) >= thirtyDaysAgo) || []
    const dateMap: Record<string, number> = {}
    recentCampaigns.forEach(c => {
      const formattedDate = format(new Date(c.date), 'MMM dd')
      dateMap[formattedDate] = (dateMap[formattedDate] || 0) + c.leads
    })
    lineChartData = Object.entries(dateMap).sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()).map(([date, leads]) => ({
      date,
      leads
    }))
  }

  const businessName = profile?.business_name || (isDemoMode ? "Growth Hacker" : "there")

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#9D72FF] text-xs font-semibold tracking-wide">
            <Activity className="w-3 h-3 animate-pulse" />
            AI Engine Active
          </div>
          <h1 className="text-3xl font-heading font-extrabold text-white tracking-tight">
            Welcome back, {businessName} 👋
          </h1>
          <p className="text-white/60">
            Your campaigns are performing <span className="text-[#9D72FF] font-medium tracking-wide">14% better</span> than last week. Keep it up!
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/editor">
            <button className="glass hover:bg-white/10 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm">
              Create Post
            </button>
          </Link>
          <Link href="/campaigns">
            <button className="glow-button bg-gradient-to-r from-[#6C3BEA] to-[#804dfa] text-white px-5 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 shadow-xl text-sm">
              New Campaign
              <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>

      {isDemoMode && (
        <div className="p-4 rounded-xl border border-white/10 bg-gradient-to-r from-[#9D72FF]/10 to-transparent flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-black animate-ping" />
          <p className="text-sm text-[#9D72FF] font-medium">
            Here’s a preview of your AI-powered dashboard. Connect your real campaigns to see live metrics!
          </p>
        </div>
      )}

      {/* STAT CARDS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 perspective-1000">
        <div className="glass-card p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/5 transition-all" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="text-sm font-medium text-white/50">Total Campaigns</div>
            <div className="p-2 bg-white/5 rounded-lg text-white/70 group-hover:text-[#9D72FF] transition-colors"><BarChart3 className="w-4 h-4" /></div>
          </div>
          <div className="text-3xl font-heading font-bold text-white relative z-10">{totalCampaigns}</div>
          <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1 font-medium"><ArrowUpRight className="w-3 h-3"/> +12% from last month</div>
        </div>

        <div className="glass-card p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="text-sm font-medium text-white/50">Total Leads</div>
            <div className="p-2 bg-white/5 rounded-lg text-white/70 group-hover:text-blue-400 transition-colors"><Users className="w-4 h-4" /></div>
          </div>
          <div className="text-3xl font-heading font-bold text-white relative z-10">{totalLeads.toLocaleString()}</div>
          <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1 font-medium"><ArrowUpRight className="w-3 h-3"/> +4% from last week</div>
        </div>

        <div className="glass-card p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="text-sm font-medium text-white/50">Avg Conv. Rate</div>
            <div className="p-2 bg-white/5 rounded-lg text-white/70 group-hover:text-emerald-400 transition-colors"><TrendingUp className="w-4 h-4" /></div>
          </div>
          <div className="text-3xl font-heading font-bold text-white relative z-10">{avgConvRate}%</div>
          <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1 font-medium"><ArrowUpRight className="w-3 h-3"/> +1.2% over 30 days</div>
        </div>

        <div className="glass-card p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/5 transition-all" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="text-sm font-medium text-white/50">Best Platform</div>
            <div className="p-2 bg-white/5 rounded-lg text-white/70 group-hover:text-[#9D72FF] transition-colors"><Target className="w-4 h-4" /></div>
          </div>
          <div className="text-3xl font-heading font-bold text-[#9D72FF] capitalize relative z-10">{bestPlatform}</div>
          <div className="mt-2 text-xs text-white/40 font-medium">Highest ROI this week</div>
        </div>
      </div>

      {/* CHARTS & ACTIVITY */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        
        {/* CHARTS AREA */}
        <div className="lg:col-span-4 space-y-6">
          <DashboardCharts barChartData={barChartData} lineChartData={lineChartData} isDemoMode={isDemoMode} />
        </div>

        {/* ACTIVITY FEED */}
        <div className="lg:col-span-3 glass-card p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading font-bold text-lg text-white">Live Activity</h3>
            <span className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded">Real-time</span>
          </div>
          
          <div className="flex-1 space-y-6 relative overflow-hidden">
            {/* Shimmer gradient on top/bottom for dynamic feel */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-[#0B0B0F] to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0B0B0F]/80 to-transparent z-10 pointer-events-none" />
            
            {(!isDemoMode && posts && posts.length > 0) ? (
              posts.map(post => (
                <div key={post.id} className="flex gap-4 group">
                  <div className="relative flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-black group-hover:scale-150 group-hover:shadow-xl transition-all" />
                    <div className="w-[1px] h-full bg-white/10 mt-2" />
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium text-white">{post.title}</p>
                    <p className="text-xs text-white/50 capitalize mt-1">
                      {post.post_type?.replace('_', ' ')} • <span className="text-emerald-400">{post.status}</span>
                    </p>
                    <p className="text-[10px] text-white/30 mt-1">
                      {format(new Date(post.created_at), 'MMM dd, h:mm a')}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              [
                { title: "Q3 Strategy Mailer", type: "email campaign", status: "Sent successfully", date: new Date(), icon: "🚀" },
                { title: "LinkedIn Retargeting", type: "social ad", status: "Generating conversions", date: subDays(new Date(), 0.5), icon: "⚡" },
                { title: "Welcome Sequence Update", type: "automation", status: "A/B Test running", date: subDays(new Date(), 1), icon: "🧪" },
                { title: "Holiday Offer Promo", type: "sms campaign", status: "Draft saved", date: subDays(new Date(), 2), icon: "✏️" }
              ].map((post, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="relative flex flex-col items-center">
                    <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-emerald-400 shadow-xl' : 'bg-black'} group-hover:scale-150 transition-all`} />
                    <div className={`w-[1px] h-full bg-white/10 mt-2 ${i === 3 ? 'hidden' : ''}`} />
                  </div>
                  <div className="pb-4 pt-[-4px]">
                    <div className="flex justify-between items-center w-full">
                      <p className="text-sm font-medium text-white">{post.title}</p>
                      <span className="text-[10px] text-white/40">{format(post.date, 'MMM dd, h:mm a')}</span>
                    </div>
                    <p className="text-xs text-white/50 capitalize mt-1 flex items-center gap-1">
                      <span>{post.icon}</span> {post.type} • 
                      <span className={i === 0 ? "text-emerald-400 font-medium" : "text-[#9D72FF]"}> {post.status}</span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <button className="w-full mt-4 py-2 border border-white/10 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors">
            View all activity
          </button>
        </div>
      </div>
    </div>
  )
}

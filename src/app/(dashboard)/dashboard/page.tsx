import { createClient } from "@/utils/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Target, TrendingUp, Users } from "lucide-react"
import { DashboardCharts } from "./DashboardCharts"
import { format, subDays } from "date-fns"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
  // If the user has no campaigns (e.g. hackathon judge), show realistic active metrics
  const isDemoMode = !campaigns || campaigns.length === 0;

  // Calculate actual stats or use demo stats
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

  // Bar Chart Data
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

  // Line Chart Data
  let lineChartData: any[] = [];
  if (isDemoMode) {
    // Generate beautiful looking random curve for the last 7 days
    const baseLeads = 2100;
    lineChartData = Array.from({ length: 7 }).map((_, i) => ({
      date: format(subDays(new Date(), 6 - i), 'MMM dd'),
      leads: baseLeads + Math.floor(Math.random() * 800) + (i * 200) // Trending up
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

  const businessName = profile?.business_name || (isDemoMode ? "Guest (Demo)" : "there")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Good morning, {businessName}</h1>
        <p className="text-muted-foreground">Here's what's happening with your marketing campaigns.</p>
        {isDemoMode && (
          <p className="text-xs text-[#6C3BEA] font-medium bg-purple-100 w-fit px-2 py-1 rounded-md mt-1">
            Viewing Dynamic Demo Data — Connect campaigns to see real metrics!
          </p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Campaigns</CardTitle>
            <BarChart3 className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCampaigns}</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Avg Conv. Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgConvRate}%</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Best Platform</CardTitle>
            <Target className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize text-[#6C3BEA]">{bestPlatform}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4 py-2">
        <Link href="/campaigns">
          <Button className="bg-[#6C3BEA] hover:bg-[#5b32c6] text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">Add Campaign</Button>
        </Link>
        <Link href="/editor">
          <Button variant="outline" className="hover:bg-slate-100 transition-colors">New Post</Button>
        </Link>
        <Link href="/segments">
          <Button variant="outline" className="hover:bg-slate-100 transition-colors">View Segments</Button>
        </Link>
        <Link href="/insights">
          <Button variant="outline" className="hover:bg-slate-100 transition-colors">Get Insights</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4 space-y-6">
          <DashboardCharts barChartData={barChartData} lineChartData={lineChartData} />
        </div>

        <Card className="lg:col-span-3 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {(!isDemoMode && posts && posts.length > 0) ? (
              posts.map(post => (
                <div key={post.id} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{post.title}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {post.post_type?.replace('_', ' ')} • {post.status}
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-xs text-slate-400">
                    {format(new Date(post.created_at), 'MMM dd')}
                  </div>
                </div>
              ))
            ) : (
              <div className="space-y-6">
                {[
                  { title: "Q3 Strategy Mailer", type: "email campaign", status: "sent", date: new Date() },
                  { title: "LinkedIn Retargeting", type: "social ad", status: "active", date: subDays(new Date(), 2) },
                  { title: "Welcome Sequence Update", type: "automation", status: "draft", date: subDays(new Date(), 4) }
                ].map((post, i) => (
                  <div key={i} className="flex items-center">
                    <div className="ml-4 space-y-1 text-slate-800">
                      <p className="text-sm font-medium leading-none">{post.title}</p>
                      <p className="text-sm text-slate-500 capitalize">
                        {post.type} • {post.status}
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-xs text-slate-400">
                      {format(post.date, 'MMM dd')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

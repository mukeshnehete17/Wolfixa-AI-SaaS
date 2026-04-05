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

  // Calculate stats
  const totalCampaigns = campaigns?.length || 0
  const totalLeads = campaigns?.reduce((acc, curr) => acc + curr.leads, 0) || 0
  const totalConvs = campaigns?.reduce((acc, curr) => acc + curr.conversions, 0) || 0
  const avgConvRate = totalLeads > 0 ? ((totalConvs / totalLeads) * 100).toFixed(1) : 0

  // Best platform calculation
  const platformStats: Record<string, { leads: number, convs: number }> = {}
  campaigns?.forEach(c => {
    if (!platformStats[c.platform]) platformStats[c.platform] = { leads: 0, convs: 0 }
    platformStats[c.platform].leads += c.leads
    platformStats[c.platform].convs += c.conversions
  })

  let bestPlatform = "N/A"
  let maxRate = -1
  Object.entries(platformStats).forEach(([platform, stats]) => {
    const rate = stats.leads > 0 ? (stats.convs / stats.leads) : 0
    if (rate > maxRate && stats.leads > 0) {
      maxRate = rate
      bestPlatform = platform
    }
  })

  // Bar Chart Data: Performance by Platform
  const barChartData = Object.entries(platformStats).map(([platform, stats]) => ({
    name: platform,
    leads: stats.leads,
    conversions: stats.convs
  }))

  // Line Chart Data: Leads over last 30 days
  const thirtyDaysAgo = subDays(new Date(), 30)
  const recentCampaigns = campaigns?.filter(c => new Date(c.date) >= thirtyDaysAgo) || []

  // Group by date
  const dateMap: Record<string, number> = {}
  recentCampaigns.forEach(c => {
    const formattedDate = format(new Date(c.date), 'MMM dd')
    dateMap[formattedDate] = (dateMap[formattedDate] || 0) + c.leads
  })

  const lineChartData = Object.entries(dateMap).sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()).map(([date, leads]) => ({
    date,
    leads
  }))

  const businessName = profile?.business_name || "there"

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Good morning, {businessName}</h1>
        <p className="text-muted-foreground">Here's what's happening with your marketing campaigns.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Campaigns</CardTitle>
            <BarChart3 className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCampaigns}</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Avg Conv. Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgConvRate}%</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Best Platform</CardTitle>
            <Target className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{bestPlatform}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4 py-2">
        <Link href="/campaigns">
          <Button className="bg-[#6C3BEA] hover:bg-[#5b32c6] text-white">Add Campaign</Button>
        </Link>
        <Link href="/editor">
          <Button variant="outline">New Post</Button>
        </Link>
        <Link href="/segments">
          <Button variant="outline">View Segments</Button>
        </Link>
        <Link href="/insights">
          <Button variant="outline">Get Insights</Button>
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
            {posts && posts.length > 0 ? (
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
              <div className="text-sm text-center text-slate-500 py-6">
                No recent activity. Start by creating a post or adding a campaign!
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

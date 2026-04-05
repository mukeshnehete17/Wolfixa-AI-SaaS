"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Megaphone, Target, PenTool, BarChart3, 
  Lightbulb, Activity, CheckCircle2, ArrowRight
} from "lucide-react"

// Framer Motion Variants
const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#6C3BEA] p-2 rounded-lg">
              <Megaphone className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">ReachIQ</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-[#6C3BEA] transition">Features</a>
            <a href="#how-it-works" className="hover:text-[#6C3BEA] transition">How it Works</a>
            <a href="#pricing" className="hover:text-[#6C3BEA] transition">Pricing</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:flex">Log in</Button>
            </Link>
            <Link href="/login">
              <Button className="bg-[#6C3BEA] hover:bg-[#5b32c6] text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="py-20 md:py-32 px-4 text-center">
          <motion.div 
            initial="hidden" animate="show" variants={stagger}
            className="container mx-auto max-w-4xl space-y-8"
          >
            <motion.h1 
              variants={fadeUp}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm"
            >
              Reach the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C3BEA] to-[#A78BFA]">Right Customers</span>
            </motion.h1>
            <motion.p 
              variants={fadeUp}
              className="text-xl text-slate-600 max-w-2xl mx-auto"
            >
              The all-in-one AI-powered digital marketing solution for small and medium businesses. 
              Find segments, launch campaigns, and scale faster.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-[#6C3BEA] hover:bg-[#5b32c6] text-white text-md shadow-lg shadow-purple-500/30">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg">
                View Demo
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="py-20 bg-white px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Everything you need to grow</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Stop guessing and start growing with our suite of smart marketing tools designed specifically for local businesses and startups.</p>
            </div>

            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                { title: "Smart Segmentation", icon: Target, desc: "Automatically identify high-converting customer segments based on your data." },
                { title: "AI Recommendations", icon: Lightbulb, desc: "Get data-driven suggestions on where and when to spend your marketing budget." },
                { title: "Campaign Tracking", icon: Megaphone, desc: "Log and monitor all your digital ad campaigns in one unified dashboard." },
                { title: "Rich Editor", icon: PenTool, desc: "Draft beautiful emails and ad copy with our distraction-free WYSIWYG editor." },
                { title: "Cost Analytics", icon: BarChart3, desc: "Automatically calculate your true cost-per-lead and conversion rates." },
                { title: "Live Insights", icon: Activity, desc: "Our engine analyzes your past campaigns to prevent wasted ad spend." },
              ].map((f, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <Card className="border-none shadow-sm hover:shadow-md transition-shadow bg-slate-50">
                    <CardContent className="p-6">
                      <f.icon className="h-10 w-10 text-[#6C3BEA] mb-4" />
                      <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{f.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-20 bg-[#1E1B4B] text-white px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-16">How ReachIQ Works</h2>
            <div className="grid md:grid-cols-3 gap-12 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-[45px] left-1/6 right-1/6 h-[2px] bg-white/20 z-0"></div>
              
              {[
                { step: "1", title: "Define Target", desc: "Input your ideal customer profile or upload a CSV." },
                { step: "2", title: "Get Gameplan", desc: "Our AI generates a custom strategy and ad copy." },
                { step: "3", title: "Track & Scale", desc: "Log your results and watch your ROI multiply." },
              ].map((s, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-[#6C3BEA] flex items-center justify-center text-3xl font-bold mb-6 border-4 border-[#1E1B4B] shadow-xl">
                    {s.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                  <p className="text-slate-300 max-w-xs">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 bg-slate-50 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-16">Loved by growing businesses</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Sarah Jenkins", role: "Coffee Shop Owner", text: "ReachIQ told me to stop spending on Google and focus on Instagram. My store traffic doubled in 3 weeks." },
                { name: "Michael Chen", role: "SaaS Founder", text: "The rich text editor mixed with the AI segments makes launching monthly email campaigns take 10 minutes instead of 2 hours." },
                { name: "Elena Rodriguez", role: "Local Realtor", text: "I finally know exactly how much a lead costs me. The insights dashboard is like having a marketing director on staff." },
              ].map((t, i) => (
                <Card key={i} className="border-none shadow-sm h-full">
                  <CardContent className="p-8 pb-8">
                    <p className="text-slate-600 mb-6 italic">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200" />
                      <div>
                        <p className="font-bold text-sm">{t.name}</p>
                        <p className="text-xs text-slate-500">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-20 bg-white px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-slate-600 mb-16">Start for free, upgrade when you need more power.</p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
              {[
                { name: "Free", price: "0", features: ["Up to 3 Campaigns", "Basic Segments", "Standard Support"] },
                { name: "Pro", price: "29", features: ["Unlimited Campaigns", "AI Recommendations", "Rich Text Editor", "Priority Support"], popular: true },
                { name: "Enterprise", price: "99", features: ["Custom Dashboards", "Team Collaboration", "API Access", "Dedicated Success Mgr"] },
              ].map((plan, i) => (
                <Card key={i} className={`relative border-2 ${plan.popular ? 'border-[#6C3BEA] shadow-xl scale-105 z-10' : 'border-slate-100 shadow-sm'}`}>
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#6C3BEA] text-white px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide">
                      Most Popular
                    </div>
                  )}
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-extrabold">${plan.price}</span>
                      <span className="text-slate-500 ml-1">/mo</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="h-4 w-4 text-[#6C3BEA]" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Button variant={plan.popular ? "default" : "outline"} className={`w-full ${plan.popular ? 'bg-[#6C3BEA] hover:bg-[#5b32c6]' : ''}`}>
                      {plan.price === "0" ? "Get Started" : "Upgrade"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Megaphone className="h-6 w-6 text-white" />
            <span className="text-xl font-bold text-white">ReachIQ</span>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} ReachIQ. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

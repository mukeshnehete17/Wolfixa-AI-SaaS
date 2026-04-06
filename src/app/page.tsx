"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Megaphone, Target, PenTool, BarChart3, 
  Lightbulb, Activity, CheckCircle2, ArrowRight,
  Sparkles, Zap, PieChart
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
            <span className="text-xl font-bold tracking-tight">Wolfixa AI</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-[#6C3BEA] transition">Features</a>
            <a href="#how-it-works" className="hover:text-[#6C3BEA] transition">How it Works</a>
            <a href="#pricing" className="hover:text-[#6C3BEA] transition">Pricing</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:flex transition-transform hover:scale-105">Log in</Button>
            </Link>
            <Link href="/login">
              <Button className="bg-[#6C3BEA] hover:bg-[#5b32c6] text-white transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="py-20 md:py-32 px-4 text-center relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-300 rounded-full blur-[120px] opacity-20 pointer-events-none" />
          
          <motion.div 
            initial="hidden" animate="show" variants={stagger}
            className="container mx-auto max-w-4xl space-y-8 relative z-10"
          >
            <motion.div variants={fadeUp} className="inline-block mb-2">
              <span className="bg-purple-100 text-[#6C3BEA] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-sm">
                AI Marketing Engine for Smart Growth
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeUp}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm"
            >
              Reach the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C3BEA] to-[#A78BFA]">Right Customers</span> with AI
            </motion.h1>
            
            <motion.p 
              variants={fadeUp}
              className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
              Launch smarter campaigns, target the right audience, and grow faster using AI-powered insights.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-[#6C3BEA] hover:bg-[#5b32c6] text-white text-md shadow-lg shadow-purple-500/30 transition-all hover:scale-105">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg transition-all hover:scale-105 hover:bg-slate-100">
                  View Demo
                </Button>
              </Link>
            </motion.div>
            
            <motion.p variants={fadeUp} className="text-sm text-slate-500 pt-4">
              No credit card required. 14-day free trial on Pro.
            </motion.p>
          </motion.div>
        </section>

        {/* FEATURES SECTION (What you can do) */}
        <section className="py-20 bg-white px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What you can do with Wolfixa</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Access enterprise-grade marketing intelligence without the enterprise price tag.</p>
            </div>

            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                { title: "AI Campaign Generator", icon: Sparkles, desc: "Generate high-converting campaigns in seconds." },
                { title: "Smart Audience Segmentation", icon: Target, desc: "Automatically find your best customers." },
                { title: "Real-Time Analytics", icon: PieChart, desc: "Track performance and optimize instantly." },
              ].map((f, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <Card className="border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white h-full group">
                    <CardContent className="p-8 text-center flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl bg-purple-50 text-[#6C3BEA] flex items-center justify-center mb-6 group-hover:bg-[#6C3BEA] group-hover:text-white transition-colors duration-300">
                        <f.icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                      <p className="text-slate-600 leading-relaxed disabled:">{f.desc}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-16">How Wolfixa AI Works</h2>
            <div className="grid md:grid-cols-3 gap-12 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-[45px] left-1/6 right-1/6 h-[2px] bg-white/20 z-0"></div>
              
              {[
                { step: "1", title: "Define Target", desc: "Input your ideal customer profile or upload a CSV." },
                { step: "2", title: "Get Gameplan", desc: "Our AI generates a custom strategy and ad copy." },
                { step: "3", title: "Track & Scale", desc: "Log your results and watch your ROI multiply." },
              ].map((s, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center group">
                  <div className="w-24 h-24 rounded-full bg-[#6C3BEA] flex items-center justify-center text-3xl font-bold mb-6 border-4 border-[#1E1B4B] shadow-xl group-hover:scale-110 transition-transform">
                    {s.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                  <p className="text-slate-300 max-w-xs">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-24 bg-slate-50 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-slate-600 mb-16">Start for free, upgrade when you need more power.</p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
              <Card className="relative border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2">Free</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-extrabold">$0</span>
                    <span className="text-slate-500 ml-1">/mo</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {["Up to 3 Campaigns", "Basic Segments", "Standard Support"].map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-[#6C3BEA]" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/login" className="block w-full">
                    <Button variant="outline" className="w-full hover:bg-slate-100 transition-colors">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="relative border-2 border-[#6C3BEA] shadow-xl scale-105 z-10">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6C3BEA] text-white px-4 py-1 text-xs font-bold rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2">Pro</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-extrabold">$29</span>
                    <span className="text-slate-500 ml-1">/mo</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {["Unlimited Campaigns", "AI Recommendations", "Rich Text Editor", "Priority Support"].map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-[#6C3BEA]" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button onClick={() => alert("Upgrade coming soon!")} className="w-full bg-[#6C3BEA] hover:bg-[#5b32c6] transition-colors shadow-md hover:shadow-lg">
                    Upgrade to Pro
                  </Button>
                </CardContent>
              </Card>

              <Card className="relative border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-extrabold">$99</span>
                    <span className="text-slate-500 ml-1">/mo</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {["Custom Dashboards", "Team Collaboration", "API Access", "Dedicated Success Mgr"].map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-[#6C3BEA]" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button onClick={() => alert("Please contact our sales team.")} variant="outline" className="w-full hover:bg-slate-100 transition-colors">
                    Contact Us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Megaphone className="h-6 w-6 text-white" />
                <span className="text-xl font-bold text-white">Wolfixa AI</span>
              </div>
              <p className="text-sm max-w-xs text-slate-500 mb-6">
                The smart marketing engine that helps you launch faster, target better, and grow effortlessly with AI.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><Link href="/dashboard" className="hover:text-white transition">Demo</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div>
              &copy; {new Date().getFullYear()} Wolfixa AI. All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              Built by <span className="text-white font-medium">Wolfixa AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

import { useEffect } from 'react'
import Header from './components/Header'
import ServiceCard from './components/ServiceCard'
import PortfolioCard from './components/PortfolioCard'
import StatsBlock from './components/StatsBlock'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

function App() {
  // IntersectionObserver for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center pt-20 px-6"
        style={{
          background: 'linear-gradient(to bottom, #0A0A0A, #203A43)',
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side */}
            <div className="animate-on-scroll">
              <div className="text-gold text-sm font-semibold uppercase tracking-wider mb-4">
                Premium Engineering Partner
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 leading-tight">
                Bold infrastructure.
                <br />
                Golden reliability.
              </h1>
              <p className="text-lg text-text-muted mb-8 leading-relaxed max-w-xl">
                Golden Tech helps fast-growing companies design, build, and scale
                reliable backends, data platforms, and AI systems , without
                compromising on quality or uptime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 bg-gold hover:bg-gold-hover text-bg-primary font-semibold rounded-lg transition-colors shadow-lg"
                >
                  Schedule a consultation
                </button>
                <button
                  onClick={() => scrollToSection('portfolio')}
                  className="px-8 py-3 text-text-muted hover:text-text-primary underline underline-offset-4 transition-colors"
                >
                  View our portfolio →
                </button>
              </div>
            </div>

            {/* Right side - Dashboard card */}
            <div className="animate-on-scroll" style={{ animationDelay: '0.1s' }}>
              <div className="bg-bg-secondary border border-border rounded-lg p-8 shadow-2xl">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-text-primary font-semibold">
                      System Health
                    </h3>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-gold rounded-full"></div>
                      <div className="w-2 h-2 bg-gold rounded-full"></div>
                      <div className="w-2 h-2 bg-gold rounded-full"></div>
                    </div>
                  </div>
                  {/* Fake graph */}
                  <div className="h-32 bg-bg-primary rounded mb-4 flex items-end gap-1 p-2">
                    {[65, 80, 45, 90, 70, 85, 95, 75, 60, 88].map(
                      (height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gold rounded-t"
                          style={{ height: `${height}%` }}
                        ></div>
                      )
                    )}
                  </div>
                </div>
                {/* Stats rows */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted text-sm">Uptime</span>
                    <span className="text-gold font-semibold">99.97%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted text-sm">Response Time</span>
                    <span className="text-gold font-semibold">12ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted text-sm">Active Users</span>
                    <span className="text-gold font-semibold">2.4M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted text-sm">Throughput</span>
                    <span className="text-gold font-semibold">45k req/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-24 px-6 bg-bg-primary"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              What we do
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              End-to-end engineering for teams that outgrow quick fixes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              title="Scalable Backend Architecture"
              description="We design APIs and services that stay fast and reliable as your traffic grows , from your first thousand users to millions."
              bullets={[
                'Event-driven & message-based systems',
                'Performance profiling & bottleneck removal',
                'High-availability & fault tolerance',
              ]}
            />
            <ServiceCard
              title="Data Platforms & Observability"
              description="From pipelines to dashboards, we make your data trustworthy, timely, and easy to reason about."
              bullets={[
                'Streaming & batch data pipelines',
                'Data warehousing & analytics',
                'Monitoring, logging, and alerting',
              ]}
            />
            <ServiceCard
              title="AI & Automation"
              description="We integrate AI into your products and operations with a focus on reliability, traceability, and cost control."
              bullets={[
                'LLM-backed product features & assistants',
                'Process automation and internal tools',
                'Experimentation and A/B testing',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section
        id="portfolio"
        className="py-24 px-6 bg-bg-secondary"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Selected work
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              A glimpse of what we've helped teams build.
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            <PortfolioCard
              name="Danke Adventure"
              tagline="Complete tour booking and voucher management platform."
              description="A comprehensive travel platform that streamlines tour bookings with automated WhatsApp notifications, integrated voucher purchases via Xendit payment gateway, and a full admin dashboard for managing vouchers and tracking customer transactions."
              keyPoints={[
                'Automated WhatsApp booking confirmations',
                'Xendit payment integration for voucher purchases',
                'Email delivery of vouchers to customers',
                'Admin CRUD for vouchers and purchase history',
                'Voucher validation and redemption tracking',
              ]}
              websiteUrl="https://dankeadventure.com"
            />
            <PortfolioCard
              name="Growthverse"
              tagline="Event management platform with attendance tracking and gamification."
              description="An event management system that enables admins to create event classes, manage speakers and participants, and track attendance through barcode scanning. Features a point-based gamification system rewarding registration and attendance."
              keyPoints={[
                'Event class creation with speaker and capacity management',
                'Zoom/Google Meet integration and downloadable materials',
                'Barcode-based attendance scanning system',
                'Point system: help tracking engagement and participation',
              ]}
              websiteUrl="https://growthverse.id"
            />
            <PortfolioCard
              name="Eplusale"
              tagline="Inventory and supply chain management for multi-branch operations."
              description="A point-of-sale and inventory management system connecting warehouses to restaurant and coffee shop branches. Enables branch managers to order raw materials, while warehouse admins track inventory flow, revenue, profits, and analyze ordering patterns."
              keyPoints={[
                'Multi-branch restocking and order management',
                'Real-time inventory tracking across locations',
                'Revenue and profit analytics for warehouse operations',
                'Most ordered items and demand forecasting',
                'Centralized warehouse control with branch autonomy',
              ]}
              websiteUrl="https://eplussales.com"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-24 px-6 bg-bg-primary"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Why Golden Tech?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 animate-on-scroll">
              <p className="text-lg text-text-muted leading-relaxed">
                We're engineers first, consultants second. Golden Tech was created
                for teams that need a hands-on partner who can design the
                architecture, write the code, and ship the thing , not just hand
                over a slide deck.
              </p>
              <p className="text-lg text-text-muted leading-relaxed">
                We focus on a small number of engagements at a time so we can go
                deep on your stack, infrastructure, and team, and leave you with
                systems that are documented, observable, and ready to grow.
              </p>
            </div>

            <div className="animate-on-scroll" style={{ animationDelay: '0.1s' }}>
              <StatsBlock
                stats={[
                  {
                    number: '5+ years',
                    label:
                      'Hands-on experience building and scaling production systems.',
                  },
                  {
                    number: '99.9%+ uptime',
                    label:
                      'Architectures engineered for reliability and recovery.',
                  },
                  {
                    number: 'From PoC to production',
                    label: 'We help you go from idea to launch , and beyond.',
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 px-6 bg-bg-secondary"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-bg-primary border-t-2 border-gold rounded-lg p-8 md:p-12 shadow-2xl animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Tell us about your problem, we'll help you solve it.
            </h2>
            <p className="text-lg text-text-muted mb-8 leading-relaxed">
              Share a bit about your problem, we'll get back to you with practical solutions.
            </p>

            <ContactForm />

            <p className="text-text-muted text-sm mt-6">
              Prefer email? Reach us at{' '}
              <a
                href="mailto:hello@goldentech.dev"
                className="text-gold hover:text-gold-hover underline"
              >
                hello@goldentech.dev
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default App


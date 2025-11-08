import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-bg-primary/95 backdrop-blur-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => scrollToSection('home')}
        >
          <span className="text-gold">Golden</span>{' '}
          <span className="text-text-primary">Tech</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('home')}
            className="text-text-primary hover:text-gold transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="text-text-primary hover:text-gold transition-colors"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="text-text-primary hover:text-gold transition-colors"
          >
            Portfolio
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-text-primary hover:text-gold transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-text-primary hover:text-gold transition-colors"
          >
            Contact
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-6 py-2 bg-gold hover:bg-gold-hover text-bg-primary font-semibold rounded-lg transition-colors shadow-lg"
          >
            Book a Call
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-text-primary"
          onClick={() => {
            // Simple mobile menu - could be enhanced
            const menu = document.getElementById('mobile-menu')
            if (menu) {
              menu.classList.toggle('hidden')
            }
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className="md:hidden hidden bg-bg-primary border-t border-border"
      >
        <div className="flex flex-col px-6 py-4 space-y-4">
          <button
            onClick={() => {
              scrollToSection('home')
              document.getElementById('mobile-menu')?.classList.add('hidden')
            }}
            className="text-text-primary hover:text-gold transition-colors text-left"
          >
            Home
          </button>
          <button
            onClick={() => {
              scrollToSection('services')
              document.getElementById('mobile-menu')?.classList.add('hidden')
            }}
            className="text-text-primary hover:text-gold transition-colors text-left"
          >
            Services
          </button>
          <button
            onClick={() => {
              scrollToSection('portfolio')
              document.getElementById('mobile-menu')?.classList.add('hidden')
            }}
            className="text-text-primary hover:text-gold transition-colors text-left"
          >
            Portfolio
          </button>
          <button
            onClick={() => {
              scrollToSection('about')
              document.getElementById('mobile-menu')?.classList.add('hidden')
            }}
            className="text-text-primary hover:text-gold transition-colors text-left"
          >
            About
          </button>
          <button
            onClick={() => {
              scrollToSection('contact')
              document.getElementById('mobile-menu')?.classList.add('hidden')
            }}
            className="text-text-primary hover:text-gold transition-colors text-left"
          >
            Contact
          </button>
          <button
            onClick={() => {
              scrollToSection('contact')
              document.getElementById('mobile-menu')?.classList.add('hidden')
            }}
            className="px-6 py-2 bg-gold hover:bg-gold-hover text-bg-primary font-semibold rounded-lg transition-colors text-center"
          >
            Book a Call
          </button>
        </div>
      </div>
    </header>
  )
}

import { ReactNode } from 'react'

interface ServiceCardProps {
  title: string
  description: string
  bullets: string[]
}

export default function ServiceCard({ title, description, bullets }: ServiceCardProps) {
  return (
    <div className="bg-bg-secondary border border-border rounded-lg p-8 hover:scale-[1.01] hover:border-gold transition-all duration-300 animate-on-scroll">
      <h3 className="text-2xl font-semibold text-text-primary mb-4">{title}</h3>
      <p className="text-text-muted mb-6 leading-relaxed">{description}</p>
      <ul className="space-y-3">
        {bullets.map((bullet, index) => (
          <li key={index} className="text-text-muted flex items-start">
            <span className="text-gold mr-2">•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}


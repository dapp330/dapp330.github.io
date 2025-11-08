interface PortfolioCardProps {
  name: string
  tagline: string
  description: string
  keyPoints: string[]
  techStack: string
}

export default function PortfolioCard({
  name,
  tagline,
  description,
  keyPoints,
  techStack,
}: PortfolioCardProps) {
  return (
    <div className="bg-bg-secondary border border-border rounded-lg p-8 hover:scale-[1.01] hover:border-t-2 hover:border-t-gold transition-all duration-300 animate-on-scroll">
      <div className="border-l-2 border-gold pl-4 mb-6">
        <h3 className="text-2xl font-semibold text-text-primary mb-2">{name}</h3>
        <p className="text-gold text-sm font-medium">{tagline}</p>
      </div>
      <p className="text-text-muted mb-6 leading-relaxed">{description}</p>
      <ul className="space-y-2 mb-6">
        {keyPoints.map((point, index) => (
          <li key={index} className="text-text-muted flex items-start">
            <span className="text-gold mr-2">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <p className="text-text-muted text-sm font-mono">{techStack}</p>
    </div>
  )
}


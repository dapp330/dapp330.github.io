interface PortfolioCardProps {
  name: string
  tagline: string
  description: string
  keyPoints: string[]
  techStack?: string
  websiteUrl?: string
  imageUrl?: string
}

export default function PortfolioCard({
  name,
  tagline,
  description,
  keyPoints,
  techStack,
  websiteUrl,
  imageUrl,
}: PortfolioCardProps) {
  return (
    <div className="bg-bg-secondary border border-border rounded-lg overflow-hidden hover:scale-[1.01] hover:border-t-2 hover:border-t-gold transition-all duration-300 animate-on-scroll">
      {imageUrl && (
        <div className="w-full h-40 bg-bg-primary overflow-hidden flex items-center justify-center p-6">
          <img
            src={imageUrl}
            alt={name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
      <div className="p-8">
        <div className="border-l-2 border-gold pl-4 mb-6">
          <h3 className="text-2xl font-semibold text-text-primary mb-2">
            {websiteUrl ? (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
              >
                {name}
              </a>
            ) : (
              name
            )}
          </h3>
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
        {techStack && (
          <p className="text-text-muted text-sm font-mono mb-4">{techStack}</p>
        )}
        {websiteUrl && (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-hover text-sm font-medium underline inline-flex items-center gap-1"
          >
            Visit website →
          </a>
        )}
      </div>
    </div>
  )
}


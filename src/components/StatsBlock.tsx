interface StatItem {
  number: string
  label: string
}

interface StatsBlockProps {
  stats: StatItem[]
}

export default function StatsBlock({ stats }: StatsBlockProps) {
  return (
    <div className="space-y-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="animate-on-scroll"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
            {stat.number}
          </div>
          <div className="text-text-muted">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}


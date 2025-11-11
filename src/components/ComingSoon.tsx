import { useState, useEffect } from 'react'

interface TimeLeft {
    days: number
    hours: number
    minutes: number
    seconds: number
}

function ComingSoon() {
    const launchDate = new Date('December 2, 2025 00:00:00').getTime()

    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime()
            const difference = launchDate - now

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                })
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
            }
        }

        calculateTimeLeft()
        const interval = setInterval(calculateTimeLeft, 1000)

        return () => clearInterval(interval)
    }, [launchDate])

    return (
        <section id="coming-soon" className="py-24 px-6 bg-bg-primary">
            <div className="max-w-4xl mx-auto">
                <div className="bg-bg-secondary border border-border rounded-lg p-8 md:p-12 shadow-2xl animate-on-scroll animated">
                    <div className="text-center mb-8">
                        <div className="text-gold text-sm font-semibold uppercase tracking-wider mb-4">Coming Soon</div>
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">Jual Bagasi</h2>
                        <p className="text-lg text-text-muted mb-8 leading-relaxed max-w-2xl mx-auto">
                            Coming soon, help you share your luggage with rating system and more protection.
                        </p>
                    </div>
                    <div className="mb-8">
                        <div className="text-center mb-6">
                            <p className="text-text-muted mb-4">Launching on December 2, 2025</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            <div className="text-center">
                                <div className="text-3xl md:text-5xl font-bold text-gold mb-2">{timeLeft.days}</div>
                                <div className="text-sm md:text-base text-text-muted uppercase tracking-wider">
                                    Days
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-5xl font-bold text-gold mb-2">{timeLeft.hours}</div>
                                <div className="text-sm md:text-base text-text-muted uppercase tracking-wider">
                                    Hours
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-5xl font-bold text-gold mb-2">{timeLeft.minutes}</div>
                                <div className="text-sm md:text-base text-text-muted uppercase tracking-wider">
                                    Minutes
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-5xl font-bold text-gold mb-2">{timeLeft.seconds}</div>
                                <div className="text-sm md:text-base text-text-muted uppercase tracking-wider">
                                    Seconds
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ComingSoon

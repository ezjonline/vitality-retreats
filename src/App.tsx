import { useEffect, useMemo, useRef, useState } from 'react'

type AddOn = {
  id: string
  title: string
  price: number
  description: string
  deliverables?: string[]
  closer?: string
  warning?: string
}

const ADD_ONS: AddOn[] = [
  {
    id: 'daily-reels',
    title: 'Daily Highlight Reels',
    price: 600,
    description:
      "Short iPhone highlight reels with same day turnaround. Each morning you'll wake up to a reel covering the full journey of the day before, ready to post while the moment is still live. Six reels across six days, capturing the full experience as it unfolds.",
  },
  {
    id: 'photography',
    title: 'Retreat Photography',
    price: 500,
    description:
      'Edited still photography across the full retreat. 60 to 80 final images covering portraits, candid moments, landscape, and group shots. The stills serve two sides: participants get a keepsake from the week, and you get a marketing arsenal for future retreats. Website imagery, organic Instagram, paid ads.',
  },
  {
    id: 'extra-reels',
    title: 'Additional Short Form Reels (Set of 3)',
    price: 550,
    description:
      'Three more vertical reels from camera footage beyond the base four. Ideal for sustained content drops across the 30 days following the retreat.',
  },
  {
    id: 'testimonials',
    title: 'Testimonials & Case Studies (Up to 4 participants + Brenda)',
    price: 600,
    description:
      "A dedicated interview session on the final day. Four participants sit down to share their experience on camera, and Brenda sits down separately to tell the story of Vitality in her own words. Each participant gets a 30 to 60 second case study edit ready to run as ads, and Brenda's voice becomes the narrative thread through the master edit.",
  },
  {
    id: 'raw-footage',
    title: 'Raw Footage Archive',
    price: 500,
    description:
      'Full resolution, downloadable access to all raw footage from the retreat. Drone, GoPro, phone, main camera, organized into categorical subfolders for easy access.',
  },
]

const BASE_PRICE = 4500

function formatUSD(n: number): string {
  return '$' + n.toLocaleString('en-US')
}

function useCountUp(target: number, durationMs = 300): number {
  const [value, setValue] = useState(target)
  const fromRef = useRef(target)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const from = fromRef.current
    const to = target
    if (from === to) return

    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = Math.round(from + (to - from) * eased)
      setValue(current)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = to
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      fromRef.current = target
    }
  }, [target, durationMs])

  return value
}

export default function App() {
  const [selected, setSelected] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const selectedAddOns = useMemo(
    () => ADD_ONS.filter((a) => selected[a.id]),
    [selected]
  )

  const total = useMemo(
    () => BASE_PRICE + selectedAddOns.reduce((sum, a) => sum + a.price, 0),
    [selectedAddOns]
  )

  const dueToday = useMemo(() => Math.round(total * 0.75), [total])
  const dueOnDelivery = useMemo(() => total - dueToday, [total, dueToday])

  const animatedTotal = useCountUp(total, 300)
  const animatedDueToday = useCountUp(dueToday, 300)
  const animatedDueOnDelivery = useCountUp(dueOnDelivery, 300)

  const whatsappHref = useMemo(() => {
    const lines = [
      'Hi Ethan. Confirming the package for Vitality Retreat Lombok:',
      '',
      `• Base Package (${formatUSD(BASE_PRICE)})`,
      ...selectedAddOns.map((a) => `• ${a.title} (${formatUSD(a.price)})`),
      '',
      `Total: ${formatUSD(total)}`,
      `Due today (75%): ${formatUSD(dueToday)}`,
      `Due on delivery (25%): ${formatUSD(dueOnDelivery)}`,
      '',
      "Let's lock it.",
    ]
    const message = lines.join('\n')
    return `https://wa.me/15053633485?text=${encodeURIComponent(message)}`
  }, [selectedAddOns, total, dueToday, dueOnDelivery])

  return (
    <div className="min-h-screen bg-bg text-ink pb-40 md:pb-20">
      <main className="mx-auto w-full max-w-[1024px] px-6 md:px-12">
        {/* 1. HERO */}
        <header className="pt-16 pb-20 md:pt-24 md:pb-28">
          <p className="eyebrow text-sage mb-8">
            Proposal · Vitality Retreats × EZJ
          </p>
          <h1 className="font-display text-[44px] leading-[1.05] tracking-tight md:text-[76px]">
            Capturing the Lombok Relaunch
          </h1>
          <p className="font-display italic text-xl md:text-2xl text-ink/70 mt-6">
            April 24 to 30, 2026 · Makalele Domes
          </p>
          <p className="mt-10 max-w-xl text-ink/80 leading-relaxed">
            Hi Brenda! Here's the scope for Vitality Retreat Lombok. Base
            package covers the essentials for telling the story of your
            relaunch. Add ons below let you dial in exactly what you want to
            walk away with. Total updates live as you build out your package.
          </p>
        </header>

        {/* 2. VISION */}
        <section className="py-16 md:py-20 border-t border-ink/10">
          <p className="eyebrow text-sage mb-6">The Vision</p>
          <p className="font-display text-2xl md:text-[32px] leading-[1.35] text-ink/90 max-w-2xl">
            The goal: capture the Lombok relaunch not as a highlight reel, but
            as proof of what Vitality is. Evolution, not escape. The footage
            lives past the week, driving your October waitlist and anchoring
            the brand online for the next twelve months. Every deliverable
            below is built toward that outcome.
          </p>
        </section>

        {/* 3. BASE PACKAGE */}
        <section className="py-16 md:py-20 border-t border-ink/10">
          <p className="eyebrow text-sage mb-6">Base Package · Included</p>
          <div className="border border-ink/15 rounded-sm p-8 md:p-12">
            <div className="flex items-start justify-between gap-6 mb-8">
              <h2 className="font-display text-3xl md:text-4xl">
                The Lombok Base
              </h2>
              <p className="font-display text-3xl md:text-4xl whitespace-nowrap">
                {formatUSD(BASE_PRICE)}
              </p>
            </div>
            <ul className="space-y-4 text-ink/85">
              {[
                '6 days on location shooting (April 24 to 30, Makalele Domes)',
                '1 master event highlight reel, 60 to 90 seconds, horizontal (optimized for website + YouTube, still posts well on Instagram)',
                '4 short form vertical reels from camera footage',
                'Full coverage of breath work, flow sessions, waterfall exploration, snorkeling, beach bonfire & cacao ceremony',
                'Pre retreat planning call & custom shot list aligned to your itinerary',
                '2 rounds of revisions per deliverable',
                'All final deliverables delivered in 4K within 30 days',
                'Private accommodation required. Ideally a private room at Makalele, or Mentigi Bay Dome Villa Lombok just down the road.',
              ].map((item, i) => (
                <li key={i} className="flex gap-4 leading-relaxed">
                  <span className="mt-[11px] shrink-0 w-[5px] h-[5px] rounded-full bg-terracotta" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. ADD-ONS */}
        <section className="py-16 md:py-20 border-t border-ink/10">
          <p className="eyebrow text-sage mb-6">Add Ons</p>
          <h2 className="font-display text-3xl md:text-4xl mb-10">
            Dial it in.
          </h2>
          <div className="space-y-4">
            {ADD_ONS.map((a) => {
              const checked = !!selected[a.id]
              return (
                <label
                  key={a.id}
                  htmlFor={`addon-${a.id}`}
                  className={[
                    'block cursor-pointer rounded-sm border p-6 md:p-7 transition-all duration-300 ease-out',
                    checked
                      ? 'border-terracotta/40 scale-[1.01]'
                      : 'border-ink/15 hover:border-ink/30',
                  ].join(' ')}
                  style={{
                    backgroundColor: checked
                      ? 'rgba(184, 101, 74, 0.08)'
                      : 'transparent',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <input
                      id={`addon-${a.id}`}
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(a.id)}
                      className="mt-[7px] h-4 w-4 shrink-0 accent-terracotta cursor-pointer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-4 mb-2">
                        <h3 className="font-display text-xl md:text-2xl">
                          {a.title}
                        </h3>
                        <p className="font-display text-xl md:text-2xl whitespace-nowrap text-terracotta">
                          +{formatUSD(a.price)}
                        </p>
                      </div>
                      <p className="text-ink/75 leading-relaxed text-[15px] md:text-base">
                        {a.description}
                      </p>
                      {a.deliverables && (
                        <ul className="mt-4 space-y-3 text-ink/75 text-[14px] md:text-[15px]">
                          {a.deliverables.map((d, di) => (
                            <li key={di} className="flex gap-3 leading-relaxed">
                              <span className="mt-[9px] shrink-0 w-[5px] h-[5px] rounded-full bg-terracotta" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {a.closer && (
                        <p className="mt-4 text-ink/75 leading-relaxed text-[15px] md:text-base">
                          {a.closer}
                        </p>
                      )}
                      {a.warning && (
                        <p className="mt-4 text-ink/55 italic leading-relaxed text-[13px] md:text-sm border-l-2 border-terracotta/30 pl-4">
                          {a.warning}
                        </p>
                      )}
                    </div>
                  </div>
                </label>
              )
            })}
          </div>
        </section>

        {/* 6. WHAT'S NOT INCLUDED */}
        <section className="py-16 md:py-20 border-t border-ink/10">
          <p className="eyebrow text-sage mb-6">What's Not Included</p>
          <ul className="space-y-3 text-sm md:text-[15px] text-ink/60 leading-relaxed">
            <li>Round trip flight to and from Bali covered by the client.</li>
            <li>Meals outside retreat schedule</li>
          </ul>
        </section>

        {/* 6.5 SCOPE */}
        <section className="py-16 md:py-20 border-t border-ink/10">
          <p className="eyebrow text-sage mb-6">Scope</p>
          <p className="font-display text-xl md:text-[24px] leading-[1.5] text-ink/90 max-w-2xl">
            What you confirm here is locked in. The shot list, shoot
            schedule, and edit timeline all get built around your
            selections once we start. Add ons can't be layered on mid
            retreat, so pick everything you want now. If you're on the
            fence about daily reels, photography, or the raw archive,
            include them. They can't be bolted on after the shoot begins.
          </p>
        </section>

        {/* 7. TIMELINE */}
        <section className="py-16 md:py-20 border-t border-ink/10">
          <p className="eyebrow text-sage mb-6">Timeline</p>
          <ol className="space-y-5">
            {[
              { date: 'Today (April 21)', event: 'Confirm package & 75% deposit' },
              { date: 'April 24 to 30', event: 'On location shoot (Ethan arrives from Bali on the 24th)' },
              { date: 'May 30', event: 'Master edit & all deliverables delivered (30 days from final shoot day)' },
            ].map((t, i) => (
              <li key={i} className="flex gap-6 md:gap-10 border-b border-ink/10 pb-5 last:border-0">
                <p className="font-display text-lg md:text-xl w-40 shrink-0 text-terracotta">
                  {t.date}
                </p>
                <p className="text-ink/85 leading-relaxed">{t.event}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 8. WHY THIS WORKS */}
        <section className="py-16 md:py-20 border-t border-ink/10">
          <p className="eyebrow text-sage mb-6">Why This Works</p>
          <p className="font-display text-xl md:text-[26px] leading-[1.5] text-ink/90 max-w-2xl">
            Brenda, our call landed easy and I think we're genuinely aligned
            on the vision and how we operate. I've spent the last four years
            filming retreats all over the world and I know how to capture the
            full experience, plus the moments you don't plan for. Those are
            what sell the next retreat. You're in good hands and I look
            forward to creating something magical together.
          </p>
          <a
            href="https://youtube.com/playlist?list=PLJQqxgbEUBec3px7QuAj0H2sE7ovYKKzs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 text-terracotta border-b border-terracotta/40 hover:border-terracotta transition-colors duration-300 pb-1 text-base md:text-lg"
          >
            Watch previous retreat highlight films →
          </a>
        </section>

        {/* 9. YOUR SELECTION */}
        <section className="py-16 md:py-20 border-t border-ink/10">
          <div
            className="border border-ink/15 rounded-sm p-8 md:p-12"
            aria-live="polite"
          >
            <p className="eyebrow text-sage mb-8">Your Selection</p>

            <ul className="space-y-4">
              <li className="flex justify-between gap-4 items-baseline">
                <span className="text-ink/85">Base Package</span>
                <span className="font-display text-lg whitespace-nowrap">
                  {formatUSD(BASE_PRICE)}
                </span>
              </li>
              {selectedAddOns.map((a) => (
                <li
                  key={a.id}
                  className="flex justify-between gap-4 items-baseline"
                  style={{ animation: 'fadeIn 300ms ease-out' }}
                >
                  <span className="text-ink/85">{a.title}</span>
                  <span className="font-display text-lg whitespace-nowrap text-terracotta">
                    +{formatUSD(a.price)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="h-px bg-ink/15 my-8" />

            <div className="flex justify-between items-baseline gap-4">
              <p className="font-display text-2xl md:text-3xl">
                Total Investment
              </p>
              <p className="font-display text-3xl md:text-5xl whitespace-nowrap text-terracotta">
                {formatUSD(animatedTotal)}
              </p>
            </div>

            <div className="mt-8 border border-ink/10 rounded-sm divide-y divide-ink/10">
              <div className="flex justify-between items-baseline gap-4 px-5 md:px-6 py-5">
                <div>
                  <p className="eyebrow text-terracotta text-[10px]">
                    Due today · 75%
                  </p>
                  <p className="text-[13px] text-ink/55 mt-1">
                    Confirms the booking &amp; travel
                  </p>
                </div>
                <p className="font-display text-2xl md:text-3xl whitespace-nowrap text-terracotta">
                  {formatUSD(animatedDueToday)}
                </p>
              </div>
              <div className="flex justify-between items-baseline gap-4 px-5 md:px-6 py-5">
                <div>
                  <p className="eyebrow text-ink/40 text-[10px]">
                    Due on delivery · 25%
                  </p>
                  <p className="text-[13px] text-ink/55 mt-1">
                    Paid when all deliverables land
                  </p>
                </div>
                <p className="font-display text-2xl md:text-3xl whitespace-nowrap text-ink/70">
                  {formatUSD(animatedDueOnDelivery)}
                </p>
              </div>
            </div>

            <p className="text-sm text-ink/55 mt-6">
              Selections are final once confirmed.
            </p>
          </div>
        </section>

        {/* 10. CTA */}
        <section className="pt-8 pb-24 md:pb-32">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-terracotta text-bg font-medium py-5 md:py-6 rounded-sm text-lg md:text-xl tracking-wide hover:bg-[#a3583f] transition-colors duration-300"
          >
            Confirm on WhatsApp →
          </a>
          <p className="text-center text-sm text-ink/55 mt-4">
            Your selection will be pre-filled in the message. Just hit send.
          </p>
        </section>

        <footer className="py-10 border-t border-ink/10">
          <p className="text-center text-xs text-ink/50 tracking-wide">
            Ethan Johnson · ezjonline.com · Bali, Indonesia
          </p>
        </footer>
      </main>

      {/* Sticky mobile total */}
      <div
        className="fixed bottom-0 left-0 right-0 md:hidden border-t border-ink/10 backdrop-blur-md z-40"
        style={{ backgroundColor: 'rgba(250, 247, 242, 0.88)' }}
        aria-live="polite"
      >
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <p className="eyebrow text-sage mb-1 text-[10px]">Your Investment</p>
            <p className="font-display text-2xl leading-none">
              {formatUSD(animatedTotal)}
            </p>
            <p className="text-[11px] text-ink/55 mt-1">
              Base + selected add-ons
            </p>
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-terracotta text-bg px-5 py-3 rounded-sm text-sm font-medium"
          >
            Confirm →
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

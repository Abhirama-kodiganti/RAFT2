'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react'

/* ============ IMAGE PLACEHOLDERS (easy to replace) ============ */
const IMG = {
  cover: 'https://images.unsplash.com/photo-1530227222086-4037fdd5e723',
  smile: 'https://images.pexels.com/photos/3228726/pexels-photo-3228726.jpeg',
  little1: 'https://images.unsplash.com/photo-1542891433-684dbf58d399',
  little2: 'https://images.pexels.com/photos/6043355/pexels-photo-6043355.jpeg',
  favorite: 'https://images.pexels.com/photos/30747571/pexels-photo-30747571.jpeg',
  m1: 'https://images.unsplash.com/photo-1426543881949-cbd9a76740a4',
  m2: 'https://images.unsplash.com/photo-1591969851586-adbbd4accf81',
  m3: 'https://images.pexels.com/photos/12071172/pexels-photo-12071172.jpeg',
  m4: 'https://images.unsplash.com/photo-1530227222086-4037fdd5e723',
  m5: 'https://images.pexels.com/photos/3228726/pexels-photo-3228726.jpeg',
  m6: 'https://images.unsplash.com/photo-1542891433-684dbf58d399',
}

/* ============ HANGING POLAROID ============ */
function HangingPhoto({ src, caption, rotate = 0, delay = 0, top = 0, swingDuration = 5 }) {
  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{ top: `${top}px`, transformOrigin: 'top center' }}
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
    >
      {/* String */}
      <div className="hanging-string h-10" />
      {/* Clothespin */}
      <div className="clothespin w-5 h-3 rounded-sm -mb-1 z-20 relative" />
      {/* Swinging polaroid */}
      <motion.div
        animate={{ rotate: [rotate - 1.5, rotate + 1.5, rotate - 1.5] }}
        transition={{ duration: swingDuration, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'top center' }}
        whileHover={{ scale: 1.06, rotate: rotate + 4, zIndex: 30 }}
        className="polaroid p-2 pb-6 cursor-pointer relative"
      >
        <div className="w-48 h-28 sm:w-56 sm:h-36 overflow-hidden bg-stone-200">
          <img src={src} alt={caption} className="w-full h-full object-cover" style={{ filter: 'sepia(0.18) saturate(0.92) contrast(0.96)' }} />
        </div>
        {caption && (
          <p className="font-caveat text-stone-700 text-center text-sm mt-2 px-1">{caption}</p>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ============ MASKING TAPE ============ */
function Tape({ className = '', rotate = 0 }) {
  return (
    <div
      className={`tape absolute w-16 h-5 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    />
  )
}

/* ============ PRESSED FLOWER (CSS art) ============ */
function PressedFlower({ className = '', size = 60, color = '#a8447a' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" style={{ filter: 'sepia(0.3) opacity(0.85)' }}>
      <g transform="translate(50,50)">
        {[0,1,2,3,4].map(i => (
          <ellipse key={i} cx="0" cy="-18" rx="10" ry="20" fill={color} opacity="0.7" transform={`rotate(${i*72})`} />
        ))}
        <circle r="7" fill="#d4a574" />
      </g>
      <path d="M 50 60 Q 45 80 35 95" stroke="#4a6b2a" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <ellipse cx="40" cy="78" rx="6" ry="3" fill="#5a7b3a" opacity="0.55" transform="rotate(-30 40 78)"/>
    </svg>
  )
}

/* ============ FLOATING PARTICLES (dust + petals) ============ */
function FloatingParticles() {
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState([])
  useEffect(() => {
    const list = Array.from({ length: 22 }).map((_, i) => ({
      isPetal: i % 4 === 0,
      size: (i % 4 === 0 ? 8 + Math.random() * 6 : 2 + Math.random() * 2),
      left: Math.random() * 100,
      duration: 14 + Math.random() * 16,
      delay: Math.random() * 10,
      xDrift1: Math.random() * 80 - 40,
      xDrift2: Math.random() * 80 - 40,
    }))
    setParticles(list)
    setMounted(true)
  }, [])
  if (!mounted) return null
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {particles.map((p, i) => {
        const { isPetal, size, left, duration, delay } = p
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: '-20px',
              width: size, height: size,
              background: isPetal
                ? 'radial-gradient(circle, rgba(220,170,150,0.85), rgba(180,100,90,0.5))'
                : 'radial-gradient(circle, rgba(255,230,190,0.7), rgba(255,200,140,0))',
              boxShadow: isPetal ? '0 0 6px rgba(220,170,150,0.4)' : '0 0 4px rgba(255,210,150,0.5)',
              borderRadius: isPetal ? '60% 40% 50% 50%' : '50%',
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, p.xDrift1, p.xDrift2],
              rotate: isPetal ? [0, 360] : 0,
              opacity: [0, 0.9, 0.9, 0],
            }}
            transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
          />
        )
      })}
    </div>
  )
}

/* ============ PAGE CONTENT COMPONENTS ============ */

function CoverSpread() {
  return (
    <div className="relative w-full h-full flex items-center justify-center px-8">
      <PressedFlower className="absolute top-8 left-10" size={80} color="#a8447a" />
      <PressedFlower className="absolute bottom-12 right-12" size={70} color="#8a3a5a" />
      <PressedFlower className="absolute top-1/3 right-16" size={50} color="#b85a8a" />

      <Tape className="top-6 left-1/2 -translate-x-1/2" rotate={-3} />

      <div className="text-center relative z-10 max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="font-caveat text-stone-700 text-2xl mb-2">~ a story kept ~</motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 1 }}
          className="font-vibes text-7xl sm:text-8xl text-stone-800 leading-none mb-4"
          style={{ textShadow: '2px 2px 4px rgba(120,80,40,0.2)' }}>
          Story Book
        </motion.h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
          className="h-px bg-stone-600/40 w-48 mx-auto my-6" />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="font-playfair italic text-stone-700 text-xl">
          a cute letter, folded into pages
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          className="font-caveat text-stone-600 mt-12 text-lg">
          — for you, always —
        </motion.p>
      </div>
    </div>
  )
}

function FirstSmileSpread() {
  return (
    <div className="relative w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6 p-10">
      {/* Left: handwritten note */}
      <div className="relative flex flex-col justify-center">
        <Tape className="-top-2 left-8" rotate={-8} />
        <Tape className="-top-2 right-12" rotate={6} />
        <PressedFlower className="absolute -bottom-2 -left-4" size={70} color="#b85a8a" />

        <h2 className="font-vibes text-5xl sm:text-6xl text-stone-800 mb-6">The Meet Up</h2>
        <p className="font-playfair italic text-stone-700 text-lg leading-relaxed">
          I remember the first time i met you.<br/>
          The world held its breath — and so did I.
        </p>
        <p className="font-caveat text-stone-600 mt-8 text-2xl">
          your eyes, &amp; the whole afternoon turned gold.
        </p>
        <p className="font-poppins text-stone-500 text-xs mt-10 tracking-widest uppercase">
          — Spring · the café on 4th —
        </p>
      </div>

      {/* Right: hanging polaroid wall */}
      <div className="relative">
        {/* String across top */}
        <div className="absolute top-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-700 to-transparent opacity-40" />
        <div className="flex justify-around">
          <HangingPhoto src="/eyes.jpeg" caption="those eyes." rotate={-4} delay={0.5} top={0} swingDuration={6} />
        </div>
      </div>
    </div>
  )
}

function LittleThingsSpread() {
  const items = [
    'the way you hold your coffee and drink',
    'how you put hmmm.... in every text',
    'how you find light in the dark',
    'the cute smile when you are uncomfortable',
    'how you read the last page first',
  ]
  return (
    <div className="relative w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6 p-10">
      <div className="relative">
        <div className="absolute top-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-700 to-transparent opacity-40" />
        <div className="flex justify-around">
          <HangingPhoto src={IMG.little1} caption="sundays" rotate={3} delay={0.3} top={0} swingDuration={5.5} />
          <HangingPhoto src="/sleeping.jpeg" caption="sleeping beauty" rotate={-5} delay={0.6} top={20} swingDuration={6.5} />
        </div>
      </div>

      <div className="relative flex flex-col justify-center">
        <Tape className="-top-2 left-6" rotate={4} />
        <h2 className="font-vibes text-5xl sm:text-6xl text-stone-800 mb-6">the little things</h2>
        <ul className="space-y-3 font-caveat text-2xl text-stone-700">
          {items.map((t, i) => (
            <motion.li key={i}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.18 }}
              className="flex items-start gap-3">
              <Heart className="w-4 h-4 mt-2 text-rose-700/60 flex-shrink-0" fill="currentColor" />
              <span>{t}</span>
            </motion.li>
          ))}
        </ul>
        <PressedFlower className="absolute -bottom-2 right-4" size={60} color="#9a3a6a" />
      </div>
    </div>
  )
}

function FavoritePlaceSpread() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-10">
      <PressedFlower className="absolute top-8 right-10" size={90} color="#a8447a" />
      <PressedFlower className="absolute bottom-10 left-8" size={70} color="#7a3a5a" />

      {/* Center polaroid pinned to page */}
      <div className="relative">
        <Tape className="-top-3 -left-2" rotate={-12} />
        <Tape className="-top-3 -right-2" rotate={12} />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.04, rotate: 0 }}
          className="polaroid p-3 pb-10">
          <div className="w-72 h-72 sm:w-80 sm:h-80 overflow-hidden">
            <img src={IMG.favorite} alt="" className="w-full h-full object-cover" style={{ filter: 'sepia(0.2) saturate(0.92)' }} />
          </div>
          <p className="font-caveat text-stone-700 text-center text-2xl mt-3">my favorite place.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="absolute -right-6 sm:-right-24 top-8 max-w-xs">
          <h2 className="font-vibes text-4xl sm:text-5xl text-stone-800 leading-tight">
            You became<br/>my favorite place.
          </h2>
          <p className="font-playfair italic text-stone-700 mt-4 text-base leading-relaxed">
            Not a city. Not a season.<br/>
            Just the quiet between two breaths,<br/>
            when you&apos;re the one breathing with me.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

function MemoriesSpread() {
  const memories = [
    { src: "/bike.jpeg", cap: 'first roadtrip', r: -6 },
    { src: "three.jpeg", cap: 'rainy tuesday', r: 4 },
    { src: "hmm.jpeg", cap: 'that sunset', r: -3 },
    { src: "/gang.jpeg", cap: 'lazy sunday', r: 5 },
    { src: "/trekk.jpeg", cap: 'us, mostly', r: -4 },
    { src: "/view.jpeg", cap: 'forever', r: 3 },
  ]
  return (
    <div className="relative w-full h-full p-8 sm:p-10">
      <div className="text-center mb-6">
        <h2 className="font-vibes text-5xl sm:text-6xl text-stone-800">our memories</h2>
        <p className="font-caveat text-stone-600 text-lg">~ a few of the moments we kept ~</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
        {memories.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, rotate: m.r }}
            animate={{ opacity: 1, y: 0, rotate: m.r }}
            transition={{ delay: 0.15 * i, duration: 0.7 }}
            whileHover={{ scale: 1.07, rotate: 0, zIndex: 20 }}
            className="polaroid p-2 pb-6 relative cursor-pointer">
            <Tape className="-top-2 left-1/2 -translate-x-1/2" rotate={(i%2===0?-6:6)} />
            <div className="w-full aspect-square overflow-hidden">
              <img src={m.src} alt={m.cap} className="w-full h-full object-cover"
                style={{ filter: 'sepia(0.2) saturate(0.9) contrast(0.97)' }} />
            </div>
            <p className="font-caveat text-stone-700 text-center text-base mt-2">{m.cap}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function LoveLetterSpread() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-10">
      <PressedFlower className="absolute top-6 left-6" size={70} color="#a8447a" />
      <PressedFlower className="absolute bottom-6 right-6" size={60} color="#8a3a5a" />
      <Tape className="top-4 left-1/2 -translate-x-1/2" rotate={-2} />

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
        className="max-w-xl text-center">
        <p className="font-caveat text-stone-600 text-xl mb-2">to you,</p>
        <h2 className="font-vibes text-5xl sm:text-6xl text-stone-800 mb-6">A letter</h2>

        <div className="font-caveat text-stone-800 text-xl sm:text-2xl leading-relaxed text-left space-y-4">
          <p>If I had to begin again, I would still choose you —</p>
          <p>in the rain, at the wrong time, on the slowest train,</p>
          <p>at any age, in any life, with any name.</p>
          <p>I would still pick the booth by the window, the long way home,</p>
          <p>the song we don&apos;t agree on, &amp; the silence that follows.</p>
          <p className="pt-2">I would still, somehow, somewhere, find you.</p>
        </div>

        <p className="font-caveat text-stone-700 text-2xl mt-8">— always, &amp; in every margin,</p>
        <p className="font-vibes text-4xl text-stone-800 mt-1">yours.</p>
      </motion.div>
    </div>
  )
}

/* ============ PAGES CONFIG ============ */
const PAGES = [
  { id: 'cover', label: 'Cover', component: CoverSpread },
  { id: 'smile', label: 'The Meet', component: FirstSmileSpread },
  { id: 'little', label: 'The Little Things', component: LittleThingsSpread },
  { id: 'favorite', label: 'My Favorite Place', component: FavoritePlaceSpread },
  { id: 'memories', label: 'Our Memories', component: MemoriesSpread },
  { id: 'letter', label: 'A Letter', component: LoveLetterSpread },
]

/* ============ CLOSED BOOK (landing) ============ */
function ClosedBook({ onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1, rotateY: -90 }}
      transition={{ duration: 1 }}
      className="relative flex flex-col items-center justify-center min-h-screen px-4"
    >
      <div className="candle-glow absolute w-[60vw] h-[60vw] max-w-[700px] max-h-[700px]" />

      <motion.button
        onClick={onOpen}
        whileHover={{ scale: 1.03, rotateY: -8, rotateX: 2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="relative leather rounded-r-md rounded-l-sm shadow-[0_30px_80px_rgba(0,0,0,0.7)]
          w-[280px] h-[380px] sm:w-[340px] sm:h-[460px]
          border-r-8 border-r-[#1a0a04] border-b-2 border-b-black/40
          flex items-center justify-center
          group cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Inner gold frame */}
        <div className="absolute inset-4 border border-amber-200/30 rounded-sm" />
        <div className="absolute inset-6 border border-amber-200/20 rounded-sm" />

        {/* Corner ornaments */}
        {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((p) => (
          <Sparkles key={p} className={`absolute ${p} w-4 h-4 text-amber-200/40`} />
        ))}

        <div className="text-center px-6 z-10">
          <p className="font-caveat text-amber-100/60 text-lg mb-2">~ a story ~</p>
          <h1 className="font-vibes text-amber-100/90 text-5xl sm:text-6xl leading-tight"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
            Our Story
          </h1>
          <div className="h-px bg-amber-200/30 w-32 mx-auto my-5" />
          <p className="font-playfair italic text-amber-100/70 text-sm">a story kept in pages</p>
        </div>

        {/* Spine shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/70 to-transparent rounded-l-sm" />
      </motion.button>

      <motion.p
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="font-caveat text-amber-100/70 text-xl mt-10">
        — click to open —
      </motion.p>
    </motion.div>
  )
}

/* ============ MAIN APP ============ */
function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = back

  const next = () => {
    if (currentPage < PAGES.length - 1) {
      setDirection(1)
      setCurrentPage((p) => p + 1)
    }
  }
  const prev = () => {
    if (currentPage > 0) {
      setDirection(-1)
      setCurrentPage((p) => p - 1)
    }
  }

  // Keyboard nav
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, currentPage])

  const CurrentPage = PAGES[currentPage].component

  return (
    <main className="relative min-h-screen w-full overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #2a1a10 0%, #120a06 70%, #050302 100%)',
      }}>
      {/* Ambient candlelight */}
      <div className="candle-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[1400px] max-h-[1400px] pointer-events-none" />
      <FloatingParticles />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <ClosedBook key="closed" onOpen={() => setIsOpen(true)} />
        ) : (
          <motion.div
            key="open"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
            className="relative flex flex-col items-center justify-center min-h-screen px-4 py-8"
          >
            {/* Book frame */}
            <div
              className="relative w-full max-w-5xl"
              style={{ perspective: '2500px' }}
            >
              {/* Book base / leather edge */}
              <div className="absolute -inset-3 leather rounded-lg shadow-[0_40px_100px_rgba(0,0,0,0.8)] -z-10" />
              <div className="absolute -inset-2 page-edges opacity-50 -z-10 rounded" />

              {/* Page area */}
              <div className="relative h-[640px] sm:h-[680px] w-full">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentPage}
                    custom={direction}
                    initial={{ rotateY: direction === 1 ? 92 : -92, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: direction === 1 ? -92 : 92, opacity: 0 }}
                    transition={{ duration: 0.95, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      transformOrigin: direction === 1 ? 'left center' : 'right center',
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                    }}
                    className="paper-aged rounded-md overflow-hidden shadow-2xl"
                  >
                    <CurrentPage />
                    {/* Page number */}
                    <div className="absolute bottom-3 right-6 font-playfair italic text-stone-600/70 text-sm">
                      — {currentPage + 1} —
                    </div>
                    {/* Subtle inner shadow on spine side */}
                    <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-stone-900/25 to-transparent pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-stone-900/15 to-transparent pointer-events-none" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Nav buttons */}
              <button
                onClick={prev}
                disabled={currentPage === 0}
                className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 z-40
                  w-12 h-12 rounded-full bg-stone-900/60 hover:bg-stone-900/90
                  border border-amber-100/20 text-amber-100/80 hover:text-amber-100
                  flex items-center justify-center transition-all
                  disabled:opacity-20 disabled:cursor-not-allowed
                  backdrop-blur-sm">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                disabled={currentPage === PAGES.length - 1}
                className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 z-40
                  w-12 h-12 rounded-full bg-stone-900/60 hover:bg-stone-900/90
                  border border-amber-100/20 text-amber-100/80 hover:text-amber-100
                  flex items-center justify-center transition-all
                  disabled:opacity-20 disabled:cursor-not-allowed
                  backdrop-blur-sm">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom: page indicator + chapter title */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <p className="font-caveat text-amber-100/70 text-xl tracking-wide">
                {PAGES[currentPage].label}
              </p>
              <div className="flex items-center gap-2">
                {PAGES.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setDirection(i > currentPage ? 1 : -1)
                      setCurrentPage(i)
                    }}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === currentPage
                        ? 'w-8 bg-amber-100/90'
                        : 'w-1.5 bg-amber-100/30 hover:bg-amber-100/60'
                    }`}
                    aria-label={`Go to ${p.label}`}
                  />
                ))}
              </div>
              <button
                onClick={() => { setIsOpen(false); setCurrentPage(0) }}
                className="font-caveat text-amber-100/40 hover:text-amber-100/80 text-sm mt-2 transition">
                close the book
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default App

import './globals.css'
import { Playfair_Display, Great_Vibes, Poppins, Caveat } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-poppins',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-caveat',
  display: 'swap',
})

export const metadata = {
  title: 'Story — A Letter',
  description: 'A handcrafted cinematic love story.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${greatVibes.variable} ${poppins.variable} ${caveat.variable}`}>
      <body className="font-poppins antialiased bg-[#1a1410]">{children}</body>
    </html>
  )
}

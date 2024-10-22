import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { NavBar } from "@/components/NavBar"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Gas Stations Map",
  description: "Find Gas Stations",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="max-w-md mx-auto bg-slate-300 rounded-md max-h-screen">
          <NavBar />
          <div className="p-4 h-[calc(100vh-48px)]">{children}</div>
        </div>
      </body>
    </html>
  )
}

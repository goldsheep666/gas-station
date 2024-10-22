"use client"
import React, { useState } from "react"
import { Fuel, X, Menu } from "lucide-react"
import Link from "next/link"

export const NavBar: React.FC = ({}) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div
        className="flex justify-between items-center p-4 bg-white"
        style={{ height: "48px" }}
      >
        <Fuel />
        <button className="text-black" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="px-4 bg-white">
          <hr />
          <ul className="py-2">
            <li className="pb-2 font-bold｀">Hello</li>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

import { Search, PlusCircle, Heart } from 'lucide-react'
import React from 'react'

export default function Navbar({ onNew, favoritesCount, onSearchChange, search }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
        <a href="/" className="font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">ReVinted</a>

        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by title, brand, tags..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button onClick={onNew} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
          <PlusCircle size={18} />
          <span>Sell</span>
        </button>

        <div className="relative ml-2">
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition">
            <Heart size={18} className="text-pink-600" />
            <span>Saved</span>
          </button>
          {favoritesCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-pink-600 text-white rounded-full px-1.5 py-0.5">{favoritesCount}</span>
          )}
        </div>
      </div>
    </header>
  )
}

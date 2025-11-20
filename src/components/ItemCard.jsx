import React from 'react'
import { Heart } from 'lucide-react'

export default function ItemCard({ item, onFavorite, onOpen }) {
  return (
    <div className="group bg-white/70 backdrop-blur rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition cursor-pointer" onClick={() => onOpen(item)}>
      <div className="aspect-square bg-slate-100 overflow-hidden">
        {item.image_url ? (
          <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
        ) : (
          <div className="w-full h-full grid place-items-center text-slate-400">No image</div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-semibold leading-tight line-clamp-1">{item.title}</h4>
            <p className="text-xs text-slate-500 line-clamp-1">{[item.brand, item.size, item.condition].filter(Boolean).join(' • ')}</p>
          </div>
          <button className="shrink-0 p-1.5 rounded-lg hover:bg-pink-50" onClick={(e) => { e.stopPropagation(); onFavorite(item) }}>
            <Heart size={16} className="text-pink-600" />
          </button>
        </div>
        <div className="mt-2 font-bold">${item.price?.toFixed(2)}</div>
      </div>
    </div>
  )
}

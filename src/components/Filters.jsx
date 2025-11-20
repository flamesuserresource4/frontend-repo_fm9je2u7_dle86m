import React from 'react'

const categories = ['Tops', 'Bottoms', 'Shoes', 'Outerwear', 'Accessories']
const sizes = ['XS', 'S', 'M', 'L', 'XL']

export default function Filters({ filters, setFilters, onApply }) {
  const set = (key, value) => setFilters(prev => ({ ...prev, [key]: value }))

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="sticky top-20 bg-white/70 backdrop-blur rounded-xl border border-slate-200 p-4">
        <h3 className="font-semibold mb-3">Filters</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-slate-600">Category</label>
            <select value={filters.category || ''} onChange={e => set('category', e.target.value || null)} className="w-full mt-1 border rounded-lg px-3 py-2">
              <option value="">All</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-600">Size</label>
            <select value={filters.size || ''} onChange={e => set('size', e.target.value || null)} className="w-full mt-1 border rounded-lg px-3 py-2">
              <option value="">All</option>
              {sizes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-sm text-slate-600">Min price</label>
              <input type="number" value={filters.min_price ?? ''} onChange={e => set('min_price', e.target.value ? Number(e.target.value) : null)} className="w-full mt-1 border rounded-lg px-3 py-2" />
            </div>
            <div className="flex-1">
              <label className="text-sm text-slate-600">Max price</label>
              <input type="number" value={filters.max_price ?? ''} onChange={e => set('max_price', e.target.value ? Number(e.target.value) : null)} className="w-full mt-1 border rounded-lg px-3 py-2" />
            </div>
          </div>
          <button onClick={onApply} className="w-full mt-2 bg-slate-900 text-white rounded-lg py-2 hover:bg-slate-800">Apply</button>
        </div>
      </div>
    </aside>
  )
}

import React, { useState } from 'react'

export default function NewListingModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState({ title: '', price: '', category: 'Tops', size: '', brand: '', condition: 'Good', color: '', image_url: '', description: '' })
  if (!open) return null

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    const payload = { ...form, price: Number(form.price) }
    onCreate(payload)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 grid place-items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-4 border-b font-semibold">New Listing</div>
        <form onSubmit={submit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-sm text-slate-600">Title</label>
            <input className="w-full border rounded-lg px-3 py-2" value={form.title} onChange={e => set('title', e.target.value)} required />
          </div>
          <div>
            <label className="text-sm text-slate-600">Price</label>
            <input type="number" min="0" step="0.01" className="w-full border rounded-lg px-3 py-2" value={form.price} onChange={e => set('price', e.target.value)} required />
          </div>
          <div>
            <label className="text-sm text-slate-600">Category</label>
            <select className="w-full border rounded-lg px-3 py-2" value={form.category} onChange={e => set('category', e.target.value)}>
              {['Tops','Bottoms','Shoes','Outerwear','Accessories'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-600">Size</label>
            <input className="w-full border rounded-lg px-3 py-2" value={form.size} onChange={e => set('size', e.target.value)} placeholder="e.g., M or 42" />
          </div>
          <div>
            <label className="text-sm text-slate-600">Brand</label>
            <input className="w-full border rounded-lg px-3 py-2" value={form.brand} onChange={e => set('brand', e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-slate-600">Condition</label>
            <select className="w-full border rounded-lg px-3 py-2" value={form.condition} onChange={e => set('condition', e.target.value)}>
              {['New','Like New','Good','Fair'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-600">Color</label>
            <input className="w-full border rounded-lg px-3 py-2" value={form.color} onChange={e => set('color', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-slate-600">Image URL</label>
            <input className="w-full border rounded-lg px-3 py-2" value={form.image_url} onChange={e => set('image_url', e.target.value)} placeholder="https://..." />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-slate-600">Description</label>
            <textarea className="w-full border rounded-lg px-3 py-2" rows={3} value={form.description} onChange={e => set('description', e.target.value)} />
          </div>
          <div className="md:col-span-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white">Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

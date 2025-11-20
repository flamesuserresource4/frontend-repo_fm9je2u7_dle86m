import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Filters from './components/Filters'
import ItemCard from './components/ItemCard'
import NewListingModal from './components/NewListingModal'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({})
  const [newOpen, setNewOpen] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  const params = useMemo(() => ({
    q: search || undefined,
    ...filters,
    limit: 24,
  }), [search, filters])

  const fetchFeed = async () => {
    setLoading(true)
    const res = await fetch(`${baseUrl}/api/feed`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(params) })
    const data = await res.json()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => { fetchFeed() }, [])
  useEffect(() => { const t = setTimeout(fetchFeed, 300); return () => clearTimeout(t) }, [search, filters])

  const createListing = async (payload) => {
    const res = await fetch(`${baseUrl}/api/items`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (res.ok) {
      setNewOpen(false)
      fetchFeed()
    }
  }

  const favorite = async (item) => {
    const userId = 'demo-user'
    await fetch(`${baseUrl}/api/items/${item.id || item._id}/favorite`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: userId }) })
    setFavorites(prev => Array.from(new Set([...prev, item.id || item._id])))
  }

  const openItem = (item) => {
    // For MVP open a simple alert; could be a rich detail sheet
    alert(`${item.title}\n$${item.price}\n${item.description || ''}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar onNew={() => setNewOpen(true)} favoritesCount={favorites.length} onSearchChange={setSearch} search={search} />

      <main className="mx-auto max-w-6xl px-4 py-6 flex gap-6">
        <Filters filters={filters} setFilters={setFilters} onApply={fetchFeed} />

        <section className="flex-1">
          {loading ? (
            <div className="grid place-items-center h-64 text-slate-500">Loading feed…</div>
          ) : items.length === 0 ? (
            <div className="grid place-items-center h-64 text-slate-500">No items match your filters yet</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {items.map(item => (
                <ItemCard key={item.id} item={item} onFavorite={favorite} onOpen={openItem} />
              ))}
            </div>
          )}
        </section>
      </main>

      <NewListingModal open={newOpen} onClose={() => setNewOpen(false)} onCreate={createListing} />
    </div>
  )
}

export default App

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import ExperienceCard from '../components/ExperienceCard'
import type { Experience } from '../types'

export default function Home(){
  const [items, setItems] = useState<Experience[]>([])
  const [searchParams] = useSearchParams()
  const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  useEffect(()=>{
    const search = searchParams.get('search') || ''
    const url = search 
      ? `${API}/api/experiences?search=${encodeURIComponent(search)}`
      : `${API}/api/experiences`
    
    fetch(url)
      .then(r=>r.json())
      .then(setItems)
      .catch(console.error)
  },[searchParams])

  const searchQuery = searchParams.get('search') || ''

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch={true} />

      <main className="max-w-6xl mx-auto px-6 py-8">
        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Search results for "{searchQuery}"</h2>
            <p className="text-gray-600">{items.length} experience{items.length !== 1 ? 's' : ''} found</p>
          </div>
        )}
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {searchQuery ? 'No experiences found' : 'Loading experiences...'}
            </h3>
            <p className="text-gray-500">
              {searchQuery && 'Try a different search term or browse all experiences'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(i=> <ExperienceCard key={i.id} item={i} />)}
          </div>
        )}
      </main>
    </div>
  )
}

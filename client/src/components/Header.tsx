import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface HeaderProps {
  showSearch?: boolean
}

export default function Header({ showSearch = false }: HeaderProps) {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = React.useState('')

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition">
          {/* Logo - Map pin with 'hd' text */}
          <div className="relative w-16 h-20">
            {/* Map pin shape */}
            <svg viewBox="0 0 100 140" className="w-full h-full">
              {/* Black pin body */}
              <path 
                d="M50 10 C 28 10, 10 28, 10 50 C 10 72, 50 130, 50 130 C 50 130, 90 72, 90 50 C 90 28, 72 10, 50 10 Z" 
                fill="black"
              />
              {/* Yellow vertical line */}
              <line x1="50" y1="25" x2="50" y2="75" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round"/>
              {/* Yellow curved line (smile/arc) */}
              <path 
                d="M 35 50 Q 50 65, 65 50" 
                stroke="#FBBF24" 
                strokeWidth="3" 
                fill="none" 
                strokeLinecap="round"
              />
              {/* Yellow 'hd' text */}
              <text 
                x="50" 
                y="48" 
                fontSize="28" 
                fontWeight="bold" 
                fill="#FBBF24" 
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
              >
                hd
              </text>
            </svg>
          </div>
          
          {/* Text logo */}
          <div className="flex flex-col -ml-2">
            <span className="text-2xl font-bold text-gray-800 leading-none">highway</span>
            <span className="text-2xl font-bold text-gray-800 leading-none">delite</span>
          </div>
        </Link>
        
        {showSearch && (
          <div className="flex items-center gap-2">
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search experiences" 
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-yellow-400 w-64" 
            />
            <button 
              onClick={handleSearch}
              className="px-6 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 font-medium transition"
            >
              Search
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

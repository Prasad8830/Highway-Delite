import React from 'react'
import { Link } from 'react-router-dom'
import type { Experience } from '../types'

export default function ExperienceCard({ item }: { item: Experience }){
  return (
    <Link to={`/experience/${item.id}`} className="group">
      <div className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-lg overflow-hidden">
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          <img 
            src={item.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'} 
            alt={item.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
          {item.location && (
            <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-700">
              📍 {item.location}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 group-hover:text-yellow-600 transition">{item.title}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.short}</p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500">From </span>
              <span className="text-xl font-bold text-gray-900">₹{item.price}</span>
            </div>
            <div className="px-4 py-2 bg-yellow-400 text-black rounded-lg font-medium group-hover:bg-yellow-500 transition">
              View Details
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

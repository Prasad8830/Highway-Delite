import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import type { Experience } from '../types'

export default function Details(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [exp, setExp] = useState<Experience | null>(null)
  const [selectedDate, setSelectedDate] = useState('Oct 22')
  const [selectedTime, setSelectedTime] = useState('')
  const [qty, setQty] = useState(1)
  const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  useEffect(()=>{
    if(!id) return
    fetch(`${API}/api/experiences/${id}`)
      .then(r=>r.json())
      .then(data => {
        setExp(data)
        if(data.times && data.times.length > 0) {
          setSelectedTime(data.times[0])
        }
      })
      .catch(console.error)
  },[id])

  if(!exp) return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading experience...</p>
        </div>
      </div>
    </div>
  )

  const subtotal = exp.price * qty
  const taxes = Math.round(subtotal * 0.06)
  const total = subtotal + taxes

  const dates = ['Oct 22', 'Oct 23', 'Oct 24', 'Oct 25', 'Oct 26']
  const times = exp.times || ['07:00 am', '09:00 am', '11:00 am', '01:00 pm']

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <button 
          onClick={()=>navigate(-1)} 
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-black transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="relative h-96 bg-gray-200 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={exp.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'} 
                alt={exp.title} 
                className="w-full h-full object-cover" 
              />
              {exp.location && (
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    {exp.location}
                  </div>
                </div>
              )}
            </div>

            {/* Title & Description */}
            <div>
              <h1 className="text-4xl font-bold mb-3">{exp.title}</h1>
              <p className="text-gray-700 text-lg leading-relaxed">{exp.short}</p>
            </div>

            {/* Choose date */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Choose date</h3>
              <div className="flex gap-3 flex-wrap">
                {dates.map(d => (
                  <button
                    key={d}
                    onClick={()=>setSelectedDate(d)}
                    className={`px-5 py-3 border-2 rounded-lg font-medium transition ${
                      selectedDate === d 
                        ? 'bg-yellow-400 border-yellow-400 text-black' 
                        : 'bg-white border-gray-300 hover:border-yellow-400'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Choose time */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Choose time</h3>
              <div className="flex gap-3 flex-wrap">
                {times.map(t => (
                  <button
                    key={t}
                    onClick={()=>setSelectedTime(t)}
                    className={`px-5 py-3 border-2 rounded-lg font-medium transition ${
                      selectedTime === t 
                        ? 'bg-yellow-400 border-yellow-400 text-black' 
                        : 'bg-white border-gray-300 hover:border-yellow-400'
                    }`}
                  >
                    <div>{t}</div>
                    <div className="text-xs text-gray-500 mt-1">2 left</div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">All times are in IST (GMT +5:30)</p>
            </div>

            {/* About */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg mb-3">About</h3>
              <p className="text-gray-700 leading-relaxed">{exp.about || 'Scenic routes, trained guides, and safety briefing. Minimum age 10.'}</p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="text-sm text-gray-600 mb-1">Starts at</div>
              <div className="text-3xl font-bold mb-6">₹{exp.price}</div>

              <div className="mb-6">
                <div className="text-sm font-medium text-gray-700 mb-3">Quantity</div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={()=>setQty(Math.max(1, qty-1))} 
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-yellow-400 transition flex items-center justify-center font-bold"
                  >
                    −
                  </button>
                  <span className="font-semibold text-xl w-8 text-center">{qty}</span>
                  <button 
                    onClick={()=>setQty(qty+1)} 
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-yellow-400 transition flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2 text-sm mb-6">
                <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span className="font-medium">₹{subtotal}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Taxes</span><span className="font-medium">₹{taxes}</span></div>
                <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t">
                  <span>Total</span><span>₹{total}</span>
                </div>
              </div>

              <button 
                onClick={()=>navigate('/checkout')} 
                className="w-full px-4 py-4 bg-yellow-400 rounded-lg font-semibold hover:bg-yellow-500 transition shadow-md hover:shadow-lg"
              >
                Confirm Booking
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

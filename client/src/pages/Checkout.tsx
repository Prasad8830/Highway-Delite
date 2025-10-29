import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

export default function Checkout(){
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [emailError, setEmailError] = useState('')
  const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Handle email change with validation
  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (value && !validateEmail(value)) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
  }

  const handleConfirm = async ()=>{
    // basic validation
    if(!name || !email) {
      alert('Please fill in your name and email')
      return
    }

    if(!validateEmail(email)) {
      alert('Please enter a valid email address')
      return
    }

    if(!agreedToTerms) {
      alert('Please agree to the terms and safety policy to continue')
      return
    }

    // post booking (stub values for experienceId, date, time, qty)
    const payload = { 
      experienceId: 'exp_1', 
      date: '2025-10-22', 
      time: '09:00 am', 
      qty: 1, 
      name, 
      email,
      promoCode: promoCode || undefined
    }
    
    try {
      const res = await fetch(`${API}/api/bookings`, { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(payload) 
      })
      const data = await res.json()
      // navigate to confirmed page with the reference ID
      navigate(`/confirmed?ref=${data.refId}`)
    } catch(error) {
      console.error('Booking failed:', error)
      alert('Booking failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-5xl mx-auto px-6 py-8">
        <button 
          onClick={()=>navigate(-1)} 
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-black transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
          Back
        </button>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full name *</label>
                  <input 
                    value={name} 
                    onChange={e=>setName(e.target.value)} 
                    placeholder="Your name" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input 
                    type="email"
                    value={email} 
                    onChange={e=>handleEmailChange(e.target.value)} 
                    placeholder="your.email@example.com" 
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none ${
                      emailError 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:border-yellow-400'
                    }`}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-2">{emailError}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Promo Code</h2>
              <div className="flex gap-3">
                <input 
                  value={promoCode}
                  onChange={e=>setPromoCode(e.target.value)}
                  placeholder="Enter code" 
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400 flex-1" 
                />
                <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium">
                  Apply
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={agreedToTerms}
                  onChange={e=>setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400" 
                />
                <span className="text-sm text-gray-700">
                  I agree to the <a href="#" className="text-yellow-600 hover:underline">terms and conditions</a> and <a href="#" className="text-yellow-600 hover:underline">safety policy</a>
                </span>
              </label>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Booking Summary</h2>
              
              <div className="space-y-3 pb-4 border-b">
                <div>
                  <div className="text-sm text-gray-600">Experience</div>
                  <div className="font-medium">Kayaking</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Date</div>
                  <div className="font-medium">2025-10-22</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Time</div>
                  <div className="font-medium">09:00 am</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Quantity</div>
                  <div className="font-medium">1 person</div>
                </div>
              </div>

              <div className="mt-4 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹999</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes (6%)</span>
                  <span className="font-medium">₹59</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t">
                  <span>Total</span>
                  <span>₹1,058</span>
                </div>
              </div>

              <button 
                onClick={handleConfirm} 
                disabled={!agreedToTerms || !name || !email || !!emailError}
                className={`mt-6 w-full px-4 py-4 rounded-lg font-semibold transition ${
                  agreedToTerms && name && email && !emailError
                    ? 'bg-yellow-400 hover:bg-yellow-500 text-black'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Pay and Confirm
              </button>
              
              {(!agreedToTerms || !name || !email || emailError) && (
                <p className="text-xs text-gray-500 text-center mt-3">
                  {emailError ? 'Please enter a valid email' : 'Please fill all required fields and accept terms'}
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

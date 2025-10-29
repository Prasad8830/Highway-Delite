import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

export default function Confirmed(){
  const [params] = useSearchParams()
  const ref = params.get('ref')

  return (
    <div className="max-w-3xl mx-auto p-6 text-center mt-16">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 text-white rounded-full mb-4">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h1 className="text-3xl font-semibold mb-2">Booking Confirmed</h1>
      <p className="text-gray-600 mb-6">Ref ID: {ref || 'N/A'}</p>
      <Link to="/" className="inline-block px-6 py-3 bg-gray-300 rounded">Back to Home</Link>
    </div>
  )
}

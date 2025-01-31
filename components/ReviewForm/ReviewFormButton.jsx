'use client'

import { useState } from 'react'
import ReviewForm from './ReviewForm'

export default function ReviewFormButton({ session }) {
  const [showForm, setShowForm] = useState(false)

  if (!session) {
    return (
      <button 
        className="w-full md:w-1/2 bg-gray-400 text-white px-8 py-4 rounded-lg text-lg font-medium cursor-not-allowed hover:bg-gray-500 transition-colors"
        onClick={() => alert('Please login to add a review')}
      >
        Login to Add Review
      </button>
    )
  }

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="w-full md:w-1/2 bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
      >   
      Add Review
      </button>
      {showForm && (
        <ReviewForm
          session={session}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  )
}
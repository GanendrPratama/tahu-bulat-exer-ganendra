'use client'

import { useState } from 'react'
import ReviewForm from './ReviewForm'

export default function ReviewFormButton({ session }) {
  const [showForm, setShowForm] = useState(false)

  if (!session) {
    return (
      <button 
        className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
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
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
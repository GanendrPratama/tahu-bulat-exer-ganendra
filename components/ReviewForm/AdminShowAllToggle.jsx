'use client'



import { useState } from 'react'
import AdminCard from './AdminCard'

export default function ShowAllToggle({ allReviews }) {
  const [showAll, setShowAll] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowAll(true)}
        className="w-full md:w-1/2 bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
      >
        See All Reviews
      </button>

      {showAll && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">All Reviews</h2>
              <button 
                onClick={() => setShowAll(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allReviews?.map(review => (
                  <AdminCard
                    key={review.id}
                    id={review.id}
                    firstname={review.firstname}
                    lastname={review.lastname}
                    star={review.star}
                    title={review.title}
                    review={review.review}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
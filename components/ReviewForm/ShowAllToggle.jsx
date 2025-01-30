'use client'

import { useState } from 'react'
import Card from '../Card'

export default function ShowAllToggle({ allReviews }) {
  const [showAll, setShowAll] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowAll(true)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        See All Reviews
      </button>

      {showAll && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] h-[90%]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">All Reviews</h2>
              <button 
                onClick={() => setShowAll(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-4rem)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allReviews?.map(review => (
                  <Card
                    key={review.id}
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
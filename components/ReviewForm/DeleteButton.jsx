'use client'

import { useState } from 'react'

export default function DeleteButton({ session }) {
  const [showForm, setShowForm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [reviewId, setReviewId] = useState('')

  const handleDelete = async (e) => {
    e.preventDefault()
    if (!session) {
      alert('Please login to delete reviews')
      return
    }

    if (!confirm('Are you sure you want to delete this review?')) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/deleteOneReview?id=${reviewId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete')
      
      setReviewId('')
      setShowForm(false)
      window.location.reload()
    } catch (error) {
      alert('Failed to delete review')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="w-full md:w-1/2 bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
      >
        Delete Review
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Delete Review</h2>
              <button 
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[70vh]">
              <form onSubmit={handleDelete} className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Review ID:</label>
                  <input
                    type="number"
                    value={reviewId}
                    onChange={(e) => setReviewId(e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={isDeleting}
                  />
                </div>

                <div className="flex w-full space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-3 text-gray-600 bg-gray-100 rounded-lg text-lg font-medium hover:bg-gray-200"
                    disabled={isDeleting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 text-white bg-red-500 rounded-lg text-lg font-medium hover:bg-red-600 disabled:opacity-50"
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
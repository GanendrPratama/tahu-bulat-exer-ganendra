'use client'

import { useState } from 'react'
import reviews from '@/backend/featuredReviews'

export default function EditFeaturedButton({ session }) {
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstID: reviews.firstID,
    secondID: reviews.secondID,
    thirdID: reviews.thirdID
  })

  if (!session) {
    return (
      <button 
        className="w-full md:w-1/2 bg-gray-400 text-white px-8 py-4 rounded-lg text-lg font-medium cursor-not-allowed hover:bg-gray-500 transition-colors"
        onClick={() => alert('Please login to edit featured reviews')}
      >
        Login to Edit Featured
      </button>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await reviews.setNew(
        parseInt(formData.firstID),
        parseInt(formData.secondID),
        parseInt(formData.thirdID)
      );
      
      window.location.reload()
    } catch (error) {
      console.error(error);
      alert('Failed to update featured reviews')
    } finally {
      setLoading(false)
      setShowForm(false)
    }
}

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="w-full md:w-1/2 bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
      >
        Edit Featured
      </button>
  
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Featured Reviews</h2>
              <button 
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[70vh]">
              <form onSubmit={handleSubmit} className="space-y-4">
                {Object.keys(formData).map((key) => (
                  <div key={key} className="flex flex-col">
                    <label className="text-gray-700 mb-1">{key}:</label>
                    <input
                      type="number"
                      value={formData[key]}
                      onChange={(e) => setFormData({
                        ...formData,
                        [key]: parseInt(e.target.value)
                      })}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                      required
                      disabled={loading}
                    />
                  </div>
                ))}
  
                <div className="flex w-full space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-3 text-gray-600 bg-gray-100 rounded-lg text-lg font-medium hover:bg-gray-200"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 text-white bg-blue-500 rounded-lg text-lg font-medium hover:bg-blue-600 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update'}
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
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useBanner } from '@/components/Banner/BannerContext'

export default function ReviewForm({ session, onClose }) {
  const router = useRouter()
  const { showBanner } = useBanner()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    star: 1,
    title: '',
    review: '',
    user_id: session.user.id
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!session) {
      showBanner('Please login to submit a review', 'error')
      return
    }
    setLoading(true)
    setError('')
    
    try {
      const res = await fetch('/api/addNewReview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        onClose()
        router.refresh()
        showBanner('Review submitted successfully', 'success')
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to submit review')
      }
    } catch (error) {
      setError('Error submitting review')
    } finally {
      setLoading(false)
    }
  }

  const handleRandom = async () => {
    setLoading(true)
    try {
        const response = await fetch('/api/getRandomFirstAndLastName')
        const data = await response.json()
        
        if (response.ok) {
            setFormData(prev => ({
                ...prev,
                firstname: data.firstname,
                lastname: data.lastname
            }))
        }
    } catch (error) {
        setError('Failed to fetch random names')
    } finally {
        setLoading(false)
    }
}

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-96 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Add Review</h2>
          <button 
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={loading}
          >
          </button>
        </div>

        <input
          type="text"
          placeholder="First Name"
          value={formData.firstname}
          onChange={(e) => setFormData({...formData, firstname: e.target.value})}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          required
          disabled={loading}
        />

        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={(e) => setFormData({...formData, lastname: e.target.value})}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          required
          disabled={loading}
        />

        <button
          type="button"
          onClick={handleRandom}
          className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          disabled={loading}
        >
                    Random
        </button>

        <div className="flex items-center space-x-2">
          <label>Rating:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={formData.star}
            onChange={(e) => setFormData({...formData, star: parseInt(e.target.value)})}
            className="w-20 p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          />
        </div>

        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          required
          disabled={loading}
        />

        <textarea
          placeholder="Write your review..."
          value={formData.review}
          onChange={(e) => setFormData({...formData, review: e.target.value})}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 h-32 resize-none"
          required
          disabled={loading}
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-4 py-2 text-white rounded ${
              loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  )
}
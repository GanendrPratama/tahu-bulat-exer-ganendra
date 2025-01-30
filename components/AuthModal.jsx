'use client'

import { useState, useEffect } from 'react'

export default function AuthModal({ isOpen, onClose, onSubmit, formType, error: serverError }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setError(serverError)
    }, [serverError])

    if (!isOpen) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        try {
            await onSubmit(email, password)
            setEmail('')
            setPassword('')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96 animate-fade-in">
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-bold">
                        {formType === 'login' ? 'Login' : 'Sign Up'}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                        disabled={loading}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={loading}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={loading}
                    />
                    
                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        className={`w-full p-2 rounded text-white transition-colors
                            ${loading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                        disabled={loading}
                    >
                        {loading 
                            ? 'Processing...' 
                            : formType === 'login' ? 'Login' : 'Sign Up'
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import logInHandler from '@/backend/logInHandler'
import signUpHandler from '@/backend/signUpHandler'
import logOutHandler from '@/backend/logOutHandler'
import checkSession from '@/backend/checkSession'
import AuthModal from './AuthModal'

export default function AuthButton() {
    const router = useRouter()
    const [session, setSession] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formType, setFormType] = useState('login')
    const [error, setError] = useState('')

    useEffect(() => {
        const getSession = async () => {
            const { success, session } = await checkSession()
            if (success) {
                setSession(session)
            }
        }
        getSession()
    }, [])

    const handleLogout = async () => {
        const { success } = await logOutHandler()
        if (success) {
            setSession(null)
            router.refresh()
        }
    }

    const handleAuth = async (email, password) => {
        const handler = formType === 'login' ? logInHandler : signUpHandler
        const { success, error } = await handler(email, password)
        
        if (success) {
            const { success: sessionSuccess, session: newSession } = await checkSession()
            if (sessionSuccess) {
                setSession(newSession)
                setIsModalOpen(false)
                setError('')
                router.refresh()
            }
        } else {
            setError(error)
        }
    }
    return (
        <>
            {session ? (
                <button 
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            ) : (
                <div className="space-x-2">
                    <button 
                        onClick={() => {
                            setFormType('login')
                            setIsModalOpen(true)
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>
                    <button 
                        onClick={() => {
                            setFormType('signup')
                            setIsModalOpen(true)
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Sign Up
                    </button>
                </div>
            )}
            <AuthModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAuth}
                formType={formType}
                error={error}
            />
        </>
    )
}
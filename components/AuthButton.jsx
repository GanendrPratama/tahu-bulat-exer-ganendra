'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useBanner } from '@/components/Banner/BannerContext'
import logInHandler from '@/backend/logInHandler'
import signUpHandler from '@/backend/signUpHandler'
import logOutHandler from '@/backend/logOutHandler'
import checkSession from '@/backend/checkSession'
import AuthModal from './AuthModal'

export default function AuthButton() {
    const router = useRouter()
    const { showBanner } = useBanner()
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
            showBanner('Successfully logged out', 'success')
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
              showBanner(
                formType === 'login' 
                  ? 'Successfully logged in' 
                  : 'Please check your email to confirm your sign up',
                formType === 'login' ? 'success' : 'info'
              )
            }
          } else {
            setError(error)
            showBanner('Authentication failed', 'error')
          }
    }
    return (
        <>
            {session ? (
                <button 
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center 
                        px-3 sm:px-6 py-2 sm:py-3
                        bg-white text-[#FA932D] font-medium rounded-full
                        shadow-[0_3px_5px_-1px_rgba(0,0,0,0.2),0_6px_10px_0_rgba(0,0,0,0.14),0_1px_18px_0_rgba(0,0,0,0.12)]
                        hover:bg-[#F6F9FE] hover:text-[#FA932D]
                        active:shadow-[0_4px_4px_0_rgba(60,64,67,0.3),0_8px_12px_6px_rgba(60,64,67,0.15)]
                        focus:outline-none focus:ring-2 focus:ring-[#FA932D]
                        transition-all duration-300
                        h-8 sm:h-12 text-xs sm:text-sm tracking-wide"
                >
                    Logout
                </button>
            ) : (
                <div className="space-x-1 sm:space-x-2">
                    <button 
                        onClick={() => {
                            setFormType('login')
                            setIsModalOpen(true)
                        }}
                        className="inline-flex items-center justify-center 
                            px-3 sm:px-6 py-2 sm:py-3
                            bg-white text-[#FA932D] font-medium rounded-full
                            shadow-[0_3px_5px_-1px_rgba(0,0,0,0.2),0_6px_10px_0_rgba(0,0,0,0.14),0_1px_18px_0_rgba(0,0,0,0.12)]
                            hover:bg-[#F6F9FE] hover:text-[#FA932D]
                            active:shadow-[0_4px_4px_0_rgba(60,64,67,0.3),0_8px_12px_6px_rgba(60,64,67,0.15)]
                            focus:outline-none focus:ring-2 focus:ring-[#FA932D]
                            transition-all duration-300
                            h-8 sm:h-12 text-xs sm:text-sm tracking-wide"
                    >
                        Login
                    </button>
                    <button 
                        onClick={() => {
                            setFormType('signup')
                            setIsModalOpen(true)
                        }}
                        className="inline-flex items-center justify-center 
                            px-3 sm:px-6 py-2 sm:py-3
                            bg-white text-[#FA932D] font-medium rounded-full
                            shadow-[0_3px_5px_-1px_rgba(0,0,0,0.2),0_6px_10px_0_rgba(0,0,0,0.14),0_1px_18px_0_rgba(0,0,0,0.12)]
                            hover:bg-[#F6F9FE] hover:text-[#FA932D]
                            active:shadow-[0_4px_4px_0_rgba(60,64,67,0.3),0_8px_12px_6px_rgba(60,64,67,0.15)]
                            focus:outline-none focus:ring-2 focus:ring-[#FA932D]
                            transition-all duration-300
                            h-8 sm:h-12 text-xs sm:text-sm tracking-wide"
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
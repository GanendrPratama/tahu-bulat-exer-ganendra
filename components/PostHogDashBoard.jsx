'use client'

import { useState } from 'react'

export default function PostHogDashBoard() {
    const [showDashboard, setShowDashboard] = useState(false)

    return (
        <div>
            <button
                onClick={() => setShowDashboard(!showDashboard)}
                className="w-full md:w-1/2 bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
            >
                {showDashboard ? 'Hide Dashboard' : 'Show Dashboard'}
            </button>

            {showDashboard && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative w-full h-full max-w-7xl mx-4">
                        <button 
                            onClick={() => setShowDashboard(false)}
                            className="absolute top-4 right-4 text-white text-2xl font-bold z-50"
                        >
                            ×
                        </button>
                        <iframe 
                            className="w-full h-[90vh] rounded-lg mt-8"
                            frameBorder="0" 
                            allowFullScreen 
                            src="https://us.posthog.com/embedded/IZc3v1EtV02tTVScUX15HuenDadnAg"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
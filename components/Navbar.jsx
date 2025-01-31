'use client'

import { useState } from 'react'
import AuthButton from "./AuthButton"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav className="fixed top-0 left-0 w-full bg-[#FA932D] border-gray-200 z-50">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                        Tahu Bulat Pak Edi
                    </span>
                </div>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <AuthButton />
                    <button 
                        onClick={toggleMenu}
                        type="button" 
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-[#fb9f45] focus:outline-none focus:ring-2 focus:ring-white" 
                        aria-controls="navbar-menu" 
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Toggle menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div 
                    className={`${
                        isMenuOpen ? 'block' : 'hidden'
                    } w-full md:flex md:w-auto md:order-1 transition-all duration-300 ease-in-out`} 
                    id="navbar-menu"
                >
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-[#fb9f45] rounded-lg bg-[#FA932D] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        <li>
                            <a href="/" className="block py-2 px-3 text-white rounded hover:bg-[#fb9f45] md:hover:bg-transparent md:hover:text-gray-200" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="/Dashboard" className="block py-2 px-3 text-white rounded hover:bg-[#fb9f45] md:hover:bg-transparent md:hover:text-gray-200">Dashboard</a>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    )
}
'use client'

export default function Banner({ message, type }) {
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  }[type]

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg 
      animate-slide-in-right z-50`}>
      {message}
    </div>
  )
}
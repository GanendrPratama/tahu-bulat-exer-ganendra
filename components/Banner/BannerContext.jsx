'use client'

import { createContext, useContext, useState } from 'react'
import Banner  from './Banner'

const BannerContext = createContext()

export function BannerProvider({ children }) {
  const [banner, setBanner] = useState(null)

  const showBanner = (message, type) => {
    setBanner({ message, type })
    setTimeout(() => setBanner(null), 3000)
  }

  return (
    <BannerContext.Provider value={{ showBanner }}>
      {children}
      {banner && <Banner message={banner.message} type={banner.type} />}
    </BannerContext.Provider>
  )
}

export const useBanner = () => useContext(BannerContext)
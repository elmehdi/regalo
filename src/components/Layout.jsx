import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import BottomNav from './BottomNav'
import Footer from './Footer'

function Layout() {
  const location = useLocation()

  // Ensure each navigation starts at the top (prevents landing mid-page after a scroll).
  // If a hash is present, let the browser scroll to the anchor naturally.
  useEffect(() => {
    if (location.hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname, location.search, location.hash])

  return (
    <>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </>
  )
}

export default Layout

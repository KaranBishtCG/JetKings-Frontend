import React, { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

function Layout() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex w-full h-screen overflow-hidden bg-white">
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div className="flex bg-[#F8F9FF] flex-col flex-1 overflow-hidden">
        <Navbar onToggle={() => setIsOpen((prev) => !prev)} />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
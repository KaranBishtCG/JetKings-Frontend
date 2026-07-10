import React from 'react'
import { MdNotifications, MdSettings, MdMenu } from 'react-icons/md'

function Navbar({ onToggle }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-black/10">
      {/* Hamburger — visible on mobile only */}
      <button
        onClick={onToggle}
        className="md:hidden text-gray-500 hover:text-blue-600 transition-colors p-1"
        aria-label="Toggle sidebar"
      >
        <MdMenu size={24} />
      </button>
      {/* Right side */}
      <div className="flex items-center gap-4 ml-auto">
        <button className="relative text-gray-500 hover:text-blue-600 transition-colors">
          <MdNotifications size={22} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button className="text-gray-500 hover:text-blue-600 transition-colors">
          <MdSettings size={22} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
            A
          </div>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-gray-700">Admin User</p>
            <p className="text-[10px] text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
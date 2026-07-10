import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  MdDashboard,
  MdPeople,
  MdCategory,
  MdInventory2,
  MdSettings,
  MdPointOfSale,
  MdLogout,
} from 'react-icons/md'
import { RiFlightTakeoffFill } from 'react-icons/ri'

const navItems = [
  { label: 'Dashboard', icon: <MdDashboard size={20} />, path: '/' },
  { label: 'Buyers',    icon: <MdPeople size={20} />,    path: '/buyers' },
  { label: 'Categories',icon: <MdCategory size={20} />,  path: '/categories' },
  { label: 'Products',  icon: <MdInventory2 size={20} />,path: '/products' },
  { label: 'Price Config',icon:<MdSettings size={20} />, path: '/price-config' },
  { label: 'Generate Bill',icon:<MdPointOfSale size={20} />, path: '/generate-bill' },
]

function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="flex flex-col w-56 min-h-screen bg-[#1a2340] text-white shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-2 px-5 py-6 border-b border-white/10">
        <RiFlightTakeoffFill size={28} className="text-blue-400" />
        <div className="leading-tight">
          <p className="font-bold text-base tracking-wide">JetKings</p>
          <p className="text-[10px] text-white/50 uppercase tracking-widest">Admin Panel</p>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ label, icon, path }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
              ${isActive
                ? 'bg-blue-600 text-white'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <MdLogout size={20} />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar

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
import logo from '../assets/Designer.png'

const navItems = [
  { label: 'Dashboard', icon: <MdDashboard size={20} />, path: '/' },
  { label: 'Buyers',    icon: <MdPeople size={20} />,    path: '/buyers' },
  { label: 'Base Products',  icon: <MdInventory2 size={20} />,path: '/products' },
  { label: 'Products Per Buyer', icon: <MdCategory size={20} />, path: '/products-per-buyer' },
  { label: 'Generate Bill',icon:<MdPointOfSale size={20} />, path: '/generate-bill' },
]

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate()

  return (
    <aside
      className={`
        flex flex-col w-56 h-full bg-[#1a2340] text-white shrink-0
        fixed inset-y-0 left-0 z-40 transition-transform duration-300
        md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Brand */}
      <div className="flex items-center gap-2 px-2 py-[5px]">
        <img src={logo} alt="Logo" className="w-14 h-14 bg-white" />
        <div className="leading-tight">
          <p className="font-bold text-base text-4xl tracking-wide">JetKings Sanitary</p>
          <p className="text-[12px] text-white/50">GST Billing Solution</p>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ label, icon, path }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            onClick={onClose}
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
    </aside>
  )
}

export default Sidebar

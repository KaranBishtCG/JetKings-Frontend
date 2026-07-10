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
  { label: 'Products',  icon: <MdInventory2 size={20} />,path: '/products' },
  { label: 'Price Config',icon:<MdSettings size={20} />, path: '/price-config' },
  { label: 'Generate Bill',icon:<MdPointOfSale size={20} />, path: '/generate-bill' },
]

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate()

  return (
    <aside
      className={`
        flex flex-col w-56 min-h-screen bg-[#F8F9FF] text-white shrink-0 border-r border-r-black/10
        fixed inset-y-0 left-0 z-40 transition-transform duration-300
        md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
        <div className="leading-tight flex flex-col gap-1">
          <p className="text-[20px] font-bold text-base tracking-wide text-blue-400">JetKings Sanitary</p>
          <p className="text-[12px] text-gray-500">GST Billing Solution</p>
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
                ? 'bg-[#D5E4F8] text-[#727984]'
                : 'text-[#64748B]'
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
          onClick={() => { navigate('/login'); onClose?.() }}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-[#64748B] hover:bg-[#D5E4F8] hover:text-[#727984] transition-colors"
        >
          <MdLogout size={20} />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar

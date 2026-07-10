import React from 'react'
import { MdPeople, MdVerified, MdShoppingCart, MdWarning } from 'react-icons/md'

const stats = [
  {
    label: 'Total Buyers',
    value: '1,248',
    icon: <MdPeople size={22} />,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    label: 'GST Active',
    value: '1,102',
    icon: <MdVerified size={22} />,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
  },
  {
    label: 'Recent Orders',
    value: '45',
    icon: <MdShoppingCart size={22} />,
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-500',
  },
  {
    label: 'Payment Due',
    value: '12',
    icon: <MdWarning size={22} />,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500',
  },
]

function BuyersStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map(({ label, value, icon, iconBg, iconColor }) => (
        <div
          key={label}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3"
        >
            <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg shrink-0`}>{icon}</div>
            <div className="min-w-0">
                <p className="text-xs sm:text-sm text-slate-500 truncate">{label}</p>
                <p className="mt-1 text-2xl sm:text-3xl leading-none font-semibold tracking-tight">{value}</p>
            </div>
        </div>
      ))}
    </div>
  )
}

export default BuyersStats

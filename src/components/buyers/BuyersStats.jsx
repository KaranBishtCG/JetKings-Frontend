import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdPeople, MdVerified, MdShoppingCart, MdWarning } from 'react-icons/md'
import { fetchBuyersSummary } from '../../state/slices/BuyerSlice'
import { Skeleton } from '../common/Skeleton'

function BuyersStats() {
  const dispatch = useDispatch()
  const { summary, summaryLoading } = useSelector((s) => s.buyers)

  useEffect(() => {
    dispatch(fetchBuyersSummary())
  }, [dispatch])

  const stats = [
    {
      label: 'Total Buyers',
      value: summary?.totalBuyers ?? '—',
      icon: <MdPeople size={22} />,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      label: 'GST Active',
      value: summary?.gstActive ?? '—',
      icon: <MdVerified size={22} />,
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
    {
      label: 'Recent Orders',
      value: summary?.recentOrders ?? '—',
      icon: <MdShoppingCart size={22} />,
      iconBg: 'bg-sky-100',
      iconColor: 'text-sky-500',
    },
    {
      label: 'Payment Due',
      value: summary?.paymentDue ?? '—',
      icon: <MdWarning size={22} />,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-500',
    },
  ]

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
            {summaryLoading
              ? <Skeleton className="mt-1 w-16 h-6 rounded" />
              : <p className="mt-1 text-2xl sm:text-3xl leading-none font-semibold tracking-tight">{value}</p>
            }
          </div>
        </div>
      ))}
    </div>
  )
}

export default BuyersStats

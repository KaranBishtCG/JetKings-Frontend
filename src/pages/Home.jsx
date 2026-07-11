import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchDashboardSummary,
  fetchRecentActivities,
} from '../state/slices/dashboardSlice'

import { Skeleton, SkeletonTable } from '../components/common/Skeleton'

import {
  MdPeopleAlt,
  MdInventory2,
  MdReceiptLong,
  MdPayments,
  MdPersonAddAlt1,
  MdAddBox,
  MdPointOfSale,
} from 'react-icons/md'

const quickActions = [
  {
    label: 'Add Buyer',
    icon: MdPersonAddAlt1,
    active: false,
    path: '/buyers',
  },
  {
    label: 'Add Product',
    icon: MdAddBox,
    active: false,
    path: '/products',
  },
  {
    label: 'Generate Bill',
    icon: MdPointOfSale,
    active: true,
    path: '/generate-bill',
  },
]

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    summary,
    activities,
    loading,
    error,
  } = useSelector((state) => state.dashboard)

  useEffect(() => {
    dispatch(fetchDashboardSummary())
    dispatch(fetchRecentActivities())
  }, [dispatch])

  const stats = [
    {
      title: 'Total Buyers',
      value: summary?.totalBuyers || 0,
      icon: MdPeopleAlt,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Total Products',
      value: summary?.totalProducts || 0,
      icon: MdInventory2,
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
    },
    {
      title: 'Bills Generated',
      value: summary?.billsGenerated || 0,
      icon: MdReceiptLong,
      iconBg: 'bg-slate-200',
      iconColor: 'text-slate-600',
    },
    {
      title: "Today's Revenue",
      value: `₹${summary?.todayRevenue || 0}`,
      icon: MdPayments,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
  ]

  if (error) {
    return (
      <div className="p-6 text-red-600 font-medium">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1180px] mx-auto text-slate-900 space-y-4 sm:space-y-5">
      {/* Header */}
      <section>
        <h1 className="text-2xl sm:text-3xl md:text-[42px] leading-tight font-semibold tracking-tight">
          Dashboard - Good Morning, Admin
        </h1>

        <p className="mt-1 text-sm font-semibold text-slate-500">
          Here's what's happening with JetKings today.
        </p>
      </section>

      {/* Stats */}
      <section className="flex flex-wrap gap-3 sm:gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <article
                key={i}
                className="flex-1 min-w-[calc(50%-6px)] lg:min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-4 sm:px-5 sm:py-5 shadow-sm"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-full shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="w-24 h-3 rounded" />
                    <Skeleton className="w-16 h-6 rounded" />
                  </div>
                </div>
              </article>
            ))
          : stats.map(
              ({ title, value, icon: Icon, iconBg, iconColor }) => (
                <article
                  key={title}
                  className="flex-1 min-w-[calc(50%-6px)] lg:min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-4 sm:px-5 sm:py-5 shadow-sm"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div
                      className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}
                    >
                      <Icon size={22} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-slate-500 truncate">
                        {title}
                      </p>

                      <p className="mt-1 text-2xl sm:text-3xl leading-none font-semibold tracking-tight">
                        {value}
                      </p>
                    </div>
                  </div>
                </article>
              )
            )}
      </section>

      {/* Quick Actions + Recent Activity */}
      <section className="flex flex-col lg:flex-row gap-5">
        {/* Quick Actions */}
        <div className="w-full lg:w-72 shrink-0">
          <h2 className="mb-3 text-xl sm:text-2xl leading-tight font-semibold tracking-tight">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-3">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 min-w-[calc(50%-6px)] rounded-xl border border-slate-200 bg-white px-4 py-5 shadow-sm space-y-3"
                  >
                    <Skeleton className="w-8 h-8 rounded-lg mx-auto" />
                    <Skeleton className="w-20 h-3 rounded mx-auto" />
                  </div>
                ))
              : quickActions.map(
                  ({ label, icon: Icon, active, path }) => (
                    <button
                      key={label}
                      onClick={() => navigate(path)}
                      className={`flex-1 min-w-[calc(50%-6px)] rounded-xl border px-4 py-5 text-center shadow-sm transition-all
                      ${
                        active
                          ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
                          : 'border-slate-300 bg-white text-slate-800 hover:border-blue-200 hover:bg-blue-50'
                      }`}
                    >
                      <Icon size={32} className="mx-auto" />

                      <span className="mt-2 block text-sm font-normal">
                        {label}
                      </span>
                    </button>
                  )
                )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="flex-1 min-w-0">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2 className="text-xl sm:text-2xl leading-tight font-semibold tracking-tight">
              Recent Activity
            </h2>

            <button className="shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-700">
              View All
            </button>
          </div>

          <div className="rounded-xl border border-slate-300 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px]">
                <thead>
                  <tr className="bg-slate-100 text-left text-sm font-semibold text-slate-600">
                    <th className="px-5 py-3">Invoice No</th>
                    <th className="px-5 py-3">Buyer Name</th>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Amount</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <SkeletonTable rows={5} cols={5} avatar={false} />
                  ) : activities?.length > 0 ? (
                    activities.slice(0,5).map((item) => (
                      <tr
                        key={item.invoiceId}
                        className="border-t border-slate-200"
                      >
                        <td className="px-5 py-4 text-sm font-medium text-slate-900">
                          {item.invoiceNo}
                        </td>

                        <td className="px-5 py-4 text-[15px] font-normal text-slate-900">
                          {item.buyerName}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {item.invoiceDate}
                        </td>

                        <td className="px-5 py-4 text-sm font-medium text-slate-900">
                          ₹
                          {Number(item.amount).toLocaleString(
                            'en-IN'
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide ${
                              item.status === 'GENERATED'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-slate-500"
                      >
                        No Recent Activity Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
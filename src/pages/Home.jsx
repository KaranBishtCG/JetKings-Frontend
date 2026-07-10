import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MdPeopleAlt,
  MdInventory2,
  MdReceiptLong,
  MdPayments,
  MdPersonAddAlt1,
  MdAddBox,
  MdTune,
  MdPointOfSale,
} from 'react-icons/md'

const stats = [
  {
    title: 'Total Buyers',
    value: '150',
    icon: MdPeopleAlt,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Total Products',
    value: '45',
    icon: MdInventory2,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
  {
    title: 'Bills Generated',
    value: '1,200',
    icon: MdReceiptLong,
    iconBg: 'bg-slate-200',
    iconColor: 'text-slate-600',
  },
  {
    title: "Today's Revenue",
    value: '₹45,000',
    icon: MdPayments,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
]

const quickActions = [
  { label: 'Add Buyer', icon: MdPersonAddAlt1, active: false, path: '/buyers' },
  { label: 'Add Product', icon: MdAddBox, active: false, path: '/products' },
  { label: 'Price Config', icon: MdTune, active: false, path: '/price-config' },
  { label: 'Generate Bill', icon: MdPointOfSale, active: true, path: '/generate-bill' },
]

const recentActivity = [
  {
    date: '24 May, 2024',
    buyerName: 'Aryan Sanitary Store',
    amount: '₹12,450.00',
    status: 'SETTLED',
  },
  {
    date: '24 May, 2024',
    buyerName: 'Modern Bath Fittings',
    amount: '₹8,900.00',
    status: 'SETTLED',
  },
  {
    date: '23 May, 2024',
    buyerName: 'Universal Traders',
    amount: '₹22,100.00',
    status: 'PENDING',
  },
  {
    date: '23 May, 2024',
    buyerName: 'Elite Ceramics',
    amount: '₹1,540.00',
    status: 'SETTLED',
  },
  {
    date: '22 May, 2024',
    buyerName: 'Apex Infrastructure',
    amount: '₹45,000.00',
    status: 'SETTLED',
  },
]

function Home() {
  const navigate = useNavigate()

  return (
    <div className="max-w-[1180px] mx-auto text-slate-900">
      <section className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-[38px] leading-tight font-semibold tracking-tight">
            Dashboard - Good Morning, Admin
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here&apos;s what&apos;s happening with JetKings today.
          </p>
        </div>
        
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ title, value, icon: Icon, iconBg, iconColor }) => (
          <article
            key={title}
            className="rounded-xl border border-slate-200 bg-white px-5 py-5 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div
                className={`h-12 w-12 rounded-full ${iconBg} ${iconColor} flex items-center justify-center`}
              >
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500">{title}</p>
                <p className="mt-1 text-3xl leading-none font-semibold tracking-tight">{value}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-5 xl:grid-cols-[1.35fr_2.65fr]">
        <div>
          <h2 className="mb-3 text-3xl leading-tight font-semibold tracking-tight">Quick Actions</h2>

          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(({ label, icon: Icon, active, path }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className={`rounded-xl border px-4 py-5 text-center shadow-sm transition-all
                ${
                  active
                    ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
                    : 'border-slate-300 bg-white text-slate-800 hover:border-blue-200 hover:bg-blue-50'
                }`}
              >
                <Icon size={24} className="mx-auto" />
                <span className="mt-2 block text-sm font-normal">{label}</span>
              </button>
            ))}
          </div>

        </div>

        <div>
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2 className="text-3xl leading-tight font-semibold tracking-tight">Recent Activity</h2>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All</button>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="bg-slate-100 text-left text-sm font-semibold text-slate-600">
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Buyer Name</th>
                    <th className="px-5 py-3">Amount</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recentActivity.map((item) => (
                    <tr key={`${item.buyerName}-${item.date}`} className="border-t border-slate-200">
                      <td className="px-5 py-4 text-sm text-slate-600">{item.date}</td>
                      <td className="px-5 py-4 text-[15px] font-normal text-slate-900">{item.buyerName}</td>
                      <td className="px-5 py-4 text-sm font-medium text-slate-900">{item.amount}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide
                          ${
                            item.status === 'SETTLED'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
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
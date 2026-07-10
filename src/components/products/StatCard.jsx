import React from 'react'

function StatCard({ icon: Icon, iconBg, iconColor, label, value, badge, isLoading }) {
  if (isLoading) {
    return (
      <div className="h-[170px] rounded-2xl border border-slate-200 bg-white p-6 animate-pulse">
        <div className="h-11 w-11 rounded-xl bg-slate-200" />
        <div className="mt-8 h-3 w-24 rounded bg-slate-200" />
        <div className="mt-3 h-7 w-16 rounded bg-slate-200" />
      </div>
    )
  }

  return (
    <div className="flex h-[170px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          <Icon size={22} />
        </div>
        {badge && (
          <span
            className="rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{ backgroundColor: badge.bg, color: badge.color }}
          >
            {badge.text}
          </span>
        )}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
        <p className="mt-1 text-3xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  )
}

export default StatCard

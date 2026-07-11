import React from 'react'

function StatCard({ icon: Icon, iconBg, iconColor, label, value, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex h-[104px] items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 animate-pulse">
        <div className="h-11 w-11 shrink-0 rounded-xl bg-slate-200" />
        <div className="flex-1">
          <div className="h-3 w-24 rounded bg-slate-200" />
          <div className="mt-3 h-6 w-16 rounded bg-slate-200" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-[104px] items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: iconBg, color: iconColor }}
      >
        <Icon size={22} />
      </div>
      <div className="min-w-0">
          <p className="text-xs sm:text-sm text-slate-500 truncate">{label}</p>
          <p className="mt-1 text-2xl sm:text-3xl leading-none font-semibold tracking-tight">{value}</p>
      </div>
    </div>
  )
}

export default StatCard

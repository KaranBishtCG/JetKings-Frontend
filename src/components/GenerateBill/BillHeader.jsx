import React from 'react'

function BillHeader() {
  return (
    <div className="mb-4 flex flex-col sm:flex-row items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl sm:text-[36px] leading-tight font-semibold tracking-tight">Generate Bill</h1>
        <p className="mt-1 text-sm text-slate-500">Step-by-step invoice generation workflow.</p>
      </div>
      <div className="sm:text-right leading-tight">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Date</p>
        <p className="text-xl font-semibold text-slate-700">
          {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
        </p>
      </div>
    </div>
  )
}

export default BillHeader

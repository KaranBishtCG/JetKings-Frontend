import React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'

function BuyerSelect({ value, onChange, buyers }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[11px] font-semibold text-blue-600">1</span>
        <h2 className="text-base font-semibold text-blue-600">Select Buyer</h2>
      </div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">Search or select a registered buyer…</option>
          {buyers.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <MdKeyboardArrowDown size={20} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  )
}

export default BuyerSelect

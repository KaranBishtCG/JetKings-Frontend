import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown, Download, Printer } from 'lucide-react'

function Dropdown({ icon: Icon, label, value, options, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="flex items-center gap-2">
      <span className="whitespace-nowrap text-sm font-medium text-slate-500">{label}</span>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white pl-3 pr-3 text-sm font-semibold text-blue-600 transition-colors hover:bg-slate-50"
        >
          <Icon size={16} />
          <span>{value}</span>
          <ChevronDown size={14} className={`text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <ul className="absolute z-20 mt-1 w-56 rounded-lg border border-slate-200 bg-white py-1 text-sm shadow-lg">
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option)
                    setOpen(false)
                  }}
                  className={`block w-full px-3 py-2 text-left transition-colors hover:bg-slate-50 ${
                    option === value ? 'font-semibold text-blue-600' : 'text-slate-700'
                  }`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function FilterToolbar({
  categoryIcon: CategoryIcon,
  pricingIcon: PricingIcon,
  category,
  onCategoryChange,
  categories,
  pricing,
  onPricingChange,
  pricingLists,
  onExport,
  onPrint,
}) {
  return (
    <div className="flex min-h-[80px] flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-4 bg-[#F1F5F9]">
      <div className="flex flex-wrap items-center gap-6">
        <Dropdown icon={CategoryIcon} label="Filter By Category:" value={category} options={categories} onChange={onCategoryChange} />
        <Dropdown icon={PricingIcon} label="Pricing For:" value={pricing} options={pricingLists} onChange={onPricingChange} />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          title="Download"
          onClick={onExport}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
        >
          <Download size={18} />
        </button>
        <button
          type="button"
          title="Print"
          onClick={onPrint}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
        >
          <Printer size={18} />
        </button>
      </div>
    </div>
  )
}

export default FilterToolbar

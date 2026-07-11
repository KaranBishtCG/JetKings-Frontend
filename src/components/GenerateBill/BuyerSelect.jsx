import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdKeyboardArrowDown, MdCheck } from 'react-icons/md'
import { loadDropdownBuyers } from '../../state/slices/BuyerSlice'

function BuyerSelect({ value, onChange }) {
  const dispatch = useDispatch()
  const { dropdownItems, dropdownPage, dropdownTotalPages, loadingMore } = useSelector((s) => s.buyers)

  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const listRef = useRef(null)

  // Initial load
  useEffect(() => {
    dispatch(loadDropdownBuyers({ page: 1, pageSize: 10 }))
  }, [dispatch])

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleScroll = () => {
    const el = listRef.current
    if (!el || loadingMore || dropdownPage >= dropdownTotalPages) return
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 8) {
      dispatch(loadDropdownBuyers({ page: dropdownPage + 1, pageSize: 10 }))
    }
  }

  const handleSelect = (buyer) => {
    onChange(buyer)          // pass full buyer object
    setIsOpen(false)
  }

  // display label
  const label = value?.partyName ?? ''

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[11px] font-semibold text-blue-600">1</span>
        <h2 className="text-base font-semibold text-blue-600">Select Buyer</h2>
      </div>

      <div ref={containerRef} className="relative">
        {/* Trigger */}
        <button
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          className="w-full flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors"
        >
          <span className={label ? 'text-slate-800 font-medium' : 'text-slate-400'}>
            {label || 'Search or select a registered buyer…'}
          </span>
          <MdKeyboardArrowDown
            size={20}
            className={`shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Dropdown list */}
        {isOpen && (
          <div className="absolute z-20 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg">
            <ul
              ref={listRef}
              onScroll={handleScroll}
              className="max-h-48 overflow-y-auto divide-y divide-slate-50 py-1"
            >
              {dropdownItems.map((b) => (
                <li key={b.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(b)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <span>{b.partyName}</span>
                    {value?.id === b.id && <MdCheck size={16} className="text-blue-600 shrink-0" />}
                  </button>
                </li>
              ))}

              {/* Loading more spinner */}
              {loadingMore && (
                <li className="flex justify-center py-3">
                  <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                </li>
              )}

              {/* End of list */}
              {!loadingMore && dropdownPage >= dropdownTotalPages && dropdownItems.length > 0 && (
                <li className="text-center text-xs text-slate-400 py-2">All buyers loaded</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default BuyerSelect


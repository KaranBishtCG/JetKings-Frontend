import React from 'react'
import { MdPersonAdd } from 'react-icons/md'

function BuyersHeader({ onAddBuyer }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl sm:text-[36px] leading-tight font-semibold tracking-tight">Buyers Management</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage your client list, GST details, and billing addresses.
        </p>
      </div>
      <button
        onClick={onAddBuyer}
        className="shrink-0 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        <MdPersonAdd size={18} />
        Add Buyer
      </button>
    </div>
  )
}

export default BuyersHeader

import React from 'react'
import { MdPersonAdd } from 'react-icons/md'

function BuyersHeader({ onAddBuyer }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Buyers Management</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage your client list, GST details, and billing addresses.
        </p>
      </div>
      <button
        onClick={onAddBuyer}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        <MdPersonAdd size={18} />
        Add Buyer
      </button>
    </div>
  )
}

export default BuyersHeader

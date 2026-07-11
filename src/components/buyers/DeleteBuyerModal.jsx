import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdClose, MdWarning } from 'react-icons/md'
import { deleteBuyer } from '../../state/slices/BuyerSlice'

function DeleteBuyerModal({ buyer, onClose }) {
  const dispatch = useDispatch()
  const { deleting, deleteError } = useSelector((s) => s.buyers)

  const handleConfirm = async () => {
    const result = await dispatch(deleteBuyer(buyer.id))
    if (!result.error) onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">Delete Buyer</h2>
          <button
            onClick={onClose}
            disabled={deleting}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-40"
          >
            <MdClose size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col items-center text-center gap-3">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
            <MdWarning size={30} className="text-red-500" />
          </div>
          <p className="text-sm text-gray-700 font-medium">
            Are you sure you want to delete{' '}
            <span className="font-bold text-gray-900">{buyer.partyName}</span>?
          </p>
          <p className="text-xs text-gray-400">This action cannot be undone.</p>

          {deleteError && (
            <div className="w-full bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-lg">
              {deleteError?.message || 'Failed to delete. Please try again.'}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            disabled={deleting}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={deleting}
            className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {deleting ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteBuyerModal

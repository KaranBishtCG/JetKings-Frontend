import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdClose, MdPerson, MdEmail, MdPhone, MdLocationOn, MdBusiness } from 'react-icons/md'
import { getBuyerById, clearSelectedBuyer } from '../../state/slices/BuyerSlice'

const AVATAR_COLORS = [
  'bg-[#1a2340]', 'bg-teal-600', 'bg-purple-600', 'bg-gray-600',
  'bg-orange-500', 'bg-blue-500', 'bg-rose-600', 'bg-indigo-600',
  'bg-green-600', 'bg-yellow-600',
]

function getInitials(name = '') {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('')
}

function Field({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      <div className="mt-0.5 shrink-0 text-blue-500">
        <Icon size={17} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
        <p className="text-sm text-gray-800 font-semibold break-words">{value || '—'}</p>
      </div>
    </div>
  )
}

function ViewBuyerModal({ buyerId, onClose }) {
  const dispatch = useDispatch()
  const { selectedBuyer: buyer, loadingBuyer, viewError } = useSelector((s) => s.buyers)

  useEffect(() => {
    dispatch(getBuyerById(buyerId))
    return () => dispatch(clearSelectedBuyer())
  }, [dispatch, buyerId])

  const avatarColor = AVATAR_COLORS[(buyerId ?? 0) % AVATAR_COLORS.length]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Buyer Details</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MdClose size={20} />
          </button>
        </div>

        {/* Loading */}
        {loadingBuyer && (
          <div className="flex items-center justify-center py-16">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {viewError && !loadingBuyer && (
          <div className="mx-4 my-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
            Failed to load buyer details.
          </div>
        )}

        {/* Content */}
        {buyer && !loadingBuyer && (
          <div className="px-4 py-4 space-y-4">
            {/* Avatar + name */}
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full ${avatarColor} text-white flex items-center justify-center text-lg font-semibold shrink-0`}>
                {getInitials(buyer.partyName)}
              </div>
              <div>
                <p className="text-base font-bold text-gray-800">{buyer.partyName}</p>
              </div>
            </div>

            {/* Fields */}
            <div className="space-y-3">
              <Field icon={MdEmail}      label="Email"           value={buyer.email} />
              <div className="grid grid-cols-2 gap-3">
                <Field icon={MdPhone}    label="Mobile"          value={buyer.mobile} />
                <Field icon={MdBusiness} label="GSTIN"           value={buyer.gstin} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field icon={MdLocationOn} label="City / State"    value={`${buyer.city}, ${buyer.state}`} />
                <Field icon={MdLocationOn} label="Billing Address" value={buyer.billingAddress} />
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-2 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewBuyerModal

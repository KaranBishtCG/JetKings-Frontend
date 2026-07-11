import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdClose, MdCheckCircle } from 'react-icons/md'
import { updateBuyer, resetUpdateStatus } from '../../state/slices/BuyerSlice'

function Spinner() {
  return (
    <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
  )
}

const FIELD_LABELS = {
  partyName: 'Party Name',
  email: 'Email',
  mobile: 'Mobile',
  gstin: 'GSTIN',
  billingAddress: 'Billing Address',
  state: 'State',
  city: 'City',
}

function EditBuyerModal({ buyer, onClose }) {
  const dispatch = useDispatch()
  const { updating, updateError, updateSuccess } = useSelector((s) => s.buyers)

  const [form, setForm] = useState({
    partyName: buyer.partyName || '',
    email: buyer.email || '',
    mobile: buyer.mobile || '',
    gstin: buyer.gstin || '',
    billingAddress: buyer.billingAddress || '',
    state: buyer.state || '',
    city: buyer.city || '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (updateSuccess) {
      const timer = setTimeout(() => {
        dispatch(resetUpdateStatus())
        onClose()
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [updateSuccess, dispatch, onClose])

  useEffect(() => {
    return () => dispatch(resetUpdateStatus())
  }, [dispatch])

  const validate = () => {
    const newErrors = {}
    Object.keys(FIELD_LABELS).forEach((key) => {
      if (!form[key].trim()) {
        newErrors[key] = `${FIELD_LABELS[key]} is required`
      }
    })
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    dispatch(updateBuyer({ id: buyer.id, ...form }))
  }

  const field = (key) => (
    <div key={key}>
      <label className="block text-xs font-semibold text-gray-600 mb-1">
        {FIELD_LABELS[key]} <span className="text-red-500">*</span>
      </label>
      <input
        type={key === 'email' ? 'email' : 'text'}
        name={key}
        value={form[key]}
        onChange={handleChange}
        placeholder={`Enter ${FIELD_LABELS[key]}`}
        className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-colors ${
          errors[key]
            ? 'border-red-400 focus:border-red-500 bg-red-50'
            : 'border-gray-200 focus:border-blue-500'
        }`}
      />
      {errors[key] && <p className="mt-1 text-xs text-red-500">{errors[key]}</p>}
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Loading / Success overlay */}
        {(updating || updateSuccess) && (
          <div className="absolute inset-0 bg-white/90 rounded-xl flex items-center justify-center z-10">
            {updating && <Spinner />}
            {updateSuccess && <MdCheckCircle size={64} className="text-green-500" />}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Edit Buyer</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MdClose size={20} />
          </button>
        </div>

        {/* API Error */}
        {updateError && (
          <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
            {updateError?.message || 'Something went wrong. Please try again.'}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="px-6 py-4 space-y-4">
          {field('partyName')}
          {field('email')}

          {/* Mobile & GSTIN */}
          <div className="grid grid-cols-2 gap-4">
            {field('mobile')}
            {field('gstin')}
          </div>

          {field('billingAddress')}

          {/* State & City */}
          <div className="grid grid-cols-2 gap-4">
            {field('state')}
            {field('city')}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating || updateSuccess}
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBuyerModal

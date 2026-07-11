import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdClose, MdCheckCircle } from 'react-icons/md'
import { createBuyer, resetCreateStatus } from '../../state/slices/BuyerSlice'

function Spinner() {
  return (
    <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
  )
}

const EMPTY_FORM = {
  partyName: '',
  email: '',
  mobile: '',
  gstin: '',
  billingAddress: '',
  state: '',
  city: '',
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

function AddBuyerModal({ onClose, onSuccess }) {
  const dispatch = useDispatch()
  const { creating, createError, createSuccess } = useSelector((s) => s.buyers)

  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (createSuccess) {
      const timer = setTimeout(() => {
        dispatch(resetCreateStatus())
        onSuccess?.()
        onClose()
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [createSuccess, dispatch, onClose, onSuccess])

  useEffect(() => {
    return () => {
      dispatch(resetCreateStatus())
    }
  }, [dispatch])

  const validate = () => {
    const newErrors = {}
    Object.keys(EMPTY_FORM).forEach((key) => {
      if (!form[key].trim()) {
        newErrors[key] = `${FIELD_LABELS[key]} is required`
      }
    })
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    dispatch(createBuyer(form))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Loading / Success overlay */}
        {(creating || createSuccess) && (
          <div className="absolute inset-0 bg-white/90 rounded-xl flex flex-col items-center justify-center z-10 gap-3">
            {creating && <Spinner />}
            {createSuccess && (
              <MdCheckCircle size={64} className="text-green-500" />
            )}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Add New Buyer</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MdClose size={20} />
          </button>
        </div>

        {/* API Error Banner */}
        {createError && (
          <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
            {createError?.message || 'Something went wrong. Please try again.'}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="px-4 py-4 space-y-4">
          {/* Party Name & Email */}
          {['partyName', 'email'].map((key) => (
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
              {errors[key] && (
                <p className="mt-1 text-xs text-red-500">{errors[key]}</p>
              )}
            </div>
          ))}

          {/* Mobile & GSTIN */}
          <div className="grid grid-cols-2 gap-4">
            {['mobile', 'gstin'].map((key) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  {FIELD_LABELS[key]} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
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
                {errors[key] && (
                  <p className="mt-1 text-xs text-red-500">{errors[key]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Billing Address */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              {FIELD_LABELS['billingAddress']} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="billingAddress"
              value={form.billingAddress}
              onChange={handleChange}
              placeholder="Enter Billing Address"
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-colors ${
                errors.billingAddress
                  ? 'border-red-400 focus:border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-blue-500'
              }`}
            />
            {errors.billingAddress && (
              <p className="mt-1 text-xs text-red-500">{errors.billingAddress}</p>
            )}
          </div>

          {/* State & City */}
          <div className="grid grid-cols-2 gap-4">
            {['state', 'city'].map((key) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  {FIELD_LABELS[key]} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
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
                {errors[key] && (
                  <p className="mt-1 text-xs text-red-500">{errors[key]}</p>
                )}
              </div>
            ))}
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
              disabled={creating || createSuccess}
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              Add Buyer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBuyerModal

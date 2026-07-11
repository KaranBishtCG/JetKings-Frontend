import React, { useMemo, useState } from 'react'
import { MdClose } from 'react-icons/md'

const EMPTY_FORM = {
  modelName: '',
  categoryId: '',
  defaultPrice: '',
}

function AddProductModal({ categories = [], categoriesLoading = false, submitting = false, apiError = null, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  const normalizedCategories = useMemo(() => {
    return (Array.isArray(categories) ? categories : []).map((category) => ({
      id: category.id,
      name: category.name || category.categoryName || `Category ${category.id}`,
    }))
  }, [categories])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const nextErrors = {}

    if (!form.modelName.trim()) nextErrors.modelName = 'Product name is required'
    if (!form.categoryId) nextErrors.categoryId = 'Category is required'

    const parsedPrice = Number(form.defaultPrice)
    if (form.defaultPrice === '') {
      nextErrors.defaultPrice = 'Default price is required'
    } else if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      nextErrors.defaultPrice = 'Default price must be a valid positive number'
    }

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const defaultPrice = Number(form.defaultPrice)
    const payload = {
      modelName: form.modelName.trim(),
      categoryId: Number(form.categoryId),
      defaultPrice,
    }

    await onSubmit?.(payload)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Add New Product</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={submitting}
          >
            <MdClose size={20} />
          </button>
        </div>

        {apiError && (
          <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="px-4 py-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="modelName"
              value={form.modelName}
              onChange={handleChange}
              placeholder="Enter Product Name"
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-colors ${
                errors.modelName ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
              }`}
            />
            {errors.modelName && <p className="mt-1 text-xs text-red-500">{errors.modelName}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Default Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              name="defaultPrice"
              value={form.defaultPrice}
              onChange={handleChange}
              placeholder="Enter Default Price"
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-colors ${
                errors.defaultPrice ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
              }`}
            />
            {errors.defaultPrice && <p className="mt-1 text-xs text-red-500">{errors.defaultPrice}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              disabled={categoriesLoading}
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-colors bg-white ${
                errors.categoryId ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
              }`}
            >
              <option value="">{categoriesLoading ? 'Loading categories...' : 'Select Category'}</option>
              {normalizedCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="mt-1 text-xs text-red-500">{errors.categoryId}</p>}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || categoriesLoading}
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProductModal
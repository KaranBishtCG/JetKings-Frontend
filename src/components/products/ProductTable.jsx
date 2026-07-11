import React from 'react'
import { Package, Pencil, Trash2 } from 'lucide-react'

function formatCurrency(value) {
  return `\u20B9${Number(value || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
}

function ProductTable({
  products,
  onView,
  onEdit,
  onDelete,
  onAddProduct,
  isLoading,
  showActions = true,
  showBuyerPrice = true,
}) {
  const columns = ['Product Image', 'Product Name', 'Default Price']
  if (showBuyerPrice) columns.push('Buyer Price')
  if (showActions) columns.push('Actions')

  if (isLoading) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              {columns.map((heading) => (
                <th key={heading} className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="animate-pulse border-t border-slate-100">
                <td className="px-6 py-4">
                  <div className="h-14 w-14 rounded-lg bg-slate-200" />
                </td>
                <td className="px-6 py-4">
                  <div className="mb-2 h-4 w-40 rounded bg-slate-200" />
                  <div className="h-3 w-20 rounded bg-slate-100" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 w-28 rounded-full bg-slate-200" />
                </td>
                {showBuyerPrice && (
                  <td className="px-6 py-4">
                    <div className="h-4 w-16 rounded bg-slate-200" />
                  </td>
                )}
                {showActions && (
                  <td className="px-6 py-4">
                    <div className="h-4 w-16 rounded bg-slate-200" />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <Package size={26} className="text-slate-400" />
        </div>
        <p className="font-medium text-slate-500">No products found</p>
        <button
          type="button"
          onClick={onAddProduct}
          className="mt-2 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Add Product
        </button>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#F1F5F9]">
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Product Image</th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Product Name</th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Default Price</th>
            {showBuyerPrice && (
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-blue-600">Buyer Price</th>
            )}
            {showActions && (
              <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t border-slate-100 transition-colors hover:bg-slate-50/60">
              <td className="px-6 py-4">
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  ) : (
                    <Package size={22} className="text-slate-300" />
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="font-semibold text-slate-900">{product.name}</p>
                <p className="mt-0.5 text-xs text-slate-400">{product.sku}</p>
              </td>
              <td className="px-6 py-4 text-slate-700">{formatCurrency(product.defaultPrice)}</td>
              {showBuyerPrice && (
                <td className="px-6 py-4 font-semibold text-blue-600">{formatCurrency(product.buyerPrice)}</td>
              )}
              {showActions && (
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      title="Edit Product"
                      onClick={() => onEdit?.(product)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-blue-500 transition-colors hover:bg-blue-50"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      title="Delete Product"
                      onClick={() => onDelete?.(product)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable

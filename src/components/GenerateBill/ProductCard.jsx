import React from 'react'
import { MdInventory2 } from 'react-icons/md'

function ProductCard({ product, inBill, onAdd }) {
  return (
    <article
      onClick={() => onAdd(product)}
      className={`relative flex-1 min-w-[calc(50%-6px)] lg:flex-none lg:w-full
        flex flex-col lg:flex-row overflow-hidden rounded-lg border bg-white
        cursor-pointer transition-all hover:shadow-md
        ${inBill ? 'border-blue-400 ring-1 ring-blue-200' : 'border-slate-200 hover:border-blue-300'}`}
    >
      {/* Image */}
      <div className="h-24 lg:h-auto lg:w-36 shrink-0 bg-slate-50 flex items-center justify-center">
        <MdInventory2 size={36} className="text-slate-400" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 p-2.5 lg:p-4 flex flex-col justify-between">
        <div>
          <p className="font-semibold text-slate-800 text-xs lg:text-[15px] leading-tight">{product.modelName}</p>
          <span className="mt-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[9px] lg:text-[10px] font-medium text-slate-500">
            {product.categoryName}
          </span>
          {product.hasSpecialPrice && (
            <span className="ml-1 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] lg:text-[10px] font-medium text-emerald-600">
              Special Price
            </span>
          )}
        </div>
        <div className="mt-1.5 flex items-end justify-between">
          <div>
            <span className="text-base lg:text-2xl font-bold text-blue-700">
              ₹{(product.effectivePrice ?? 0).toLocaleString()}
            </span>
            {product.hasSpecialPrice && (
              <span className="ml-1.5 text-[10px] lg:text-xs text-slate-400 line-through">
                ₹{(product.defaultPrice ?? 0).toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {inBill && (
        <span className="absolute top-2 right-2 inline-flex items-center justify-center h-5 min-w-5 rounded-full bg-blue-600 px-1.5 text-[11px] font-bold text-white shadow">
          {inBill.qty}
        </span>
      )}
    </article>
  )
}

export default ProductCard

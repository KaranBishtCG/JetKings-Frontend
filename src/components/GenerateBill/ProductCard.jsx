import React from 'react'
import { MdInventory2, MdAddShoppingCart } from 'react-icons/md'
import { MdAdd, MdRemove } from 'react-icons/md'

function ProductCard({ product, inBill, onAdd, onSetQty }) {
  const qty = inBill?.qty ?? 0

  const handleDec = (event) => {
    event.stopPropagation()
    onSetQty(product, qty - 1)
  }

  const handleInc = (event) => {
    event.stopPropagation()
    onSetQty(product, qty + 1)
  }

  const handleInput = (event) => {
    event.stopPropagation()
    const nextValue = Number(event.target.value)
    if (Number.isNaN(nextValue)) return
    onSetQty(product, Math.max(0, Math.floor(nextValue)))
  }

  return (
    <article
      className={`relative flex-1 min-w-[calc(50%-6px)] lg:flex-none lg:w-full
        flex flex-col lg:flex-row overflow-hidden rounded-lg border bg-white
        transition-all hover:shadow-md
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
          <div className="lg:hidden flex items-center gap-1 rounded-lg border border-slate-200 px-1 py-1">
            <button
              type="button"
              onClick={handleDec}
              className="h-6 w-6 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-100"
            >
              <MdRemove size={12} />
            </button>
            <input
              type="number"
              min="0"
              value={qty}
              onClick={(event) => event.stopPropagation()}
              onChange={handleInput}
              className="h-6 w-10 rounded border border-slate-200 text-center text-xs font-semibold text-slate-700 outline-none"
            />
            <button
              type="button"
              onClick={handleInc}
              className="h-6 w-6 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-100"
            >
              <MdAdd size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop add column */}
      <div className={`hidden lg:flex items-center justify-center w-14 shrink-0 border-l transition-colors ${
        inBill
          ? 'bg-blue-50 border-blue-200 text-blue-600'
          : 'border-slate-100 text-slate-400 hover:bg-blue-50 hover:text-blue-600'
      }`}>
        <div className="flex flex-col items-center gap-1.5 p-1">
          <button
            type="button"
            onClick={handleInc}
            className="h-6 w-6 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
          >
            <MdAdd size={12} />
          </button>
          <input
            type="number"
            min="0"
            value={qty}
            onClick={(event) => event.stopPropagation()}
            onChange={handleInput}
            className="h-6 w-10 rounded border border-slate-200 bg-white text-center text-xs font-semibold text-slate-700 outline-none"
          />
          <button
            type="button"
            onClick={handleDec}
            className="h-6 w-6 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
          >
            <MdRemove size={12} />
          </button>
        </div>
      </div>

      {!inBill && (
        <button
          type="button"
          onClick={() => onAdd(product)}
          className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-slate-600 shadow-sm hover:bg-white"
        >
          <MdAddShoppingCart size={12} /> Add
        </button>
      )}
    </article>
  )
}

export default ProductCard

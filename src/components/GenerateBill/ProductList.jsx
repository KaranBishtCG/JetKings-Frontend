import React, { useState } from 'react'
import ProductCard from './ProductCard'
import { Skeleton } from '../common/Skeleton'
import { PER_PAGE } from './billData'

function ProductList({ products, productsLoading, billItems, onAdd }) {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(products.length / PER_PAGE))
  const safePage   = Math.min(page, totalPages)
  const start      = (safePage - 1) * PER_PAGE
  const paginated  = products.slice(start, start + PER_PAGE)

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[11px] font-semibold text-blue-600">3</span>
          <h2 className="text-base font-semibold text-blue-600">Select Products</h2>
        </div>
        <span className="text-xs text-slate-400">
          {products.length} product{products.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Cards — 2-per-row on mobile, vertical list on lg */}
      <div className="flex flex-wrap gap-3 lg:flex-col lg:flex-nowrap">
        {productsLoading
          ? Array.from({ length: PER_PAGE }).map((_, i) => (
              <div key={i} className="flex-1 min-w-[calc(50%-6px)] lg:flex-none lg:w-full flex overflow-hidden rounded-lg border border-slate-200">
                <Skeleton className="h-24 lg:h-auto lg:w-36 shrink-0 rounded-none" />
                <div className="flex-1 p-3 space-y-2">
                  <Skeleton className="w-3/4 h-3.5 rounded" />
                  <Skeleton className="w-full h-3 rounded" />
                  <Skeleton className="w-1/2 h-3 rounded" />
                </div>
              </div>
            ))
          : paginated.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                inBill={billItems.find((i) => i.id === product.id)}
                onAdd={onAdd}
              />
            ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-100 pt-3">
          <p className="text-xs text-slate-400">
            Showing {start + 1}–{Math.min(start + PER_PAGE, products.length)} of {products.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={safePage === 1}
              className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 text-xs rounded-lg font-medium transition-colors ${
                  p === safePage
                    ? 'bg-blue-600 text-white'
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={safePage === totalPages}
              className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductList

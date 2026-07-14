import React from 'react'
import { MdShoppingCartCheckout, MdAdd, MdRemove } from 'react-icons/md'

function BillItemsTable({ billItems, onSetQty, onRemove }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[11px] font-semibold text-blue-600">4</span>
          <h2 className="text-base font-semibold text-blue-600">Bill Items</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500">
          {billItems.length} Item{billItems.length !== 1 ? 's' : ''}
        </span>
      </div>

      {billItems.length === 0 ? (
        <div className="flex h-36 flex-col items-center justify-center text-center">
          <MdShoppingCartCheckout size={22} className="text-slate-300" />
          <p className="mt-2 text-sm text-slate-400">Click a product above to add it to the bill.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px]">
            <thead>
              <tr className="bg-slate-50 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-4 py-2.5">Product</th>
                <th className="px-4 py-2.5">Unit Price</th>
                <th className="px-4 py-2.5">Qty</th>
                <th className="px-4 py-2.5">Amount</th>
                <th className="px-4 py-2.5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {billItems.map((item) => (
                <tr key={item.id} className="text-sm">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-800">{item.name}</p>
                    <p className="text-xs text-slate-400">{item.category}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-700">₹{item.price.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onSetQty(item.id, Math.max(1, item.qty - 1))}
                        className="h-6 w-6 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-100"
                      >
                        <MdRemove size={12} />
                      </button>
                      <input
                        key={item.qty}
                        type="number"
                        min="1"
                        defaultValue={item.qty}
                        onBlur={(e) => {
                          const val = Math.max(1, Number(e.target.value) || 1);
                          onSetQty(item.id, val);
                        }}
                        className="h-7 w-12 rounded border border-slate-200 text-center text-xs font-semibold text-slate-700 outline-none focus:border-blue-400"
                      />
                      <button
                        onClick={() => onSetQty(item.id, item.qty + 1)}
                        className="h-6 w-6 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-100"
                      >
                        <MdAdd size={12} />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-800">
                    ₹{(item.price * item.qty).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-xs font-medium text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default BillItemsTable

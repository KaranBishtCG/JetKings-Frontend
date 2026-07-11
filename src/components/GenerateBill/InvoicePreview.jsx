import React from 'react'
import { fmt } from './billData'

function InvoicePreview({ billItems, selectedBuyer, subtotal, gst, total }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[11px] font-semibold text-blue-600">6</span>
        <h2 className="text-[15px] font-semibold uppercase tracking-wide text-blue-600">Live Preview</h2>
      </div>

      <div className="rounded-lg border border-slate-200 p-3 text-[9px] text-slate-500">
        {/* Invoice header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-2">
          <div>
            <p className="text-[10px] font-bold tracking-wide text-blue-700">JETKINGS SANITARY</p>
            <p>GST: 07AAJCK1234Z1Z5</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-slate-600">INVOICE</p>
            <p>INV-2024001</p>
          </div>
        </div>

        {/* Bill to */}
        <div className="py-2">
          <p className="font-semibold text-slate-700">BILL TO:</p>
          <p>{selectedBuyer || '— Select buyer —'}</p>
        </div>

        {/* Line items */}
        <div className="border-t border-slate-200 pt-2">
          <div className="flex font-semibold text-slate-600">
            <span className="flex-1">ITEM</span>
            <span className="w-6 text-center">QTY</span>
            <span className="w-16 text-right">TOTAL</span>
          </div>
          {billItems.length === 0 ? (
            <p className="py-2 text-center text-slate-400">—</p>
          ) : (
            billItems.map((item) => (
              <div key={item.id} className="flex py-0.5">
                <span className="flex-1 truncate">{item.name}</span>
                <span className="w-6 text-center">{item.qty}</span>
                <span className="w-16 text-right">₹{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-slate-200 pt-2 space-y-0.5">
          <div className="flex justify-between text-slate-500">
            <span>Subtotal</span>
            <span>₹{fmt(subtotal)}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>GST (5%)</span>
            <span>₹{fmt(gst)}</span>
          </div>
          <div className="flex justify-between font-semibold text-slate-700 border-t border-slate-200 pt-1 mt-1">
            <span>TOTAL</span>
            <span>₹{fmt(total)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoicePreview

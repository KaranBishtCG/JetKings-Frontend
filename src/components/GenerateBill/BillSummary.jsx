import React from 'react'
import { MdDownload, MdPrint, MdPerson } from 'react-icons/md'
import { fmt } from './billData'

function BillSummary({ subtotal, gst, total, selectedBuyer, hasBuyer, onDownloadPdf, onPrintInvoice, downloading }) {
  const noBuyer = !hasBuyer
  const disabledBtn = 'opacity-40 cursor-not-allowed pointer-events-none'
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[11px] font-semibold text-blue-600">5</span>
            <h2 className="text-[15px] font-semibold text-blue-600">Summary & Checkout</h2>
          </div>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
            <MdPerson size={14} />
          </span>
        </div>
        {selectedBuyer && (
          <p className="mb-2 rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">{selectedBuyer}</p>
        )}
        <div className="space-y-2 text-sm text-slate-500">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-700">₹{fmt(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>GST (5%)</span>
            <span className="font-semibold text-slate-700">₹{fmt(gst)}</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Grand Total</p>
        <p className="mt-1 text-4xl font-bold leading-none text-blue-700">₹{fmt(total)}</p>
      </div>

      <div className="flex flex-col gap-3 px-4 pb-4">
        <button
          onClick={onDownloadPdf}
          disabled={downloading || noBuyer}
          className={`flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors ${noBuyer || downloading ? disabledBtn : ''}`}
        >
          <MdDownload size={17} /> {downloading ? 'Generating PDF…' : 'Download PDF'}
        </button>
        <button
          onClick={onPrintInvoice}
          disabled={noBuyer}
          className={`flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors ${noBuyer ? disabledBtn : ''}`}
        >
          <MdPrint size={17} /> Print Invoice
        </button>
        {noBuyer && (
          <p className="text-center text-xs text-amber-600 font-medium">
            Select a buyer to enable download &amp; print
          </p>
        )}
      </div>
    </div>
  )
}

export default BillSummary

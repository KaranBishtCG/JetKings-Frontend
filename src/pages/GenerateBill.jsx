import React, { useState } from 'react'
import { PRODUCTS, BUYERS, CATEGORIES, GST_RATE } from '../components/GenerateBill/billData'
import BillHeader      from '../components/GenerateBill/BillHeader'
import BuyerSelect     from '../components/GenerateBill/BuyerSelect'
import CategoryFilter  from '../components/GenerateBill/CategoryFilter'
import ProductList     from '../components/GenerateBill/ProductList'
import BillItemsTable  from '../components/GenerateBill/BillItemsTable'
import BillSummary     from '../components/GenerateBill/BillSummary'
import InvoicePreview  from '../components/GenerateBill/InvoicePreview'

function GenerateBill() {
  const [billItems, setBillItems]         = useState([])
  const [selectedBuyer, setSelectedBuyer] = useState('')
  const [category, setCategory]           = useState('All')

  const filteredProducts =
    category === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === category)

  const addToBill = (product) => {
    setBillItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const updateQty = (id, delta) =>
    setBillItems((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    )

  const removeItem = (id) => setBillItems((prev) => prev.filter((i) => i.id !== id))

  const subtotal = billItems.reduce((sum, i) => sum + i.price * i.qty, 0)
  const gst      = subtotal * GST_RATE
  const total    = subtotal + gst

  return (
    <div className="w-full max-w-[1180px] mx-auto text-slate-800">
      <BillHeader />

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left column — steps 1-4 */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <BuyerSelect value={selectedBuyer} onChange={setSelectedBuyer} buyers={BUYERS} />
          <CategoryFilter categories={CATEGORIES} selected={category} onChange={setCategory} />
          {/* key resets pagination whenever the category filter changes */}
          <ProductList key={category} products={filteredProducts} billItems={billItems} onAdd={addToBill} />
          <BillItemsTable billItems={billItems} onUpdateQty={updateQty} onRemove={removeItem} />
        </div>

        {/* Right column — steps 5-6 */}
        <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
          <BillSummary subtotal={subtotal} gst={gst} total={total} selectedBuyer={selectedBuyer} />
          <InvoicePreview billItems={billItems} selectedBuyer={selectedBuyer} total={total} />
        </aside>
      </div>
    </div>
  )
}

export default GenerateBill
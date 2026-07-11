import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { GST_RATE } from '../components/GenerateBill/billData'
import { fetchCategories, fetchProducts } from '../state/slices/GenerateBillSlice'
import BillHeader      from '../components/GenerateBill/BillHeader'
import BuyerSelect     from '../components/GenerateBill/BuyerSelect'
import CategoryFilter  from '../components/GenerateBill/CategoryFilter'
import ProductList     from '../components/GenerateBill/ProductList'
import BillItemsTable  from '../components/GenerateBill/BillItemsTable'
import BillSummary     from '../components/GenerateBill/BillSummary'
import InvoicePreview  from '../components/GenerateBill/InvoicePreview'
import InvoiceTemplate from '../components/InvoiceTemplate'

const ALL_CATEGORY = { id: null, name: 'All' }

function GenerateBill() {
  const dispatch = useDispatch()
  const { categories, products, productsLoading } = useSelector((s) => s.generateBill)

  const [billItems, setBillItems]         = useState([])
  const [selectedBuyer, setSelectedBuyer] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY)
  const [downloading, setDownloading]     = useState(false)

  const invoiceRef = useRef(null)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  // Re-fetch products whenever buyer or category changes
  useEffect(() => {
    dispatch(fetchProducts({
      buyerId: selectedBuyer?.id ?? null,
      categoryId: selectedCategory.id,
    }))
  }, [dispatch, selectedBuyer, selectedCategory])

  const allCategories = [ALL_CATEGORY, ...categories]

  const addToBill = (product) => {
    setBillItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      // Normalize API fields so downstream bill components always see `price` and `name`
      const normalized = {
        ...product,
        name: product.modelName ?? product.name,
        price: product.effectivePrice ?? product.price ?? 0,
      }
      return [...prev, { ...normalized, qty: 1 }]
    })
  }

  const updateQty = (id, delta) => {
    setBillItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i,
      ),
    );
  };

  const removeItem = (id) => {
    setBillItems((prev) => prev.filter((i) => i.id !== id));
  };

  const subtotal = billItems.reduce((sum, i) => sum + i.price * i.qty, 0)
  const gst      = subtotal * GST_RATE
  const total    = subtotal + gst

  const invoiceData = {
    invoiceNo: `INV-${Date.now().toString().slice(-6)}`,
    date: new Date().toLocaleDateString('en-IN'),
    company: {
      name: 'JetKings Sanitary',
      gstin: '07AAJCK1234Z1Z5',
      address: 'New Delhi',
    },
    customer: {
      name: selectedBuyer?.partyName ?? '—',
      gstin: selectedBuyer?.gstin ?? '—',
      address: [selectedBuyer?.billingAddress, selectedBuyer?.city, selectedBuyer?.state]
        .filter(Boolean).join(', ') || '—',
    },
    items: billItems.map((i) => ({
      name: i.name,
      qty: i.qty,
      price: i.price,
    })),
  }

  const handleDownloadPdf = async () => {
    if (!invoiceRef.current) return
    setDownloading(true)
    try {
      const canvas = await html2canvas(invoiceRef.current, { scale: 2, useCORS: true })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pdfWidth  = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`Invoice-${invoiceData.invoiceNo}.pdf`)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="w-full max-w-[1180px] mx-auto text-slate-800">
      <BillHeader />

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left column — steps 1-4 */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <BuyerSelect value={selectedBuyer} onChange={setSelectedBuyer} />
          <CategoryFilter categories={allCategories} selected={selectedCategory} onChange={setSelectedCategory} />
          {/* key resets pagination whenever the category filter changes */}
          <ProductList key={selectedCategory.id} products={products} productsLoading={productsLoading} billItems={billItems} onAdd={addToBill} />
          <BillItemsTable billItems={billItems} onUpdateQty={updateQty} onRemove={removeItem} />
        </div>

        {/* Right column — steps 5-6 */}
        <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
          <BillSummary
            subtotal={subtotal} gst={gst} total={total}
            selectedBuyer={selectedBuyer?.partyName ?? ''}
            onDownloadPdf={handleDownloadPdf}
            downloading={downloading}
          />
          <InvoicePreview billItems={billItems} selectedBuyer={selectedBuyer?.partyName ?? ''} subtotal={subtotal} gst={gst} total={total} />
        </aside>
      </div>

      {/* Hidden invoice used for PDF capture */}
      <div className="fixed -left-[9999px] top-0 w-[794px]" aria-hidden="true">
        <div ref={invoiceRef}>
          <InvoiceTemplate invoice={invoiceData} />
        </div>
      </div>
    </div>
  );
}

export default GenerateBill;

import logo from '../assets/Designer.png'
import signature from '../assets/signature.png'

const ones = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
]
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

function numToWords(n) {
  n = Math.round(n)
  if (n === 0) return 'Zero'
  if (n < 20) return ones[n]
  if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ` ${ones[n % 10]}` : '')
  if (n < 1000) return `${ones[Math.floor(n / 100)]} Hundred${n % 100 ? ` ${numToWords(n % 100)}` : ''}`
  if (n < 100000) return `${numToWords(Math.floor(n / 1000))} Thousand${n % 1000 ? ` ${numToWords(n % 1000)}` : ''}`
  if (n < 10000000) return `${numToWords(Math.floor(n / 100000))} Lakh${n % 100000 ? ` ${numToWords(n % 100000)}` : ''}`
  return `${numToWords(Math.floor(n / 10000000))} Crore${n % 10000000 ? ` ${numToWords(n % 10000000)}` : ''}`
}

function amountInWords(amount) {
  const rupees = Math.floor(amount)
  const paise = Math.round((amount - rupees) * 100)
  let result = `${numToWords(rupees)} Rupees`
  if (paise > 0) result += ` and ${numToWords(paise)} Paise`
  return `${result} Only`
}

function fmt(n) {
  return Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function InvoiceTemplate({ invoice, showSignature = true }) {
  const subtotal = invoice.items.reduce((sum, item) => sum + item.qty * item.price, 0)
  const cgst = subtotal * 0.025
  const sgst = subtotal * 0.025
  const total = subtotal + cgst + sgst

  const cell = 'border border-black p-1.5'

  return (
    <div className="max-w-4xl mx-auto bg-white text-[11px] font-sans border border-black">
      <div className="flex items-stretch border-b border-black">
        <div className="w-24 shrink-0 border-r border-black flex items-center justify-center p-2">
          <img src={logo} alt="Logo" className="h-24 object-cover" />
        </div>
        <div className="flex-1 text-center p-2">
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Tax Invoice</p>
          <h1 className="text-2xl font-extrabold uppercase tracking-wide text-blue-800 leading-tight">{invoice.company.name}</h1>
          <p className="text-[10px] text-gray-600 mt-0.5">
            Premium Sanitary Ware • Faucets • Bath Fittings • Accessories
          </p>
          <p className="mt-0.5">{invoice.company.address}</p>
          <p><strong>GSTIN:</strong> {invoice.company.gstin}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 border-b border-black text-[10px]">
        <div className="border-r border-black p-2 space-y-1">
          <div className="flex gap-2"><span className="w-32 font-semibold">Invoice No</span><span>: {invoice.invoiceNo}</span></div>
          <div className="flex gap-2"><span className="w-32 font-semibold">Invoice Date</span><span>: {invoice.date}</span></div>
          <div className="flex gap-2"><span className="w-32 font-semibold">Reverse Charge</span><span>: No</span></div>
          <div className="flex gap-2"><span className="w-32 font-semibold">State</span><span>: {invoice.customer.state}</span></div>
        </div>
        <div className="p-2 space-y-1">
          <div className="flex gap-2"><span className="w-40 font-semibold">Transportation Mode</span><span>:</span></div>
          <div className="flex gap-2"><span className="w-40 font-semibold">Vehicle No</span><span>:</span></div>
          <div className="flex gap-2"><span className="w-40 font-semibold">Date of Supply</span><span>: {invoice.date}</span></div>
          <div className="flex gap-2"><span className="w-40 font-semibold">Place of Supply</span><span>: {invoice.customer.state}</span></div>
        </div>
      </div>

      <div className="grid grid-cols-2 border-b border-black text-[10px]">
        {[{ label: 'Details of Receiver (Billed To)' }, { label: 'Details of Consignee (Shipped To)' }].map((section, i) => (
          <div key={section.label} className={i === 0 ? 'border-r border-black' : ''}>
            <div className="bg-gray-200 border-b border-black text-center font-bold p-1 text-[10px] uppercase tracking-wide">{section.label}</div>
            <div className="p-2 space-y-1.5">
              <div className="flex gap-1"><span className="w-16 font-semibold">Name</span><span>: {invoice.customer.name}</span></div>
              <div className="flex gap-1"><span className="w-16 font-semibold">Address</span><span>: {invoice.customer.address}</span></div>
              <div className="flex gap-1"><span className="w-16 font-semibold">City</span><span>: {invoice.customer.city}</span></div>
              <div className="flex gap-1"><span className="w-16 font-semibold">GSTIN</span><span>: {invoice.customer.gstin}</span></div>
              <div className="flex gap-1"><span className="w-16 font-semibold">State</span><span>: {invoice.customer.state}</span></div>
              <div className="flex gap-1"><span className="w-16 font-semibold">State Code</span><span>: {invoice.customer.stateCode}</span></div>
            </div>
          </div>
        ))}
      </div>

      <table className="w-full border-collapse text-[10px]">
        <thead>
          <tr className="bg-gray-200">
            <th className={`${cell} w-8 text-center`}>Sr No</th>
            <th className={`${cell} text-left`}>Name of Product / Service</th>
            <th className={`${cell} w-12 text-center`}>UOM</th>
            <th className={`${cell} w-12 text-center`}>Qty</th>
            <th className={`${cell} w-20 text-right`}>Rate</th>
            <th className={`${cell} w-24 text-right`}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={`${item.name}-${index}`}>
              <td className={`${cell} text-center`}>{index + 1}</td>
              <td className={cell}>{item.name}</td>
              <td className={`${cell} text-center`}>PCS</td>
              <td className={`${cell} text-center`}>{item.qty}</td>
              <td className={`${cell} text-right`}>₹{fmt(item.price)}</td>
              <td className={`${cell} text-right`}>₹{fmt(item.qty * item.price)}</td>
            </tr>
          ))}
          {Array.from({ length: Math.max(0, 6 - invoice.items.length) }).map((_, index) => (
            <tr key={`empty-${index}`} className="h-6">
              <td className={cell}>&nbsp;</td>
              <td className={cell}></td>
              <td className={cell}></td>
              <td className={cell}></td>
              <td className={cell}></td>
              <td className={cell}></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid grid-cols-2 border-t border-black text-[10px]">
        <div className="border-r border-black p-2 space-y-2">
          <div>
            <p className="font-bold uppercase">Total Invoice Value (in words)</p>
            <p className="mt-0.5 capitalize">{amountInWords(total)}</p>
          </div>
          <div className="border-t border-black pt-2">
            <p className="font-bold uppercase mb-1">Terms & Conditions</p>
            <p>1. Goods once sold will not be taken back.</p>
            <p>2. Interest @ 18% p.a. will be charged after due date.</p>
            <p>3. Subject to Delhi jurisdiction only.</p>
          </div>
        </div>

        <div>
          <table className="w-full border-collapse text-[10px]">
            <tbody>
              {[
                ['Total Amount Before Tax', `₹${fmt(subtotal)}`],
                ['CGST @ 2.5%', `₹${fmt(cgst)}`],
                ['SGST @ 2.5%', `₹${fmt(sgst)}`],
              ].map(([label, value], index) => (
                <tr key={label}>
                  <td className={`${cell} font-medium`}>{index + 1}. {label}</td>
                  <td className={`${cell} text-right`}>{value}</td>
                </tr>
              ))}
              <tr className="bg-gray-200 font-bold">
                <td className={cell}>Total Amount</td>
                <td className={`${cell} text-right`}>₹{fmt(total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 border-t border-black text-[10px]">
        <div className="border-r border-black p-3 flex items-end justify-center">
          <p className="font-semibold">Common Seal</p>
        </div>
        <div className="p-3 flex flex-col items-center">
          <p className="font-bold text-blue-800 self-end mb-1">For {invoice.company.name}</p>
          {showSignature && <img src={signature} alt="Signature" className="h-12 object-contain" />}
          <p className="font-semibold mt-1">Authorised Signatory</p>
        </div>
      </div>
    </div>
  )
}

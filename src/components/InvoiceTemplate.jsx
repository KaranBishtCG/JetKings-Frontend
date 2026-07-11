import logo from "../assets/Designer.png";
import signature from "/JetKings.jpg";

/* ── Number to words (Indian system) ── */
const ones = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine',
  'Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen']
const tens = ['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety']

function numToWords(n) {
  n = Math.round(n)
  if (n === 0) return 'Zero'
  if (n < 20)  return ones[n]
  if (n < 100) return tens[Math.floor(n/10)] + (n%10 ? ' ' + ones[n%10] : '')
  if (n < 1000) return ones[Math.floor(n/100)] + ' Hundred' + (n%100 ? ' ' + numToWords(n%100) : '')
  if (n < 100000) return numToWords(Math.floor(n/1000)) + ' Thousand' + (n%1000 ? ' ' + numToWords(n%1000) : '')
  if (n < 10000000) return numToWords(Math.floor(n/100000)) + ' Lakh' + (n%100000 ? ' ' + numToWords(n%100000) : '')
  return numToWords(Math.floor(n/10000000)) + ' Crore' + (n%10000000 ? ' ' + numToWords(n%10000000) : '')
}

function amountInWords(amount) {
  const rupees = Math.floor(amount)
  const paise  = Math.round((amount - rupees) * 100)
  let result   = numToWords(rupees) + ' Rupees'
  if (paise > 0) result += ' and ' + numToWords(paise) + ' Paise'
  return result + ' Only'
}

function fmt(n) {
  return n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

/* ── Component ── */
export default function InvoiceTemplate({ invoice }) {
  const subtotal = invoice.items.reduce((sum, i) => sum + i.qty * i.price, 0)
  const cgst     = subtotal * 0.025
  const sgst     = subtotal * 0.025
  const total    = subtotal + cgst + sgst

  const cell = 'border border-black p-1.5'

  return (
    <div className="max-w-4xl mx-auto bg-white text-[11px] font-sans border border-black">

      {/* ── HEADER ── */}
      <div className="flex items-stretch border-b border-black">
        <div className="w-24 shrink-0 border-r border-black flex items-center justify-center p-2">
          <img src={logo} alt="Logo" className="h-24 object-cover" />
        </div>
        <div className="flex-1 text-center p-2">
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">TAX INVOICE</p>
          <h1 className="text-2xl font-extrabold uppercase tracking-wide text-blue-800 leading-tight">
            {invoice.company.name}
          </h1>
          <p className="text-[10px] text-gray-600 mt-0.5">
            Premium Sanitary Ware &bull; Faucets &bull; Bath Fittings &bull; Accessories
          </p>
          <p className="mt-0.5">{invoice.company.address}</p>
          <p><strong>GSTIN:</strong> {invoice.company.gstin} &nbsp;|&nbsp; <strong>MSME No:</strong> UDYAM-DL-05-0028860</p>
        </div>
      </div>

      {/* ── INVOICE META ── */}
      <div className="grid grid-cols-2 border-b border-black text-[10px]">
        <div className="border-r border-black p-2 space-y-1">
          <div className="flex gap-2"><span className="w-32 font-semibold">Invoice No</span><span>: {invoice.invoiceNo}</span></div>
          <div className="flex gap-2"><span className="w-32 font-semibold">Invoice Date</span><span>: {invoice.date}</span></div>
          <div className="flex gap-2"><span className="w-32 font-semibold">Reverse Charge</span><span>: No</span></div>
          <div className="flex gap-2"><span className="w-32 font-semibold">State</span><span>: {invoice.company.address}</span></div>
        </div>
        <div className="p-2 space-y-1">
          <div className="flex gap-2"><span className="w-40 font-semibold">Transportation Mode</span><span>:</span></div>
          <div className="flex gap-2"><span className="w-40 font-semibold">Vehicle No</span><span>:</span></div>
          <div className="flex gap-2"><span className="w-40 font-semibold">Date of Supply</span><span>: {invoice.date}</span></div>
          <div className="flex gap-2"><span className="w-40 font-semibold">Place of Supply</span><span>: Delhi</span></div>
        </div>
      </div>

      {/* ── BILLED TO / SHIPPED TO ── */}
      <div className="grid grid-cols-2 border-b border-black text-[10px]">
        {[{ label: 'Details of Receiver (Billed To)' }, { label: 'Details of Consignee (Shipped To)' }].map(({ label }, i) => (
          <div key={i} className={i === 0 ? 'border-r border-black' : ''}>
            <div className="bg-gray-200 border-b border-black text-center font-bold p-1 text-[10px] uppercase tracking-wide">
              {label}
            </div>
            <div className="p-2 space-y-1.5">
              <div className="flex gap-1"><span className="w-16 font-semibold">Name</span><span>: {invoice.customer.name}</span></div>
              <div className="flex gap-1"><span className="w-16 font-semibold">Address</span><span>: {invoice.customer.address}</span></div>
              <div className="flex gap-1"><span className="w-16 font-semibold">City</span><span>: {invoice.customer.city}</span></div>
              <div className="flex gap-1"><span className="w-16 font-semibold">GSTIN No</span><span>: {invoice.customer.gstin}</span></div>
              <div className="flex gap-1"><span className="w-16 font-semibold">State</span><span>: {invoice.customer.state}</span></div>
              <div className="flex gap-1"><span className="w-16 font-semibold">State Code</span><span>: {invoice.customer.stateCode}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* ── ITEMS TABLE ── */}
      <table className="w-full border-collapse text-[10px]">
        <thead>
          <tr className="bg-gray-200">
            <th className={`${cell} w-8 text-center`}>SR<br/>NO</th>
            <th className={`${cell} text-left`}>NAME OF PRODUCT / SERVICE</th>
            <th className={`${cell} w-12 text-center`}>UOM</th>
            <th className={`${cell} w-12 text-center`}>QTY</th>
            <th className={`${cell} w-20 text-right`}>RATE</th>
            <th className={`${cell} w-24 text-right`}>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, i) => (
            <tr key={i}>
              <td className={`${cell} text-center`}>{i + 1}</td>
              <td className={`${cell}`}>{item.name}</td>
              <td className={`${cell} text-center`}>PCS</td>
              <td className={`${cell} text-center`}>{item.qty}</td>
              <td className={`${cell} text-right`}>₹{fmt(item.price)}</td>
              <td className={`${cell} text-right`}>₹{fmt(item.qty * item.price)}</td>
            </tr>
          ))}
          {/* empty filler rows */}
          {Array.from({ length: Math.max(0, 6 - invoice.items.length) }).map((_, i) => (
            <tr key={`e${i}`} className="h-6">
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

      {/* ── TOTALS + WORDS ── */}
      <div className="grid grid-cols-2 border-t border-black text-[10px]">
        {/* Left — amount in words + terms */}
        <div className="border-r border-black p-2 space-y-2">
          <div>
            <p className="font-bold uppercase">Total Invoice Value (in words)</p>
            <p className="mt-0.5 capitalize">{amountInWords(total)}</p>
          </div>
          <div className="border-t border-black pt-2">
            <p className="font-bold uppercase mb-1">Terms &amp; Conditions</p>
            <p>1. Goods once sold will not be taken back.</p>
            <p>2. Interest @ 18% p.a. will be charged after due date.</p>
            <p>3. Subject to Delhi jurisdiction only.</p>
          </div>
          <div className="border-t border-black pt-2">
            <p className="font-bold uppercase mb-1">Bank Details</p>
            <p><strong>Bank:</strong> HDFC Bank</p>
            <p><strong>A/C No:</strong> XXXXXXXXXXXX</p>
            <p><strong>IFSC:</strong> HDFC0000XXX</p>
          </div>
        </div>

        {/* Right — tax summary */}
        <div>
          <table className="w-full border-collapse text-[10px]">
            <tbody>
              {[
                ['Total', `₹${fmt(subtotal)}`],
                ['Discount (if any)', '—'],
                ['Total Amount Before Tax', `₹${fmt(subtotal)}`],
                [`CGST @ 2.5%`, `₹${fmt(cgst)}`],
                [`SGST @ 2.5%`, `₹${fmt(sgst)}`],
                ['IGST @ 0%', '—'],
                ['Output GST (CGST+SGST+IGST)', `₹${fmt(cgst + sgst)}`],
              ].map(([label, val], i) => (
                <tr key={i}>
                  <td className={`${cell} font-medium`}>{i + 1}. {label}</td>
                  <td className={`${cell} text-right`}>{val}</td>
                </tr>
              ))}
              <tr className="bg-gray-200 font-bold">
                <td className={`${cell}`}>TOTAL AMOUNT</td>
                <td className={`${cell} text-right`}>₹{fmt(total)}</td>
              </tr>
            </tbody>
          </table>
          <p className="text-[9px] italic p-1.5 border-t border-black">
            GST Payable on Reverse Charge: No
          </p>
        </div>
      </div>

      {/* ── FOOTER / SIGNATURE ── */}
      <div className="grid grid-cols-2 border-t border-black text-[10px]">
        <div className="border-r border-black p-3 flex items-end justify-center">
          <p className="font-semibold">Common Seal</p>
        </div>
        <div className="p-3 flex flex-col items-center">
          <p className="font-bold text-blue-800 self-end mb-1">For {invoice.company.name}</p>
          <img src={signature} alt="Signature" className="h-12 object-contain" />
          <p className="font-semibold mt-1">Authorised Signatory</p>
        </div>
      </div>
    </div>
  )
}


// export default function InvoiceTemplate({ invoice }) {
//   const subtotal = invoice.items.reduce(
//     (sum, item) => sum + item.qty * item.price,
//     0,
//   );
//   const gst   = subtotal * 0.05;
//   const total = subtotal + gst;

//   return (
//     <div className="max-w-6xl mx-auto bg-white text-[12px] border border-black">
//       {/* HEADER */}
//       <div className="border-b border-black p-3">
//         <div className="flex items-center">
//           <div className="w-1/5">
//             <img src={logo} alt="Company Logo" className="h-20 mx-auto mb-2" />
//           </div>

//           <div className="w-4/5 text-center">
//             <h1
//               className="text-3xl font-bold uppercase"
//               style={{ color: "#123D7A" }}
//             >
//               {invoice.company.name || "JETKINS"}
//             </h1>

//             <p className="font-semibold text-gray-700 uppercase">
//               Premium Sanitary Ware • Faucets • Bath Fittings • Accessories
//             </p>

//             <p>{invoice.company.address}</p>

//             <p>
//               <strong>GSTIN :</strong> {invoice.company.gstin}
//             </p>

//             <h2 className="font-bold text-lg mt-2 uppercase">TAX INVOICE</h2>
//           </div>
//         </div>
//       </div>

//       {/* INVOICE DETAILS */}
//       <div className="grid grid-cols-2 border-b border-black">
//         <div className="border-r border-black p-2 space-y-1">
//           <p>
//             <strong>Invoice No :</strong> {invoice.invoiceNo}
//           </p>

//           <p>
//             <strong>Invoice Date :</strong> {invoice.date}
//           </p>

//           <p>
//             <strong>Reverse Charge :</strong> No
//           </p>
//         </div>

//         <div className="p-2 space-y-1">
//           <p>
//             <strong>Transport Mode :</strong>
//           </p>

//           <p>
//             <strong>Vehicle No :</strong>
//           </p>

//           <p>
//             <strong>Place of Supply :</strong>
//           </p>
//         </div>
//       </div>

//       {/* CUSTOMER DETAILS */}
//       <div className="grid grid-cols-2 border-b border-black">
//         <div className="border-r border-black">
//           <div className="bg-gray-100 border-b border-black text-center font-bold p-1">
//             Details of Receiver (Billed To)
//           </div>

//           <div className="p-2 space-y-2">
//             <p>
//               <strong>Name :</strong> {invoice.customer.name}
//             </p>

//             <p>
//               <strong>Address :</strong> {invoice.customer.address}
//             </p>

//             <p>
//               <strong>GSTIN :</strong> {invoice.customer.gstin}
//             </p>

//             <p>
//               <strong>State :</strong>
//             </p>
//           </div>
//         </div>

//         <div>
//           <div className="bg-gray-100 border-b border-black text-center font-bold p-1">
//             Details of Consignee (Shipped To)
//           </div>

//           <div className="p-2 space-y-2">
//             <p>
//               <strong>Name :</strong> {invoice.customer.name}
//             </p>

//             <p>
//               <strong>Address :</strong> {invoice.customer.address}
//             </p>

//             <p>
//               <strong>GSTIN :</strong> {invoice.customer.gstin}
//             </p>

//             <p>
//               <strong>State :</strong>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ITEMS TABLE */}
//       <table className="w-full border-collapse">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border border-black p-2">No.</th>
//             <th className="border border-black p-2">Product / Service</th>
//             <th className="border border-black p-2">UOM</th>
//             <th className="border border-black p-2">Qty</th>
//             <th className="border border-black p-2">Rate</th>
//             <th className="border border-black p-2">Amount</th>
//           </tr>
//         </thead>

//         <tbody>
//           {invoice.items.map((item, index) => (
//             <tr key={index}>
//               <td className="border border-black p-2 text-center">
//                 {index + 1}
//               </td>

//               <td className="border border-black p-2">{item.name}</td>

//               <td className="border border-black p-2 text-center">PCS</td>

//               <td className="border border-black p-2 text-center">
//                 {item.qty}
//               </td>

//               <td className="border border-black p-2 text-right">
//                 ₹{item.price}
//               </td>

//               <td className="border border-black p-2 text-right">
//                 ₹{item.qty * item.price}
//               </td>
//             </tr>
//           ))}

//           <tr className="font-semibold">
//             <td colSpan="5" className="border p-2 text-right">
//               Subtotal
//             </td>
//             <td className="border p-2 text-right">
//               ₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
//             </td>
//           </tr>

//           <tr>
//             <td colSpan="5" className="border p-2 text-right">
//               GST (5%)
//             </td>
//             <td className="border p-2 text-right">
//               ₹{gst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
//             </td>
//           </tr>

//           <tr className="font-bold bg-gray-50">
//             <td colSpan="5" className="border p-2 text-right">
//               Total
//             </td>
//             <td className="border p-2 text-right">
//               ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
//             </td>
//           </tr>
//         </tbody>
//       </table>

//           <div className="border-x border-b border-black h-40 flex flex-col justify-between p-4">
//             <div
//               className="text-right font-bold text-lg"
//               style={{ color: "#123D7A" }}
//             >
//               For JETKINS
//             </div>

//             <div className="text-center">
//               <img
//                 src={signature}
//                 alt="Authorized Signature"
//                 className="h-16 mx-auto"
//               />

//           <p className="font-semibold mt-2">
//             For JetKings Sanitary
//           </p>
//           <p className="text-sm text-gray-500">Authorized Signatory</p>
//         </div>
//       </div>
//     </div>
//   );
// }

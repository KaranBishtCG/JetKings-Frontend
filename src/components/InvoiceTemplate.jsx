import logo from "../assets/Designer.png";
import signature from "../assets/signature.png";

export default function InvoiceTemplate({ invoice }) {
  const totalAmount = invoice.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0,
  );

  const gstRate = 18;
  const gstAmount = (totalAmount * gstRate) / 100;
  const grandTotal = totalAmount + gstAmount;

  return (
    <div className="max-w-6xl mx-auto bg-white text-[12px] border border-black">
      {/* HEADER */}
      <div className="border-b border-black p-3">
        <div className="flex items-center">
          <div className="w-1/5">
            <img src={logo} alt="Company Logo" className="h-20 mx-auto mb-2" />
          </div>

          <div className="w-4/5 text-center">
            <h1
              className="text-3xl font-bold uppercase"
              style={{ color: "#123D7A" }}
            >
              {invoice.company.name || "JETKINS"}
            </h1>

            <p className="font-semibold text-gray-700 uppercase">
              Premium Sanitary Ware • Faucets • Bath Fittings • Accessories
            </p>

            <p>{invoice.company.address}</p>

            <p>
              <strong>GSTIN :</strong> {invoice.company.gstin}
            </p>

            <h2 className="font-bold text-lg mt-2 uppercase">TAX INVOICE</h2>
          </div>
        </div>
      </div>

      {/* INVOICE DETAILS */}
      <div className="grid grid-cols-2 border-b border-black">
        <div className="border-r border-black p-2 space-y-1">
          <p>
            <strong>Invoice No :</strong> {invoice.invoiceNo}
          </p>

          <p>
            <strong>Invoice Date :</strong> {invoice.date}
          </p>

          <p>
            <strong>Reverse Charge :</strong> No
          </p>
        </div>

        <div className="p-2 space-y-1">
          <p>
            <strong>Transport Mode :</strong>
          </p>

          <p>
            <strong>Vehicle No :</strong>
          </p>

          <p>
            <strong>Place of Supply :</strong>
          </p>
        </div>
      </div>

      {/* CUSTOMER DETAILS */}
      <div className="grid grid-cols-2 border-b border-black">
        <div className="border-r border-black">
          <div className="bg-gray-100 border-b border-black text-center font-bold p-1">
            Details of Receiver (Billed To)
          </div>

          <div className="p-2 space-y-2">
            <p>
              <strong>Name :</strong> {invoice.customer.name}
            </p>

            <p>
              <strong>Address :</strong> {invoice.customer.address}
            </p>

            <p>
              <strong>GSTIN :</strong> {invoice.customer.gstin}
            </p>

            <p>
              <strong>State :</strong>
            </p>
          </div>
        </div>

        <div>
          <div className="bg-gray-100 border-b border-black text-center font-bold p-1">
            Details of Consignee (Shipped To)
          </div>

          <div className="p-2 space-y-2">
            <p>
              <strong>Name :</strong> {invoice.customer.name}
            </p>

            <p>
              <strong>Address :</strong> {invoice.customer.address}
            </p>

            <p>
              <strong>GSTIN :</strong> {invoice.customer.gstin}
            </p>

            <p>
              <strong>State :</strong>
            </p>
          </div>
        </div>
      </div>

      {/* ITEMS TABLE */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black p-2">No.</th>
            <th className="border border-black p-2">Product / Service</th>
            <th className="border border-black p-2">HSN</th>
            <th className="border border-black p-2">UOM</th>
            <th className="border border-black p-2">Qty</th>
            <th className="border border-black p-2">Rate</th>
            <th className="border border-black p-2">Amount</th>
          </tr>
        </thead>

        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index}>
              <td className="border border-black p-2 text-center">
                {index + 1}
              </td>

              <td className="border border-black p-2">{item.name}</td>

              <td className="border border-black p-2 text-center">
                {item.hsn}
              </td>

              <td className="border border-black p-2 text-center">PCS</td>

              <td className="border border-black p-2 text-center">
                {item.qty}
              </td>

              <td className="border border-black p-2 text-right">
                ₹{item.price}
              </td>

              <td className="border border-black p-2 text-right">
                ₹{item.qty * item.price}
              </td>
            </tr>
          ))}

          {/* Empty rows to mimic invoice book layout */}
          {Array.from({
            length: Math.max(6, 8 - invoice.items.length),
          }).map((_, i) => (
            <tr key={`empty-${i}`} className="h-10">
              <td className="border border-black"></td>
              <td className="border border-black"></td>
              <td className="border border-black"></td>
              <td className="border border-black"></td>
              <td className="border border-black"></td>
              <td className="border border-black"></td>
              <td className="border border-black"></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-2">
        {/* LEFT */}
        <div className="border-r border-black p-3">
          <div>
            <h3 className="font-bold mb-2">Total Invoice Value (in words)</h3>
            <p className="border-b border-dashed border-black pb-2">
              Rupees {grandTotal.toFixed(2)} Only
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-bold">Bank Details</h3>

            <p>Bank : HDFC Bank</p>
            <p>A/C Name : Jetkins</p>
            <p>IFSC : HDFC000XXXX</p>
          </div>

          <div className="mt-6">
            <h3 className="font-bold">Terms & Conditions</h3>

            <ol className="list-decimal pl-4 text-[11px]">
              <li>Goods once sold will not be taken back.</li>
              <li>Interest @18% on overdue payments.</li>
              <li>Subject to local jurisdiction only.</li>
            </ol>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="border border-black p-2">Total Before Tax</td>

                <td className="border border-black p-2 text-right">
                  ₹{totalAmount.toFixed(2)}
                </td>
              </tr>

              <tr>
                <td className="border border-black p-2">CGST 9%</td>

                <td className="border border-black p-2 text-right">
                  ₹{(gstAmount / 2).toFixed(2)}
                </td>
              </tr>

              <tr>
                <td className="border border-black p-2">SGST 9%</td>

                <td className="border border-black p-2 text-right">
                  ₹{(gstAmount / 2).toFixed(2)}
                </td>
              </tr>

              <tr className="font-bold">
                <td className="border border-black p-2">TOTAL AMOUNT</td>

                <td className="border border-black p-2 text-right">
                  ₹{grandTotal.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="border-x border-b border-black h-40 flex flex-col justify-between p-4">
            <div
              className="text-right font-bold text-lg"
              style={{ color: "#123D7A" }}
            >
              For JETKINS
            </div>

            <div className="text-center">
              <img
                src={signature}
                alt="Authorized Signature"
                className="h-16 mx-auto"
              />

              <p className="font-semibold mt-2">Authorised Signatory</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

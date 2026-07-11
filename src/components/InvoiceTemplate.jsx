import logo from "../assets/designer.png";
import signature from "../assets/signature.png";

export default function InvoiceTemplate({ invoice }) {
  const subtotal = invoice.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );
  const gst   = subtotal * 0.05;
  const total = subtotal + gst;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white border border-gray-300 rounded-md">
      {/* Header */}
      <div className="text-center border-b pb-4">
        <img
          src={logo}
          alt="Company Logo"
          className="h-20 mx-auto mb-2"
        />

  <h1 className="text-xl font-bold">
    {invoice.company.name}
  </h1>
        <p>{invoice.company.address}</p>

        <p>
          <strong>GSTIN:</strong> {invoice.company.gstin}
        </p>

        <h2 className="font-bold text-lg mt-3">
          TAX INVOICE
        </h2>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-2 gap-4 border-b py-4">
        <div>
          <p>
            <strong>Invoice No:</strong> {invoice.invoiceNo}
          </p>

          <p>
            <strong>Date:</strong> {invoice.date}
          </p>
        </div>

        <div>
          <p>
            <strong>Buyer:</strong> {invoice.customer.name}
          </p>

          <p>
            <strong>GSTIN:</strong> {invoice.customer.gstin}
          </p>
        </div>
      </div>

      {/* Product Table */}
      <table className="w-full border-collapse border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">S.No</th>
            <th className="border p-2">Item</th>
            <th className="border p-2">HSN</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Amount</th>
          </tr>
        </thead>

        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index}>
              <td className="border p-2 text-center">
                {index + 1}
              </td>

              <td className="border p-2">
                {item.name}
              </td>

              <td className="border p-2 text-center">
                {item.hsn}
              </td>

              <td className="border p-2 text-center">
                {item.qty}
              </td>

              <td className="border p-2 text-right">
                ₹{item.price}
              </td>

              <td className="border p-2 text-right">
                ₹{item.qty * item.price}
              </td>
            </tr>
          ))}

          <tr className="font-semibold">
            <td colSpan="5" className="border p-2 text-right">
              Subtotal
            </td>
            <td className="border p-2 text-right">
              ₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </td>
          </tr>

          <tr>
            <td colSpan="5" className="border p-2 text-right">
              GST (5%)
            </td>
            <td className="border p-2 text-right">
              ₹{gst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </td>
          </tr>

          <tr className="font-bold bg-gray-50">
            <td colSpan="5" className="border p-2 text-right">
              Total
            </td>
            <td className="border p-2 text-right">
              ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Signature */}
      <div className="flex justify-end mt-14">
        <div className="text-center">
          <img
            src={signature}
            alt="Authorized Signature"
            className="h-16 mx-auto"
          />

          <p className="font-semibold mt-2">
            For JetKings Sanitary
          </p>
          <p className="text-sm text-gray-500">Authorized Signatory</p>
        </div>
      </div>
    </div>
  );
}
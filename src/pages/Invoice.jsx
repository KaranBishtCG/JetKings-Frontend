import InvoiceTemplate from "../components/InvoiceTemplate";
// import html2pdf from "html2pdf.js";
import { useRef } from "react";

export default function Invoice() {
  const invoice = {
    invoiceNo: "251",
    date: "13-05-2023",

    company: {
      name: "JetKings Communications",
      gstin: "07XXXXXXXXXX",
      address: "New Delhi",
    },

    customer: {
      name: "Aviva Innovators",
      gstin: "07XXXXXXXXXX",
      address: "Pitampura",
    },

    items: [
      {
        name: "Samsung S23 FE",
        hsn: "851700",
        qty: 1,
        price: 28813.56,
      },
    ],
  };
  const invoiceRef = useRef(null);
  const handleDownload = () => {
    html2pdf()
      .set({
        margin: 5,
        filename: `Invoice-${invoice.invoiceNo}.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      })
      .from(invoiceRef.current)
      .save();
  };

  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
  {/* Actions */}
  <div className="mb-6 flex justify-end">
    <button
      onClick={handleDownload}
      className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
    >
      Download Invoice
    </button>
  </div>

  {/* Invoice */}
  <div ref={invoiceRef}>
  <InvoiceTemplate invoice={invoice} />
</div>
</div>
  );
}

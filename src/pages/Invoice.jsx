import InvoiceTemplate from "../components/InvoiceTemplate";

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

  return <InvoiceTemplate invoice={invoice} />;
}
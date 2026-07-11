import React from "react";
import InvoiceTemplate from "../components/InvoiceTemplate";
import {
  MdKeyboardArrowDown,
  MdInventory2,
  MdDownload,
  MdPrint,
  MdShoppingCartCheckout,
  MdPerson,
} from "react-icons/md";

const productCards = [
  {
    name: "Premium Mixer Tap",
    price: "₹1,200",
  },
  {
    name: "Wall Mounted Basin",
    price: "₹850",
  },
  {
    name: "Dual Flush Tap",
    price: "₹2,400",
  },
  {
    name: "Eco Smart Tap",
    price: "₹1,550",
  },
];

function GenerateBill() {
  return (
    <div className="mx-auto max-w-[1180px] text-slate-800">
      <section className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[40px] leading-[1] font-semibold tracking-tight text-slate-800">
            Generate Bill
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Step-by-step invoice generation workflow.
          </p>
        </div>

        <div className="pt-1 text-right leading-tight">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Date
          </p>
          <p className="text-xl font-semibold text-slate-700">Oct 24, 2023</p>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[2.4fr_1.15fr]">
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[11px] font-semibold text-blue-600">
                1
              </span>
              <h2 className="text-base font-semibold text-blue-600">
                Select Buyer
              </h2>
            </div>
            <div className="relative">
              <input
                readOnly
                value="Search or select a registered buyer..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm text-slate-500 outline-none"
              />
              <MdKeyboardArrowDown
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[11px] font-semibold text-blue-600">
                2
              </span>
              <h2 className="text-base font-semibold text-blue-600">
                Product Type
              </h2>
            </div>
            <div className="relative max-w-[220px]">
              <input
                readOnly
                value="Wash Basins"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm text-slate-600 outline-none"
              />
              <MdInventory2
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[11px] font-semibold text-blue-600">
                3
              </span>
              <h2 className="text-base font-semibold text-blue-600">
                Select Products
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {productCards.map((product) => (
                <article
                  key={product.name}
                  className="overflow-hidden rounded-lg border border-slate-200 bg-white"
                >
                  <div className="flex h-24 items-center justify-center bg-slate-200 text-[10px] text-slate-500">
                    IMG
                  </div>
                  <div className="p-2.5">
                    <p className="truncate text-[11px] font-semibold text-slate-700">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xl leading-none font-bold text-blue-700">
                      {product.price}
                    </p>
                    <p className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                      Buyer Price
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[11px] font-semibold text-blue-600">
                  4
                </span>
                <h2 className="text-base font-semibold text-blue-600">
                  Bill Items
                </h2>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500">
                0 Items
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-slate-50 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-4 py-2.5">Product</th>
                    <th className="px-4 py-2.5">Unit Price</th>
                    <th className="px-4 py-2.5">Quantity</th>
                    <th className="px-4 py-2.5">Amount</th>
                    <th className="px-4 py-2.5">Action</th>
                  </tr>
                </thead>
              </table>
            </div>

            <div className="flex h-36 flex-col items-center justify-center border-t border-slate-200 bg-white text-center">
              <MdShoppingCartCheckout size={22} className="text-slate-300" />
              <p className="mt-2 text-sm text-slate-400">
                Select products from the grid above to add to bill.
              </p>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-4 py-3">
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[11px] font-semibold text-blue-600">
                    5
                  </span>
                  <h2 className="text-[15px] font-semibold text-blue-600">
                    Summary & Checkout
                  </h2>
                </div>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                  <MdPerson size={14} />
                </span>
              </div>

              <div className="space-y-2 pt-1 text-sm text-slate-500">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-700">₹0.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>GST (5%)</span>
                  <span className="font-semibold text-slate-700">₹0.00</span>
                </div>
              </div>
            </div>

            <div className="px-4 py-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Grand Total
              </p>
              <p className="mt-1 text-5xl font-bold leading-none text-blue-700">
                ₹0.00
              </p>
            </div>

            <div className="space-y-3 px-4 pb-4">
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                <MdDownload size={17} />
                Download PDF
              </button>

              <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                <MdPrint size={17} />
                Print Invoice
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[11px] font-semibold text-blue-600">
                7
              </span>
              <h2 className="text-[15px] font-semibold uppercase tracking-wide text-blue-600">
                Live Preview
              </h2>
            </div>

            <div className="rounded-lg border border-slate-200 overflow-hidden h-[280px] bg-white">
              <div className="origin-top-left scale-[0.32] w-[312%]">
                <InvoiceTemplate
                  invoice={{
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
                  }}
                />
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default GenerateBill;

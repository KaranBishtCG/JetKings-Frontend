import React, { useState } from "react";
import InvoiceTemplate from "../components/InvoiceTemplate";
import {
  MdKeyboardArrowDown,
  MdInventory2,
  MdDownload,
  MdPrint,
  MdShoppingCartCheckout,
  MdPerson,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const GST_RATE = 0.05;

const PRODUCTS = [
  {
    id: 1,
    name: "Premium Mixer Tap",
    price: 1200,
    category: "Taps",
  },
  {
    id: 2,
    name: "Wall Mounted Basin",
    price: 850,
    category: "Wash Basins",
  },
  {
    id: 3,
    name: "Dual Flush Tap",
    price: 2400,
    category: "Taps",
  },
  {
    id: 4,
    name: "Eco Smart Tap",
    price: 1550,
    category: "Taps",
  },
];

function GenerateBill() {
  const [billItems, setBillItems] = useState([]);
  const [selectedBuyer, setSelectedBuyer] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts =
    category === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === category);

  const addToBill = (product) => {
    setBillItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);

      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

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

  const subtotal = billItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  const gst = subtotal * GST_RATE;
  const total = subtotal + gst;

  return (
    <div className="mx-auto max-w-[1180px] text-slate-800">
      <section className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[40px] leading-[1] font-semibold tracking-tight">
            Generate Bill
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Step-by-step invoice generation workflow.
          </p>
        </div>

        <div className="pt-1 text-right">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Date
          </p>

          <p className="text-xl font-semibold text-slate-700">
            {new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[2.4fr_1.15fr]">
        <div className="space-y-4">
          {/* Buyer */}
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
                value={selectedBuyer}
                onChange={(e) => setSelectedBuyer(e.target.value)}
                placeholder="Search or select a registered buyer..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm outline-none"
              />

              <MdKeyboardArrowDown
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          {/* Product Type */}
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
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
              >
                <option value="All">All</option>
                <option value="Taps">Taps</option>
                <option value="Wash Basins">Wash Basins</option>
              </select>

              <MdInventory2
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>

          {/* Products */}
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
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  onClick={() => addToBill(product)}
                  className="cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:border-blue-500 hover:shadow-md"
                >
                  <div className="flex h-24 items-center justify-center bg-slate-200 text-xs text-slate-500">
                    IMG
                  </div>

                  <div className="p-2.5">
                    <p className="truncate text-[11px] font-semibold text-slate-700">
                      {product.name}
                    </p>

                    <p className="mt-1 text-xl font-bold text-blue-700">
                      ₹{product.price}
                    </p>

                    <p className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                      Buyer Price
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Bill Items */}
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
                {billItems.length} Items
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

                <tbody>
                  {billItems.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="px-4 py-3">{item.name}</td>

                      <td className="px-4 py-3">₹{item.price.toFixed(2)}</td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="rounded bg-slate-100 px-2"
                          >
                            -
                          </button>

                          <span>{item.qty}</span>

                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="rounded bg-slate-100 px-2"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        ₹{(item.price * item.qty).toFixed(2)}
                      </td>

                      <td className="px-4 py-3">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {billItems.length === 0 && (
              <div className="flex h-36 flex-col items-center justify-center border-t border-slate-200 text-center">
                <MdShoppingCartCheckout size={22} className="text-slate-300" />

                <p className="mt-2 text-sm text-slate-400">
                  Select products from the grid above to add to bill.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
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
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-700">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="font-semibold text-slate-700">
                    ₹{gst.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-4 py-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Grand Total
              </p>

              <p className="mt-1 text-5xl font-bold leading-none text-blue-700">
                ₹{total.toFixed(2)}
              </p>
            </div>

            <div className="space-y-3 px-4 pb-4">
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white">
                <MdDownload size={17} />
                Download PDF
              </button>

              <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                <MdPrint size={17} />
                Print Invoice
              </button>
            </div>
          </div>

          {/* Invoice Preview */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[11px] font-semibold text-blue-600">
                  6
                </span>

                <h2 className="text-[15px] font-semibold uppercase tracking-wide text-blue-600">
                  Live Preview
                </h2>
              </div>

              <Link
  to="/invoice"
  className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
>
  Open Full Preview
</Link>
            </div>

            <div className="h-[280px] overflow-hidden rounded-lg border border-slate-200 bg-white">
              <div className="origin-top-left scale-[0.32] w-[312%]">
                <InvoiceTemplate
                  invoice={{
                    invoiceNo: "251",
                    date: new Date().toLocaleDateString(),
                    company: {
                      name: "JetKings Communications",
                      gstin: "07XXXXXXXXXX",
                      address: "New Delhi",
                    },
                    customer: {
                      name: selectedBuyer || "Walk-in Customer",
                      gstin: "",
                      address: "",
                    },
                    items: billItems.map((item) => ({
                      name: item.name,
                      hsn: "851700",
                      qty: item.qty,
                      price: item.price,
                    })),
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

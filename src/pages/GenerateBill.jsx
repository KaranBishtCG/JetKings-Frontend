import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { GST_RATE } from "../components/GenerateBill/billData";
import {
  fetchCategories,
  fetchProducts,
} from "../state/slices/GenerateBillSlice";

import BillHeader from "../components/GenerateBill/BillHeader";
import BuyerSelect from "../components/GenerateBill/BuyerSelect";
import CategoryFilter from "../components/GenerateBill/CategoryFilter";
import ProductList from "../components/GenerateBill/ProductList";
import BillItemsTable from "../components/GenerateBill/BillItemsTable";
import BillSummary from "../components/GenerateBill/BillSummary";
import InvoicePreview from "../components/GenerateBill/InvoicePreview";
import InvoiceTemplate from "../components/InvoiceTemplate";

const ALL_CATEGORY = {
  id: null,
  name: "All",
};

function GenerateBill() {
  const dispatch = useDispatch();

  const { categories, products, productsLoading } = useSelector(
    (state) => state.generateBill
  );

  const [billItems, setBillItems] = useState([]);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [selectedCategory, setSelectedCategory] =
    useState(ALL_CATEGORY);

  const [downloading, setDownloading] = useState(false);
  const [printing, setPrinting] = useState(false);

  const invoiceRef = useRef(null);

  useEffect(() => {
    const handleAfterPrint = () => {
      setPrinting(false);
    };

    window.addEventListener("afterprint", handleAfterPrint);

    return () =>
      window.removeEventListener(
        "afterprint",
        handleAfterPrint
      );
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        buyerId: selectedBuyer?.id ?? null,
        categoryId: selectedCategory?.id,
      })
    );
  }, [dispatch, selectedBuyer, selectedCategory]);

  const allCategories = [ALL_CATEGORY, ...categories];

  const addToBill = (product) => {
    setBillItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      const normalized = {
        ...product,
        name: product.modelName ?? product.name,
        price:
          product.effectivePrice ??
          product.defaultPrice ??
          product.price ??
          0,
      };

      return [...prev, { ...normalized, qty: 1 }];
    });
  };

  const setProductQty = (product, nextQty) => {
    const safeQty = Math.max(0, Number(nextQty) || 0);

    setBillItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id
      );

      if (safeQty === 0) {
        return prev.filter(
          (item) => item.id !== product.id
        );
      }

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: safeQty }
            : item
        );
      }

      const normalized = {
        ...product,
        name: product.modelName ?? product.name,
        price:
          product.effectivePrice ??
          product.defaultPrice ??
          product.price ??
          0,
      };

      return [...prev, { ...normalized, qty: safeQty }];
    });
  };

  const updateQty = (id, delta) => {
    setBillItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: Math.max(1, item.qty + delta),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setBillItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const subtotal = billItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const gst = subtotal * GST_RATE;
  const total = subtotal + gst;

  const invoiceData = {
    invoiceNo: `INV-${Date.now()
      .toString()
      .slice(-6)}`,

    date: new Date().toLocaleDateString("en-IN"),

    company: {
      name: "JetKings Sanitary",
      gstin: "07AAJCK1234Z1Z5",
      address: "New Delhi",
    },

    customer: {
      name: selectedBuyer?.partyName ?? "—",
      gstin: selectedBuyer?.gstin ?? "—",
      address:
        selectedBuyer?.billingAddress ?? "—",
      city: selectedBuyer?.city ?? "—",
      state: selectedBuyer?.state ?? "—",
      stateCode:
        selectedBuyer?.gstin?.slice(0, 2) ??
        "—",
    },

    items: billItems.map((item) => ({
      name: item.name,
      qty: item.qty,
      price: item.price,
    })),
  };

  const handleDownloadPdf = async () => {
    if (!selectedBuyer || !invoiceRef.current) return;

    setDownloading(true);

    try {
      const canvas = await html2canvas(
        invoiceRef.current,
        {
          scale: 2,
          useCORS: true,
        }
      );

      const imgData =
        canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth =
        pdf.internal.pageSize.getWidth();

      const pdfHeight =
        (canvas.height * pdfWidth) /
        canvas.width;

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
      );

      pdf.save(
        `Invoice-${invoiceData.invoiceNo}.pdf`
      );
    } finally {
      setDownloading(false);
    }
  };

  const handlePrintInvoice = () => {
    if (!selectedBuyer) return;
    setPrinting(true);

    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="w-full max-w-[1180px] mx-auto text-slate-800">
      <BillHeader />

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <BuyerSelect
            value={selectedBuyer}
            onChange={setSelectedBuyer}
          />

          <CategoryFilter
            categories={allCategories}
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />

          <ProductList
            key={selectedCategory.id}
            products={products}
            productsLoading={productsLoading}
            billItems={billItems}
            onAdd={addToBill}
            onSetQty={setProductQty}
          />

          <BillItemsTable
            billItems={billItems}
            onUpdateQty={updateQty}
            onRemove={removeItem}
          />
        </div>

        <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
          <BillSummary
            subtotal={subtotal}
            gst={gst}
            total={total}
            selectedBuyer={
              selectedBuyer?.partyName ?? ""
            }
            hasBuyer={!!selectedBuyer}
            onDownloadPdf={handleDownloadPdf}
            onPrintInvoice={handlePrintInvoice}
            downloading={downloading}
            onPrint={handlePrintInvoice}
          />

          <InvoicePreview
            billItems={billItems}
            selectedBuyer={
              selectedBuyer?.partyName ?? ""
            }
            subtotal={subtotal}
            gst={gst}
            total={total}
          />
        </aside>
      </div>

      <div
        id="invoice-print-area"
        className={
          printing
            ? "fixed inset-0 z-50 bg-white overflow-auto w-full"
            : "fixed -left-[9999px] top-0 w-[794px]"
        }
        aria-hidden={!printing}
      >
        <div ref={invoiceRef}>
          <InvoiceTemplate
            invoice={invoiceData}
            showSignature
          />
        </div>
      </div>

      {printing && (
        <div className="print-only">
          <InvoiceTemplate
            invoice={invoiceData}
            showSignature={false}
          />
        </div>
      )}
    </div>
  );
}

export default GenerateBill;
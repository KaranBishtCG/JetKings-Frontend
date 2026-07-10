import React, { useMemo, useState } from 'react'
import { Boxes, BadgeIndianRupee, Filter, PackageCheck, Plus, ShoppingCart, TriangleAlert } from 'lucide-react'
import StatCard from '../components/products/StatCard'
import FilterToolbar from '../components/products/FilterToolbar'
import ProductTable from '../components/products/ProductTable'
import Pagination from '../components/products/Pagination'
import { pricingLists, productCategories, products as mockProducts } from '../data/products'

const PAGE_SIZE = 10
const TOTAL_PRODUCTS = 1284

function Products() {
  const [category, setCategory] = useState(productCategories[0])
  const [pricing, setPricing] = useState(pricingLists[0])
  const [page, setPage] = useState(1)

  const filteredProducts = useMemo(() => {
    if (category === 'All Categories') return mockProducts
    return mockProducts.filter((product) => product.category === category)
  }, [category])

  const totalPages = Math.max(1, Math.ceil(TOTAL_PRODUCTS / PAGE_SIZE))

  function handleCategoryChange(value) {
    setCategory(value)
    setPage(1)
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-[42px]">Products Management</h1>
          <p className="mt-2 text-base text-slate-500">Manage and organize your sanitary product inventory</p>
        </div>
        <button
          type="button"
          className="shrink-0 flex items-center w-fit gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        <StatCard
          icon={PackageCheck}
          iconBg="#DBEAFE"
          iconColor="#2563EB"
          label="Total Products"
          value="1,284"
        />
        <StatCard icon={Boxes} iconBg="#EDE9FE" iconColor="#7C3AED" label="Active Categories" value="14" />
        <StatCard icon={TriangleAlert} iconBg="#FEE2E2" iconColor="#DC2626" label="Low Stock Alert" value="28" />
        <StatCard icon={ShoppingCart} iconBg="#E2E8F0" iconColor="#475569" label="New Items (30D)" value="45" />
      </div>

      {/* Table container */}
      <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white">
        <FilterToolbar
          categoryIcon={Filter}
          pricingIcon={BadgeIndianRupee}
          category={category}
          onCategoryChange={handleCategoryChange}
          categories={productCategories}
          pricing={pricing}
          onPricingChange={setPricing}
          pricingLists={pricingLists}
          onExport={() => console.log('Export products')}
          onPrint={() => window.print()}
        />
        <ProductTable products={filteredProducts} />
        <Pagination
          page={page}
          totalPages={totalPages}
          totalItems={TOTAL_PRODUCTS}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}

export default Products
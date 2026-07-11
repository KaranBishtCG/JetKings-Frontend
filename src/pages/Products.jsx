import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Boxes, Filter, PackageCheck, Plus, Search } from 'lucide-react'
import StatCard from '../components/products/StatCard'
import ProductTable from '../components/products/ProductTable'
import Pagination from '../components/products/Pagination'
import AddProductModal from '../components/products/AddProductModal'
import { fetchCategories } from '../state/slices/GenerateBillSlice'
import {
  createProduct,
  deleteProduct,
  fetchProducts as fetchDefaultProducts,
  updateProduct,
} from '../state/slices/productSlice'

const PAGE_SIZE = 10
const DEFAULT_FETCH_PAGE_SIZE = 5000
const ALL_CATEGORIES = 'all'

function removeUndefinedFields(payload) {
  return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined))
}

function getApiErrorMessage(error, fallbackMessage) {
  if (typeof error === 'string') return error
  if (error?.message) return error.message
  if (error?.title) return error.title
  if (error?.error) return error.error
  if (Array.isArray(error?.errors)) return error.errors.join(', ')
  return fallbackMessage
}

function Products() {
  const dispatch = useDispatch()
  const {
    categories: billCategories,
    categoriesLoading,
  } = useSelector((s) => s.generateBill)
  const { products: defaultProducts, loading: defaultProductsLoading, error: productError } = useSelector((s) => s.products)

  const [selectedCategoryId, setSelectedCategoryId] = useState(ALL_CATEGORIES)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)
  const [addSubmitting, setAddSubmitting] = useState(false)
  const [addError, setAddError] = useState('')

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchDefaultProducts({ page: 1, pageSize: DEFAULT_FETCH_PAGE_SIZE }))
  }, [dispatch])

  const categoryOptions = useMemo(() => {
    const apiCategories = Array.isArray(billCategories) ? billCategories : []
    return [{ id: ALL_CATEGORIES, name: 'All Categories' }, ...apiCategories]
  }, [billCategories])

  const categoryNameMap = useMemo(() => {
    const map = new Map()
    categoryOptions.forEach((category) => {
      if (category.id !== ALL_CATEGORIES) {
        map.set(Number(category.id), category.name)
      }
    })
    return map
  }, [categoryOptions])

  const normalizedProducts = useMemo(() => {
    return defaultProducts.map((product) => {
      const productId = product.id || product.productId || product.sku || product.modelName
      const categoryId = product.categoryId ?? null
      return {
        id: productId,
        name: product.modelName || product.name || 'Unnamed Product',
        sku: product.sku || product.code || '-',
        categoryId,
        category: product.categoryName || product.category || categoryNameMap.get(Number(categoryId)) || 'Uncategorized',
        defaultPrice: Number(product.defaultPrice ?? product.basePrice ?? product.price ?? 0),
        buyerPrice: Number(product.defaultPrice ?? product.basePrice ?? product.price ?? 0),
        image: product.imageUrl || product.image || '',
        raw: product,
      }
    })
  }, [defaultProducts, categoryNameMap])

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return normalizedProducts.filter((product) => {
      const categoryMatches =
        selectedCategoryId === ALL_CATEGORIES ||
        Number(product.categoryId) === Number(selectedCategoryId)

      const searchMatches =
        query.length === 0 ||
        product.name.toLowerCase().includes(query)

      return categoryMatches && searchMatches
    })
  }, [normalizedProducts, searchQuery, selectedCategoryId])

  const totalProducts = filteredProducts.length
  const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE))

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredProducts.slice(start, start + PAGE_SIZE)
  }, [filteredProducts, page])

  const categoryCount = Math.max(0, categoryOptions.length - 1)

  const selectedCategoryName = useMemo(() => {
    return categoryOptions.find((category) => String(category.id) === String(selectedCategoryId))?.name || 'All Categories'
  }, [categoryOptions, selectedCategoryId])

  async function handleAddProduct() {
    setAddError('')
    setShowAddModal(true)
  }

  async function handleAddProductSubmit(payload) {
    setAddSubmitting(true)
    setAddError('')

    try {
      await dispatch(createProduct(payload)).unwrap()
      dispatch(fetchDefaultProducts({ page: 1, pageSize: DEFAULT_FETCH_PAGE_SIZE }))
      setShowAddModal(false)
    } catch (error) {
      setAddError(getApiErrorMessage(error, 'Unable to add product. Please try again.'))
    } finally {
      setAddSubmitting(false)
    }
  }

  async function handleEditProduct(product) {
    const priceInput = window.prompt('Update default price', String(product.defaultPrice ?? 0))
    if (priceInput === null) return

    const defaultPrice = Number(priceInput)
    if (Number.isNaN(defaultPrice) || defaultPrice < 0) {
      window.alert('Please enter a valid default price.')
      return
    }

    try {
      const raw = product.raw || {}
      const productData = removeUndefinedFields({
        categoryId: raw.categoryId,
        modelName: raw.modelName ?? product.name,
        defaultPrice,
      })

      await dispatch(
        updateProduct({
          id: product.id,
          productData,
        })
      ).unwrap()

      dispatch(fetchDefaultProducts({ page: 1, pageSize: DEFAULT_FETCH_PAGE_SIZE }))
    } catch (error) {
      window.alert(getApiErrorMessage(error, 'Unable to update product default price.'))
    }
  }

  async function handleDeleteProduct(product) {
    const confirmed = window.confirm(`Delete ${product.name}?`)
    if (!confirmed) return

    try {
      await dispatch(deleteProduct(product.id)).unwrap()
      dispatch(fetchDefaultProducts({ page: 1, pageSize: DEFAULT_FETCH_PAGE_SIZE }))
    } catch (error) {
      window.alert(getApiErrorMessage(error, 'Unable to delete product.'))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-[42px]">Products Management</h1>
          <p className="mt-2 text-base text-slate-500">Manage and organize your base product inventory</p>
        </div>
        <button
          type="button"
          onClick={handleAddProduct}
          className="shrink-0 flex items-center w-fit gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {showAddModal && (
        <AddProductModal
          categories={billCategories}
          categoriesLoading={categoriesLoading}
          submitting={addSubmitting}
          apiError={addError || (typeof productError?.message === 'string' ? productError.message : '')}
          onClose={() => {
            if (addSubmitting) return
            setShowAddModal(false)
            setAddError('')
          }}
          onSubmit={handleAddProductSubmit}
        />
      )}

      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        <StatCard
          icon={PackageCheck}
          iconBg="#DBEAFE"
          iconColor="#2563EB"
          label="Total Products"
          value={totalProducts.toLocaleString('en-IN')}
          isLoading={defaultProductsLoading}
        />
        <StatCard
          icon={Boxes}
          iconBg="#EDE9FE"
          iconColor="#7C3AED"
          label="Active Categories"
          value={categoryCount.toLocaleString('en-IN')}
          isLoading={categoriesLoading}
        />
      </div>

      <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white">
        <div className="flex min-h-[80px] flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-4 bg-[#F1F5F9]">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-sm font-medium text-slate-500">Filter By Category:</span>
              <div className="relative">
                <select
                  value={selectedCategoryId}
                  onChange={(e) => {
                    setSelectedCategoryId(e.target.value)
                    setPage(1)
                  }}
                  className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-blue-600 outline-none"
                >
                  {categoryOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <Filter size={16} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-sm font-medium text-slate-500">Search By Name:</span>
              <div className="relative">
                <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setPage(1)
                  }}
                  placeholder="Search product name"
                  className="h-10 w-56 rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-500">Selected Category: {selectedCategoryName}</p>
        </div>

        <ProductTable
          products={paginatedProducts}
          isLoading={defaultProductsLoading || categoriesLoading}
          onAddProduct={handleAddProduct}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          showActions
          showBuyerPrice={false}
        />

        <Pagination
          page={page}
          totalPages={totalPages}
          totalItems={totalProducts}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}

export default Products

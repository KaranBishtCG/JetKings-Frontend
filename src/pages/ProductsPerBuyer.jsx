import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BadgeIndianRupee, Boxes, Filter, PackageCheck, Plus, Search } from 'lucide-react'
import { MdClose } from 'react-icons/md'
import StatCard from '../components/products/StatCard'
import ProductTable from '../components/products/ProductTable'
import Pagination from '../components/products/Pagination'
import { getAllBuyers } from '../state/slices/BuyerSlice'
import { fetchCategories, fetchProducts as fetchGenerateBillProducts } from '../state/slices/GenerateBillSlice'
import { fetchProducts as fetchDefaultProducts } from '../state/slices/productSlice'
import {
  createBuyerProductPrice,
  deleteBuyerProductPrice,
  fetchBuyerProductPrices,
  updateBuyerProductPrice,
} from '../state/slices/buyerProductPriceSlice'

const PAGE_SIZE = 10
const FETCH_PAGE_SIZE = 5000
const ALL_CATEGORIES = 'all'

function getApiErrorMessage(error, fallbackMessage) {
  if (typeof error === 'string') return error
  if (error?.message) return error.message
  if (error?.title) return error.title
  if (error?.error) return error.error
  if (Array.isArray(error?.errors)) return error.errors.join(', ')
  return fallbackMessage
}

function parseId(value) {
  if (value === null || value === undefined || value === '') return null
  const num = Number(value)
  return Number.isFinite(num) ? num : null
}

function pickFirstId(source, keys) {
  for (const key of keys) {
    const parsed = parseId(source?.[key])
    if (parsed !== null) return parsed
  }
  return null
}

function idsEqual(a, b) {
  const left = parseId(a)
  const right = parseId(b)
  return left !== null && right !== null && left === right
}

function AddBuyerProductModal({
  buyers,
  products,
  buyerProductPrices,
  selectedBuyerId,
  onClose,
  onSubmit,
  submitting,
  errorText,
}) {
  const [buyerId, setBuyerId] = useState(selectedBuyerId ? String(selectedBuyerId) : '')
  const [productId, setProductId] = useState('')
  const [rate, setRate] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (selectedBuyerId) {
      setBuyerId(String(selectedBuyerId))
    }
  }, [selectedBuyerId])

  const existingProductIdsForBuyer = useMemo(() => {
    const selected = parseId(buyerId)
    if (selected === null) return new Set()

    const ids = new Set()
    buyerProductPrices.forEach((entry) => {
      if (!idsEqual(entry.buyerId, selected)) return
      const productRef = pickFirstId(entry, ['productId', 'baseProductId'])
      if (productRef !== null) ids.add(productRef)
    })
    return ids
  }, [buyerId, buyerProductPrices])

  const selectedProduct = useMemo(
    () => products.find((item) => idsEqual(item.id, productId)) || null,
    [products, productId]
  )

  const validate = () => {
    const nextErrors = {}

    const buyer = parseId(buyerId)
    const product = parseId(productId)

    if (buyer === null) nextErrors.buyerId = 'Buyer is required'
    if (product === null) nextErrors.productId = 'Product is required'

    const parsedRate = Number(rate)
    if (rate === '') nextErrors.rate = 'Rate is required'
    else if (Number.isNaN(parsedRate) || parsedRate < 0) nextErrors.rate = 'Rate must be a positive number'

    if (buyer !== null && product !== null && existingProductIdsForBuyer.has(product)) {
      nextErrors.productId = 'This product already exists for the selected buyer'
    }

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    await onSubmit({
      buyerId: Number(buyerId),
      productId: Number(productId),
      rate: Number(rate),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Add Product For Buyer</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={submitting}
          >
            <MdClose size={20} />
          </button>
        </div>

        {errorText && (
          <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
            {errorText}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="px-4 py-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Buyer *</label>
            <select
              value={buyerId}
              onChange={(event) => {
                setBuyerId(event.target.value)
                setProductId('')
              }}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500 bg-white"
            >
              <option value="">Select Buyer</option>
              {buyers.map((buyer) => (
                <option key={buyer.id} value={buyer.id}>
                  {buyer.partyName || buyer.name || `Buyer ${buyer.id}`}
                </option>
              ))}
            </select>
            {errors.buyerId && <p className="mt-1 text-xs text-red-500">{errors.buyerId}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Product *</label>
            <select
              value={productId}
              onChange={(event) => setProductId(event.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500 bg-white"
            >
              <option value="">Select Product</option>
              {products.map((product) => {
                const productIdValue = parseId(product.id)
                const existsForBuyer = productIdValue !== null && existingProductIdsForBuyer.has(productIdValue)

                return (
                  <option key={product.id} value={product.id} disabled={existsForBuyer}>
                    {product.name} ({product.category}) {existsForBuyer ? '[Already Added]' : ''}
                  </option>
                )
              })}
            </select>
            {errors.productId && <p className="mt-1 text-xs text-red-500">{errors.productId}</p>}
          </div>

          {selectedProduct && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
              <p>Product: {selectedProduct.name}</p>
              <p>Category: {selectedProduct.category}</p>
              <p>Default Price: Rs {Number(selectedProduct.defaultPrice ?? 0).toFixed(2)}</p>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Rate *</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={rate}
              onChange={(event) => setRate(event.target.value)}
              placeholder="Enter rate"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500"
            />
            {errors.rate && <p className="mt-1 text-xs text-red-500">{errors.rate}</p>}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? 'Saving...' : 'Add Product For Buyer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function EditBuyerProductRateModal({ buyer, product, onClose, onSubmit, submitting, errorText }) {
  const [rate, setRate] = useState(String(product?.buyerPrice ?? ''))
  const [error, setError] = useState('')

  useEffect(() => {
    setRate(String(product?.buyerPrice ?? ''))
  }, [product])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const parsedRate = Number(rate)
    if (rate === '' || Number.isNaN(parsedRate) || parsedRate < 0) {
      setError('Rate must be a valid positive number')
      return
    }

    setError('')
    await onSubmit({ rate: parsedRate })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Edit Buyer Product Rate</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={submitting}
          >
            <MdClose size={20} />
          </button>
        </div>

        {(errorText || error) && (
          <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
            {errorText || error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="px-4 py-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Buyer</label>
            <input
              value={buyer?.partyName || buyer?.name || ''}
              disabled
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-slate-100 text-slate-600"
            />
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 space-y-1">
            <p>Product: {product?.name || '-'}</p>
            <p>Category: {product?.category || '-'}</p>
            <p>Default Price: Rs {Number(product?.defaultPrice ?? 0).toFixed(2)}</p>
            <p>Product ID: {product?.id ?? '-'}</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Rate *</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={rate}
              onChange={(event) => setRate(event.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? 'Saving...' : 'Update Rate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ProductsPerBuyer() {
  const dispatch = useDispatch()

  const buyersState = useSelector((s) => s.buyers)
  const { categories, categoriesLoading, products: buyerProducts, productsLoading } = useSelector((s) => s.generateBill)
  const { products: allProducts } = useSelector((s) => s.products)
  const {
    buyerProductPrices,
    totalCount,
    loading: buyerProductPriceLoading,
  } = useSelector((s) => s.buyerProductPrices)

  const [selectedBuyerId, setSelectedBuyerId] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState(ALL_CATEGORIES)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [modalError, setModalError] = useState('')
  const [editingProduct, setEditingProduct] = useState(null)

  useEffect(() => {
    dispatch(getAllBuyers({ page: 1, pageSize: FETCH_PAGE_SIZE }))
    dispatch(fetchCategories())
    dispatch(fetchBuyerProductPrices({ page: 1, pageSize: FETCH_PAGE_SIZE }))
    dispatch(fetchDefaultProducts({ page: 1, pageSize: FETCH_PAGE_SIZE }))
  }, [dispatch])

  useEffect(() => {
    if (!selectedBuyerId) return

    const params = { buyerId: Number(selectedBuyerId) }
    if (selectedCategoryId !== ALL_CATEGORIES) {
      params.categoryId = Number(selectedCategoryId)
    }

    dispatch(fetchGenerateBillProducts(params))
  }, [dispatch, selectedBuyerId, selectedCategoryId])

  const buyers = useMemo(() => buyersState.items || [], [buyersState.items])

  useEffect(() => {
    if (!selectedBuyerId && buyers.length > 0) {
      setSelectedBuyerId(String(buyers[0].id))
    }
  }, [buyers, selectedBuyerId])

  const selectedBuyer = useMemo(() => {
    return buyers.find((buyer) => idsEqual(buyer.id, selectedBuyerId)) || null
  }, [buyers, selectedBuyerId])

  const categoryNameMap = useMemo(() => {
    const map = new Map()
    ;(categories || []).forEach((category) => {
      const id = parseId(category.id)
      if (id !== null) map.set(id, category.name)
    })
    return map
  }, [categories])

  const normalizedAllProducts = useMemo(() => {
    return (allProducts || []).map((product) => {
      const productId = pickFirstId(product, ['id', 'productId'])
      const categoryId = pickFirstId(product, ['categoryId'])
      return {
        id: productId,
        name: product.modelName || product.name || 'Unnamed Product',
        categoryId,
        category: product.categoryName || categoryNameMap.get(categoryId) || 'Uncategorized',
        defaultPrice: Number(product.defaultPrice ?? product.basePrice ?? product.price ?? 0),
      }
    }).filter((product) => product.id !== null)
  }, [allProducts, categoryNameMap])

  const resolveRateEntryFor = (buyerId, product) => {
    const selectedBuyer = parseId(buyerId)
    if (selectedBuyer === null) return null

    const productCandidates = [
      product.productId,
      product.id,
      product.baseProductId,
    ].map(parseId).filter((id) => id !== null)

    const directRateId = pickFirstId(product, ['buyerProductPriceId', 'buyerPriceId', 'rateId'])

    const fromDirectId = buyerProductPrices.find((entry) => {
      if (directRateId === null) return false
      const entryId = pickFirstId(entry, ['id', 'buyerProductPriceId', 'rateId'])
      return idsEqual(entryId, directRateId)
    })
    if (fromDirectId) return fromDirectId

    return buyerProductPrices.find((entry) => {
      if (!idsEqual(entry.buyerId, selectedBuyer)) return false

      const entryProductId = pickFirstId(entry, ['productId', 'baseProductId'])
      if (entryProductId === null) return false

      return productCandidates.some((candidateId) => idsEqual(candidateId, entryProductId))
    }) || null
  }

  const normalizedProducts = useMemo(() => {
    return (buyerProducts || []).map((product) => {
      const productId = pickFirstId(product, ['productId', 'id', 'baseProductId'])
      const categoryId = pickFirstId(product, ['categoryId'])
      const rateEntry = resolveRateEntryFor(selectedBuyerId, product)
      const rateEntryId =
        pickFirstId(product, ['buyerProductPriceId', 'buyerPriceId', 'rateId']) ||
        pickFirstId(rateEntry, ['id', 'buyerProductPriceId', 'rateId'])

      return {
        id: productId,
        rateEntryId,
        name: product.modelName || product.name || 'Unnamed Product',
        sku: product.sku || product.code || '-',
        categoryId,
        category: product.categoryName || categoryNameMap.get(categoryId) || 'Uncategorized',
        defaultPrice: Number(product.defaultPrice ?? product.price ?? 0),
        buyerPrice: Number(product.effectivePrice ?? rateEntry?.rate ?? product.defaultPrice ?? product.price ?? 0),
        image: product.imageUrl || product.image || '',
      }
    }).filter((product) => product.id !== null)
  }, [buyerProducts, categoryNameMap, buyerProductPrices, selectedBuyerId])

  const categoryFilteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return normalizedProducts.filter((product) => {
      const categoryMatches =
        selectedCategoryId === ALL_CATEGORIES ||
        idsEqual(product.categoryId, selectedCategoryId)

      const searchMatches =
        query.length === 0 ||
        product.name.toLowerCase().includes(query)

      return categoryMatches && searchMatches
    })
  }, [normalizedProducts, searchQuery, selectedCategoryId])

  const totalPages = Math.max(1, Math.ceil(categoryFilteredProducts.length / PAGE_SIZE))

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return categoryFilteredProducts.slice(start, start + PAGE_SIZE)
  }, [categoryFilteredProducts, page])

  const categoryOptions = useMemo(() => {
    return [{ id: ALL_CATEGORIES, name: 'All Categories' }, ...(categories || [])]
  }, [categories])

  const isLoading = buyersState.loading || productsLoading || categoriesLoading || buyerProductPriceLoading

  const categoryCount = Math.max(0, categoryOptions.length - 1)

  const refreshAll = () => {
    dispatch(fetchBuyerProductPrices({ page: 1, pageSize: FETCH_PAGE_SIZE }))
    if (selectedBuyerId) {
      const params = { buyerId: Number(selectedBuyerId) }
      if (selectedCategoryId !== ALL_CATEGORIES) {
        params.categoryId = Number(selectedCategoryId)
      }
      dispatch(fetchGenerateBillProducts(params))
    }
  }

  const handleEdit = (product) => {
    setModalError('')
    setEditingProduct(product)
    setShowEditModal(true)
  }

  const handleDelete = async (product) => {
    const rateEntryId = parseId(product.rateEntryId)
    if (rateEntryId === null) {
      window.alert('Unable to delete: no buyer rate entry found for this product.')
      return
    }

    const confirmed = window.confirm(`Delete buyer rate for ${product.name}?`)
    if (!confirmed) return

    try {
      await dispatch(deleteBuyerProductPrice(rateEntryId)).unwrap()
      refreshAll()
    } catch (error) {
      window.alert(getApiErrorMessage(error, 'Unable to delete buyer product rate.'))
    }
  }

  const handleAddSubmit = async (payload) => {
    setSubmitting(true)
    setModalError('')

    try {
      const alreadyExists = (buyerProductPrices || []).some((entry) => {
        const entryProductId = pickFirstId(entry, ['productId', 'baseProductId'])
        return idsEqual(entry.buyerId, payload.buyerId) && idsEqual(entryProductId, payload.productId)
      })

      if (alreadyExists) {
        setModalError('This product is already assigned to the selected buyer.')
        return
      }

      await dispatch(createBuyerProductPrice(payload)).unwrap()
      setShowAddModal(false)
      refreshAll()
    } catch (error) {
      setModalError(getApiErrorMessage(error, 'Unable to create buyer product rate.'))
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditSubmit = async ({ rate }) => {
    if (!editingProduct) return

    const rateEntryId = parseId(editingProduct.rateEntryId)
    if (rateEntryId === null) {
      setModalError('No buyer-specific rate record found for this product.')
      return
    }

    setSubmitting(true)
    setModalError('')

    try {
      await dispatch(
        updateBuyerProductPrice({
          id: rateEntryId,
          data: {
            buyerId: Number(selectedBuyerId),
            productId: Number(editingProduct.id),
            rate,
          },
        })
      ).unwrap()

      setShowEditModal(false)
      setEditingProduct(null)
      refreshAll()
    } catch (error) {
      setModalError(getApiErrorMessage(error, 'Unable to update buyer product rate.'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-[42px]">Products Per Buyer</h1>
          <p className="mt-2 text-base text-slate-500">Manage buyer specific product rates</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setModalError('')
            setShowAddModal(true)
          }}
          className="shrink-0 flex items-center w-fit gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Product For Buyer
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        <StatCard
          icon={PackageCheck}
          iconBg="#DBEAFE"
          iconColor="#2563EB"
          label="Total Products"
          value={Number(totalCount || 0).toLocaleString('en-IN')}
          isLoading={buyerProductPriceLoading}
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
              <span className="whitespace-nowrap text-sm font-medium text-slate-500">Pricing For:</span>
              <div className="relative">
                <select
                  value={selectedBuyerId}
                  onChange={(event) => {
                    setSelectedBuyerId(event.target.value)
                    setPage(1)
                  }}
                  className="h-10 rounded-lg border border-slate-200 bg-white px-3 pr-8 text-sm font-semibold text-blue-600 outline-none"
                >
                  <option value="">Select Buyer</option>
                  {buyers.map((buyer) => (
                    <option key={buyer.id} value={buyer.id}>
                      {buyer.partyName || buyer.name || `Buyer ${buyer.id}`}
                    </option>
                  ))}
                </select>
                <BadgeIndianRupee size={16} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-sm font-medium text-slate-500">Filter By Category:</span>
              <div className="relative">
                <select
                  value={selectedCategoryId}
                  onChange={(event) => {
                    setSelectedCategoryId(event.target.value)
                    setPage(1)
                  }}
                  className="h-10 rounded-lg border border-slate-200 bg-white px-3 pr-8 text-sm font-semibold text-blue-600 outline-none"
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
                  onChange={(event) => {
                    setSearchQuery(event.target.value)
                    setPage(1)
                  }}
                  placeholder="Search product name"
                  className="h-10 w-56 rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <ProductTable
          products={selectedBuyerId ? paginatedProducts : []}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddProduct={() => setShowAddModal(true)}
          showActions
          showBuyerPrice
        />

        <Pagination
          page={page}
          totalPages={totalPages}
          totalItems={categoryFilteredProducts.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>

      {showAddModal && (
        <AddBuyerProductModal
          buyers={buyers}
          products={normalizedAllProducts}
          buyerProductPrices={buyerProductPrices}
          selectedBuyerId={selectedBuyerId}
          onClose={() => {
            if (submitting) return
            setShowAddModal(false)
            setModalError('')
          }}
          onSubmit={handleAddSubmit}
          submitting={submitting}
          errorText={modalError}
        />
      )}

      {showEditModal && editingProduct && (
        <EditBuyerProductRateModal
          buyer={selectedBuyer}
          product={editingProduct}
          onClose={() => {
            if (submitting) return
            setShowEditModal(false)
            setEditingProduct(null)
            setModalError('')
          }}
          onSubmit={handleEditSubmit}
          submitting={submitting}
          errorText={modalError}
        />
      )}
    </div>
  )
}

export default ProductsPerBuyer

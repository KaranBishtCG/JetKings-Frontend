import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BuyersHeader from '../components/buyers/BuyersHeader'
import BuyersStats from '../components/buyers/BuyersStats'
import BuyersTable from '../components/buyers/BuyersTable'
import BuyersPagination from '../components/buyers/BuyersPagination'
import AddBuyerModal from '../components/buyers/AddBuyerModal'
import ViewBuyerModal from '../components/buyers/ViewBuyerModal'
import EditBuyerModal from '../components/buyers/EditBuyerModal'
import DeleteBuyerModal from '../components/buyers/DeleteBuyerModal'
import { SkeletonTable } from '../components/common/Skeleton'
import { getAllBuyers } from '../state/slices/BuyerSlice'

function Buyers() {
  const dispatch = useDispatch()
  const { items, totalCount, page, pageSize, totalPages, loading, error } = useSelector(
    (state) => state.buyers
  )
  const [showAddModal, setShowAddModal] = useState(false)
  const [viewBuyerId, setViewBuyerId] = useState(null)
  const [editBuyer, setEditBuyer] = useState(null)
  const [deleteBuyer, setDeleteBuyer] = useState(null)

  useEffect(() => {
    dispatch(getAllBuyers({ page, pageSize }))
  }, [dispatch, page, pageSize])

  const handlePageChange = (newPage) => {
    dispatch(getAllBuyers({ page: newPage, pageSize }))
  }

  return (
    <div>
      <BuyersHeader onAddBuyer={() => setShowAddModal(true)} />

      {showAddModal && (
        <AddBuyerModal onClose={() => setShowAddModal(false)} />
      )}

      {viewBuyerId !== null && (
        <ViewBuyerModal buyerId={viewBuyerId} onClose={() => setViewBuyerId(null)} />
      )}

      {editBuyer !== null && (
        <EditBuyerModal buyer={editBuyer} onClose={() => setEditBuyer(null)} />
      )}

      {deleteBuyer !== null && (
        <DeleteBuyerModal buyer={deleteBuyer} onClose={() => setDeleteBuyer(null)} />
      )}

      <BuyersStats />
      {loading && (
        <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <SkeletonTable rows={5} cols={5} avatar={true} />
            </table>
          </div>
        </div>
      )}
      {error && (
        <p className="text-center py-8 text-red-500">Failed to load buyers.</p>
      )}
      {!loading && !error && (
        <>
          <BuyersTable
            buyers={items}
            onView={(b) => setViewBuyerId(b.id)}
            onEdit={(b) => setEditBuyer(b)}
            onDelete={(b) => setDeleteBuyer(b)}
          />
          <BuyersPagination
            currentPage={page}
            totalPages={totalPages}
            total={totalCount}
            perPage={pageSize}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  )
}

export default Buyers
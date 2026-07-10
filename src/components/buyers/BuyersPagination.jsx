import React from 'react'

function BuyersPagination({ currentPage, totalPages, total, perPage, onPageChange }) {
  const start = (currentPage - 1) * perPage + 1
  const end = Math.min(currentPage * perPage, total)

  return (
    <div className="flex flex-col sm:flex-row bg-[#E5EEFF] rounded-b-lg items-center justify-between gap-3 p-2">
      <p className="text-xs text-gray-500">
        Showing {start} to {end} of {total.toLocaleString()} entries
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 text-xs rounded-lg font-medium transition-colors ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default BuyersPagination

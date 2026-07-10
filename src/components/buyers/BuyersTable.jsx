import React from 'react'
import { MdEdit, MdDelete, MdVisibility } from 'react-icons/md'

function BuyersTable({ buyers, onView, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F1F5F9] border-b border-gray-100 rounded-t-lg">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Buyer Name
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                GST Number
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {buyers.map((buyer) => (
              <tr key={buyer.id} className="hover:bg-gray-50/60 transition-colors">
                {/* Buyer Name */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${buyer.avatarBg} text-white flex items-center justify-center text-xs font-bold shrink-0`}
                    >
                      {buyer.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 leading-tight">{buyer.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{buyer.type}</p>
                    </div>
                  </div>
                </td>

                {/* GST */}
                <td className="px-4 py-3 text-gray-600 font-mono text-xs">{buyer.gst}</td>

                {/* Phone */}
                <td className="px-4 py-3 text-gray-600">{buyer.phone}</td>

                {/* Address */}
                <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">{buyer.address}</td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onView?.(buyer)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View"
                    >
                      <MdVisibility size={17} />
                    </button>
                    <button
                      onClick={() => onEdit?.(buyer)}
                      className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <MdEdit size={17} />
                    </button>
                    <button
                      onClick={() => onDelete?.(buyer)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <MdDelete size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BuyersTable

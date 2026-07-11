import React from 'react'

/**
 * Base skeleton block — a single animated shimmer bar.
 *
 * Props:
 *  className  – Tailwind classes for width, height, rounded, etc.
 *               Defaults to "w-full h-4 rounded"
 */
export function Skeleton({ className = 'w-full h-4 rounded' }) {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  )
}

/**
 * SkeletonTableRow — mimics one row of BuyersTable / ProductTable.
 *
 * Props:
 *  cols       – number of columns  (default 5)
 *  avatar     – show avatar circle in first cell  (default true)
 */
export function SkeletonTableRow({ cols = 5, avatar = true }) {
  return (
    <tr className="border-b border-gray-50">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          {i === 0 && avatar ? (
            <div className="flex items-center gap-3">
              <Skeleton className="w-9 h-9 rounded-full shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="w-32 h-3.5 rounded" />
                <Skeleton className="w-20 h-3 rounded" />
              </div>
            </div>
          ) : (
            <Skeleton className="w-24 h-3.5 rounded" />
          )}
        </td>
      ))}
    </tr>
  )
}

/**
 * SkeletonTable — full table skeleton.
 *
 * Props:
 *  rows    – number of skeleton rows  (default 5)
 *  cols    – columns per row           (default 5)
 *  avatar  – avatar in first column    (default true)
 */
export function SkeletonTable({ rows = 5, cols = 5, avatar = true }) {
  return (
    <tbody className="divide-y divide-gray-50">
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonTableRow key={i} cols={cols} avatar={avatar} />
      ))}
    </tbody>
  )
}

/**
 * SkeletonCard — mimics a product/stat card.
 *
 * Props:
 *  className – wrapper Tailwind classes
 */
export function SkeletonCard({ className = '' }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-100 p-4 shadow-sm space-y-3 ${className}`}>
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="w-3/4 h-3.5 rounded" />
          <Skeleton className="w-1/2 h-3 rounded" />
        </div>
      </div>
      <Skeleton className="w-full h-3 rounded" />
      <Skeleton className="w-2/3 h-3 rounded" />
    </div>
  )
}

/**
 * SkeletonText — a block of text lines.
 *
 * Props:
 *  lines  – number of lines  (default 3)
 */
export function SkeletonText({ lines = 3 }) {
  const widths = ['w-full', 'w-5/6', 'w-4/6', 'w-3/4', 'w-2/3']
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`${widths[i % widths.length]} h-3.5 rounded`} />
      ))}
    </div>
  )
}

export default Skeleton

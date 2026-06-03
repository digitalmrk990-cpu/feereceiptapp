import { useMemo, useState } from 'react'
import { formatIndianCurrency } from '../services/pdfGenerator'

const PAGE_SIZE = 20

export default function DonorTable({ donors, selectedIndex, onSelect }) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)

  const filtered = useMemo(() => {
    if (!search.trim()) return donors
    const q = search.toLowerCase()
    return donors.filter((d) =>
      d['Full Name'].toLowerCase().includes(q)
    )
  }, [donors, search])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE
  )

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(0)
  }

  if (!donors || donors.length === 0) return null

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Donor Records ({donors.length})
        </h2>
        <input
          type="text"
          placeholder="Search by donor name..."
          value={search}
          onChange={handleSearch}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                #
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                Address
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                PAN Card No
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                Payment Mode
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-center font-medium text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginated.map((donor, i) => {
              const realIndex = donors.indexOf(donor)
              return (
                <tr
                  key={realIndex}
                  className={`hover:bg-gray-50 transition-colors ${
                    selectedIndex === realIndex ? 'bg-blue-50' : ''
                  }`}
                >
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {realIndex + 1}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                    {donor['Full Name']}
                  </td>
                  <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                    {donor['Address']}
                  </td>
                  <td className="px-4 py-3 text-gray-600 font-mono whitespace-nowrap">
                    {donor['PAN Card No']}
                  </td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    {donor['Payment Mode']}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-green-700 whitespace-nowrap">
                    {formatIndianCurrency(donor['Amount'])}
                  </td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <button
                      onClick={() => onSelect(realIndex)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-xs"
                    >
                      Preview Receipt
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            Page {page + 1} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setPage((p) => Math.min(totalPages - 1, p + 1))
              }
              disabled={page >= totalPages - 1}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

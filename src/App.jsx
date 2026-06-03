import { useState, useCallback } from 'react'
import ExcelUpload from './components/ExcelUpload'
import DonorTable from './components/DonorTable'
import ReceiptPreview from './components/ReceiptPreview'

export default function App() {
  const [donors, setDonors] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [signature, setSignature] = useState(null)

  const handleDataLoaded = useCallback((data) => {
    setDonors(data)
    setSelectedIndex(null)
  }, [])

  const handleSelect = useCallback((index) => {
    setSelectedIndex(index)
  }, [])

  const handleSignatureUpload = useCallback((e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setSignature(ev.target.result)
    reader.readAsDataURL(file)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                NGO Donation Receipt Generator
              </h1>
              <p className="text-sm text-gray-500">
                Upload Excel & generate donation receipts
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <ExcelUpload onDataLoaded={handleDataLoaded} />

        {donors && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <DonorTable
              donors={donors}
              selectedIndex={selectedIndex}
              onSelect={handleSelect}
            />
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <ReceiptPreview
            donors={donors}
            selectedIndex={selectedIndex}
            signature={signature}
            onSignatureUpload={handleSignatureUpload}
          />
        </div>
      </main>
    </div>
  )
}

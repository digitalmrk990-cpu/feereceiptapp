import { useRef, useState } from 'react'
import ReceiptTemplate from './ReceiptTemplate'
import { downloadAllPDFs as downloadAll, downloadSinglePDF } from '../services/pdfGenerator'

export default function ReceiptPreview({ donors, selectedIndex, signature, onSignatureUpload }) {
  const receiptRef = useRef(null)
  const [downloadingSingle, setDownloadingSingle] = useState(false)
  const [downloadingAll, setDownloadingAll] = useState(false)

  if (!donors || donors.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center text-gray-400">
        <p className="text-lg">Upload an Excel file to preview receipts</p>
      </div>
    )
  }

  const handleDownloadSingle = async () => {
    if (selectedIndex === null || selectedIndex === undefined) return
    setDownloadingSingle(true)
    try {
      await downloadSinglePDF(receiptRef.current, donors[selectedIndex], selectedIndex)
    } catch {
      alert('Failed to download PDF. Please try again.')
    }
    setDownloadingSingle(false)
  }

  const handleDownloadAll = async () => {
    setDownloadingAll(true)
    try {
      const elements = Array.from(
        document.querySelectorAll('[data-receipt]')
      )
      await downloadAll(
        elements.map((el, i) => ({ element: el, donor: donors[i] }))
      )
    } catch {
      alert('Failed to download ZIP. Please try again.')
    }
    setDownloadingAll(false)
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      alert('Please allow pop-ups to print')
      return
    }
    printWindow.document.write(`
      <html>
        <head>
          <title>Donation Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>${receiptRef.current.innerHTML}</body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => printWindow.print(), 500)
  }

  const currentDonor =
    selectedIndex !== null && selectedIndex !== undefined
      ? donors[selectedIndex]
      : donors[0]

  const currentIndex =
    selectedIndex !== null && selectedIndex !== undefined
      ? selectedIndex
      : 0

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Receipt Preview
        </h2>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 px-3 py-2 border border-gray-300 text-gray-600 text-sm rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            {signature ? 'Change Signature' : 'Upload Signature'}
            <input type="file" accept="image/jpeg,image/png" onChange={onSignatureUpload} className="hidden" />
          </label>
          <div className="flex flex-wrap gap-2">
            {donors.length > 1 && (
              <button
                onClick={handleDownloadAll}
                disabled={downloadingAll}
                className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {downloadingAll ? (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                  </svg>
                )}
                {downloadingAll ? 'Packaging...' : 'Download All as ZIP'}
              </button>
            )}
            <button
              onClick={handleDownloadSingle}
              disabled={
                downloadingSingle ||
                selectedIndex === null ||
                selectedIndex === undefined
              }
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {downloadingSingle ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
              )}
              {downloadingSingle ? 'Generating...' : 'Download PDF'}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print
            </button>
          </div>
        </div>
      </div>

      <div ref={receiptRef} data-receipt>
        <ReceiptTemplate donor={currentDonor} index={currentIndex} signature={signature} />
      </div>

      <div style={{ display: 'none' }}>
        {donors.map((donor, i) => (
          <div key={i} data-receipt>
            <ReceiptTemplate donor={donor} index={i} signature={signature} />
          </div>
        ))}
      </div>

      {donors.length > 1 && (
        <p className="text-xs text-gray-400 text-center mt-3">
          {selectedIndex !== null && selectedIndex !== undefined
            ? `Showing receipt for: ${currentDonor['Full Name']}`
            : 'Showing receipt for first donor. Select a donor from the table to preview their receipt.'}
        </p>
      )}
    </div>
  )
}

import { useCallback, useRef, useState } from 'react'
import * as XLSX from 'xlsx'

const REQUIRED_COLUMNS = ['Full Name', 'Address', 'PAN Card No', 'Amount', 'Payment Mode']

export default function ExcelUpload({ onDataLoaded }) {
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const processFile = useCallback(
    (file) => {
      setError(null)
      setLoading(true)

      if (
        !file.name.endsWith('.xlsx') &&
        !file.name.endsWith('.xls')
      ) {
        setError('Please upload a valid Excel file (.xlsx or .xls)')
        setLoading(false)
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result)
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
          const jsonData = XLSX.utils.sheet_to_json(firstSheet)

          if (!jsonData || jsonData.length === 0) {
            setError('Excel file is empty')
            setLoading(false)
            return
          }

          const headers = Object.keys(jsonData[0])
          const missing = REQUIRED_COLUMNS.filter(
            (col) => !headers.includes(col)
          )

          if (missing.length > 0) {
            setError(
              `Missing required columns: ${missing.join(', ')}`
            )
            setLoading(false)
            return
          }

          const donors = jsonData.map((row) => ({
            'Full Name': String(row['Full Name'] ?? '').trim(),
            'Address': String(row['Address'] ?? '').trim(),
            'PAN Card No': String(row['PAN Card No'] ?? '').trim().toUpperCase(),
            'Amount': Number(row['Amount']) || 0,
            'Payment Mode': String(row['Payment Mode'] ?? 'UPI').trim(),
          }))

          onDataLoaded(donors)
        } catch {
          setError('Failed to parse Excel file. Please check the file format.')
        }
        setLoading(false)
      }
      reader.onerror = () => {
        setError('Failed to read file')
        setLoading(false)
      }
      reader.readAsArrayBuffer(file)
    },
    [onDataLoaded]
  )

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) processFile(file)
    },
    [processFile]
  )

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setDragOver(false)
  }, [])

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) processFile(file)
    e.target.value = ''
  }

  return (
    <div className="mb-6">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
          ${dragOver
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/50'
          }
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleChange}
          className="hidden"
        />

        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <svg
              className="animate-spin h-8 w-8 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <p className="text-gray-600">Parsing Excel file...</p>
          </div>
        ) : (
          <>
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <p className="text-gray-700 font-medium mb-1">
              Drag & drop your Excel file here
            </p>
            <p className="text-gray-400 text-sm">or click to browse</p>
            <p className="text-gray-400 text-xs mt-2">
              Supported: .xlsx, .xls
            </p>
          </>
        )}
      </div>

      {error && (
        <div className="mt-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  )
}

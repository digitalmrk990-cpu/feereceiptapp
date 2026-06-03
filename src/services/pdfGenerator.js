import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export function formatIndianCurrency(amount) {
  const num = Number(amount)
  if (isNaN(num)) return '₹0'

  const str = Math.round(num).toString()
  const lastThree = str.slice(-3)
  const rest = str.slice(0, -3)
  let formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')
  if (rest) formatted += ','
  formatted += lastThree
  return `₹${formatted}`
}

const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

function convertBelow1000(n) {
  if (n === 0) return ''
  let res = ''
  if (n >= 100) {
    res += ones[Math.floor(n / 100)] + ' Hundred '
    n %= 100
  }
  if (n >= 20) {
    res += tens[Math.floor(n / 10)] + ' '
    n %= 10
  }
  if (n > 0) {
    res += ones[n] + ' '
  }
  return res.trim()
}

export function amountInWords(amount) {
  const num = Math.round(Number(amount))
  if (isNaN(num) || num === 0) return 'Zero'

  let res = ''
  const crore = Math.floor(num / 10000000)
  const lakh = Math.floor((num % 10000000) / 100000)
  const thousand = Math.floor((num % 100000) / 1000)
  const remainder = num % 1000

  if (crore > 0) res += convertBelow1000(crore) + ' Crore '
  if (lakh > 0) res += convertBelow1000(lakh) + ' Lakh '
  if (thousand > 0) res += convertBelow1000(thousand) + ' Thousand '
  if (remainder > 0) res += convertBelow1000(remainder)

  return res.trim() + ' Only'
}

export function generateReceiptNumber(index) {
  const num = String(index + 1).padStart(4, '0')
  return `MCF-2026-${num}`
}

export function generateTransactionRef(index) {
  const num = String(index + 1).padStart(6, '0')
  return `MCF26${num}`
}

export function getCurrentDate() {
  const d = new Date()
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}-${month}-${year}`
}

export function getFormattedDate() {
  const d = new Date()
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

export async function generateReceiptPDF(element) {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    width: 1000,
  })
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('p', 'mm', 'a4')
  const pdfW = pdf.internal.pageSize.getWidth()
  const pdfH = pdf.internal.pageSize.getHeight()
  const marginX = 5
  const marginY = 10
  const maxW = pdfW - 2 * marginX
  const maxH = pdfH - 2 * marginY
  const ratio = Math.min(maxW / canvas.width, maxH / canvas.height)
  const imgW = canvas.width * ratio
  const imgH = canvas.height * ratio
  const x = (pdfW - imgW) / 2
  const y = (pdfH - imgH) / 2
  pdf.addImage(imgData, 'PNG', x, y, imgW, imgH)
  return pdf
}

export async function downloadSinglePDF(element, donor, index) {
  const receiptNumber = generateReceiptNumber(index)
  const pdf = await generateReceiptPDF(element)
  pdf.save(`Receipt_${receiptNumber}.pdf`)
}

export async function downloadAllPDFs(elements) {
  const zip = new JSZip()
  const folder = zip.folder('Donation_Receipts')

  for (let i = 0; i < elements.length; i++) {
    const pdf = await generateReceiptPDF(elements[i].element)
    const receiptNumber = generateReceiptNumber(i)
    folder.file(`Receipt_${receiptNumber}.pdf`, pdf.output('arraybuffer'))
  }

  const content = await zip.generateAsync({ type: 'blob' })
  saveAs(content, 'Donation_Receipts.zip')
}

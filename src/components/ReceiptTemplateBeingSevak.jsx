import {
  formatIndianCurrency,
  amountInWords,
  getFormattedDate,
} from '../services/pdfGenerator'
import defaultStamp from '../../stamp.png'

function formatAmount(amount) {
  return Number(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export default function ReceiptTemplateBeingSevak({ donor, index, signature }) {
  const formattedDate = getFormattedDate()
  const amount = Number(donor['Amount']) || 0

  if (donor._dataMissing) {
    return (
      <div
        style={{
          width: '720px',
          margin: '0 auto',
          background: '#fff',
          padding: '40px',
          border: '5.5px solid #00a3da',
          color: '#222',
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          lineHeight: '1.6',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#c0392b', marginTop: '100px' }}>
          DATA MISSING
        </div>
        <div style={{ fontSize: '20px', marginTop: '20px', color: '#666' }}>
          Receipt for <b>{donor['Donor Name'] || 'Unknown'}</b> could not be generated due to missing mandatory fields.
        </div>
        <div style={{ fontSize: '18px', marginTop: '30px', color: '#999' }}>
          Receipt No.: {donor['Receipt No.'] || 'N/A'}
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        width: '720px',
        margin: '0 auto',
        background: '#fff',
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
        color: '#111',
      }}
    >
      {/* ===== TOP SECTION: Thank You Letter ===== */}
      <div style={{ border: '5.5px solid #00a3da', background: '#fff' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 14px',
            borderBottom: '1.5px solid #1a2e6e',
            gap: '12px',
          }}
        >
          <div
            style={{
              flexShrink: 0,
              width: '70px',
              height: '70px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ color: '#c0392b', fontStyle: 'italic', fontSize: '11px', marginBottom: '2px' }}>
              We Rise By Lifting Others
            </div>
            <div
              style={{
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#1a2e6e',
                letterSpacing: '1px',
                fontFamily: "'Times New Roman', serif",
                lineHeight: '1.2',
              }}
            >
              <span style={{ fontSize: '26px', fontWeight: 900 }}>B</span>EING{' '}
              <span style={{ fontSize: '26px', fontWeight: 900 }}>S</span>EVAK Charitable Trust
            </div>
            <div style={{ fontSize: '10px', color: '#c0392b', marginTop: '2px' }}>
              Charity Commissioner (Reg.) No. E-31948 | Income Tax, Exempted Under 80G No. AACTB6422FF20214
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #1a2e6e',
            padding: '5px 14px',
          }}
        >
          <div style={{ fontSize: '11px', color: '#111', minWidth: '130px' }}>
            Receipt No. <strong>{donor['Receipt No.']}</strong>
          </div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#c0392b',
              textAlign: 'center',
              flex: 1,
              letterSpacing: '1px',
            }}
          >
            80G CERTIFICATE OF DONATION
          </div>
          <div style={{ fontSize: '11px', color: '#111', minWidth: '130px', textAlign: 'right' }}>
            Date: <strong>{formattedDate}</strong>
          </div>
        </div>

        <div style={{ padding: '10px 18px 12px', lineHeight: '1.6', fontSize: '12px' }}>
          <p style={{ marginBottom: '7px' }}>
            <strong>NAME:&nbsp;&nbsp;<span>{donor['Donor Name']}</span></strong>
          </p>
          <p style={{ marginBottom: '7px' }}>Dear Sir/Madam,</p>
          <p style={{ marginBottom: '7px' }}>
            <strong>Being Sevak Charitable Trust</strong>, would like to thanks you for your generous donation of
            <strong style={{ textDecoration: 'underline', fontSize: '12px' }}>
              {' '}Rupees {amountInWords(amount)}{' '}
            </strong>
            <span
              style={{
                float: 'right',
                fontWeight: 'bold',
                fontSize: '12px',
                borderBottom: '1px solid #111',
                paddingBottom: '1px',
                marginLeft: '10px',
              }}
            >
              Rs. {formatAmount(amount)}
            </span>
            for noble cause & Make a Difference.
          </p>
          <p style={{ marginBottom: '7px' }}>
            Your financial support helps us to continue in our mission. With the valuable support of donor{' '}
            <strong>LIKE YOU</strong>, We are able to help many of needy families and individuals for not only to
            meet essential daily needs, but to manage their live-hood through our different activities like Food-grain
            Kit Distribution, Medical Kit Distribution, Education Facilities & many other activities.
          </p>
          <p style={{ marginBottom: '7px' }}>
            Please keep this written acknowledgement of your donation for your tax records.
          </p>
          <p style={{ marginBottom: '7px' }}>
            We thank you once again for your support and love we have received from you, We also look forward to your
            continued support.
          </p>
          <p style={{ marginBottom: '7px' }}>
            Thanking you,<br />Yours truly,<br />
            <strong>Being Sevak Charitable Trust</strong>
          </p>
          <p
            style={{
              fontWeight: 'bold',
              fontSize: '10px',
              marginTop: '6px',
              borderTop: '1px solid #111',
              paddingTop: '4px',
            }}
          >
            Note: Your Donation to Being Sevak Charitable Trust Is Eligible For 50% Tax Rebate [U/S 80G of Income Tax
            Act 1961]
          </p>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '2px dashed #1a2e6e', margin: 0 }} />

      {/* ===== BOTTOM SECTION: Formal Receipt ===== */}
      <div style={{ border: '5.5px solid #00a3da', background: '#fff' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 14px',
            borderBottom: '1.5px solid #1a2e6e',
            gap: '12px',
          }}
        >
          <div
            style={{
              flexShrink: 0,
              width: '70px',
              height: '70px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ color: '#c0392b', fontStyle: 'italic', fontSize: '11px', marginBottom: '2px' }}>
              Subject to Mumbai Jurisdiction
            </div>
            <div
              style={{
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#1a2e6e',
                letterSpacing: '1px',
                fontFamily: "'Times New Roman', serif",
                lineHeight: '1.2',
              }}
            >
              <span style={{ fontSize: '26px', fontWeight: 900 }}>B</span>EING{' '}
              <span style={{ fontSize: '26px', fontWeight: 900 }}>S</span>EVAK Charitable Trust
            </div>
            <div style={{ fontSize: '10px', color: '#c0392b', marginTop: '2px' }}>
              Charity Commissioner (Reg.) No. E-31948, Certificate Under Section 80G of the Income Tax Act 1961
            </div>
            <div style={{ fontSize: '10px', color: '#c0392b' }}>
              * 80G Registration No. AACTB6422FF20214 &nbsp;*CSR Registration No. CSR00015528
            </div>
            <div style={{ fontSize: '9px', color: '#1a2e6e', marginTop: '2px' }}>
              Registered Add: 401, 4th Floor, 'A' Wing, New Delite Apartment, Chandavarkar Lane, Borivali (West),
              Mumbai - 92.
            </div>
            <div style={{ fontSize: '9px', color: '#1a2e6e' }}>
              *Website: www.beingsevak.org &nbsp;*Email: being.sevak@gmail.com &nbsp;*Trust PAN CARD No AACTB6422F
            </div>
            <div style={{ fontSize: '9px', color: '#1a2e6e' }}>
              Helpline Number SEVAK: *8879-035-035 &nbsp;*8879-034-034
            </div>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', padding: 0, margin: '10px 0 0' }}>
          <tbody>
            <tr>
              <td style={{ padding: '4px 8px 4px 14px', verticalAlign: 'bottom', fontSize: '12px', whiteSpace: 'nowrap' }}>
                Receipt No.
              </td>
              <td
                style={{
                  padding: '4px 8px 4px 0',
                  verticalAlign: 'bottom',
                  fontSize: '12px',
                  borderBottom: '1px solid #555',
                  minWidth: '60px',
                }}
              >
                {donor['Receipt No.']}
              </td>
              <td
                style={{
                  padding: '4px 8px 4px 14px',
                  verticalAlign: 'bottom',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  textAlign: 'right',
                }}
              >
                Dated:
              </td>
              <td
                style={{
                  padding: '4px 8px 4px 0',
                  verticalAlign: 'bottom',
                  fontSize: '12px',
                  borderBottom: '1px solid #555',
                  minWidth: '60px',
                }}
              >
                {formattedDate}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '4px 8px 4px 14px', verticalAlign: 'bottom', fontSize: '12px', whiteSpace: 'nowrap' }}>
                RECEIVED with thanks from Ms./Mr./Miss.
              </td>
              <td
                style={{
                  padding: '4px 8px 4px 0',
                  verticalAlign: 'bottom',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  borderBottom: '1px solid #555',
                }}
                colSpan={3}
              >
                {donor['Donor Name']}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '4px 8px 4px 14px', verticalAlign: 'bottom', fontSize: '12px', whiteSpace: 'nowrap' }}>
                Address:
              </td>
              <td
                style={{
                  padding: '4px 8px 4px 0',
                  verticalAlign: 'bottom',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  borderBottom: '1px solid #555',
                }}
                colSpan={3}
              >
                {donor['Address 1'] || 'NA'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '4px 8px 4px 14px', verticalAlign: 'bottom', fontSize: '12px', whiteSpace: 'nowrap' }}>
                The Sum of Rupees:
              </td>
              <td
                style={{
                  padding: '4px 8px 4px 0',
                  verticalAlign: 'bottom',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  borderBottom: '1px solid #555',
                }}
                colSpan={3}
              >
                Rupees {amountInWords(amount)}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '4px 8px 4px 14px', verticalAlign: 'bottom', fontSize: '12px', whiteSpace: 'nowrap' }}>
                Mode of Payment:
              </td>
              <td
                style={{
                  padding: '4px 8px 4px 0',
                  verticalAlign: 'bottom',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  borderBottom: '1px solid #555',
                }}
              >
                {donor['Mode of Payment (MOP)']}
              </td>
              <td
                style={{
                  padding: '4px 8px 4px 14px',
                  verticalAlign: 'bottom',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  textAlign: 'right',
                }}
              >
                Payment ID No.:
              </td>
              <td
                style={{
                  padding: '4px 8px 4px 0',
                  verticalAlign: 'bottom',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  borderBottom: '1px solid #555',
                }}
              >
                {donor['Payment ID No.']}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '4px 8px 4px 14px', verticalAlign: 'bottom', fontSize: '12px', whiteSpace: 'nowrap' }}>
                Bank Name:
              </td>
              <td
                style={{
                  padding: '4px 8px 4px 0',
                  verticalAlign: 'bottom',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  borderBottom: '1px solid #555',
                }}
              >
                {donor['Donor Bank Name'] || 'NA'}
              </td>
              <td colSpan={2} />
            </tr>
            <tr>
              <td style={{ padding: '4px 8px 4px 14px', verticalAlign: 'bottom', fontSize: '12px', whiteSpace: 'nowrap' }}>
                On Account Of:
              </td>
              <td
                style={{
                  padding: '4px 8px 4px 0',
                  verticalAlign: 'bottom',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  borderBottom: '1px solid #555',
                }}
                colSpan={3}
              >
                {donor['Account Of'] || 'Corpus'}
              </td>
            </tr>
          </tbody>
        </table>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            padding: '8px 14px 10px',
            marginTop: '4px',
            borderTop: '1px solid #1a2e6e',
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: '14px',
                  border: '1.5px solid #1a2e6e',
                  display: 'inline-block',
                  padding: '3px 8px',
                  background: '#fff',
                }}
              >
                Amount (INR)
              </span>
              <span style={{ fontWeight: 'bold', fontSize: '12px' }}>Rs.</span>
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: '14px',
                  border: '1.5px solid #1a2e6e',
                  padding: '2px 10px',
                }}
              >
                {formatAmount(amount)}
              </span>
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: '14px',
                  border: '1.5px solid #1a2e6e',
                  padding: '2px 6px',
                }}
              >
                PAN NO:
              </span>
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: '14px',
                  border: '1.5px solid #1a2e6e',
                  padding: '2px 20px',
                }}
              >
                {donor['PAN No.'] || 'NA'}
              </span>
            </div>
            <div style={{ fontSize: '9px', fontStyle: 'italic', color: '#333', marginBottom: '3px' }}>
              Donation Payment is Subject to Realisation
            </div>
            <div style={{ fontSize: '11px', marginBottom: '3px' }}>
              Email ID: <span>{donor['Email ID'] || 'NA'}</span>
            </div>
            <div style={{ fontSize: '12px', fontStyle: 'italic', textAlign: 'center', marginTop: '4px' }}>
              ****This is system generated auto receipt****
            </div>
          </div>
          <div
            style={{
              textAlign: 'right',
              minWidth: '130px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '6px',
            }}
          >
            <img
              src={signature || defaultStamp}
              alt="Seal"
              style={{ width: '80px', height: '80px', objectFit: 'contain' }}
            />
            <div style={{ fontSize: '11px', textAlign: 'right', lineHeight: '1.5' }}>
              Authorised Sign.<br />
              <strong>Being Sevak Charitable Trust</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

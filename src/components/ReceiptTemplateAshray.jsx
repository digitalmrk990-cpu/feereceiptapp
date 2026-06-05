import {
  formatIndianCurrency,
  amountInWords,
  getFormattedDate,
} from '../services/pdfGenerator'
import defaultStamp from '../../stamp.png'
import ashrayLogo from '../../ahrayherderlogo.jpeg'
import ashrayStamp from '../../ashraystamp.PNG'

const ORG = {
  ashray: {
    tagline: 'RAY OF HOPE',
    name: 'ASHRAY FOR LIFE FOUNDATION',
    regNo: 'Charity Commissioner (Reg.) No. E-37237',
    cert80g: 'Certificate Under Section 80G of Income Tax Act 1961',
    reg80g: '*80G Registration No. AAJTA4535BF2022101',
    csrReg: '*CSR Registration No.CSR00069515',
    panCard: '*PAN CARD No AAJTA4535B',
    address:
      'Unit - 218, 2nd Floor, Meter No.2, Auris Galleria, New Link Road, Auris Serenity, Malad (West), Mumbai - 400064.',
    website: 'www.aflf.org',
    email: 'ashray.foundation22@gmail.com',
    helpline: '*9930028300 *9930028200',
    donorEmail: 'donorcare@aflf.org',
  },
  beingsevak: {
    tagline: 'RAY OF HOPE',
    name: 'BEING SEVAK FOUNDATION',
    regNo: '',
    cert80g: '',
    reg80g: '',
    csrReg: '',
    panCard: '',
    address: '',
    website: '',
    email: '',
    helpline: '',
    donorEmail: '',
  },
}

export default function ReceiptTemplateAshray({ donor, index, signature, project }) {
  const formattedDate = getFormattedDate()
  const amount = Number(donor['Amount']) || 0
  const org = ORG[project] || ORG.ashray

  if (donor._dataMissing) {
    return (
      <div
        style={{
          width: '794px',
          margin: '0 auto',
          background: '#f4f4f4',
          border: '4px solid #2a0000',
          padding: '40px',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#8b2f2f', marginTop: '100px' }}>
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
    <div style={{ width: '794px', margin: '0 auto', background: '#f4f4f4', border: '4px solid #2a0000', position: 'relative', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ position: 'absolute', inset: '4px', border: '2px solid #7d2d2d', pointerEvents: 'none' }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px', borderBottom: '3px solid #2a0000', position: 'relative' }}>
        <div style={{ width: '140px', textAlign: 'center' }}>
          <img src={ashrayLogo} alt="Logo" style={{ width: '110px' }} />
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ color: '#7d2d2d', fontSize: '12px', fontWeight: 'bold' }}>{org.tagline}</div>
          <div style={{ color: '#8b2f2f', fontSize: '26px', fontWeight: 800, margin: '2px 0' }}>{org.name}</div>
          <div style={{ color: '#8b2f2f', fontSize: '11px', lineHeight: '1.3' }}>
            {org.regNo}
            <br />
            {org.cert80g}
            <br />
            {org.reg80g}
            {org.csrReg && <><br />{org.csrReg}</>}
            <br />
            {org.panCard}
          </div>
        </div>
      </div>

      {/* Title Bar */}
      <div style={{ textAlign: 'center', fontWeight: 700, color: '#8b2f2f', fontSize: '24px', padding: '8px 0', borderBottom: '2px solid #000', position: 'relative' }}>
        80G CERTIFICATE OF DONATION
      </div>

      {/* Body */}
      <div style={{ padding: '10px', position: 'relative' }}>
        {/* Date & Receipt No */}
        <div style={{ display: 'flex', alignItems: 'flex-end', margin: '12px 0' }}>
          <span style={{ fontSize: '15px', fontWeight: 600, lineHeight: '28px' }}>Dated:</span>
          <div style={{ borderBottom: '4px solid #000', minHeight: '24px', padding: '0 8px 6px', width: '120px', lineHeight: '24px' }}>{formattedDate}</div>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: '15px', fontWeight: 600, lineHeight: '28px' }}>Receipt No.</span>
          <div style={{ borderBottom: '4px solid #000', minHeight: '24px', padding: '0 8px 6px', width: '120px', lineHeight: '24px' }}>{donor['Receipt No.']}</div>
        </div>

        {/* Donor Name */}
        <div style={{ display: 'flex', alignItems: 'flex-end', margin: '12px 0' }}>
          <span style={{ fontSize: '15px', fontWeight: 600, lineHeight: '28px' }}>Received from thanks Mr./Mrs./Ms. :</span>
          <div style={{ borderBottom: '4px solid #000', minHeight: '24px', padding: '0 8px 6px', width: '500px', lineHeight: '24px' }}>{donor['Donor Name']}</div>
        </div>

        {/* Address */}
        <div style={{ display: 'flex', alignItems: 'flex-end', margin: '12px 0' }}>
          <span style={{ fontSize: '15px', fontWeight: 600, lineHeight: '28px' }}>Address:</span>
          <div style={{ borderBottom: '4px solid #000', minHeight: '24px', padding: '0 8px 6px', width: '500px', lineHeight: '24px' }}>{donor['Address 1'] || 'NA'}</div>
        </div>

        {/* City / State / Pin Code (not in data model, show NA) */}
        <div style={{ display: 'flex', alignItems: 'flex-end', margin: '12px 0' }}>
          <span style={{ fontSize: '15px', fontWeight: 600, lineHeight: '28px' }}>City:</span>
          <div style={{ borderBottom: '4px solid #000', minHeight: '24px', padding: '0 8px 6px', width: '180px', lineHeight: '24px' }}>NA</div>
          <div style={{ width: '20px' }} />
          <span style={{ fontSize: '15px', fontWeight: 600, lineHeight: '28px' }}>State:</span>
          <div style={{ borderBottom: '4px solid #000', minHeight: '24px', padding: '0 8px 6px', width: '180px', lineHeight: '24px' }}>NA</div>
          <div style={{ width: '20px' }} />
          <span style={{ fontSize: '15px', fontWeight: 600, lineHeight: '28px' }}>Pin Code:</span>
          <div style={{ borderBottom: '4px solid #000', minHeight: '24px', padding: '0 8px 6px', width: '180px', lineHeight: '24px' }}>NA</div>
        </div>

        {/* Amount in Words */}
        <div style={{ display: 'flex', alignItems: 'flex-end', margin: '12px 0' }}>
          <span style={{ fontSize: '15px', fontWeight: 600, lineHeight: '28px' }}>The Sum of Rupees:</span>
          <div style={{ borderBottom: '4px solid #000', minHeight: '24px', padding: '0 8px 6px', width: '500px', lineHeight: '24px' }}>
            {amountInWords(amount)} Only
          </div>
        </div>

        {/* Mode of Payment */}
        <div style={{ display: 'flex', alignItems: 'flex-end', margin: '12px 0' }}>
          <span style={{ fontSize: '15px', fontWeight: 600, lineHeight: '28px' }}>Mode of Payment:</span>
          <div style={{ borderBottom: '4px solid #000', minHeight: '24px', padding: '0 8px 6px', width: '300px', lineHeight: '24px' }}>{donor['Mode of Payment (MOP)']}</div>
        </div>

        {/* Payment ID */}
        <div style={{ display: 'flex', alignItems: 'flex-end', margin: '12px 0' }}>
          <span style={{ fontSize: '15px', fontWeight: 600, lineHeight: '28px' }}>Payment ID No.:</span>
          <div style={{ borderBottom: '4px solid #000', minHeight: '24px', padding: '0 8px 6px', width: '350px', lineHeight: '24px' }}>{donor['Payment ID No.']}</div>
        </div>

        {/* Account Of */}
        <div style={{ display: 'flex', alignItems: 'flex-end', margin: '12px 0' }}>
          <span style={{ fontSize: '15px', fontWeight: 600, lineHeight: '28px' }}>Account Of:</span>
          <div style={{ borderBottom: '4px solid #000', minHeight: '24px', padding: '0 8px 6px', width: '350px', lineHeight: '24px' }}>{donor['Account Of'] || 'NA'}</div>
        </div>

        {/* Amount & PAN */}
        <div style={{ display: 'flex', gap: '25px', marginTop: '20px' }}>
          <div style={{ width: '240px' }}>
            <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>Amount (INR)</div>
            <div style={{ border: '3px solid #000', height: '50px', display: 'flex' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>Rs.</div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{amount.toFixed(2)}</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>PAN NO:</div>
            <div style={{ border: '3px solid #000', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              {donor['PAN No.'] || 'NA'}
            </div>
          </div>
        </div>

        {/* Middle Section: 80G + Donation Info + Signature */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ fontSize: '60px', fontWeight: 900, color: '#a03636', lineHeight: 1 }}>80G</div>
            <div style={{ width: '280px', border: '3px solid #000', padding: '8px', fontSize: '14px', lineHeight: '1.8', height: 'fit-content' }}>
              Donation To {org.name}
              <br />
              Eligible For 50% Income tax deduction
              <br />
              80G of Income tax act 1961
            </div>
          </div>
          <div style={{ textAlign: 'center', width: '230px' }}>
            <img
              src={ashrayStamp}
              alt="Stamp"
              style={{
                width: '120px',
                marginBottom: '8px',
                marginLeft: '46px'
              }}
            />
            <div style={{ color: '#8b2f2f', fontSize: '18px', fontWeight: 700 }}>Authorised Sign.</div>
            <div style={{ color: '#8b2f2f', fontSize: '18px', fontWeight: 800 }}>{org.name}.</div>
          </div>
        </div>

        {/* Auto receipt note */}
        <div style={{ textAlign: 'center', margin: '18px 0', fontWeight: 700, fontSize: '20px' }}>
          ****This is system generated auto receipt****
        </div>
      </div>

      {/* Message Box */}
      <div style={{ borderTop: '3px solid #000', borderBottom: '3px solid #000', padding: '10px', position: 'relative' }}>
        <div style={{ textAlign: 'center', color: '#8b2f2f', fontSize: '20px', fontWeight: 800, textDecoration: 'underline', marginBottom: '12px' }}>
          Thankyou for your Valuable Donation.
        </div>
        <p style={{ fontSize: '14px', lineHeight: '1.5', marginBottom: '14px' }}>
          * Together we are making a difference! Your continued support of our mission is deeply gratifying to us, and we hope it is the same for you. Your contribution is enabling us to accomplish in the field of Health, Education, Sustainability, Vocational Training, Empowering Women and Child Development.
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.5', marginBottom: '14px' }}>
          * If You Have any Question regarding this 80G Tax Deduction Certificate, Kindly get in touch with our Donor Relation Officer at {org.donorEmail} by quoting Unique Receipt Number.
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.5', marginBottom: '14px' }}>
          * This Receipt is invalid in case of non-realization of the money instrument or reversal of the credit/debit card charges or reversal of donation amount.
        </p>
        <div style={{ textAlign: 'center', fontWeight: 700, marginTop: '10px' }}>
          Subject to Mumbai Jurisdiction
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', color: '#8b2f2f', fontWeight: 700, fontSize: '12px', padding: '8px', position: 'relative' }}>
        Regd. Add: {org.address}
        <br />
        Website: {org.website} | Email: {org.email}
        <br />
        Helpline Number SEVAK: {org.helpline}
      </div>
    </div>
  )
}

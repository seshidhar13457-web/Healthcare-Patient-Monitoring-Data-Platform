import { useState } from 'react'
import './App.css'

// Synthetic practice data. These are not actual patient records.
const samplePatients = [
  {
    id: 'P-1001',
    hospital: 'Hospital A',
    ward: 'ICU',
    device: 'Monitor 01',
    heartRate: 112,
    spo2: 89,
    temperature: 38.6,
    status: 'Critical',
    time: '10:30 AM',
  },
  {
    id: 'P-1002',
    hospital: 'Hospital A',
    ward: 'General',
    device: 'Monitor 02',
    heartRate: 76,
    spo2: 98,
    temperature: 36.8,
    status: 'Normal',
    time: '10:31 AM',
  },
  {
    id: 'P-1003',
    hospital: 'Hospital B',
    ward: 'Emergency',
    device: 'Monitor 03',
    heartRate: 104,
    spo2: 93,
    temperature: 37.8,
    status: 'Warning',
    time: '10:32 AM',
  },
  {
    id: 'P-1004',
    hospital: 'Hospital B',
    ward: 'ICU',
    device: 'Monitor 04',
    heartRate: 118,
    spo2: 88,
    temperature: 39.1,
    status: 'Critical',
    time: '10:33 AM',
  },
  {
    id: 'P-1005',
    hospital: 'Hospital C',
    ward: 'General',
    device: 'Monitor 05',
    heartRate: 72,
    spo2: 99,
    temperature: 36.5,
    status: 'Normal',
    time: '10:34 AM',
  },
  {
    id: 'P-1006',
    hospital: 'Hospital C',
    ward: 'Emergency',
    device: 'Monitor 06',
    heartRate: 96,
    spo2: 94,
    temperature: 37.9,
    status: 'Warning',
    time: '10:35 AM',
  },
  {
    id: 'P-1007',
    hospital: 'Hospital A',
    ward: 'Emergency',
    device: 'Monitor 07',
    heartRate: 82,
    spo2: 97,
    temperature: 36.9,
    status: 'Normal',
    time: '10:36 AM',
  },
  {
    id: 'P-1008',
    hospital: 'Hospital B',
    ward: 'General',
    device: 'Monitor 08',
    heartRate: 79,
    spo2: 98,
    temperature: 36.7,
    status: 'Normal',
    time: '10:37 AM',
  },
]

const hospitals = [...new Set(samplePatients.map((patient) => patient.hospital))]
const wards = [...new Set(samplePatients.map((patient) => patient.ward))]
const devices = [...new Set(samplePatients.map((patient) => patient.device))]

function App() {
  const [hospital, setHospital] = useState('All')
  const [ward, setWard] = useState('All')
  const [device, setDevice] = useState('All')
  const [status, setStatus] = useState('All')
  const [search, setSearch] = useState('')

  const filteredPatients = samplePatients.filter((patient) => {
    return (
      (hospital === 'All' || patient.hospital === hospital) &&
      (ward === 'All' || patient.ward === ward) &&
      (device === 'All' || patient.device === device) &&
      (status === 'All' || patient.status === status) &&
      patient.id.toLowerCase().includes(search.trim().toLowerCase())
    )
  })

  const totalEvents = filteredPatients.length
  const alerts = filteredPatients.filter(
    (patient) => patient.status !== 'Normal'
  )
  const criticalAlerts = alerts.filter(
    (patient) => patient.status === 'Critical'
  )

  const averageHeartRate = totalEvents
    ? (
        filteredPatients.reduce((sum, patient) => sum + patient.heartRate, 0) /
        totalEvents
      ).toFixed(1)
    : '—'

  const averageSpo2 = totalEvents
    ? (
        filteredPatients.reduce((sum, patient) => sum + patient.spo2, 0) /
        totalEvents
      ).toFixed(1)
    : '—'

  function resetFilters() {
    setHospital('All')
    setWard('All')
    setDevice('All')
    setStatus('All')
    setSearch('')
  }

  function exportCsv() {
    const headers = [
      'Patient ID',
      'Hospital',
      'Ward',
      'Device',
      'Heart Rate',
      'SpO2',
      'Temperature',
      'Status',
      'Sample Time',
    ]

    const rows = filteredPatients.map((patient) => [
      patient.id,
      patient.hospital,
      patient.ward,
      patient.device,
      patient.heartRate,
      patient.spo2,
      patient.temperature,
      patient.status,
      patient.time,
    ])

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')
      )
      .join('\r\n')

    const blob = new Blob(['\uFEFF', csv], {
      type: 'text/csv;charset=utf-8;',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'sample-patient-events.csv'
    document.body.appendChild(link)
    link.click()
    link.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-icon" aria-hidden="true">+</span>
          <div>
            <strong>Healthcare Monitor</strong>
            <span className="brand-subtitle">Patient analytics dashboard</span>
          </div>
        </div>
        <span className="demo-badge">Demo · Sample data</span>
      </header>

      <main className="dashboard">
        <section className="page-heading">
          <div>
            <p className="eyebrow">HOSPITAL OVERVIEW</p>
            <h1>Patient Monitoring Dashboard</h1>
            <p className="subtitle">
              Explore patient vital signs, hospital activity, and alerts.
            </p>
          </div>
          <button
            className="primary-button"
            onClick={exportCsv}
            disabled={totalEvents === 0}
          >
            Export filtered CSV
          </button>
        </section>

        <div className="notice">
          Synthetic sample records. Databricks is not connected.
          Alert labels are illustrative and are not clinical guidance.
        </div>

        <section className="panel filters" aria-label="Dashboard filters">
          <label>
            Hospital
            <select value={hospital} onChange={(e) => setHospital(e.target.value)}>
              <option value="All">All hospitals</option>
              {hospitals.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </label>

          <label>
            Ward
            <select value={ward} onChange={(e) => setWard(e.target.value)}>
              <option value="All">All wards</option>
              {wards.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </label>

          <label>
            Device
            <select value={device} onChange={(e) => setDevice(e.target.value)}>
              <option value="All">All devices</option>
              {devices.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </label>

          <label>
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="All">All statuses</option>
              <option value="Normal">Normal</option>
              <option value="Warning">Warning</option>
              <option value="Critical">Critical</option>
            </select>
          </label>

          <label>
            Patient ID
            <input
              type="search"
              placeholder="Search P-1001"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          <button className="secondary-button" onClick={resetFilters}>
            Reset
          </button>
        </section>

        <section className="summary-cards" aria-label="Filtered summary">
          <SummaryCard
            title="Patient Events"
            value={totalEvents}
            detail="Records matching your filters"
          />
          <SummaryCard
            title="Total Alerts"
            value={alerts.length}
            detail={`${criticalAlerts.length} critical alerts`}
          />
          <SummaryCard
            title="Average Heart Rate"
            value={averageHeartRate}
            detail="Beats per minute"
          />
          <SummaryCard
            title="Average SpO₂"
            value={averageSpo2 === '—' ? '—' : `${averageSpo2}%`}
            detail="Oxygen saturation"
          />
        </section>

        <div className="overview-grid">
          <section className="panel">
            <h2>Events by Hospital</h2>
            <p className="section-description">Based on current filters</p>

            {totalEvents === 0 ? (
              <p className="empty-state">No matching events.</p>
            ) : (
              hospitals.map((name) => {
                const count = filteredPatients.filter(
                  (patient) => patient.hospital === name
                ).length

                return (
                  <div className="hospital-row" key={name}>
                    <div className="hospital-label">
                      <span>{name}</span>
                      <strong>{count} events</strong>
                    </div>
                    <div className="bar-track" aria-hidden="true">
                      <div
                        className="bar-fill"
                        style={{ width: `${(count / totalEvents) * 100}%` }}
                      />
                    </div>
                  </div>
                )
              })
            )}
          </section>

          <section className="panel">
            <h2>Critical Alerts</h2>
            <p className="section-description">Illustrative sample alerts</p>

            {criticalAlerts.length === 0 ? (
              <p className="empty-state">
                No critical alerts match your filters.
              </p>
            ) : (
              criticalAlerts.map((patient) => (
                <div className="alert-item" key={patient.id}>
                  <div>
                    <strong>{patient.id}</strong>
                    <p>{patient.hospital} · {patient.ward}</p>
                    <p>
                      HR: {patient.heartRate} bpm · SpO₂: {patient.spo2}%
                    </p>
                  </div>
                  <span className="status critical">Critical</span>
                </div>
              ))
            )}
          </section>
        </div>

        <section className="panel patient-panel">
          <div className="table-heading">
            <div>
              <h2>Patient Events</h2>
              <p className="section-description">
                {totalEvents} matching sample records
              </p>
            </div>
          </div>

          <div className="table-scroll">
            <table>
              <caption className="visually-hidden">
                Patient vital signs matching the selected filters
              </caption>
              <thead>
                <tr>
                  <th scope="col">Patient</th>
                  <th scope="col">Hospital</th>
                  <th scope="col">Ward</th>
                  <th scope="col">Device</th>
                  <th scope="col">Heart Rate</th>
                  <th scope="col">SpO₂</th>
                  <th scope="col">Temperature</th>
                  <th scope="col">Status</th>
                  <th scope="col">Sample Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td className="patient-id">{patient.id}</td>
                    <td>{patient.hospital}</td>
                    <td>{patient.ward}</td>
                    <td>{patient.device}</td>
                    <td>{patient.heartRate} bpm</td>
                    <td>{patient.spo2}%</td>
                    <td>{patient.temperature} °C</td>
                    <td>
                      <span className={`status ${patient.status.toLowerCase()}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td>{patient.time}</td>
                  </tr>
                ))}

                {totalEvents === 0 && (
                  <tr>
                    <td colSpan={9} className="empty-state">
                      No matching records. Try resetting the filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <footer>
          Healthcare Patient Monitoring Data Platform · Frontend demo
        </footer>
      </main>
    </div>
  )
}

function SummaryCard({ title, value, detail }) {
  return (
    <article className="summary-card">
      <h2>{title}</h2>
      <p className="summary-value">{value}</p>
      <p className="summary-detail">{detail}</p>
    </article>
  )
}

export default App
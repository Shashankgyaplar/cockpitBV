import { useState, useEffect } from 'react';
import axios from 'axios';

const DPDP = [
  { section: 'Section 6', right: 'Consent', how: 'Explicit opt-in before any signal collection begins' },
  { section: 'Section 8', right: 'Minimization', how: 'Only anomaly score leaves device — raw signals stay local' },
  { section: 'Section 11', right: 'Right to Access', how: 'Full session log visible in Audit Log tab' },
  { section: 'Section 12', right: 'Right to Erasure', how: 'Behavioral ML data deletable instantly on request' },
];

export default function DataControl({ currentUser }) {
  const [behaviorDeleted, setBehaviorDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showRbiInfo, setShowRbiInfo] = useState(false);

  useEffect(() => {
    setBehaviorDeleted(false);
  }, [currentUser]);

  const deleteBehavior = async () => {
    if (!window.confirm(`Delete all behavioral ML data for ${currentUser.name}? This cannot be undone.`)) return;
    setLoading(true);
    try {
      const apiBase = process.env.REACT_APP_API_URL || 'https://behaviorvault-api.onrender.com';
      await axios.delete(`${apiBase}/api/consent/${currentUser.id}`, { data: { data_type: 'behavioral' } });
      setBehaviorDeleted(true);
    } catch {} finally { setLoading(false); }
  };

  return (
    <>
      <section className="bento-card" style={{ padding: 0 }}>
        <div style={{ padding: '24px 24px 8px' }}><h2 className="section-label">DPDP Act 2023 — Compliance Map</h2></div>
        <div className="table-responsive">
          <table className="fin-table">
            <thead>
              <tr><th>Section</th><th>Statutory Right</th><th>Technical Implementation</th><th>Status</th></tr>
            </thead>
            <tbody>
              {DPDP.map((row, i) => (
                <tr key={i}>
                  <td className="mono" style={{ color: 'var(--blue)' }}>{row.section}</td>
                  <td style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{row.right}</td>
                  <td>{row.how}</td>
                  <td><span className="status-badge badge-green">Compliant</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="bento-card style-row" style={{ borderLeft: '4px solid var(--warn-amber)', background: 'var(--warn-amber-bg)', display: 'flex', gap: '16px', padding: '24px' }}>
        <div style={{ fontSize: '24px', color: 'var(--warn-amber)' }}>⚖</div>
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--warn-amber)', marginBottom: '4px' }}>RBI Master Directions — PMLA Mandate</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>The Reserve Bank of India requires a 7-year retention of all financial transaction records under the Prevention of Money Laundering Act. This legal obligation overrides individual deletion requests. BehaviorVault implements a tiered policy — behavioral ML data follows DPDP, while transaction data follows RBI/PMLA.</p>
        </div>
      </div>

      <section>
        <h2 className="section-label">Exercise Your Rights</h2>
        <div className="grid-2">
          
          <div className="bento-card" style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Behavioral ML Data</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>Keystroke · Swipe · Touch · Accelerometer</p>
              </div>
              <span className={`status-badge ${behaviorDeleted ? 'badge-red' : 'badge-green'}`}>{behaviorDeleted ? 'Deleted' : 'Active'}</span>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', fontSize: '13px', margin: '16px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: 'var(--text-tertiary)' }}>DPDP Section</span><span className="mono">Section 12 — Right to Erasure</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-tertiary)' }}>Retention</span><span>Until deleted by user</span></div>
            </div>
            <button className="btn-danger" onClick={deleteBehavior} disabled={behaviorDeleted || loading}>
              {loading ? 'Processing...' : behaviorDeleted ? '✓ Data Purged' : 'Delete Behavioral Data'}
            </button>
          </div>

          <div className="bento-card" style={{ background: 'var(--surface-2)', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-secondary)' }}>Transaction Records</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>History · Amounts · Beneficiaries</p>
              </div>
              <span className="status-badge badge-amber">Locked</span>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', fontSize: '13px', margin: '16px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: 'var(--text-tertiary)' }}>Regulation</span><span className="mono text-amber">RBI PMLA Mandate</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-tertiary)' }}>Retention</span><span style={{ color: 'var(--warn-amber)' }}>7 years (mandatory)</span></div>
            </div>
            <div style={{ position: 'relative' }}>
              <button className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--border-medium)', color: 'var(--text-secondary)' }} onClick={() => setShowRbiInfo(!showRbiInfo)}>⚖ Why can't I delete this?</button>
              {showRbiInfo && (
                <div style={{ position: 'absolute', bottom: '115%', left: 0, right: 0, background: 'var(--surface-0)', border: '1px solid var(--border-medium)', padding: '16px', borderRadius: '12px', fontSize: '12px', color: 'var(--text-secondary)', zIndex: 20, lineHeight: '1.6' }}>
                  The Prevention of Money Laundering Act requires all banks to retain transaction logs for investigation continuity. This legal mandate overrides individual processing controls.
                </div>
              )}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
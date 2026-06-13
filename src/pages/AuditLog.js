import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AuditLog() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/behavior/sessions/shashank')
      .then(r => setSessions(r.data.sessions))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const scoreColor = (score, isAnomaly) => {
    if (isAnomaly) return 'var(--alert-red)';
    if (score < 0.3) return 'var(--secure-green)';
    return 'var(--warn-amber)';
  };

  const getBadgeClass = (score, isAnomaly) => {
    if (isAnomaly) return 'badge-red';
    if (score < 0.3) return 'badge-green';
    return 'badge-amber';
  };

  const normal = sessions.filter(s => !s.is_anomaly).length;
  const anomalies = sessions.filter(s => s.is_anomaly).length;
  const duress = sessions.filter(s => s.duress_flag).length;
  const avgScore = sessions.length ? (sessions.reduce((a, b) => a + (b.anomaly_score || 0), 0) / sessions.length).toFixed(2) : '0.00';

  if (loading) return <div className="mono" style={{ color: 'var(--text-tertiary)', padding: '40px' }}>Syncing financial ledger...</div>;

  return (
    <>
      <div className="grid-4">
        <div className="bento-card" style={{ padding: '24px' }}><div className="metric-value" style={{ color: 'var(--secure-green)' }}>{normal}</div><div className="metric-label">Normal Sessions</div></div>
        <div className="bento-card" style={{ padding: '24px' }}><div className="metric-value" style={{ color: 'var(--alert-red)' }}>{anomalies}</div><div className="metric-label">Anomalies Detected</div></div>
        <div className="bento-card" style={{ padding: '24px' }}><div className="metric-value" style={{ color: 'var(--warn-amber)' }}>{duress}</div><div className="metric-label">Duress Alerts</div></div>
        <div className="bento-card" style={{ padding: '24px' }}><div className="metric-value" style={{ color: 'var(--blue)' }}>{avgScore}</div><div className="metric-label">Avg Anomaly Score</div></div>
      </div>

      <div className="bento-card" style={{ padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="section-label" style={{ margin: 0 }}>Scoring Reference</div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {[
            { range: '0.0 — 0.3', label: 'Normal', color: 'var(--secure-green)' },
            { range: '0.3 — 0.45', label: 'Elevated', color: 'var(--warn-amber)' },
            { range: '0.45+', label: 'Anomaly', color: 'var(--alert-red)' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color }} />
              <span className="mono" style={{ fontSize: '12px', color: item.color, fontWeight: '500' }}>{item.range}</span>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="bento-card" style={{ padding: 0 }}>
        <div style={{ padding: '24px 32px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="section-label" style={{ margin: 0 }}>Session History — {sessions.length} total</h2>
          <span className="mono" style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>DPDP Act Section 11 Access Ledger</span>
        </div>

        {sessions.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '13px' }}>No sessions yet. Open the app and log in to generate telemetry data.</div>
        ) : (
          <table className="fin-table mono" style={{ fontSize: '12px' }}>
            <thead>
              <tr><th>Session Marker</th><th>Timestamp</th><th>Anomaly Target</th><th>Security Status</th><th>Hardware Signals</th></tr>
            </thead>
            <tbody>
              {sessions.map((session, i) => (
                <tr key={i} style={{ background: session.is_anomaly || session.duress_flag ? 'rgba(239,68,68,0.02)' : 'transparent' }}>
                  <td style={{ color: 'var(--text-primary)', fontWeight: '500' }}>#{sessions.length - i}</td>
                  <td style={{ color: 'var(--text-tertiary)' }}>
                    {new Date(session.timestamp).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td style={{ color: scoreColor(session.anomaly_score, session.is_anomaly), fontWeight: '500' }}>
                    {(session.anomaly_score || 0).toFixed(4)}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {session.duress_flag && <span className="status-badge badge-red">DURESS</span>}
                      <span className={`status-badge ${getBadgeClass(session.anomaly_score, session.is_anomaly)}`}>
                        {session.is_anomaly ? 'Anomaly' : session.anomaly_score < 0.3 ? 'Normal' : 'Elevated'}
                      </span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>
                    KST:{session.keystroke_avg_ms || '0'}ms | SWP:{session.swipe_avg_px_per_sec || '0'}px/s | DEV:{session.device_type || 'mobile'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}
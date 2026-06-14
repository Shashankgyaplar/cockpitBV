import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import DataControl from './pages/DataControl';
import AuditLog from './pages/AuditLog';
import './index.css';

const NAV = [
  { id: 'dashboard', label: 'Overview', icon: '◈' },
  { id: 'datacontrol', label: 'Data Rights', icon: '◎' },
  { id: 'auditlog', label: 'Audit Log', icon: '≡' },
];

const PROFILES = [
  { name: 'Shashank', id: 'shashank', bank: 'Canara Bank ···· 4521' },
  { name: 'Shashwath', id: 'shashwath', bank: 'SBI Bank ···· 8821' },
  { name: 'Vincent', id: 'vincent', bank: 'HDFC Bank ···· 1024' },
  { name: 'Shashanks', id: 'shashanks', bank: 'ICICI Bank ···· 3091' },
  { name: 'Dhyan', id: 'dhyan', bank: 'Axis Bank ···· 1121' },
  { name: 'Dishan', id: 'dishan', bank: 'Yes Bank ···· 9104' },
  { name: 'X', id: 'x', bank: 'IDFC First ···· 4406' },
  { name: 'Pavan', id: 'pavan', bank: 'Kotak Bank ···· 1901' },
  { name: 'Shetty', id: 'shetty', bank: 'IndusInd Bank ···· 2010' },
  { name: 'Boss', id: 'boss', bank: 'Federal Bank ···· 2908' },
];

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(PROFILES[0]);

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div style={{ padding: '32px 24px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '32px', height: '32px', background: 'var(--text-primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--base-bg)', fontWeight: '600', fontSize: '13px', paddingLeft: '7px', paddingTop: '3px' }}>BV</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', letterSpacing: '-0.02em' }}>BehaviorVault</div>
              <div className="mono" style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>ConsentCockpit</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '12px 16px', margin: '0 16px 24px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: '600', letterSpacing: '0.05em' }}>Select Profile</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--brand-accent)', color: 'var(--base-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600' }}>
              {currentUser.name[0]}
            </div>
            <div style={{ flex: 1 }}>
              <select 
                value={currentUser.id} 
                onChange={(e) => {
                  const selected = PROFILES.find(p => p.id === e.target.value);
                  setCurrentUser(selected);
                }}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: 'var(--text-primary)', 
                  fontSize: '13px', 
                  fontWeight: '500', 
                  width: '100%',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                {PROFILES.map(p => (
                  <option key={p.id} value={p.id} style={{ background: '#111', color: '#fff' }}>
                    {p.name}
                  </option>
                ))}
              </select>
              <div className="mono" style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '2px' }}>{currentUser.bank}</div>
            </div>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          {NAV.map(n => (
            <button key={n.id} className={`nav-link ${page === n.id ? 'active' : ''}`} onClick={() => setPage(n.id)}>
              <span style={{ fontSize: '16px' }}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="status-badge badge-green" style={{ width: '100%', justifyContent: 'center' }}>DPDP Compliant</div>
          <div className="status-badge badge-neutral" style={{ width: '100%', justifyContent: 'center' }}>RBI PMLA Lock</div>
        </div>
      </aside>

      <main className="main-wrapper">
        <header className="topbar">
          <div>
            <h1 className="header-title">{NAV.find(n => n.id === page)?.label}</h1>
            <div className="page-date mono">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
          <div className="status-badge badge-green">
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--secure-green)' }} /> Live Terminal
          </div>
        </header>

        <div className="content-grid">
          {page === 'dashboard' && <Dashboard />}
          {page === 'datacontrol' && <DataControl currentUser={currentUser} />}
          {page === 'auditlog' && <AuditLog currentUser={currentUser} />}
        </div>
      </main>
    </div>
  );
}
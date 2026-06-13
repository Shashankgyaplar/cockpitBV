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

export default function App() {
  const [page, setPage] = useState('dashboard');

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div style={{ padding: '32px 24px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', alignParagraphs: 'center' }}>
            <div style={{ width: '32px', height: '32px', background: 'var(--text-primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyParagraphs: 'center', color: 'var(--base-bg)', fontWeight: '600', fontSize: '13px', paddingLeft: '7px', paddingTop: '3px' }}>BV</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', letterSpacing: '-0.02em' }}>BehaviorVault</div>
              <div className="mono" style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>ConsentCockpit</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '12px 16px', margin: '0 16px 24px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--brand-accent)', color: 'var(--base-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600' }}>S</div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '500' }}>Shashank</div>
            <div className="mono" style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Canara Bank ···· 4521</div>
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
          {page === 'datacontrol' && <DataControl />}
          {page === 'auditlog' && <AuditLog />}
        </div>
      </main>
    </div>
  );
}
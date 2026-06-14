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
  { name: 'Vijay', id: 'vijay', bank: 'IDFC First ···· 120706' },
  { name: 'Pavan', id: 'pavan', bank: 'Kotak Bank ···· 1901' },
  { name: 'Shetty', id: 'shetty', bank: 'IndusInd Bank ···· 2010' },
  { name: 'Boss', id: 'boss', bank: 'Federal Bank ···· 2908' },
  { name: 'Priya', id: 'priya', bank: 'HDFC Bank ···· 71105' },
];

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(PROFILES[0]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('bv_admin_auth') === 'true';
  });
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const user = adminUsername.toLowerCase();
    if ((user === 'shashank' || user === 'shashwath') && adminPassword === 'E877F6CA') {
      sessionStorage.setItem('bv_admin_auth', 'true');
      setIsAdminLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Username or Password');
    }
  };

  const handleSignOut = () => {
    sessionStorage.removeItem('bv_admin_auth');
    setIsAdminLoggedIn(false);
    setAdminUsername('');
    setAdminPassword('');
    setShowPassword(false);
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="admin-login-container">
        <form className="admin-login-card" onSubmit={handleAdminLogin}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <div className="logo-box" style={{ width: '48px', height: '48px', fontSize: '18px', borderRadius: '12px' }}>BV</div>
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-primary)' }}>BehaviorVault</h1>
          <p className="mono" style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '28px', letterSpacing: '0.05em' }}>Compliance Cockpit Portal</p>
          
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
            <label style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '0.05em' }}>Admin Username</label>
            <input 
              type="text" 
              className="admin-input" 
              placeholder="shashank"
              value={adminUsername}
              onChange={(e) => setAdminUsername(e.target.value)}
              required
              autoCapitalize="none"
              style={{ margin: 0 }}
            />
          </div>

          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '20px' }}>
            <label style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '0.05em' }}>Admin Password</label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                className="admin-input" 
                placeholder="••••••••••••"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
                style={{ margin: 0, paddingRight: '44px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  transition: 'color 0.2s, transform 0.1s',
                }}
                className="password-toggle-btn"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {loginError ? <div className="admin-error">{loginError}</div> : null}
          </div>

          <button type="submit" className="btn-primary" style={{ height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Authenticate Console →
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="logo-box">BV</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', letterSpacing: '-0.02em' }}>BehaviorVault</div>
              <div className="mono" style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>ConsentCockpit</div>
            </div>
          </div>
        </div>

        <div className="profile-selector-box">
          <label style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: '600', letterSpacing: '0.05em' }}>Select Profile</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="profile-avatar">
              {currentUser.name[0]}
            </div>
            <div style={{ flex: 1 }}>
              <select 
                value={currentUser.id} 
                onChange={(e) => {
                  const selected = PROFILES.find(p => p.id === e.target.value);
                  setCurrentUser(selected);
                }}
                className="profile-select"
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

        <nav className="sidebar-nav">
          {NAV.map(n => (
            <button key={n.id} className={`nav-link ${page === n.id ? 'active' : ''}`} onClick={() => setPage(n.id)}>
              <span style={{ fontSize: '16px' }}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              className="status-badge badge-neutral" 
              style={{ cursor: 'pointer', borderColor: 'var(--alert-red)', color: 'var(--alert-red)', background: 'rgba(239, 68, 68, 0.05)' }}
              onClick={handleSignOut}
            >
              Sign Out
            </button>
            <div className="status-badge badge-green">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--secure-green)' }} /> Live Terminal
            </div>
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
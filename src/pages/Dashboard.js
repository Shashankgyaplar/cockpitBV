import { useState, useEffect } from 'react';
import axios from 'axios';

const SIGNALS = [
  { label: 'Keystroke Timing', desc: 'Inter-key delay patterns measure your unique typing rhythm', dpdp: 'Section 6 — Consent', icon: '⌘', color: 'var(--blue)' },
  { label: 'Swipe Velocity', desc: 'Scroll speed across the interface — only velocity, not path', dpdp: 'Section 8 — Minimization', icon: '↕', color: 'var(--secure-green)' },
  { label: 'Touch Duration', desc: 'Tap hold time — stress indicator under physical coercion', dpdp: 'Section 8 — Minimization', icon: '◎', color: 'var(--warn-amber)' },
  { label: 'Accelerometer', desc: 'Movement variance detects shaking hands during coercion', dpdp: 'Section 6 — Consent', icon: '⬡', color: 'var(--alert-red)' },
];

const NEVER = ['GPS Location', 'Camera', 'Microphone', 'Passwords', 'Contact List', 'Message Content'];

export default function Dashboard() {
 

  return (
    <>
      <div className="grid-4">
        {[
          { val: '4', label: 'Signals Monitored', color: 'var(--blue)' },
          { val: '0', label: 'Third-Party Shares', color: 'var(--secure-green)' },
          { val: '100%', label: 'On-Device Processing', color: 'var(--warn-amber)' },
          { val: 'DPDP', label: 'Act 2023 Compliant', color: 'var(--alert-red)' },
        ].map((stat, i) => (
          <div key={i} className="bento-card" style={{ padding: '24px' }}>
            <div className="metric-value" style={{ color: stat.color }}>{stat.val}</div>
            <div className="metric-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <section className="bento-card">
          <h2 className="section-label">Why BehaviorVault</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: '⬡', title: 'Behavioral fingerprint', body: 'Your typing rhythm, swipe speed and touch patterns form a unique digital signature. Passwords can be stolen — behavior cannot.', color: 'var(--blue)' },
              { icon: '◎', title: 'Always-on authentication', body: 'Unlike OTP which checks once at login, BehaviorVault monitors every second of your session — silently, invisibly, continuously.', color: 'var(--secure-green)' },
              { icon: '△', title: 'DuressSense protection', body: 'Physical coercion triggers a silent bank alert. The attacker sees "Transaction Successful". The money never moves.', color: 'var(--warn-amber)' },
              { icon: '◈', title: 'Zero raw data transmitted', body: 'Raw signals never leave your device. Only an anonymized anomaly score is sent to servers — DPDP Section 8 by design.', color: 'var(--alert-red)' },
            ].map((item, i) => (
              <div key={i} className="data-row" style={{ alignItems: 'flex-start' }}>
                <div style={{ color: item.color, fontSize: '18px', marginTop: '2px' }}>{item.icon}</div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>{item.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="bento-card" style={{ gap: '16px' }}>
            <h2 className="section-label" style={{ margin: 0 }}>Data Collected — Full Transparency</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {SIGNALS.map((sig, i) => (
                <div key={i} className="data-row">
                  <div className="icon-box" style={{ color: sig.color }}>{sig.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '500' }}>{sig.label}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{sig.desc}</div>
                  </div>
                  <div className="status-badge badge-neutral">{sig.dpdp.split(' ')[0]}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bento-card" style={{ gap: '16px' }}>
            <h2 className="section-label" style={{ margin: 0 }}>Never Collected</h2>
            <div className="grid-3">
              {NEVER.map((item, i) => (
                <div key={i} style={{ padding: '12px', background: 'var(--base-bg)', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ color: 'var(--alert-red)', fontSize: '12px' }}>✕</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
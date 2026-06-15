# 🖥️ ConsentCockpit — BehaviorVault Admin Dashboard
> **DPDP Act & RBI PMLA Compliance and Anomaly Detection Portal**

ConsentCockpit is the dedicated, compliance-focused web interface for the **BehaviorVault 2.0** security ecosystem. It provides bank compliance officers, security admins, and data governance managers with a real-time console to monitor session behavior scorecards, manage DPDP Act data rights, and view complete, unalterable system audit logs.

---

## 🖥️ Production Access
Live Deploy: **[https://cockpitbv.onrender.com](https://cockpitbv.onrender.com)**

---

## ⚙️ Key Functionalities

### 1. Real-time Anomaly Overview
* Displays the current number of **Signals Monitored**, **Third-Party Shares**, and **On-Device processing percentages**.
* Tracks full transparency lists showing exactly what metrics (Keystroke timing, Swipe speed, Touch duration, Accelerometer data) are collected and what are strictly **never collected** (GPS, Camera, Microphone, Passwords, Contacts).

### 2. DPDP Act §12 Data Rights Console
Allows compliance officers to action consumer requests instantly under the **Digital Personal Data Protection (DPDP) Act 2023**:
* **Right to Access:** View exactly what telemetry signals were recorded for any session.
* **Right to Erasure:** Trigger complete erasure of a user's behavioral telemetry dataset with a single click.
* **Right to Correct/Consent Withdrawal:** Update/withdraw sharing permissions seamlessly.

### 3. RBI PMLA Audit Log
* Houses the mandatory **7-year immutable ledger** for all transactional events, matching regulatory criteria under the Prevention of Money Laundering Act (PMLA).
* Shows session markers, timestamps, target anomaly scores, and security status classifications (e.g., normal, elevated risk, high threat).

---

## 🛠️ Architecture & Tech Stack
* **Framework:** React.js (Single Page Application)
* **Styling:** Custom glassmorphism-based dark theme, built with pure vanilla CSS for premium, responsive layouts.
* **Backend Integration:** Express API querying a MongoDB Atlas cluster.
* **Authentication:** Authenticates security officer console sessions with session storage caching.

---

## 📦 Setup & Local Installation

### Prerequisites
* Node.js v18+
* Active BehaviorVault Backend URL configured in your environment.

### Installation
1. Clone this repository and navigate to the folder:
   ```bash
   cd consent-cockpit
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server locally:
   ```bash
   npm start
   ```
4. Open your browser to: [http://localhost:3000](http://localhost:3000)

---

## 👥 Authors & Team
* **Shashank G Yaplar** ([@Shashankgyaplar](https://github.com/Shashankgyaplar))
* **Shashwath V** ([@shashwathv](https://github.com/shashwathv))
* **Shashank S** ([@shashanks](https://github.com/shashanks))

import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AiAssistant } from './components/AiAssistant';
import { Home } from './pages/Home';
import { Personal } from './pages/Personal';
import { Business } from './pages/Business';
import { CreditCards } from './pages/CreditCards';
import { Loans } from './pages/Loans';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { OpenAccount } from './pages/OpenAccount';
import { SBALoanEligibility } from './pages/SBALoanEligibility';
import { Careers } from './pages/Careers';
import { Locations } from './pages/Locations';
import { Help } from './pages/Help';
import { AdminPanel } from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/business" element={<Business />} />
          <Route path="/credit-cards" element={<CreditCards />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/open-account" element={<OpenAccount />} />
          <Route path="/sba-eligibility" element={<SBALoanEligibility />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/help" element={<Help />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Layout>
      <AiAssistant />
    </Router>
  );
}

export default App;
import React, { useState } from 'react';
import { SectionHeader, Button, Input, Select } from '../components/UI';
import { OtpInput } from '../components/OtpInput';

export const Transfer: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [type, setType] = useState('money');
  const [showOtp, setShowOtp] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [status, setStatus] = useState<'idle' | 'otp_required' | 'verifying' | 'success'>('idle');

  const handleTransferInit = async () => {
    // Mocking: In a real app, this would be validated by server logic.
    // For now, we simulate the 'request for OTP' if we decide to
    const simulatedTransactionId = `tx_${Date.now()}`;
    setTransactionId(simulatedTransactionId);
    
    // Simulate the admin hold or 3-transaction rule
    // Just force OTP for demonstration
    setShowOtp(true);
    setStatus('otp_required');
  };

  const handleOtpSubmit = async (otp: string) => {
    setStatus('verifying');
    try {
      const response = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, email: 'user@example.com' }), // Mock email
      });

      if (response.ok) {
        setStatus('success');
        setShowOtp(false);
      } else {
        alert('Invalid OTP');
        setStatus('otp_required');
      }
    } catch (e) {
      alert('Error verifying OTP');
      setStatus('otp_required');
    }
  };

  return (
    <div className="py-12 max-w-2xl mx-auto px-4">
      <SectionHeader title="Transfer Money & Crypto" subtitle="Secure transfers with multi-factor authentication." />
      
      {status === 'success' ? (
        <div className="text-center p-8 bg-emerald-50 rounded-lg">
          <h2 className="text-xl font-bold text-emerald-800">Transfer Successful!</h2>
        </div>
      ) : showOtp ? (
        <div className="p-8 border border-slate-200 rounded-xl bg-white shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">Verify Identity</h3>
          <p className="text-sm text-slate-600 mb-6 text-center">Please enter the 6-digit OTP code sent to your email.</p>
          <OtpInput onOtpSubmit={handleOtpSubmit} />
        </div>
      ) : (
        <div className="p-8 border border-slate-200 rounded-xl bg-white shadow-sm space-y-4">
            <Input label="Recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
            <Input label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <Select label="Type" options={[{value: 'money', label: 'Money'}, {value: 'crypto', label: 'Crypto'}]} value={type} onChange={(e) => setType(e.target.value as string)} />
            <Button onClick={handleTransferInit} className="w-full">Continue Transfer</Button>
        </div>
      )}
    </div>
  );
};

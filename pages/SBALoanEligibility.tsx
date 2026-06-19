import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input, Select, SectionHeader } from '../components/UI';
import { CheckCircle, XCircle, AlertCircle, ArrowLeft, Building2 } from 'lucide-react';

export const SBALoanEligibility: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [isChecking, setIsChecking] = useState(false);
  
  const [formData, setFormData] = useState({
    yearsInBusiness: '',
    creditScore: '',
    annualRevenue: '',
    loanAmount: '',
    bankruptcy: 'no',
    defaultHistory: 'no',
    useOfFunds: 'expansion'
  });

  const [result, setResult] = useState<{
    status: 'eligible' | 'ineligible' | 'review';
    message: string;
    factors: string[];
  }>({ status: 'review', message: '', factors: [] });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);

    // Simulate API/Logic processing
    setTimeout(() => {
      const years = parseInt(formData.yearsInBusiness) || 0;
      const score = parseInt(formData.creditScore) || 0;
      const revenue = parseInt(formData.annualRevenue) || 0;
      const amount = parseInt(formData.loanAmount) || 0;
      
      const factors = [];
      let status: 'eligible' | 'ineligible' | 'review' = 'eligible';

      // Basic SBA 7(a) simulation logic
      if (formData.defaultHistory === 'yes') {
        status = 'ineligible';
        factors.push('History of government loan default');
      }
      
      if (formData.bankruptcy === 'yes') {
        status = 'review';
        factors.push('Bankruptcy history requires manual review');
      }

      if (score < 640) {
        status = 'ineligible';
        factors.push('Credit score is below typical SBA threshold (640+)');
      } else if (score < 680) {
        if (status !== 'ineligible') status = 'review';
        factors.push('Credit score is in a conditional range');
      }

      if (years < 2) {
         if (status !== 'ineligible') status = 'review';
         factors.push('Business is less than 2 years old (Startup financing is limited)');
      }

      if (amount > revenue * 2) {
        if (status !== 'ineligible') status = 'review';
        factors.push('Requested loan amount is high relative to annual revenue');
      }

      let message = '';
      if (status === 'eligible') {
        message = "Great news! Your profile matches our standard criteria for SBA 7(a) financing.";
      } else if (status === 'review') {
        message = "You may still qualify, but your application will require a closer look by our specialists.";
      } else {
        message = "Based on the information provided, we may not be able to offer an SBA loan at this time.";
      }

      setResult({ status, message, factors });
      setStep('result');
      setIsChecking(false);
    }, 1500);
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Button variant="ghost" onClick={() => navigate('/loans')} className="mb-8 pl-0 hover:bg-transparent hover:text-emerald-600">
         <ArrowLeft className="w-4 h-4 mr-2" /> Back to Loans
      </Button>

      {step === 'form' ? (
        <div className="animate-fadeIn">
          <SectionHeader 
            title="SBA Loan Eligibility Check" 
            subtitle="Find out in minutes if you pre-qualify for government-backed financing. This does not affect your credit score." 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info Sidebar */}
            <div className="lg:col-span-1 space-y-6">
               <Card className="p-6 bg-slate-900 text-white border-none">
                  <Building2 className="w-10 h-10 text-emerald-400 mb-4" />
                  <h3 className="text-lg font-bold mb-2">Why choose an SBA Loan?</h3>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                       <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                       <span>Lower down payments than conventional loans</span>
                    </li>
                    <li className="flex items-start gap-2">
                       <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                       <span>Longer repayment terms (up to 25 years for real estate)</span>
                    </li>
                    <li className="flex items-start gap-2">
                       <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                       <span>Capped interest rates</span>
                    </li>
                  </ul>
               </Card>
               <div className="bg-blue-50 p-4 rounded-xl text-blue-800 text-sm">
                  <strong>Note:</strong> This tool provides a preliminary assessment only and does not constitute a loan offer or commitment.
               </div>
            </div>

            {/* Form */}
            <Card className="lg:col-span-2 p-8">
              <form onSubmit={checkEligibility} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select 
                        name="yearsInBusiness"
                        label="Time in Business"
                        value={formData.yearsInBusiness}
                        onChange={handleChange}
                        required
                        options={[
                            { value: '', label: 'Select...' },
                            { value: '0', label: 'Less than 1 year' },
                            { value: '1', label: '1 - 2 years' },
                            { value: '3', label: '2 - 5 years' },
                            { value: '6', label: '5+ years' }
                        ]}
                    />
                    <Select 
                        name="creditScore"
                        label="Owner's Estimated Credit Score"
                        value={formData.creditScore}
                        onChange={handleChange}
                        required
                        options={[
                            { value: '', label: 'Select...' },
                            { value: '720', label: 'Excellent (720+)' },
                            { value: '680', label: 'Good (680 - 719)' },
                            { value: '640', label: 'Fair (640 - 679)' },
                            { value: '600', label: 'Below 640' }
                        ]}
                    />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                        name="annualRevenue" 
                        label="Annual Revenue" 
                        type="number" 
                        placeholder="e.g. 500000" 
                        value={formData.annualRevenue} 
                        onChange={handleChange} 
                        required
                    />
                    <Input 
                        name="loanAmount" 
                        label="Requested Loan Amount" 
                        type="number" 
                        placeholder="e.g. 150000" 
                        value={formData.loanAmount} 
                        onChange={handleChange} 
                        required
                    />
                 </div>

                 <div className="space-y-4 pt-4 border-t border-gray-100">
                    <h4 className="font-medium text-slate-900">Legal & Financial History</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Select 
                            name="defaultHistory"
                            label="Prior Government Loan Default?"
                            value={formData.defaultHistory}
                            onChange={handleChange}
                            options={[
                                { value: 'no', label: 'No' },
                                { value: 'yes', label: 'Yes' }
                            ]}
                        />
                        <Select 
                            name="bankruptcy"
                            label="Past Bankruptcy?"
                            value={formData.bankruptcy}
                            onChange={handleChange}
                            options={[
                                { value: 'no', label: 'No' },
                                { value: 'yes', label: 'Yes' }
                            ]}
                        />
                    </div>
                 </div>

                 <Select 
                    name="useOfFunds"
                    label="Primary Use of Funds"
                    value={formData.useOfFunds}
                    onChange={handleChange}
                    options={[
                        { value: 'expansion', label: 'Business Expansion' },
                        { value: 'working_capital', label: 'Working Capital' },
                        { value: 'equipment', label: 'Equipment Purchase' },
                        { value: 'real_estate', label: 'Commercial Real Estate' },
                        { value: 'refinance', label: 'Refinance Debt' }
                    ]}
                 />

                 <Button type="submit" className="w-full mt-4" isLoading={isChecking}>
                    Check Eligibility
                 </Button>
              </form>
            </Card>
          </div>
        </div>
      ) : (
        <div className="animate-fadeIn max-w-2xl mx-auto">
          <Card className={`p-8 border-t-8 ${
             result.status === 'eligible' ? 'border-t-emerald-500' : 
             result.status === 'ineligible' ? 'border-t-red-500' : 
             'border-t-yellow-500'
          }`}>
             <div className="text-center mb-8">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                    result.status === 'eligible' ? 'bg-emerald-100' : 
                    result.status === 'ineligible' ? 'bg-red-100' : 
                    'bg-yellow-100'
                }`}>
                    {result.status === 'eligible' && <CheckCircle className="w-10 h-10 text-emerald-600" />}
                    {result.status === 'ineligible' && <XCircle className="w-10 h-10 text-red-600" />}
                    {result.status === 'review' && <AlertCircle className="w-10 h-10 text-yellow-600" />}
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    {result.status === 'eligible' ? 'Pre-Qualified' : 
                     result.status === 'ineligible' ? 'Not Eligible' : 
                     'Manual Review Needed'}
                </h2>
                <p className="text-slate-600 text-lg">{result.message}</p>
             </div>

             {result.factors.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                   <h4 className="font-bold text-slate-900 mb-3">Key Factors:</h4>
                   <ul className="space-y-2">
                      {result.factors.map((factor, idx) => (
                         <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 shrink-0"></div>
                            {factor}
                         </li>
                      ))}
                   </ul>
                </div>
             )}

             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={() => { setStep('form'); setIsChecking(false); }}>Check Again</Button>
                {result.status !== 'ineligible' && (
                   <Button onClick={() => navigate('/open-account')}>Start Full Application</Button>
                )}
                {result.status === 'ineligible' && (
                   <Button onClick={() => navigate('/contact')}>Contact a Loan Officer</Button>
                )}
             </div>
          </Card>
        </div>
      )}
    </div>
  );
};
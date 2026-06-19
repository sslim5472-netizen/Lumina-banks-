import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input, SectionHeader } from '../components/UI';
import { Home, Car, GraduationCap, Building2, TrendingUp, Briefcase } from 'lucide-react';

export const Loans: React.FC = () => {
  const navigate = useNavigate();
  const [principal, setPrincipal] = useState(300000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);

  const calculatePayment = () => {
    const r = rate / 100 / 12;
    const n = years * 12;
    if (r === 0) return principal / n;
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const monthlyPayment = calculatePayment();

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader title="Personal Lending" subtitle="Competitive rates for your biggest life investments." />

      {/* Personal Loan Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <Card className="p-6 flex flex-col items-center text-center hover:border-emerald-500 transition-colors cursor-pointer">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Home className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Mortgages</h3>
            <p className="text-slate-600 mb-4 text-sm">Fixed and adjustable rates to help you buy your dream home.</p>
            <div className="text-emerald-600 font-bold text-sm">Rates as low as 6.125% APR</div>
        </Card>
         <Card className="p-6 flex flex-col items-center text-center hover:border-emerald-500 transition-colors cursor-pointer">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Car className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Auto Loans</h3>
            <p className="text-slate-600 mb-4 text-sm">Get on the road faster with quick approvals and flexible terms.</p>
            <div className="text-blue-600 font-bold text-sm">Rates as low as 5.49% APR</div>
        </Card>
         <Card className="p-6 flex flex-col items-center text-center hover:border-emerald-500 transition-colors cursor-pointer">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Personal Loans</h3>
            <p className="text-slate-600 mb-4 text-sm">Consolidate debt or fund major purchases with a simple fixed rate.</p>
            <div className="text-purple-600 font-bold text-sm">Borrow up to $50,000</div>
        </Card>
      </div>

      {/* Business Section */}
      <SectionHeader title="Business Financing" subtitle="Fuel your company's growth with flexible capital solutions." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
         {/* SBA Loans */}
         <Card className="p-8 flex flex-col sm:flex-row gap-6 items-start hover:shadow-md transition-shadow">
             <div className="bg-slate-900 p-4 rounded-xl text-white shrink-0">
                 <Building2 className="w-8 h-8" />
             </div>
             <div>
                 <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">SBA Loans</h3>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded uppercase">Preferred Lender</span>
                 </div>
                 <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                     Government-backed financing with lower down payments and longer repayment terms. Ideal for real estate acquisition, equipment, or working capital.
                 </p>
                 <ul className="text-sm text-slate-500 space-y-2 mb-6">
                     <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Loans up to $5 Million</li>
                     <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Terms up to 25 years for Real Estate</li>
                     <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> 7(a) and 504 Loan Programs available</li>
                 </ul>
                 <Button variant="outline" className="w-full sm:w-auto" onClick={() => navigate('/sba-eligibility')}>Check Eligibility</Button>
             </div>
         </Card>

         {/* Line of Credit */}
         <Card className="p-8 flex flex-col sm:flex-row gap-6 items-start hover:shadow-md transition-shadow">
             <div className="bg-emerald-600 p-4 rounded-xl text-white shrink-0">
                 <TrendingUp className="w-8 h-8" />
             </div>
             <div>
                 <h3 className="text-xl font-bold text-slate-900 mb-2">Business Line of Credit</h3>
                 <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                     Flexible access to capital when you need it. Only pay interest on what you use. Perfect for managing cash flow gaps, inventory, or payroll.
                 </p>
                 <ul className="text-sm text-slate-500 space-y-2 mb-6">
                     <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Revolving credit from $10k to $500k</li>
                     <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Interest-only payments on draws</li>
                     <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> No draw fees for Platinum Business members</li>
                 </ul>
                 <Button variant="outline" className="w-full sm:w-auto" onClick={() => navigate('/open-account')}>Apply Now</Button>
             </div>
         </Card>
      </div>

      {/* Calculator */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-slate-900 text-white p-6">
            <h3 className="text-xl font-bold">Mortgage Estimator</h3>
            <p className="text-slate-400 text-sm">Estimate your monthly payments quickly.</p>
        </div>
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Loan Amount: ${principal.toLocaleString()}</label>
                    <input 
                        type="range" min="50000" max="1000000" step="5000" 
                        value={principal} onChange={(e) => setPrincipal(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                     <Input 
                        label="Interest Rate (%)" 
                        type="number" 
                        value={rate} 
                        onChange={(e) => setRate(Number(e.target.value))} 
                        step="0.1"
                    />
                     <Input 
                        label="Loan Term (Years)" 
                        type="number" 
                        value={years} 
                        onChange={(e) => setYears(Number(e.target.value))} 
                    />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-8 border border-gray-100">
                <div className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-2">Estimated Monthly Payment</div>
                <div className="text-5xl font-bold text-slate-900 mb-4">
                    ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <p className="text-xs text-center text-slate-400 max-w-xs">
                    *Estimate only. Does not include taxes and insurance. Subject to credit approval.
                </p>
                <Button className="mt-6 w-full max-w-xs" onClick={() => navigate('/contact')}>Get Pre-Approved</Button>
            </div>
        </div>
      </div>
    </div>
  );
};
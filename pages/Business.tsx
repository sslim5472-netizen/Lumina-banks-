import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, SectionHeader } from '../components/UI';
import { BarChart3, Briefcase, Globe2, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Q1', growth: 4000 },
  { name: 'Q2', growth: 3000 },
  { name: 'Q3', growth: 2000 },
  { name: 'Q4', growth: 2780 },
  { name: 'Q5', growth: 1890 },
  { name: 'Q6', growth: 2390 },
];

export const Business: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader 
        title="Business Banking" 
        subtitle="Scalable financial solutions designed to help your business grow, efficiently and securely." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Business Growth Tracker</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="growth" fill="#059669" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-slate-500 mt-4 text-center">
              Visualize your cash flow with our integrated dashboard.
            </p>
         </div>
         
         <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Checking built for scale</h3>
            <p className="text-lg text-slate-600 mb-8">
              From startups to enterprises, our business checking accounts offer unlimited transactions, 
              integrated payroll services, and high-yield options for excess cash.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                    <Briefcase className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                        <h4 className="font-semibold">Merchant Services</h4>
                        <p className="text-sm text-slate-500">Accept payments anywhere.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Globe2 className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                        <h4 className="font-semibold">International Wires</h4>
                        <p className="text-sm text-slate-500">Low fees on global transfers.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Users className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                        <h4 className="font-semibold">Employee Cards</h4>
                        <p className="text-sm text-slate-500">Manage spending limits easily.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-3">
                    <BarChart3 className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                        <h4 className="font-semibold">Treasury Mgmt</h4>
                        <p className="text-sm text-slate-500">Optimize your liquidity.</p>
                    </div>
                </div>
            </div>
            <Button onClick={() => navigate('/open-account')}>Open Business Account</Button>
         </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to take your business to the next level?</h2>
        <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Speak with a dedicated business relationship manager today to build a custom plan for your company.
        </p>
        <div className="flex justify-center gap-4">
            <Button variant="secondary">Contact Sales</Button>
            <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-slate-900">Find a Branch</Button>
        </div>
      </div>
    </div>
  );
};

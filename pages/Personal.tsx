import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, SectionHeader } from '../components/UI';
import { CheckCircle } from 'lucide-react';

export const Personal: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    "No monthly maintenance fees",
    "Over 60,000 fee-free ATMs",
    "Get paid up to 2 days early",
    "Overdraft protection up to $200",
    "Automated savings tools"
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader 
        title="Personal Banking Solutions" 
        subtitle="Everything you need to manage your daily spending and long-term savings goals." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Lumina Total Checking</h3>
          <p className="text-slate-600 mb-6 text-lg">
            The checking account that rewards you for your everyday spending. 
            Open an account in under 5 minutes and start banking smarter.
          </p>
          <ul className="space-y-3 mb-8">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                {feature}
              </li>
            ))}
          </ul>
          <Button onClick={() => navigate('/open-account')}>Open Account Now</Button>
        </div>
        <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
          <img 
            src="https://picsum.photos/800/600?grayscale" 
            alt="Happy banking customer" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-6 bg-slate-900 text-white">
            <div className="text-sm text-emerald-400 font-bold uppercase mb-2">Savings</div>
            <h4 className="text-2xl font-bold mb-2">High Yield Savings</h4>
            <div className="text-4xl font-bold mb-4">4.50% <span className="text-lg font-normal text-slate-400">APY</span></div>
            <p className="text-slate-400 mb-6">Grow your money faster with one of the industry's leading rates.</p>
            <Button variant="secondary" className="w-full" onClick={() => navigate('/open-account')}>Start Saving</Button>
        </Card>
        
        <Card className="p-6">
            <div className="text-sm text-blue-600 font-bold uppercase mb-2">CDs</div>
            <h4 className="text-2xl font-bold mb-2 text-slate-900">Certificates of Deposit</h4>
            <div className="text-4xl font-bold mb-4 text-slate-900">5.10% <span className="text-lg font-normal text-slate-500">APY</span></div>
            <p className="text-slate-600 mb-6">Lock in a guaranteed rate for terms ranging from 6 months to 5 years.</p>
            <Button variant="outline" className="w-full" onClick={() => navigate('/open-account')}>View Rates</Button>
        </Card>

        <Card className="p-6">
            <div className="text-sm text-purple-600 font-bold uppercase mb-2">Digital</div>
            <h4 className="text-2xl font-bold mb-2 text-slate-900">Mobile Banking</h4>
            <div className="text-4xl font-bold mb-4 text-slate-900">4.9 <span className="text-lg font-normal text-slate-500">Stars</span></div>
            <p className="text-slate-600 mb-6">Rated #1 banking app for ease of use and security features.</p>
            <Button variant="outline" className="w-full">Download App</Button>
        </Card>
      </div>
    </div>
  );
};

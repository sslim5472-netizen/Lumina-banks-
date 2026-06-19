import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, SectionHeader } from '../components/UI';
import { ArrowRight, Shield, TrendingUp, CreditCard, Globe } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [savingsYield, setSavingsYield] = useState(4.50);

  useEffect(() => {
    try {
      const rawSystem = localStorage.getItem('lumina_admin_system');
      if (rawSystem) {
        const parsed = JSON.parse(rawSystem);
        if (parsed.baseSavingsYield) {
          setSavingsYield(parsed.baseSavingsYield);
        }
      }
    } catch (e) {
      console.warn("Home component load error:", e);
    }
  }, []);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://picsum.photos/1920/1080?grayscale')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Banking built for <span className="text-emerald-400">tomorrow</span>.
            </h1>
            <p className="text-lg lg:text-xl text-slate-300 mb-8">
              Experience seamless digital banking with world-class security. 
              Manage your personal and business finances all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" className="text-lg px-8 py-4" onClick={() => navigate('/open-account')}>
                Open an Account
              </Button>
              <Button variant="outline" className="text-lg px-8 py-4 bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white" onClick={() => navigate('/login')}>
                Online Login
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-8 border-t-4 border-t-emerald-500 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">High Yield Savings</h3>
            <p className="text-slate-600 mb-4">Earn up to {savingsYield.toFixed(2)}% APY with our premium savings accounts. No hidden fees.</p>
            <button onClick={() => navigate('/personal')} className="text-emerald-600 font-medium flex items-center hover:underline">
              Learn more <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </Card>

          <Card className="p-8 border-t-4 border-t-blue-500 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Secure Business Banking</h3>
            <p className="text-slate-600 mb-4">Scalable solutions for businesses of all sizes. Treasury management included.</p>
            <button onClick={() => navigate('/business')} className="text-blue-600 font-medium flex items-center hover:underline">
              See solutions <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </Card>

          <Card className="p-8 border-t-4 border-t-purple-500 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Rewards Credit Cards</h3>
            <p className="text-slate-600 mb-4">Earn 3x points on travel and dining. 0% Intro APR for 15 months.</p>
            <button onClick={() => navigate('/credit-cards')} className="text-purple-600 font-medium flex items-center hover:underline">
              Compare cards <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </Card>
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeader 
          title="Trusted by millions worldwide" 
          subtitle="We utilize state-of-the-art encryption and biometric security to ensure your assets are always protected."
          centered 
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Active Users', val: '2M+' },
            { label: 'Assets Managed', val: '$50B+' },
            { label: 'Countries', val: '14' },
            { label: 'Support', val: '24/7' },
          ].map((stat, i) => (
            <div key={i} className="p-6 bg-white rounded-lg border border-gray-100">
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">{stat.val}</div>
              <div className="text-slate-500 font-medium uppercase tracking-wide text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile App Promo */}
      <section className="bg-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Bank from anywhere with the Lumina App</h2>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-700">
                  <Globe className="w-5 h-5 text-emerald-600" />
                  Real-time transaction alerts
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  Instantly lock/unlock cards
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  Mobile check deposit
                </li>
              </ul>
              <Button>Download for iOS & Android</Button>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-64 h-[500px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl"></div>
                 <div className="w-full h-full bg-white flex flex-col items-center pt-12 px-4">
                    <div className="w-full h-32 bg-emerald-600 rounded-xl mb-4 p-4 text-white">
                        <div className="text-xs opacity-75">Total Balance</div>
                        <div className="text-2xl font-bold">$12,450.00</div>
                    </div>
                    <div className="w-full space-y-2">
                        <div className="h-12 bg-gray-100 rounded-lg"></div>
                        <div className="h-12 bg-gray-100 rounded-lg"></div>
                        <div className="h-12 bg-gray-100 rounded-lg"></div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

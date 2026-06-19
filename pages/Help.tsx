import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input } from '../components/UI';
import { Search, Lock, CreditCard, Smartphone, User, FileText, AlertTriangle, ArrowRight } from 'lucide-react';

export const Help: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    { icon: <User />, title: "Account Management", desc: "Update profile, statements" },
    { icon: <Lock />, title: "Security & Fraud", desc: "Passwords, alerts, disputes" },
    { icon: <CreditCard />, title: "Cards & Payments", desc: "Activate card, limits" },
    { icon: <Smartphone />, title: "Mobile Banking", desc: "App setup, mobile deposit" },
    { icon: <FileText />, title: "Loans & Mortgages", desc: "Payments, applications" },
    { icon: <AlertTriangle />, title: "Troubleshooting", desc: "Login issues, errors" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Header */}
      <div className="bg-emerald-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <h1 className="text-3xl md:text-4xl font-bold mb-6">How can we help you today?</h1>
           <div className="relative max-w-xl mx-auto">
             <input 
                type="text" 
                placeholder="Search for answers (e.g., 'reset password', 'routing number')"
                className="w-full px-6 py-4 rounded-full text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 shadow-lg"
             />
             <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-emerald-600 p-2 rounded-full text-white hover:bg-emerald-500">
                <Search className="w-5 h-5" />
             </button>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {categories.map((cat, i) => (
                <Card key={i} className="p-6 hover:shadow-lg transition-shadow cursor-pointer text-center sm:text-left flex flex-col items-center sm:items-start">
                    <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
                        {React.cloneElement(cat.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6" })}
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">{cat.title}</h3>
                    <p className="text-sm text-slate-500">{cat.desc}</p>
                </Card>
            ))}
        </div>

        {/* Top FAQs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Top Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {[
                    "What is my routing number?",
                    "How do I dispute a transaction?",
                    "Where can I find my account statements?",
                    "How do I set up travel notifications?",
                    "Can I deposit a check from my phone?",
                    "What are the current mortgage rates?"
                ].map((q, i) => (
                    <a key={i} href="#" className="flex items-center justify-between py-3 border-b border-gray-100 hover:text-emerald-600 group">
                        <span className="text-slate-700 group-hover:text-emerald-600">{q}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                ))}
            </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Can't find what you're looking for?</h3>
            <div className="flex justify-center gap-4">
                <Button onClick={() => navigate('/contact')}>Contact Support</Button>
                <Button variant="outline" onClick={() => navigate('/login')}>Log In to Message Us</Button>
            </div>
        </div>
      </div>
    </div>
  );
};
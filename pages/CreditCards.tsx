import React, { useState, useMemo } from 'react';
import { Button, Card, SectionHeader, Select } from '../components/UI';
import { Check, CreditCard as CardIcon, Filter, ArrowUpDown } from 'lucide-react';
import { CreditCardProduct } from '../types';

const cards: CreditCardProduct[] = [
  {
    name: "Lumina Cash Preferred",
    apr: "0% intro APR for 15 months",
    annualFee: "$0",
    rewards: ["3% Cash back on dining", "2% Cash back on grocery", "1% on everything else"],
    imageColor: "bg-gradient-to-r from-emerald-500 to-emerald-700",
    category: 'cash'
  },
  {
    name: "Lumina Travel Elite",
    apr: "16.24% - 24.99% Variable",
    annualFee: "$95",
    rewards: ["5x Points on flights", "3x Points on hotels", "Global Entry Credit"],
    imageColor: "bg-gradient-to-r from-slate-700 to-black",
    category: 'travel'
  },
  {
    name: "Lumina Business Pro",
    apr: "14.24% - 22.99% Variable",
    annualFee: "$0",
    rewards: ["2x Points on shipping", "2x Points on ads", "Free employee cards"],
    imageColor: "bg-gradient-to-r from-blue-600 to-blue-800",
    category: 'business'
  },
  {
    name: "Lumina Student Cash",
    apr: "0% intro APR for 6 months",
    annualFee: "$0",
    rewards: ["1.5% Cash back on all purchases", "Good Grades Bonus"],
    imageColor: "bg-gradient-to-r from-orange-400 to-orange-600",
    category: 'cash'
  },
  {
    name: "Lumina World Trekker",
    apr: "18.24% - 26.99% Variable",
    annualFee: "$250",
    rewards: ["Unlimited Lounge Access", "No Foreign Transaction Fees"],
    imageColor: "bg-gradient-to-r from-indigo-600 to-purple-700",
    category: 'travel'
  }
];

export const CreditCards: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'cash' | 'travel' | 'business'>('all');
  const [sortBy, setSortBy] = useState<string>('recommended');

  const processedCards = useMemo(() => {
    let result = cards.filter(card => filter === 'all' || card.category === filter);

    if (sortBy === 'apr') {
      result = [...result].sort((a, b) => {
        const getApr = (s: string) => {
          if (s.includes('0% intro')) return 0;
          const match = s.match(/(\d+(\.\d+)?)%/);
          return match ? parseFloat(match[1]) : 100;
        };
        return getApr(a.apr) - getApr(b.apr);
      });
    } else if (sortBy === 'fee') {
      result = [...result].sort((a, b) => {
        const getFee = (s: string) => parseInt(s.replace(/[^0-9]/g, '')) || 0;
        return getFee(a.annualFee) - getFee(b.annualFee);
      });
    }
    
    return result;
  }, [filter, sortBy]);

  const FilterButton = ({ label, value }: { label: string, value: typeof filter }) => (
    <button 
      onClick={() => setFilter(value)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          filter === value 
          ? 'bg-slate-900 text-white shadow-md' 
          : 'bg-white text-slate-600 hover:bg-gray-100 border border-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader title="Find the right card for you" subtitle="Whether you want cash back, travel rewards, or business perks, we have you covered." />
      
      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-gray-50 p-4 rounded-2xl border border-gray-200">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center text-slate-500 text-sm font-medium">
              <Filter className="w-4 h-4 mr-2" /> Filter:
          </div>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <FilterButton label="View All" value="all" />
              <FilterButton label="Cash Back" value="cash" />
              <FilterButton label="Travel Rewards" value="travel" />
              <FilterButton label="Business" value="business" />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center text-slate-500 text-sm font-medium whitespace-nowrap">
              <ArrowUpDown className="w-4 h-4 mr-2" /> Sort by:
            </div>
            <div className="w-full md:w-48">
              <Select 
                options={[
                  { label: 'Recommended', value: 'recommended' },
                  { label: 'Lowest APR', value: 'apr' },
                  { label: 'Lowest Annual Fee', value: 'fee' }
                ]}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white"
              />
            </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn">
        {processedCards.map((card, index) => (
          <Card key={index} className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
            <div className={`h-48 ${card.imageColor} p-6 flex flex-col justify-between text-white relative overflow-hidden`}>
               <div className="absolute top-0 right-0 p-4 opacity-20">
                 <CardIcon className="w-32 h-32" />
               </div>
               <div className="flex justify-between items-start z-10">
                 <span className="font-mono text-lg">Lumina</span>
                 <CardIcon className="w-8 h-8" />
               </div>
               <div className="z-10">
                 <div className="font-bold text-xl tracking-wide">{card.name}</div>
                 <div className="font-mono text-sm mt-2 opacity-80">**** **** **** 1234</div>
               </div>
            </div>
            
            <div className="p-6 flex-grow flex flex-col">
              <div className="mb-6">
                 <div className="flex justify-between items-baseline border-b border-gray-100 pb-4 mb-4">
                    <span className="text-slate-500 text-sm">Annual Fee</span>
                    <span className="text-slate-900 font-bold">{card.annualFee}</span>
                 </div>
                 <div className="flex justify-between items-baseline border-b border-gray-100 pb-4 mb-4">
                    <span className="text-slate-500 text-sm">APR</span>
                    <span className="text-slate-900 font-bold text-right text-sm max-w-[150px]">{card.apr}</span>
                 </div>
              </div>
              
              <div className="flex-grow">
                <h5 className="font-semibold mb-3 text-slate-900">Key Benefits</h5>
                <ul className="space-y-2 mb-6">
                  {card.rewards.map((reward, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{reward}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button className="w-full mt-auto">Apply Now</Button>
            </div>
          </Card>
        ))}
      </div>

      {processedCards.length === 0 && (
          <div className="text-center text-slate-500 py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300 mt-8">
              <p>No cards found matching this filter.</p>
              <button onClick={() => setFilter('all')} className="text-emerald-600 font-medium mt-2 hover:underline">View all cards</button>
          </div>
      )}
    </div>
  );
};
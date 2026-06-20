import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, SectionHeader } from '../components/UI';
import { 
  CheckCircle, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  PieChart as PieIcon,
  PiggyBank, 
  DollarSign, 
  Plus, 
  RotateCcw,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar
} from 'recharts';

interface SpendingItem {
  name: string;
  value: number;
  color: string;
}

interface TrendItem {
  month: string;
  Income: number;
  Expenses: number;
}

export const Personal: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    "No monthly maintenance fees",
    "Over 60,005 fee-free ATMs",
    "Get paid up to 2 days early with Direct Deposit",
    "Overdraft protection up to $200",
    "Automated saving rules & micro-investing"
  ];

  // Spending categories initial state
  const [spending, setSpending] = useState<SpendingItem[]>([
    { name: 'Housing & Rent', value: 1350, color: '#6366f1' }, // Indigo
    { name: 'Groceries & Foods', value: 480, color: '#10b981' }, // Emerald
    { name: 'Utilities & Subscriptions', value: 260, color: '#06b6d4' }, // Cyan
    { name: 'Dining & Cafes', value: 340, color: '#f59e0b' }, // Amber
    { name: 'Autos & Commuting', value: 190, color: '#ec4899' }, // Pink
    { name: 'Sports & Entertainment', value: 280, color: '#8b5cf6' }, // Purple
  ]);

  // Income vs Expenses Six-Month trend data
  const [trendData, setTrendData] = useState<TrendItem[]>([
    { month: 'Jan', Income: 4500, Expenses: 3100 },
    { month: 'Feb', Income: 4500, Expenses: 2950 },
    { month: 'Mar', Income: 4800, Expenses: 3400 },
    { month: 'Apr', Income: 4500, Expenses: 3100 },
    { month: 'May', Income: 5200, Expenses: 2800 },
    { month: 'Jun', Income: 4900, Expenses: 2900 },
  ]);

  // Interactive budget and simulation states
  const [newExpenseCategory, setNewExpenseCategory] = useState<string>('Groceries & Foods');
  const [newExpenseAmount, setNewExpenseAmount] = useState<string>('');
  const [newIncomeAmount, setNewIncomeAmount] = useState<string>('');
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number>(-1);

  // Computed Values
  const totalExpensesCurrentMonth = spending.reduce((acc, cat) => acc + cat.value, 0);
  const totalIncomeCurrentMonth = trendData[trendData.length - 1].Income;
  const netSavingsCurrentMonth = totalIncomeCurrentMonth - totalExpensesCurrentMonth;
  const savingsRate = ((netSavingsCurrentMonth / totalIncomeCurrentMonth) * 100).toFixed(1);

  // Simulate adding an expense
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(newExpenseAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid expense amount.");
      return;
    }

    // 1. Update Pie Chart
    const updatedSpending = spending.map(cat => {
      if (cat.name === newExpenseCategory) {
        return { ...cat, value: cat.value + amount };
      }
      return cat;
    });
    setSpending(updatedSpending);

    // 2. Run over June (Latest Month) Expenses
    const updatedTrend = trendData.map((item, idx) => {
      if (idx === trendData.length - 1) {
        return { ...item, Expenses: item.Expenses + amount };
      }
      return item;
    });
    setTrendData(updatedTrend);
    setNewExpenseAmount('');
  };

  // Simulate adding income boost
  const handleAddIncomeBoost = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(newIncomeAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid income amount.");
      return;
    }

    // Update Latest Month Income in Recharts line
    const updatedTrend = trendData.map((item, idx) => {
      if (idx === trendData.length - 1) {
        return { ...item, Income: item.Income + amount };
      }
      return item;
    });
    setTrendData(updatedTrend);
    setNewIncomeAmount('');
  };

  // Reset simulation back to defaults
  const handleResetSim = () => {
    setSpending([
      { name: 'Housing & Rent', value: 1350, color: '#6366f1' },
      { name: 'Groceries & Foods', value: 480, color: '#10b981' },
      { name: 'Utilities & Subscriptions', value: 260, color: '#06b6d4' },
      { name: 'Dining & Cafes', value: 340, color: '#f59e0b' },
      { name: 'Autos & Commuting', value: 190, color: '#ec4899' },
      { name: 'Sports & Entertainment', value: 280, color: '#8b5cf6' },
    ]);
    setTrendData([
      { month: 'Jan', Income: 4500, Expenses: 3100 },
      { month: 'Feb', Income: 4500, Expenses: 2950 },
      { month: 'Mar', Income: 4800, Expenses: 3400 },
      { month: 'Apr', Income: 4500, Expenses: 3100 },
      { month: 'May', Income: 5200, Expenses: 2800 },
      { month: 'Jun', Income: 4900, Expenses: 2900 },
    ]);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50/50 min-h-screen">
      <SectionHeader 
        title="Personal Banking & Live Insights" 
        subtitle="Manage your everyday financial statements, track savings growth rules, and inspect automated analytics." 
      />

      {/* DYNAMIC FINANCIAL INSIGHTS DASHBOARD */}
      <div className="mb-16">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6 sm:p-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                Lumina Pulse Analytics
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">Personal Financial Dashboard</h2>
              <p className="text-slate-500 text-xs">Perform transactions to see real-time chart projections.</p>
            </div>
            
            <button 
              onClick={handleResetSim}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 text-xs font-semibold transition-all shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset State
            </button>
          </div>

          {/* TOP ANALYTICS HIGHLIGHT OVERVIEWS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Net Savings</div>
                <div className="p-1 rounded-md bg-emerald-550/10 text-emerald-600">
                  <Wallet className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-slate-900">
                  ${netSavingsCurrentMonth.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${netSavingsCurrentMonth >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                  {netSavingsCurrentMonth >= 0 ? 'Surplus' : 'Deficit'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5">June current statement margin</p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl">
              <div className="flex justify-between items-start">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Monthly Income</div>
                <div className="p-1 rounded-md bg-indigo-50 text-indigo-600">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-extrabold text-slate-900">
                  ${totalIncomeCurrentMonth.toLocaleString('en-US')}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5">Expected recurring Direct Deposits</p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl">
              <div className="flex justify-between items-start">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Monthly Expenses</div>
                <div className="p-1 rounded-md bg-amber-50 text-amber-600">
                  <ArrowDownRight className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-extrabold text-slate-900">
                  ${totalExpensesCurrentMonth.toLocaleString('en-US')}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5">Combined active card drafts</p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl">
              <div className="flex justify-between items-start">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Savings Rate</div>
                <div className="p-1 rounded-md bg-teal-50 text-teal-600">
                  <PiggyBank className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-extrabold text-slate-900">
                  {savingsRate}%
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5">Lumina automated advisor goal: 20%</p>
            </div>
          </div>

          {/* DYNAMIC RECHARTS VISUALIZATION CONTAINER */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* 1. SPENDING CATEGORIES - PIE CHART */}
            <div className="border border-slate-100 rounded-xl p-5 hover:shadow-xs transition-shadow bg-slate-50/20">
              <div className="flex items-center gap-2 mb-4">
                <PieIcon className="w-4.5 h-4.5 text-indigo-500" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Spending Categories</h3>
                  <p className="text-[11px] text-slate-500">Live proportional index of monthly expenditures</p>
                </div>
              </div>

              <div className="h-64 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={spending}
                      cx="50%"
                      cy="48%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                      onMouseEnter={(_, idx) => setActiveSegmentIndex(idx)}
                      onMouseLeave={() => setActiveSegmentIndex(-1)}
                    >
                      {spending.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color} 
                          stroke={activeSegmentIndex === index ? '#1e293b' : 'transparent'}
                          strokeWidth={2}
                          className="transition-all cursor-pointer outline-none"
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => [`$${value}`, 'Amount Spent']}
                      contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a', fontSize: '11px', fontWeight: 'bold' }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>

                {/* Pie Chart Centered Total Label info */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-5px]">
                  <span className="text-2xl font-black text-slate-950">${totalExpensesCurrentMonth}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Output</span>
                </div>
              </div>

              {/* Pie legend colors wrap */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {spending.map((entry, idx) => (
                  <div 
                    key={entry.name} 
                    className={`flex items-center gap-2 p-1.5 rounded transition-all ${
                      activeSegmentIndex === idx ? 'bg-slate-100' : ''
                    }`}
                    onMouseEnter={() => setActiveSegmentIndex(idx)}
                    onMouseLeave={() => setActiveSegmentIndex(-1)}
                  >
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                    <span className="text-[10px] font-bold text-slate-700 truncate max-w-[130px]">{entry.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono ml-auto">${entry.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. INCOME VS EXPENSES TRENDS - COMPARATIVE AREA CHART */}
            <div className="border border-slate-100 rounded-xl p-5 hover:shadow-xs transition-shadow bg-slate-50/20">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4.5 h-4.5 text-teal-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Monthly Balance Ledger</h3>
                  <p className="text-[11px] text-slate-500">6-Month historical cashflow comparative margin</p>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#94a3b8" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(v) => `$${v}`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a', fontSize: '11px' }}
                    />
                    <Legend 
                      verticalAlign="top" 
                      height={36} 
                      iconSize={10} 
                      iconType="circle"
                      wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="Income" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorIncome)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="Expenses" 
                      stroke="#6366f1" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorExpenses)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-2 text-center">
                <span className="text-[10px] text-slate-400 font-semibold italic">
                  *Projections update dynamically as transactions are added to June.
                </span>
              </div>
            </div>

          </div>

          {/* BUDGET SIMULATION FORMS AREA */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/50">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Dynamic Cashflow Sandbox
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Add simulated card expense */}
              <form onSubmit={handleAddExpense} className="space-y-3">
                <div className="text-[11px] font-bold text-indigo-700 uppercase">Card Purchases</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5 font-bold">Expense Category</label>
                    <select 
                      value={newExpenseCategory}
                      onChange={(e) => setNewExpenseCategory(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring focus:ring-indigo-150"
                    >
                      {spending.map(cat => (
                        <option key={cat.name} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5 font-bold">Expense Amount ($)</label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">$</span>
                      <input 
                        type="number"
                        required
                        min="1"
                        value={newExpenseAmount}
                        onChange={(e) => setNewExpenseAmount(e.target.value)}
                        placeholder="75"
                        className="w-full bg-white border border-slate-200 rounded pl-6 pr-2.5 py-1.5 text-xs focus:outline-none focus:ring focus:ring-indigo-150"
                      />
                    </div>
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" /> Allocate Expense
                </button>
              </form>

              {/* Add simulated direct deposits */}
              <form onSubmit={handleAddIncomeBoost} className="space-y-3">
                <div className="text-[11px] font-bold text-emerald-700 uppercase">Inject Extra Direct Deposits</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-slate-500 mb-0.5 font-bold">Direct Deposit Amount ($)</label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">$</span>
                      <input 
                        type="number"
                        required
                        min="1"
                        value={newIncomeAmount}
                        onChange={(e) => setNewIncomeAmount(e.target.value)}
                        placeholder="250"
                        className="w-full bg-white border border-slate-200 rounded pl-6 pr-2.5 py-1.5 text-xs focus:outline-none focus:ring focus:ring-emerald-150"
                      />
                    </div>
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full py-1.5 bg-emerald-650 hover:bg-emerald-600 text-white rounded text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" /> Boost Income
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>

      {/* REWARDS & INTERACTIVE PRODUCTS OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Lumina Total Checking</h3>
          <p className="text-slate-600 mb-6 text-base">
            The checking account that rewards you with real-time financial surveillance, live cashflow statements, and deep compliance audits. 
            Open an account in under 5 minutes and start banking smarter.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs font-semibold text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                {feature}
              </li>
            ))}
          </ul>
          <Button onClick={() => navigate('/open-account')} className="shadow-md">Open Account Now</Button>
        </div>
        <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md group border border-slate-250">
          <img 
            src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1200" 
            alt="Corporate visual financial graphics placeholder" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-6">
            <div>
              <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Aesthetic Interface</div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Lumina Interactive Services Console</h4>
            </div>
          </div>
        </div>
      </div>

      {/* CORE PRODUCT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-6 bg-slate-900 text-white relative overflow-hidden group">
          <div className="absolute right-[-20px] top-[-20px] opacity-10 rotate-12 transition-transform group-hover:rotate-45 duration-700 text-white">
            <PiggyBank className="w-28 h-28" />
          </div>
          <div className="text-sm text-emerald-400 font-extrabold uppercase tracking-widest mb-2">Savings APY</div>
          <h4 className="text-2xl font-bold mb-2">High Yield Savings</h4>
          <div className="text-4xl font-extrabold mb-4">4.50% <span className="text-lg font-normal text-slate-400">APY</span></div>
          <p className="text-slate-400 text-xs leading-relaxed mb-6">Grow your money faster with one of the industry's highest yielding premium rates.</p>
          <Button variant="secondary" className="w-full" onClick={() => navigate('/open-account')}>Start Saving</Button>
        </Card>
        
        <Card className="p-6 relative overflow-hidden group">
          <div className="absolute right-[-20px] top-[-20px] opacity-10 rotate-12 transition-transform group-hover:rotate-45 duration-700 text-slate-900">
            <Layers className="w-28 h-28" />
          </div>
          <div className="text-sm text-indigo-650 font-extrabold uppercase tracking-widest mb-2">CDs</div>
          <h4 className="text-2xl font-bold mb-2 text-slate-900">Certificates of Deposit</h4>
          <div className="text-4xl font-extrabold mb-4 text-slate-900">5.10% <span className="text-lg font-normal text-slate-500">APY</span></div>
          <p className="text-slate-600 text-xs leading-relaxed mb-6">Lock in a guaranteed high yield rate for secure periods ranging from 6 months to 5 years.</p>
          <Button variant="outline" className="w-full" onClick={() => navigate('/open-account')}>View Rates</Button>
        </Card>

        <Card className="p-6 relative overflow-hidden group">
          <div className="absolute right-[10px] top-[10px] text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-sm text-purple-650 font-extrabold uppercase tracking-widest mb-2">Mobile Digital</div>
          <h4 className="text-2xl font-bold mb-2 text-slate-900">Smart Banking App</h4>
          <div className="text-4xl font-extrabold mb-4 text-slate-900">4.9 <span className="text-lg font-normal text-slate-500">Stars</span></div>
          <p className="text-slate-600 text-xs leading-relaxed mb-6">Critically acclaimed mobile interface built with robust AML surveillance and rapid transfer controls.</p>
          <Button variant="outline" className="w-full">
            Download App
            <ChevronRight className="w-4 h-4 ml-1 inline" />
          </Button>
        </Card>
      </div>
    </div>
  );
};

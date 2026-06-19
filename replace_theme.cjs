const fs = require('fs');
let content = fs.readFileSync('pages/AdminPanel.tsx', 'utf8');

// Replace standard dark mode classes with light mode equivalents
const replacements = [
  // Backgrounds
  [/bg-slate-950/g, 'bg-slate-50'],
  [/bg-[slate|gray]-900/g, 'bg-white'],
  [/bg-slate-900/g, 'bg-white'],
  [/bg-slate-850/g, 'bg-slate-100'],
  [/bg-slate-800/g, 'bg-slate-200'],
  [/bg-slate-750/g, 'bg-slate-200'],
  [/bg-slate-700/g, 'bg-slate-300'],
  
  // Borders
  [/border-slate-800/g, 'border-slate-200'],
  [/border-slate-850/g, 'border-slate-200'],
  [/border-slate-900/g, 'border-slate-100'],
  [/border-slate-750/g, 'border-slate-300'],
  [/border-slate-700/g, 'border-slate-300'],

  // Text
  [/text-slate-100/g, 'text-slate-900'],
  [/text-white/g, 'text-slate-900'],
  [/text-slate-200/g, 'text-slate-800'],
  [/text-slate-300/g, 'text-slate-700'],
  [/text-slate-400/g, 'text-slate-500'],
  [/text-slate-500/g, 'text-slate-500'],
  [/text-slate-550/g, 'text-slate-500'],
  
  // Hover Backgrounds
  [/hover:bg-slate-900/g, 'hover:bg-slate-100'],
  [/hover:bg-slate-850/g, 'hover:bg-slate-100'],
  [/hover:bg-slate-800/g, 'hover:bg-slate-200'],
  [/hover:bg-slate-750/g, 'hover:bg-slate-200'],

  // Divide
  [/divide-slate-900/g, 'divide-slate-200'],
  [/divide-slate-800/g, 'divide-slate-300'],

  // specific
  [/bg-slate-955/g, 'bg-slate-50'],
  
  // Accents
  [/text-emerald-400/g, 'text-emerald-600'],
  [/text-emerald-450/g, 'text-emerald-600'],
  [/bg-emerald-950/g, 'bg-emerald-100'],
  [/bg-emerald-900/g, 'bg-emerald-200'],
  [/border-emerald-900/g, 'border-emerald-200'],
  
  [/text-rose-400/g, 'text-rose-600'],
  [/text-rose-450/g, 'text-rose-600'],
  [/text-rose-455/g, 'text-rose-600'],
  [/bg-rose-950/g, 'bg-rose-100'],
  [/bg-rose-955/g, 'bg-rose-50'],
  [/bg-rose-900/g, 'bg-rose-200'],
  [/border-rose-900/g, 'border-rose-200'],
  
  [/text-amber-400/g, 'text-amber-600'],
  [/text-amber-300/g, 'text-amber-700'],
  [/bg-amber-950/g, 'bg-amber-100'],
  [/border-amber-800/g, 'border-amber-300'],

  [/text-blue-400/g, 'text-blue-600'],
  [/bg-blue-950/g, 'bg-blue-100'],

  [/text-indigo-400/g, 'text-indigo-600'],
  [/text-indigo-650/g, 'text-indigo-600'],
  [/bg-indigo-950/g, 'bg-indigo-100'],
  [/border-indigo-900/g, 'border-indigo-200'],

  // Navigation classes adjustments for active tab
  [/bg-emerald-600 text-slate-900/g, 'bg-emerald-600 text-white'],
];

replacements.forEach(([regex, replacement]) => {
  content = content.replace(regex, replacement);
});

fs.writeFileSync('pages/AdminPanel.tsx', content, 'utf8');
console.log('Replacements complete.');

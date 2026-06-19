import React, { useState } from 'react';
import { Button, Card, Input, SectionHeader } from '../components/UI';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';

const mockLocations = [
  { name: "Downtown Financial Center", address: "123 Wall St, New York, NY 10005", distance: "0.5 mi", hours: "9 AM - 5 PM", phone: "(212) 555-0123" },
  { name: "Midtown Branch", address: "45 Rockefeller Plaza, New York, NY 10111", distance: "2.1 mi", hours: "9 AM - 6 PM", phone: "(212) 555-0199" },
  { name: "Brooklyn Heights", address: "200 Montague St, Brooklyn, NY 11201", distance: "4.3 mi", hours: "9 AM - 5 PM", phone: "(718) 555-0888" },
  { name: "Queens Plaza ATM", address: "27-01 Queens Plaza N, Queens, NY 11101", distance: "5.1 mi", hours: "24/7 Access", phone: "ATM Only" },
];

export const Locations: React.FC = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState(mockLocations);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock search functionality
    if (!search.trim()) {
        setResults(mockLocations);
        return;
    }
    // Just shuffle or filter for demo
    setResults(mockLocations.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.address.toLowerCase().includes(search.toLowerCase())));
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-200px)] min-h-[600px]">
      <SectionHeader title="Find a Location" subtitle="Locate a branch or fee-free ATM near you." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        {/* Search & List */}
        <div className="lg:col-span-1 flex flex-col h-full">
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <Input 
                    placeholder="Zip code, city, or state" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-white"
                />
                <Button type="submit">Search</Button>
            </form>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {results.map((loc, i) => (
                    <Card key={i} className="p-4 hover:border-emerald-500 cursor-pointer transition-colors group">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-slate-900 group-hover:text-emerald-600">{loc.name}</h4>
                            <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-1 rounded">{loc.distance}</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3 flex items-start gap-2">
                            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                            {loc.address}
                        </p>
                        <div className="text-xs text-slate-500 space-y-1">
                            <div className="flex items-center gap-2"><Clock className="w-3 h-3" /> {loc.hours}</div>
                            <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> {loc.phone}</div>
                        </div>
                        <div className="mt-3 flex gap-2">
                             <Button variant="outline" className="py-1 px-3 text-xs h-8">Details</Button>
                             <Button variant="ghost" className="py-1 px-3 text-xs h-8 text-emerald-600 hover:bg-emerald-50">Directions</Button>
                        </div>
                    </Card>
                ))}
                {results.length === 0 && (
                    <div className="text-center text-slate-500 py-8">No locations found. Try 'New York'.</div>
                )}
            </div>
        </div>

        {/* Mock Map */}
        <div className="lg:col-span-2 bg-slate-100 rounded-2xl border-2 border-gray-200 overflow-hidden relative min-h-[400px]">
            {/* Placeholder for a real map */}
            <div className="absolute inset-0 flex items-center justify-center bg-[url('https://picsum.photos/800/600?grayscale')] bg-cover opacity-50">
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-white/90 backdrop-blur px-6 py-4 rounded-xl shadow-xl text-center">
                    <Navigation className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                    <h3 className="font-bold text-lg">Interactive Map</h3>
                    <p className="text-sm text-slate-600">Enter a zip code to view locations on the map.</p>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};
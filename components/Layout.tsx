import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShieldCheck, Lock, ChevronRight, Phone, Mail, MapPin, AlertTriangle, Play, HelpCircle } from 'lucide-react';
import { Button } from './UI';

const navItems = [
  { label: 'Personal', path: '/personal' },
  { label: 'Business', path: '/business' },
  { label: 'Transfer', path: '/transfer' },
  { label: 'Credit Cards', path: '/credit-cards' },
  { label: 'Loans', path: '/loans' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [maintenanceActive, setMaintenanceActive] = useState(false);
  const [broadcastAlerts, setBroadcastAlerts] = useState<any[]>([]);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    
    // Check maintenance mode and announcements from localStorage
    try {
      const rawSystem = localStorage.getItem('lumina_admin_system');
      if (rawSystem) {
        const parsedSys = JSON.parse(rawSystem);
        setMaintenanceActive(parsedSys.maintenanceMode === true);
      } else {
        setMaintenanceActive(false);
      }

      const rawAnnouncements = localStorage.getItem('lumina_admin_announcements');
      if (rawAnnouncements) {
        const parsedAnn = JSON.parse(rawAnnouncements);
        setBroadcastAlerts(parsedAnn.filter((a: any) => a.published && (a.category === 'Security Alert' || a.category === 'Maintenance')));
      } else {
        setBroadcastAlerts([]);
      }
    } catch (e) {
      console.warn("Could not load admin configurations:", e);
    }
  }, [location]);

  const isAdminPath = location.pathname === '/admin';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Top Security Bar */}
      <div className="bg-slate-900 text-gray-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Secure connection. Member FDIC.</span>
            </div>
          </div>
          <div className="hidden sm:flex gap-4">
            <Link to="/careers" className="hover:text-white transition-colors">Careers</Link>
            <Link to="/locations" className="hover:text-white transition-colors">Locations</Link>
            <Link to="/help" className="hover:text-white transition-colors">Help</Link>
          </div>
        </div>
      </div>

      {/* Security Alert / Maintenance Notice Bulletins */}
      {!isAdminPath && broadcastAlerts.length > 0 && (
        <div className="bg-amber-500 text-slate-955 px-4 py-2 text-xs font-semibold shadow border-b border-amber-600">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-slate-955 shrink-0" />
              <span>
                <strong>System Notice:</strong> {broadcastAlerts[0].title} — {broadcastAlerts[0].summary}
              </span>
            </div>
            <Link to="/help" className="underline hover:text-slate-900 text-[11px] shrink-0 font-bold">Details</Link>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${
          scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md border-gray-200 py-2' : 'bg-white border-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-slate-900 text-white p-2 rounded-lg group-hover:bg-emerald-600 transition-colors">
                <span className="font-bold text-xl tracking-tighter">LF</span>
              </div>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">Lumina</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                    location.pathname === item.path ? 'text-emerald-600' : 'text-slate-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="text-sm font-semibold text-slate-900 hover:text-emerald-600 flex items-center gap-1">
                <Lock className="w-4 h-4" />
                Login
              </Link>
              <Button variant="primary" className="py-2 px-4 text-sm" onClick={() => navigate('/open-account')}>
                Open Account
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg py-4 px-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className="text-lg font-medium text-slate-700 py-2 border-b border-gray-100"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 py-2 border-b border-gray-100 text-sm text-slate-500">
               <Link to="/careers">Careers</Link>
               <Link to="/locations">Locations</Link>
               <Link to="/help">Help</Link>
            </div>
            <div className="flex flex-col gap-3 mt-4">
               <Button variant="outline" className="w-full justify-center" onClick={() => navigate('/login')}>
                Online Banking Login
              </Button>
              <Button variant="primary" className="w-full justify-center" onClick={() => navigate('/open-account')}>
                Open an Account
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content (with Maintenance lockout protection) */}
      <main className="flex-grow">
        {maintenanceActive && !isAdminPath ? (
          <div className="min-h-[70vh] flex items-center justify-center p-6 bg-slate-900 text-white">
            <div className="max-w-md text-center p-8 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col items-center">
              <div className="p-4 bg-rose-500/10 rounded-full text-rose-500 mb-6 border border-rose-500/20">
                <AlertTriangle className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight mb-3">Lumina System Upgrades</h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Lumina is currently undergoing a standard compliance security patch deployment and database sweep. Checking access and money routing mechanisms are paused.
              </p>
              
              <div className="text-xs text-slate-500 bg-slate-900 p-3 rounded-lg border border-slate-850 font-mono w-full text-left mb-6">
                Ref Code: MAINTENANCE_BIT_CRITICAL_LOCK
              </div>

              <Link 
                to="/admin" 
                className="text-xs text-amber-400 font-semibold hover:underline"
              >
                Go to Operations Panel (Sandbox Override) &rarr;
              </Link>
            </div>
          </div>
        ) : (
          children
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Lumina Financial</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Empowering your financial future with secure, innovative banking solutions designed for modern life.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-emerald-500">Products</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><Link to="/personal" className="hover:text-white">Checking & Savings</Link></li>
                <li><Link to="/credit-cards" className="hover:text-white">Credit Cards</Link></li>
                <li><Link to="/loans" className="hover:text-white">Mortgages</Link></li>
                <li><Link to="/business" className="hover:text-white">Business Banking</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-emerald-500">Support</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><Link to="/contact" className="hover:text-white">Customer Service</Link></li>
                <li><Link to="/contact" className="hover:text-white">Lost or Stolen Card</Link></li>
                <li><a href="#" className="hover:text-white">Fraud Protection</a></li>
                <li><Link to="/help" className="hover:text-white">FAQs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-emerald-500">Contact</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> 1-800-LUMINA-BK
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> support@lumina.com
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> <Link to="/locations" className="hover:underline">Find a Branch</Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} Lumina Financial. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-slate-300">Privacy Policy</a>
              <a href="#" className="hover:text-slate-300">Terms of Use</a>
              <a href="#" className="hover:text-slate-300">Security</a>
              <a href="#" className="hover:text-slate-300">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
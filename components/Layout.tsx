import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShieldCheck, Lock, ChevronRight, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from './UI';

const navItems = [
  { label: 'Personal', path: '/personal' },
  { label: 'Business', path: '/business' },
  { label: 'Credit Cards', path: '/credit-cards' },
  { label: 'Loans', path: '/loans' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Top Security Bar */}
      <div className="bg-slate-900 text-gray-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>Secure connection. Member FDIC. Equal Housing Lender.</span>
          </div>
          <div className="hidden sm:flex gap-4">
            <Link to="/careers" className="hover:text-white transition-colors">Careers</Link>
            <Link to="/locations" className="hover:text-white transition-colors">Locations</Link>
            <Link to="/help" className="hover:text-white transition-colors">Help</Link>
          </div>
        </div>
      </div>

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

      {/* Main Content */}
      <main className="flex-grow">
        {children}
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
import React, { useState } from 'react';
import { Button, Input, Card } from '../components/UI';
import { Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getSupabase } from '../supabaseClient';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      // Intercept admin/sandbox credentials requested by the user
      if (email.toLowerCase() === 'admin@bank.com' && password === 'Admin2026') {
        // Store simulated session
        localStorage.setItem('lumina_session', JSON.stringify({
          email: 'admin@bank.com',
          role: 'Admin',
          name: 'System Administrator'
        }));
        
        // Log auditing trigger if the store helper is imported or we can just navigate safely
        try {
          const rawLogs = localStorage.getItem('lumina_admin_auditLogs');
          const logs = rawLogs ? JSON.parse(rawLogs) : [];
          const nextLog = {
            id: `log-${Date.now()}`,
            operator: 'System Administrator',
            role: 'Admin',
            action: 'USER_LOGIN',
            target: 'admin@bank.com',
            details: 'Administrator successfully authenticated via secure login page.',
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
            ipAddress: '192.168.1.150'
          };
          localStorage.setItem('lumina_admin_auditLogs', JSON.stringify([nextLog, ...logs]));
        } catch (e) {
          console.warn("Could not log admin login:", e);
        }

        navigate('/admin');
        return;
      }

      const { data, error } = await getSupabase().auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setErrorMsg(error.message || "An unexpected error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="p-8 shadow-xl border border-slate-100">
          <div className="flex flex-col items-center mb-6">
            <div className="p-3 rounded-full mb-4 bg-slate-900 text-white">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Secure Login</h2>
            <p className="text-slate-500 mt-2 text-center text-sm">
              Access your Lumina Financial dashboard securely.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-start text-sm">
              <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            
            <div className="space-y-1">
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <div className="flex justify-end">
                <Link to="/contact" className="text-xs text-slate-600 hover:text-slate-900 hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 flex justify-center items-center font-bold text-sm" 
              isLoading={isLoading}
            >
              {!isLoading && (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <Link to="/open-account" className="text-slate-900 font-semibold hover:underline">
                Open an Account
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

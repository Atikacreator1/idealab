import React, { useState } from 'react';
import { UserProfile } from '../types';

interface AuthScreenProps {
  initialMode?: 'login' | 'signup';
  onLoginSuccess: (user: UserProfile) => void;
  onCancel?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  initialMode = 'login',
  onLoginSuccess,
  onCancel,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'Developer' | 'Founder' | 'Product Manager' | 'Student'>('Developer');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleQuickDemoLogin = (demoName: string, demoEmail: string, demoRole: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      const demoUser: UserProfile = {
        id: 'usr-' + Date.now(),
        name: demoName,
        email: demoEmail,
        role: demoRole,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(demoName)}`,
        joinedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      };
      setIsLoading(false);
      onLoginSuccess(demoUser);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }
      if (!agreeTerms) {
        setErrorMessage('Please agree to the Terms of Service to create an account.');
        return;
      }
    }

    setIsLoading(true);

    setTimeout(() => {
      const newUser: UserProfile = {
        id: 'usr-' + Date.now(),
        name: mode === 'signup' ? name : email.split('@')[0].replace('.', ' '),
        email,
        role: mode === 'signup' ? role : 'Developer',
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
          mode === 'signup' ? name : email
        )}`,
        joinedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      };
      setIsLoading(false);
      onLoginSuccess(newUser);
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto my-6 space-y-6 animate-fade-in">
      {/* Container Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/80 shadow-2xl space-y-6">
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl action-gradient mx-auto flex items-center justify-center text-white shadow-lg shadow-[#630ed4]/20 mb-3">
            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
          </div>

          <h2 className="text-2xl font-black text-[#191c1e] font-headline tracking-tight">
            {mode === 'login' ? 'Welcome Back to IdeaLab' : 'Create your IdeaLab Account'}
          </h2>
          <p className="text-xs text-[#4a4455] font-normal">
            {mode === 'login'
              ? 'Sign in to access your saved tech blueprints and project roadmaps.'
              : 'Join creators and developers synthesizing production-ready blueprints.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#f2f4f6] p-1 rounded-2xl border border-[#e0e3e5]">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              mode === 'login'
                ? 'bg-white text-[#630ed4] shadow-sm font-extrabold'
                : 'text-[#4a4455] hover:text-[#191c1e]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              mode === 'signup'
                ? 'bg-white text-[#630ed4] shadow-sm font-extrabold'
                : 'text-[#4a4455] hover:text-[#191c1e]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-shake">
            <span className="material-symbols-outlined text-base shrink-0">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name field (Signup mode) */}
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#191c1e] font-headline">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#f2f4f6] text-xs text-[#191c1e] placeholder-[#7b7487] pl-10 pr-4 py-3 rounded-2xl border border-transparent focus:border-[#7c3aed]/40 focus:bg-white focus:outline-none transition-all"
                />
                <span className="material-symbols-outlined absolute left-3 top-3 text-[#7b7487] text-lg">
                  person
                </span>
              </div>
            </div>
          )}

          {/* Email field */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#191c1e] font-headline">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#f2f4f6] text-xs text-[#191c1e] placeholder-[#7b7487] pl-10 pr-4 py-3 rounded-2xl border border-transparent focus:border-[#7c3aed]/40 focus:bg-white focus:outline-none transition-all"
              />
              <span className="material-symbols-outlined absolute left-3 top-3 text-[#7b7487] text-lg">
                mail
              </span>
            </div>
          </div>

          {/* Role selector (Signup mode) */}
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#191c1e] font-headline">Primary Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full bg-[#f2f4f6] text-xs text-[#191c1e] px-4 py-3 rounded-2xl border border-transparent focus:border-[#7c3aed]/40 focus:bg-white focus:outline-none transition-all cursor-pointer"
              >
                <option value="Developer">Software Developer / Architect</option>
                <option value="Founder">Startup Founder / Creator</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Student">Student / Hobbyist</option>
              </select>
            </div>
          )}

          {/* Password field */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#191c1e] font-headline">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#f2f4f6] text-xs text-[#191c1e] placeholder-[#7b7487] pl-10 pr-10 py-3 rounded-2xl border border-transparent focus:border-[#7c3aed]/40 focus:bg-white focus:outline-none transition-all"
              />
              <span className="material-symbols-outlined absolute left-3 top-3 text-[#7b7487] text-lg">
                lock
              </span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#7b7487] hover:text-[#191c1e]"
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Confirm Password field (Signup mode) */}
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#191c1e] font-headline">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#f2f4f6] text-xs text-[#191c1e] placeholder-[#7b7487] pl-10 pr-4 py-3 rounded-2xl border border-transparent focus:border-[#7c3aed]/40 focus:bg-white focus:outline-none transition-all"
                />
                <span className="material-symbols-outlined absolute left-3 top-3 text-[#7b7487] text-lg">
                  lock_reset
                </span>
              </div>
            </div>
          )}

          {/* Checkbox Options */}
          {mode === 'login' ? (
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#4a4455]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#630ed4] focus:ring-[#7c3aed]"
                />
                Remember session
              </label>
              <button type="button" className="text-[#630ed4] font-bold hover:underline">
                Forgot password?
              </button>
            </div>
          ) : (
            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer text-xs text-[#4a4455]">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded text-[#630ed4] focus:ring-[#7c3aed] mt-0.5"
                />
                <span>
                  I agree to the <strong className="text-[#191c1e]">Terms of Service</strong> and{' '}
                  <strong className="text-[#191c1e]">Privacy Policy</strong>.
                </span>
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full action-gradient action-gradient-hover text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg shadow-[#630ed4]/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50 mt-4"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined text-xl animate-spin">refresh</span>
                {mode === 'login' ? 'Authenticating...' : 'Creating Profile...'}
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-xl">
                  {mode === 'login' ? 'login' : 'person_add'}
                </span>
                {mode === 'login' ? 'Sign In to Workspace' : 'Complete Registration'}
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#e0e3e5] w-full"></div>
          <span className="bg-white px-3 text-[10px] uppercase font-bold text-[#7b7487] tracking-wider absolute">
            Or Quick Demo Access
          </span>
        </div>

        {/* Quick Demo Login Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('Alex Rivera', 'alex.dev@idealab.io', 'Lead Developer')}
            className="p-3 rounded-2xl bg-[#f2f4f6] hover:bg-[#e6e8ea] text-[#191c1e] text-xs font-bold flex flex-col items-center gap-1 transition-all border border-[#e0e3e5]"
          >
            <span className="material-symbols-outlined text-lg text-[#630ed4]">terminal</span>
            <span>Demo Developer</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemoLogin('Samantha Chen', 'sam.founder@idealab.io', 'Tech Founder')}
            className="p-3 rounded-2xl bg-[#f2f4f6] hover:bg-[#e6e8ea] text-[#191c1e] text-xs font-bold flex flex-col items-center gap-1 transition-all border border-[#e0e3e5]"
          >
            <span className="material-symbols-outlined text-lg text-[#39b8fd]">rocket_launch</span>
            <span>Demo Founder</span>
          </button>
        </div>

        {/* Cancel option */}
        {onCancel && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="text-xs font-bold text-[#7b7487] hover:text-[#191c1e]"
            >
              Cancel and return to app
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

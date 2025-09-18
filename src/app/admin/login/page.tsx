'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import Image from 'next/image';
import {
  Shield,
  User,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  Loader2,
  Zap
} from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Check if already logged in
    const isLoggedIn = localStorage.getItem('way_admin_auth') === 'true';
    if (isLoggedIn) {
      router.push('/admin/dashboard');
      return;
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const success = await login(formData.email, formData.password);

    if (success) {
      router.push('/admin/dashboard');
    } else {
      setError('Credenciais inválidas. Verifique email e senha.');
    }

    setIsLoading(false);
  };

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600 relative overflow-hidden flex items-center justify-center p-4">

      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Energy Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Floating Particles */}
        <div className={`absolute inset-0 transition-opacity duration-2000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${30 + (i % 3) * 15}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${3 + (i % 2)}s`,
                boxShadow: '0 0 10px rgba(255, 196, 0, 0.6)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className={`transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

            {/* Header */}
            <div className="text-center pb-8">
              <div className="mx-auto w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                <Image
                  src="/logo-branco.png"
                  alt="Way"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-yellow-400/20 border border-yellow-400/30 rounded-full">
                  <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
                  <span className="text-sm font-bold text-yellow-300 tracking-wide">PAINEL ADMINISTRATIVO</span>
                  <Shield className="w-5 h-5 text-yellow-400" />
                </div>

                <div className="text-3xl font-black text-white">
                  WAY ADMIN
                </div>
                <p className="text-white/70 font-light">Acesso restrito aos administradores</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/20 border border-red-400/50 rounded-lg">
                  <p className="text-red-400 text-sm flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </p>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-yellow-400 tracking-wide">
                  EMAIL
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <User className="w-5 h-5 text-white/60" />
                  </div>
                  <input
                    type="email"
                    placeholder="Digite seu email"
                    className="w-full pl-14 pr-4 h-12 text-base bg-white/10 border border-white/30 focus:border-yellow-400 hover:border-white/50 rounded-lg font-medium text-white placeholder:text-white/60 focus:bg-white/20 transition-all duration-200 focus:outline-none"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-yellow-400 tracking-wide">
                  SENHA
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Lock className="w-5 h-5 text-white/60" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    className="w-full pl-14 pr-14 h-12 text-base bg-white/10 border border-white/30 focus:border-yellow-400 hover:border-white/50 rounded-lg font-medium text-white placeholder:text-white/60 focus:bg-white/20 transition-all duration-200 focus:outline-none"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="group w-full h-14 text-lg font-black bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400 shadow-lg hover:shadow-yellow-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-1 disabled:opacity-50 cursor-pointer rounded-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-3 text-black animate-spin inline" />
                    VERIFICANDO...
                  </>
                ) : (
                  <>
                    <Shield className="w-6 h-6 mr-3 text-black group-hover:animate-pulse inline" />
                    ACESSAR PAINEL
                  </>
                )}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
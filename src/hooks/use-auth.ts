'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  email: string;
  role: string;
  loginTime: string;
}

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const isLoggedIn = localStorage.getItem('way_admin_auth') === 'true';
      const userData = localStorage.getItem('way_admin_user');

      if (isLoggedIn && userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
        // Se não estiver autenticado e não estiver na página de login, redirecionar
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/admin/login')) {
          router.push('/admin/login');
        }
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Credenciais fixas conforme solicitado
    if (email === 'contato@waydrivebr.com.br' && password === 'Liga1425$') {
      const userData: User = {
        email: 'contato@waydrivebr.com.br',
        role: 'administrator',
        loginTime: new Date().toISOString()
      };

      localStorage.setItem('way_admin_auth', 'true');
      localStorage.setItem('way_admin_user', JSON.stringify(userData));
      setUser(userData);

      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem('way_admin_auth');
    localStorage.removeItem('way_admin_user');
    setUser(null);
    router.push('/admin/login');
  };

  return {
    user,
    isLoading,
    login,
    logout,
    checkAuth
  };
}
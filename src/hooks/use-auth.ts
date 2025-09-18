'use client';

import { useState, useEffect, useCallback } from 'react';
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

  const checkAuth = useCallback(() => {
    // Verificar se estamos no browser
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    try {
      const isLoggedIn = localStorage.getItem('way_admin_auth') === 'true';
      const userData = localStorage.getItem('way_admin_user');

      if (isLoggedIn && userData && userData.trim() !== '') {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (parseError) {
          console.error('Erro ao fazer parse dos dados do usuário:', parseError);
          // Limpar dados corrompidos
          localStorage.removeItem('way_admin_auth');
          localStorage.removeItem('way_admin_user');
          setUser(null);
          if (typeof window !== 'undefined' && !window.location.pathname.includes('/admin/login')) {
            router.push('/admin/login');
          }
        }
      } else {
        setUser(null);
        // Se não estiver autenticado e não estiver na página de login, redirecionar
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/admin/login')) {
          router.push('/admin/login');
        }
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      // Limpar localStorage em caso de erro
      localStorage.removeItem('way_admin_auth');
      localStorage.removeItem('way_admin_user');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Credenciais fixas conforme solicitado
      if (email === 'contato@waydrivebr.com.br' && password === 'Liga1425$') {
        const userData: User = {
          email: 'contato@waydrivebr.com.br',
          role: 'administrator',
          loginTime: new Date().toISOString()
        };

        if (typeof window !== 'undefined') {
          localStorage.setItem('way_admin_auth', 'true');
          localStorage.setItem('way_admin_user', JSON.stringify(userData));
        }
        setUser(userData);

        return true;
      }

      return false;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };

  const logout = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('way_admin_auth');
        localStorage.removeItem('way_admin_user');
      }
      setUser(null);
      router.push('/admin/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      setUser(null);
      router.push('/admin/login');
    }
  };

  return {
    user,
    isLoading,
    login,
    logout,
    checkAuth
  };
}
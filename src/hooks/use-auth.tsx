
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role?: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Проверяем наличие пользователя в localStorage при загрузке
  useEffect(() => {
    const storedUser = localStorage.getItem('salon_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Имитация API-запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // В реальном приложении здесь будет запрос к API
      // Для демо используем заглушку
      const mockUser: User = {
        id: '1',
        name: 'Иван Иванов',
        email: email,
        phone: '+7 (999) 123-45-67',
        role: 'user'
      };
      
      setUser(mockUser);
      localStorage.setItem('salon_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Ошибка при входе. Пожалуйста, проверьте ваши данные.');
    } finally {
      setIsLoading(false);
    }
  };

  const adminLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Имитация API-запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // В реальном приложении здесь будет проверка роли администратора
      // Для демо используем заглушку
      if (email !== 'admin@example.com') {
        throw new Error('Пользователь не найден или не имеет прав администратора');
      }
      
      const adminUser: User = {
        id: 'admin1',
        name: 'Администратор',
        email: email,
        role: 'admin'
      };
      
      setUser(adminUser);
      localStorage.setItem('salon_user', JSON.stringify(adminUser));
    } catch (error) {
      console.error('Admin login error:', error);
      throw new Error('Ошибка при входе. Пожалуйста, проверьте ваши данные.');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      // Имитация API-запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // В реальном приложении здесь будет запрос к API
      // Для демо используем заглушку
      const mockUser: User = {
        id: '1',
        name: name,
        email: email,
        role: 'user'
      };
      
      setUser(mockUser);
      localStorage.setItem('salon_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Register error:', error);
      throw new Error('Ошибка при регистрации. Пожалуйста, попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('salon_user');
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setIsLoading(true);
      // Имитация API-запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // В реальном приложении здесь будет запрос к API
      // Для демо обновляем локально
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('salon_user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Update profile error:', error);
      throw new Error('Ошибка при обновлении профиля.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        adminLogin,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

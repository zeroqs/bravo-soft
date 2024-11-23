import { createContext, useEffect, useState } from 'react';

import type { ProviderProps } from '@/shared/types';

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
}

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {}
});

export const AuthWrapper = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, useState, type ReactNode } from 'react';
import type { User } from '@/types/User';
import { redirect } from 'react-router';
import { ROUTES } from '@/constants/routes';

interface AuthType {
  user: User | null;
  login: (credentials: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authinticatedUser, setAuthinticatedUser] = useState<User | null>({
    name: 'Admin',
    password: 'Admin',
  });

  const login = () => {
    return redirect(ROUTES.HOME);
  };

  const logout = () => {
    return redirect(ROUTES.AUTH);
  };

  return (
    <AuthContext.Provider
      value={{
        user: authinticatedUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

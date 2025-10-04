import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, signup as apiSignup, getProfile } from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      getProfile(token).then(setUser);
    } else {
      setUser(null);
    }
  }, [token]);

  const login = async (data) => {
    const res = await apiLogin(data);
    console.log(res,"   login data")
    if (res.access) {
      setToken(res.access);
      localStorage.setItem('token', res.access);
      setUser(await getProfile(res.access));
      return { success: true };
    }
    return { success: false, message: res.message || 'Login failed' };
  };

  const signup = async (data) => {
    const res = await apiSignup(data);
    if (res.status===201) {
      
      return { success: true };
    }
    return { success: false, message: res.message || 'Signup failed' };
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

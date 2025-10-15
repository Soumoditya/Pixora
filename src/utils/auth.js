import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const authState = useProvideAuth();
  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const googleSignIn = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);

  return { user, loading, login, register, logout, googleSignIn };
}

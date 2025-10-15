import React, { useState } from "react";
import { useAuth } from "../utils/auth";
export default function AuthPage() {
  const { login, register, googleSignIn } = useAuth();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [mode, setMode] = useState("login"); // login | register
  const submit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "login") await login(email, pw);
      else await register(email, pw);
    } catch (err) {
      alert("Auth error: " + err.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Pixora</h1>
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full p-3 rounded-lg border" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="w-full p-3 rounded-lg border" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)} type="password" />
          <button className="w-full py-3 rounded-lg bg-indigo-600 text-white font-medium">{mode==="login"?"Log in":"Create account"}</button>
        </form>
        <div className="mt-3 flex gap-2">
          <button onClick={()=>setMode(mode==="login"?"register":"login")} className="text-sm text-slate-600">Switch to {mode==="login"?"Register":"Login"}</button>
          <button onClick={googleSignIn} className="ml-auto text-sm text-indigo-600">Continue with Google</button>
        </div>
      </div>
    </div>
  );
}

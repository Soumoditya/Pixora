import React from "react";
import Feed from "../shared/Feed";
import Upload from "../shared/Upload";
import { useAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const { logout } = useAuth();
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 bg-white shadow-sm p-3 flex items-center gap-4">
        <div className="text-xl font-bold">Pixora</div>
        <div className="flex-1" />
        <button onClick={()=>nav("/profile")} className="px-3 py-1 rounded-md">Profile</button>
        <button onClick={logout} className="px-3 py-1 rounded-md">Logout</button>
      </header>
      <main className="max-w-3xl mx-auto p-4">
        <Upload />
        <Feed />
      </main>
    </div>
  );
}

import React from "react";
import { useAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user } = useAuth();
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <button onClick={()=>nav(-1)} className="mb-4">Back</button>
      <div className="max-w-lg bg-white p-6 rounded-xl shadow">
        <div className="text-xl font-semibold">Profile</div>
        <div className="mt-4">Email: {user?.email}</div>
        <div className="mt-2">UID: {user?.uid}</div>
      </div>
    </div>
  );
}

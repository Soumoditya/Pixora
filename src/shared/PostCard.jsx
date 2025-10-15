import React from "react";
import { db } from "../firebase";
import { doc, updateDoc, increment } from "firebase/firestore";

export default function PostCard({ post }) {
  const like = async () => {
    try {
      await updateDoc(doc(db, "posts", post.id), { likes: increment(1) });
    } catch (e) {
      alert("Like failed: " + e.message);
    }
  };
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-3 flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-200 rounded-full" />
        <div>
          <div className="font-semibold">{post.email}</div>
          <div className="text-sm text-slate-500">{new Date(post.createdAt?.toDate?.() || Date.now()).toLocaleString()}</div>
        </div>
      </div>
      <img src={post.imageUrl} alt="" className="w-full max-h-[60vh] object-cover" />
      <div className="p-3">
        <div className="flex items-center gap-4">
          <button onClick={like} className="font-medium">Like ({post.likes || 0})</button>
        </div>
        <div className="mt-2 text-sm text-slate-700">{post.caption}</div>
      </div>
    </div>
  );
}

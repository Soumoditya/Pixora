import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import PostCard from "./PostCard";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setPosts(arr);
    });
    return () => unsub();
  }, []);
  return (
    <div className="space-y-4">
      {posts.map(p => <PostCard key={p.id} post={p} />)}
    </div>
  );
}

import React, { useState } from "react";
import { db, CLOUDINARY, USE_CLOUDINARY } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../utils/auth";

export default function Upload() {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadToFirestore = async (imageUrl) => {
    await addDoc(collection(db, "posts"), {
      uid: user.uid,
      email: user.email,
      imageUrl,
      caption,
      likes: 0,
      createdAt: serverTimestamp()
    });
  };

  const onUpload = async () => {
    if (!file) return alert("Choose an image");
    setLoading(true);
    try {
      if (!CLOUDINARY.cloudName || !CLOUDINARY.unsignedPreset) {
        throw new Error("Cloudinary not configured. Set cloudName and unsignedPreset in src/firebase.js");
      }

      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", CLOUDINARY.unsignedPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY.cloudName}/image/upload`, {
        method: "POST",
        body: form
      });
      if (!res.ok) throw new Error("Cloudinary upload failed: " + res.statusText);
      const data = await res.json();
      const imageUrl = data.secure_url;

      await uploadToFirestore(imageUrl);
      setFile(null);
      setCaption("");
      alert("Uploaded");
    } catch (err) {
      alert("Upload error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <div className="flex gap-3 items-center">
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} />
        <input value={caption} onChange={e=>setCaption(e.target.value)} placeholder="Write a caption" className="flex-1 p-2 border rounded" />
        <button onClick={onUpload} disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded">{loading ? "Uploading..." : "Post"}</button>
      </div>
    </div>
  );
}

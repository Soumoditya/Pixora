import React, { useState } from "react";
import { db, storage, USE_CLOUDINARY } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from "../utils/auth";

/*
  Upload component:
  - If USE_CLOUDINARY === true, it will POST to Cloudinary unsigned endpoint.
  - Otherwise it will use Firebase Storage.
*/

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
      let imageUrl = null;
      if (USE_CLOUDINARY) {
        // configure CLOUDINARY_URL and PRESET in env or edit below
        const cloudName = "YOUR_CLOUD_NAME";
        const unsignedPreset = "YOUR_UNSIGNED_PRESET";
        const form = new FormData();
        form.append("file", file);
        form.append("upload_preset", unsignedPreset);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: form
        });
        const data = await res.json();
        imageUrl = data.secure_url;
      } else {
        if (!storage) throw new Error("Firebase Storage not available. Set USE_CLOUDINARY = true to use Cloudinary.");
        const storageRef = ref(storage, `posts/${user.uid}/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        await new Promise((res, rej) => {
          uploadTask.on("state_changed", null, rej, () => res());
        });
        imageUrl = await getDownloadURL(storageRef);
      }
      await uploadToFirestore(imageUrl);
      setCaption("");
      setFile(null);
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

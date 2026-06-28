"use client";

import { useRef, useState } from "react";

export default function ImageUploader({ onFileSelected }) {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    onFileSelected(file);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        onClick={() => inputRef.current?.click()}
        className="flex h-56 w-56 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-white/20 bg-white/5 hover:border-goldframe/60"
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Your photo" className="h-full w-full object-cover" />
        ) : (
          <span className="px-4 text-center text-sm text-slate-400">
            Tap to upload your photo
          </span>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-slate-200 hover:bg-white/10"
      >
        {previewUrl ? "Choose a different photo" : "Select photo"}
      </button>
    </div>
  );
}

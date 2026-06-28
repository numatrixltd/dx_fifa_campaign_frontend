"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";

export default function CountryForm() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [frameFile, setFrameFile] = useState(null);
  const [framePreview, setFramePreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!frameFile) {
      setError("The frame image is required.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("code", code);
      formData.append("frame", frameFile);

      await api.post("/countries", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create country frame."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex gap-4">
        <input
          placeholder="Country name (e.g. Argentina)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="flex-1 rounded-lg bg-white/10 px-4 py-2 text-white placeholder:text-slate-500"
        />
        <input
          placeholder="Code (e.g. ARG)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          className="w-32 rounded-lg bg-white/10 px-4 py-2 text-white placeholder:text-slate-500"
        />
      </div>

      <div>
        <p className="mb-2 text-sm text-slate-300">
          Frame PNG — must already have a transparent cutout (e.g. the shield
          shape) where the user's photo will show through.
        </p>
        <label className="flex h-48 w-48 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/5">
          {framePreview ? (
            <img
              src={framePreview}
              alt="frame preview"
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="px-4 text-center text-sm text-slate-500">
              Upload frame
            </span>
          )}
          <input
            type="file"
            accept="image/png"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) {
                setFrameFile(f);
                setFramePreview(URL.createObjectURL(f));
              }
            }}
          />
        </label>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="self-start rounded-full bg-goldframe px-6 py-2 text-sm font-bold text-slate-900 disabled:opacity-40"
      >
        {loading ? "Saving…" : "Save country frame"}
      </button>
    </form>
  );
}

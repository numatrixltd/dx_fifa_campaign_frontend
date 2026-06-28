"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/api";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post("/auth/login", { email, password });
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex max-w-sm flex-col px-6 py-24">
      <h1 className="mb-8 text-2xl font-bold text-white">Admin login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-lg bg-white/10 px-4 py-2 text-white placeholder:text-slate-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="rounded-lg bg-white/10 px-4 py-2 text-white placeholder:text-slate-500"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-goldframe px-5 py-2 text-sm font-bold text-slate-900 disabled:opacity-40"
        >
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>
    </main>
  );
}

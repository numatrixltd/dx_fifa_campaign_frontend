"use client";

import { useState } from "react";
import api from "../../lib/api";

export default function RegisterAdminForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await api.post("/auth/register", { name, email, password, role });
      setSuccess(`Admin "${res.data.admin.email}" created.`);
      setName("");
      setEmail("");
      setPassword("");
      setRole("admin");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create admin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
      <input
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="rounded-lg bg-white/10 px-4 py-2 text-white placeholder:text-slate-500"
      />
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
        minLength={6}
        className="rounded-lg bg-white/10 px-4 py-2 text-white placeholder:text-slate-500"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="rounded-lg bg-white/10 px-4 py-2 text-white"
      >
        <option value="admin">Admin</option>
        <option value="superadmin">Superadmin</option>
      </select>

      {error && <p className="text-sm text-red-400">{error}</p>}
      {success && <p className="text-sm text-emerald-400">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="self-start rounded-full bg-goldframe px-6 py-2 text-sm font-bold text-slate-900 disabled:opacity-40"
      >
        {loading ? "Creating…" : "Create admin"}
      </button>
    </form>
  );
}
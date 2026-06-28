"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";

export default function CountryTable() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    api
      .get("/countries/admin/all")
      .then((res) => setCountries(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const toggleActive = async (country) => {
    await api.put(`/countries/${country._id}`, { isActive: !country.isActive });
    load();
  };

  const remove = async (id) => {
    if (!confirm("Delete this country frame?")) return;
    await api.delete(`/countries/${id}`);
    load();
  };

  if (loading) return <p className="text-slate-400">Loading…</p>;

  return (
    <div>
      {/* Mobile: stacked cards */}
      <div className="grid gap-3 sm:hidden">
        {countries.map((c) => (
          <div
            key={c._id}
            className="rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex items-center gap-3">
              <img
                src={c.frameImageUrl}
                alt={c.name}
                className="h-12 w-12 flex-shrink-0 object-contain"
              />
              <div className="flex-1">
                <p className="font-semibold text-white">{c.name}</p>
                <p className="text-xs text-slate-400">{c.code}</p>
              </div>
              <span
                className={`text-xs font-medium ${
                  c.isActive ? "text-emerald-400" : "text-slate-500"
                }`}
              >
                {c.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="mt-3 flex gap-4 border-t border-white/10 pt-3 text-sm">
              <button
                onClick={() => toggleActive(c)}
                className="text-goldframe hover:underline"
              >
                {c.isActive ? "Deactivate" : "Activate"}
              </button>
              <button
                onClick={() => remove(c._id)}
                className="text-red-400 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop/tablet: table */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full text-left text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="py-2">Frame</th>
              <th>Name</th>
              <th>Code</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((c) => (
              <tr key={c._id} className="border-t border-white/10">
                <td className="py-3">
                  <img
                    src={c.frameImageUrl}
                    alt={c.name}
                    className="h-12 w-12 object-contain"
                  />
                </td>
                <td>{c.name}</td>
                <td>{c.code}</td>
                <td>
                  <span
                    className={
                      c.isActive ? "text-emerald-400" : "text-slate-500"
                    }
                  >
                    {c.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="flex gap-3 py-3">
                  <button
                    onClick={() => toggleActive(c)}
                    className="text-goldframe hover:underline"
                  >
                    {c.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => remove(c._id)}
                    className="text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

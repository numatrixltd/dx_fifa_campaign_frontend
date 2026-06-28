"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";
import CountryCard from "./CountryCard";

export default function CountryGrid() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    api
      .get("/countries")
      .then((res) => setCountries(res.data))
      .catch(() => setCountries([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center text-slate-400">Loading countries…</p>;
  }

  if (countries.length === 0) {
    return (
      <p className="text-center text-slate-400">
        No country frames available yet. Check back soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {countries.map((country) => (
        <CountryCard
          key={country._id}
          country={country}
          onClick={() => router.push(`/frame/${country._id}`)}
        />
      ))}
    </div>
  );
}

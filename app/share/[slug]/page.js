"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../lib/api";

export default function SharePage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/frame/share/${slug}`)
      .then((res) => setData(res.data))
      .catch(() => setError("This shared frame couldn't be found."));
  }, [slug]);

  return (
    <main className="mx-auto flex max-w-md flex-col items-center px-6 py-16 text-center">
      {error && <p className="text-red-400">{error}</p>}
      {data && (
        <>
          <img
            src={data.resultImageUrl}
            alt="Shared supporter frame"
            className="h-80 w-80 object-contain"
          />
          <p className="mt-4 text-slate-300">
            Supporting <span className="font-semibold">{data.country?.name}</span>
          </p>
          <a
            href="/"
            className="mt-6 rounded-full bg-goldframe px-6 py-2 text-sm font-bold text-slate-900"
          >
            Make your own
          </a>
        </>
      )}
    </main>
  );
}

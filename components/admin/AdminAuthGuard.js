"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";

export default function AdminAuthGuard({ children }) {
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    api
      .get("/auth/me")
      .then(() => setChecked(true))
      .catch(() => router.replace("/admin/login"));
  }, [router]);

  if (!checked) {
    return <p className="px-6 py-16 text-center text-slate-400">Checking session…</p>;
  }

  return children;
}

import Link from "next/link";
import AdminAuthGuard from "../../../components/admin/AdminAuthGuard";
import CountryTable from "../../../components/admin/CountryTable";

export default function AdminDashboardPage() {
  return (
    <AdminAuthGuard>
      <main className="relative min-h-screen w-full overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat bg-[url('/assets/Banner/mobile.jpeg')] sm:bg-[url('/assets/Banner/desktop.jpeg')]"
          aria-hidden="true"
        />

        {/* Gradient overlay for depth + readability */}
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/95"
          aria-hidden="true"
        />

        {/* Ambient glow accents */}
        <div
          className="absolute -top-32 left-1/4 -z-10 h-72 w-72 rounded-full bg-goldframe/20 blur-xl"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/3 right-0 -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
          {/* Header */}
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-goldframe backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-goldframe" />
                Admin
              </p>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Country frames
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Manage flag frame templates available to users.
              </p>
            </div>

            <Link
              href="/admin/dashboard/new"
              className="inline-flex w-fit items-center justify-center gap-1.5 rounded-full bg-goldframe px-5 py-2.5 text-sm font-bold text-slate-900 shadow-lg shadow-goldframe/20 transition hover:brightness-110 sm:mb-1"
            >
              <span className="text-base leading-none">+</span> Add country
            </Link>
          </div>

          {/* Content card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-1 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-2">
            <div className="rounded-xl bg-slate-950/40 p-4 sm:p-6">
              <CountryTable />
            </div>
          </div>
        </div>
      </main>
    </AdminAuthGuard>
  );
}

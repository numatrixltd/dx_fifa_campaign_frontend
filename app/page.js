import CountryGrid from "../components/CountryGrid";

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat bg-[url('/assets/Banner/mobile.jpeg')] sm:bg-[url('/assets/Banner/desktop.jpeg')]"
        aria-hidden="true"
      />

      {/* Optional dark overlay for readability */}
      <div className="absolute inset-0 -z-10 bg-black/50" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-goldframe">
            Show your colors
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Pick your country. Frame your face.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Choose your team's flag frame, upload a photo, and download or
            share your supporter card in seconds.
          </p>
        </header>
        <CountryGrid />
      </div>
    </main>
  );
}
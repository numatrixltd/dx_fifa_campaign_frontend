export default function CountryCard({ country, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-goldframe/60 hover:bg-white/10"
    >
      <img
        src={country.frameImageUrl}
        alt={country.name}
        className="h-40 w-40 object-contain drop-shadow-lg transition group-hover:scale-105"
      />
      <span className="text-sm font-semibold tracking-wide text-slate-200">
        {country.name}
      </span>
    </button>
  );
}

export default function FramePreview({ resultUrl, loading }) {
  return (
    <div className="flex h-80 w-80 items-center justify-center rounded-2xl bg-white/5 relative overflow-hidden">
      {loading && <FootballLoader />}
      {!loading && resultUrl && (
        <img
          src={resultUrl}
          alt="Your framed photo"
          className="h-full w-full object-contain"
        />
      )}
      {!loading && !resultUrl && (
        <span className="px-4 text-center text-sm text-slate-500">
          Your result will appear here
        </span>
      )}
    </div>
  );
}

function FootballLoader() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-16 w-40">
        {/* Pitch line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-600/50" />

        {/* Rolling football */}
        <div className="absolute bottom-0 left-0 animate-football-roll">
          <svg
            viewBox="0 0 100 100"
            className="h-10 w-10 animate-football-spin drop-shadow-lg"
          >
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="#f8fafc"
              stroke="#1e293b"
              strokeWidth="3"
            />
            <polygon points="50,30 62,40 58,55 42,55 38,40" fill="#1e293b" />
            <line
              x1="50"
              y1="30"
              x2="50"
              y2="2"
              stroke="#1e293b"
              strokeWidth="3"
            />
            <line
              x1="62"
              y1="40"
              x2="88"
              y2="22"
              stroke="#1e293b"
              strokeWidth="3"
            />
            <line
              x1="58"
              y1="55"
              x2="78"
              y2="82"
              stroke="#1e293b"
              strokeWidth="3"
            />
            <line
              x1="42"
              y1="55"
              x2="22"
              y2="82"
              stroke="#1e293b"
              strokeWidth="3"
            />
            <line
              x1="38"
              y1="40"
              x2="12"
              y2="22"
              stroke="#1e293b"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>

      <span className="text-sm text-slate-400 animate-pulse">
        Building your frame…
      </span>

      <style>{`
        @keyframes football-roll {
          0% { transform: translateX(0); }
          50% { transform: translateX(96px); }
          100% { transform: translateX(0); }
        }
        @keyframes football-spin {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(360deg); }
          100% { transform: rotate(720deg); }
        }
        .animate-football-roll {
          animation: football-roll 1.4s ease-in-out infinite;
        }
        .animate-football-spin {
          animation: football-spin 1.4s linear infinite;
        }
      `}</style>
    </div>
  );
}

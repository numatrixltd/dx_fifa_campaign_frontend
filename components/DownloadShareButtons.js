"use client";

export default function DownloadShareButtons({ resultUrl, shareUrl }) {
  if (!resultUrl) return null;

  const handleDownload = async () => {
    const res = await fetch(resultUrl);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-supporter-frame.jpg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const fullShareUrl = `${window.location.origin}${shareUrl}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "My supporter frame", url: fullShareUrl });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(fullShareUrl);
      alert("Share link copied to clipboard!");
    }
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleDownload}
        className="rounded-full bg-goldframe px-5 py-2 text-sm font-bold text-slate-900 hover:opacity-90"
      >
        Download
      </button>
      {/* <button
        onClick={handleShare}
        className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-slate-200 hover:bg-white/10"
      >
        Share
      </button> */}
    </div>
  );
}

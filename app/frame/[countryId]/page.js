"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../../lib/api";
import ImageUploader from "../../../components/ImageUploader";
import FrameAdjuster from "../../../components/FrameAdjuster";
import FramePreview from "../../../components/FramePreview";
import DownloadShareButtons from "../../../components/DownloadShareButtons";

export default function FramePage() {
  const { countryId } = useParams();
  const router = useRouter();

  const [country, setCountry] = useState(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [adjusting, setAdjusting] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);
  const [shareUrl, setShareUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/countries/${countryId}`)
      .then((res) => setCountry(res.data))
      .catch(() => setError("Couldn't load this country's frame."));
  }, [countryId]);

  const handleFileSelected = (selectedFile) => {
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setResultUrl(null);
    setShareUrl(null);
    setAdjusting(true); // open the adjuster as soon as a photo is picked
  };

  const handleApplyAdjustment = async (croppedAreaPixels) => {
    if (!file) return;
    setAdjusting(false);
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("countryId", countryId);
      formData.append("photo", file);
      formData.append("cropX", croppedAreaPixels.x);
      formData.append("cropY", croppedAreaPixels.y);
      formData.append("cropWidth", croppedAreaPixels.width);
      formData.append("cropHeight", croppedAreaPixels.height);

      const res = await api.post("/frame/generate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResultUrl(res.data.resultUrl);
      setShareUrl(res.data.shareUrl);
    } catch (err) {
      setError("Something went wrong generating your frame. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const aspect = country ? country.width / country.height : 1;
  const countryCode = country?.code || country?.iso || "??";
  const stage = resultUrl ? "ARRIVED" : previewUrl ? "IN TRANSIT" : "BOARDING";

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat bg-[url('/assets/Banner/mobile.jpeg')] sm:bg-[url('/assets/Banner/desktop.jpeg')]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0f1b2d]/55 via-[#0f1b2d]/45 to-[#0f1b2d]/70"
        aria-hidden="true"
      />

      {/* faint ambient compass lines, signature flourish */}
      <svg
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[28rem] w-[28rem] opacity-[0.07] sm:h-[36rem] sm:w-[36rem]"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <circle
          cx="100"
          cy="100"
          r="98"
          fill="none"
          stroke="#f5e7c8"
          strokeWidth="0.5"
        />
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="#f5e7c8"
          strokeWidth="0.5"
        />
        <path
          d="M100 2 L100 198 M2 100 L198 100"
          stroke="#f5e7c8"
          strokeWidth="0.5"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
        <button
          onClick={() => router.push("/")}
          className="mb-8 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#f5e7c8]/60 transition hover:text-[#f5e7c8]"
        >
          <span aria-hidden="true">←</span> Choose a different country
        </button>

        {/* Header: passport-stamp style */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#f5e7c8]/15 pb-6 sm:mb-10">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c1432b]">
              Photo Frame · {countryCode}
            </p>
            <h1 className="font-serif text-3xl font-bold leading-tight text-[#f5e7c8] sm:text-4xl">
              {country ? country.name : "Loading…"}
            </h1>
            <p className="mt-2 max-w-md text-sm text-[#f5e7c8]/55">
              Upload a wide photo, then drag and zoom to fit it inside the
              frame.
            </p>
          </div>
          <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full border border-dashed border-[#f5e7c8]/30 text-center sm:h-20 sm:w-20">
            <span className="text-[10px] font-semibold uppercase leading-tight tracking-widest text-[#f5e7c8]/70">
              {stage}
            </span>
          </div>
        </div>

        {adjusting && country ? (
          <div className="flex justify-center">
            <div className="w-full max-w-xl rounded-2xl border border-[#f5e7c8]/15 bg-[#15233a]/80 p-4 shadow-2xl shadow-black/40 sm:p-6">
              <FrameAdjuster
                photoUrl={previewUrl}
                frameImageUrl={country.frameImageUrl}
                aspect={aspect}
                onCancel={() => setAdjusting(false)}
                onApply={handleApplyAdjustment}
              />
            </div>
          </div>
        ) : (
          /* Boarding-pass layout: two stubs joined by a perforated seam */
          <div className="relative flex flex-col overflow-hidden rounded-2xl border border-[#f5e7c8]/15 bg-[#15233a]/70 shadow-2xl shadow-black/40 backdrop-blur-sm sm:flex-row">
            {/* Stub 1 — capture */}
            <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#f5e7c8]/45">
                01 · Your photo
              </p>
              <div className="flex flex-1 flex-col items-center justify-center gap-4">
                <ImageUploader onFileSelected={handleFileSelected} />
                {previewUrl && !loading && (
                  <button
                    onClick={() => setAdjusting(true)}
                    className="text-sm font-medium text-[#d9a23c] underline-offset-4 hover:underline"
                  >
                    Re-adjust position
                  </button>
                )}
              </div>
            </div>

            {/* Perforated seam */}
            <div
              className="relative my-2 border-t border-dashed border-[#f5e7c8]/25 sm:my-6 sm:border-l sm:border-t-0"
              aria-hidden="true"
            >
              <span className="absolute -left-3 -top-3 hidden h-6 w-6 rounded-full bg-[#0f1b2d] sm:block" />
              <span className="absolute -bottom-3 -left-3 hidden h-6 w-6 rounded-full bg-[#0f1b2d] sm:block" />
              <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-[#0f1b2d] sm:hidden" />
              <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-[#0f1b2d] sm:hidden" />
            </div>

            {/* Stub 2 — result */}
            <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#f5e7c8]/45">
                02 · Framed result
              </p>
              <div className="flex flex-1 flex-col items-center justify-center gap-4">
                <FramePreview resultUrl={resultUrl} loading={loading} />
                {resultUrl && (
                  <DownloadShareButtons
                    resultUrl={resultUrl}
                    shareUrl={shareUrl}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {error && (
          <p className="mt-6 rounded-lg border border-[#c1432b]/30 bg-[#c1432b]/10 px-4 py-3 text-center text-sm text-[#f29a8a]">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}

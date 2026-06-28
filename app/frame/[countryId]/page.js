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

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat bg-[url('/assets/Banner/mobile.jpeg')] sm:bg-[url('/assets/Banner/desktop.jpeg')]"
        aria-hidden="true"
      />

      {/* Optional dark overlay for readability */}
      <div className="absolute inset-0 -z-10 bg-black/50" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-16">
        <button
          onClick={() => router.push("/")}
          className="mb-8 text-sm text-slate-400 hover:text-slate-200"
        >
          ← Choose a different country
        </button>

        <h1 className="mb-2 text-3xl font-bold text-white">
          {country ? country.name : "Loading…"}
        </h1>
        <p className="mb-10 text-slate-400">
          Upload your wide angle photo, then drag and zoom to position it inside
          the frame.
        </p>

        {adjusting && country ? (
          <div className="flex justify-center">
            <FrameAdjuster
              photoUrl={previewUrl}
              frameImageUrl={country.frameImageUrl}
              aspect={aspect}
              onCancel={() => setAdjusting(false)}
              onApply={handleApplyAdjustment}
            />
          </div>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2">
            <div className="flex flex-col items-center gap-3">
              <ImageUploader onFileSelected={handleFileSelected} />
              {previewUrl && !loading && (
                <button
                  onClick={() => setAdjusting(true)}
                  className="text-sm text-goldframe hover:underline"
                >
                  Re-adjust position
                </button>
              )}
            </div>

            <div className="flex flex-col items-center gap-4">
              <FramePreview resultUrl={resultUrl} loading={loading} />
              {resultUrl && (
                <DownloadShareButtons
                  resultUrl={resultUrl}
                  shareUrl={shareUrl}
                />
              )}
            </div>
          </div>
        )}

        {error && (
          <p className="mt-6 text-center text-sm text-red-400">{error}</p>
        )}
      </div>
    </main>
  );
}

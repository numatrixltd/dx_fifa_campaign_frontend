"use client";

import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";

export default function FrameAdjuster({
  photoUrl,
  frameImageUrl,
  aspect,
  onApply,
  onCancel,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_croppedArea, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative w-80 overflow-hidden rounded-2xl bg-black/40"
        style={{ aspectRatio: aspect }}
      >
        <Cropper
          image={photoUrl}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          cropShape="rect"
          showGrid={false}
          restrictPosition={true}
          objectFit="cover"
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
        <img
          src={frameImageUrl}
          alt="frame guide"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="flex w-80 items-center gap-3">
        <span className="text-xs text-slate-400">Zoom</span>
        <input
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="flex-1"
        />
      </div>

      <p className="max-w-80 text-center text-xs text-slate-500">
        Drag to reposition, use the slider to zoom. Apply when it looks right.
      </p>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="rounded-full border border-white/20 px-5 py-2 text-sm text-slate-200 hover:bg-white/10"
        >
          Cancel
        </button>
        <button
          onClick={() => croppedAreaPixels && onApply(croppedAreaPixels)}
          disabled={!croppedAreaPixels}
          className="rounded-full bg-goldframe px-5 py-2 text-sm font-bold text-slate-900 disabled:opacity-40"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

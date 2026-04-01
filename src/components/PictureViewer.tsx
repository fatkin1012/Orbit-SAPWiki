import React, { useEffect, useMemo, useRef, useState } from 'react';

type PictureViewerProps = {
  isOpen: boolean;
  images: string[];
  initialIndex: number;
  title?: string;
  onClose: () => void;
  onSaveAnnotated: (annotatedImage: string, sourceIndex: number) => void;
};

export default function PictureViewer({
  isOpen,
  images,
  initialIndex,
  title = '',
  onClose,
  onSaveAnnotated,
}: PictureViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [drawEnabled, setDrawEnabled] = useState(false);
  const [eraseEnabled, setEraseEnabled] = useState(false);
  const [brushColor, setBrushColor] = useState('#ff3344');
  const [brushSize, setBrushSize] = useState(4);
  const [undoCount, setUndoCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [imageMaxHeight, setImageMaxHeight] = useState<number | null>(null);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const hasDrawnInStrokeRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const historyRef = useRef<string[]>([]);

  const getViewportHeight = () => {
    const candidates = [
      window.innerHeight,
      document.documentElement?.clientHeight ?? 0,
      window.visualViewport?.height ?? 0,
      document.body?.clientHeight ?? 0,
    ].filter((value) => Number.isFinite(value) && value > 0);
    return candidates.length ? Math.max(...candidates) : window.innerHeight;
  };

  const setViewportHeightVar = () => {
    const vh = getViewportHeight() * 0.01;
    document.documentElement.style.setProperty('--pv-vh', `${vh}px`);
  };

  const updateImageLayout = () => {
    const dialog = dialogRef.current;
    const header = headerRef.current;
    const toolbar = toolbarRef.current;
    if (!dialog) return;

    const dialogHeight = dialog.clientHeight;
    const headerHeight = header?.offsetHeight ?? 0;
    const toolbarHeight = toolbar?.offsetHeight ?? 0;
    // Reserve space for paddings/gaps so image area never collapses in host WebView.
    const available = Math.max(220, dialogHeight - headerHeight - toolbarHeight - 56);
    setImageMaxHeight(available);
  };

  const currentImage = useMemo(() => images[currentIndex], [images, currentIndex]);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setDrawEnabled(false);
      setEraseEnabled(false);
    }
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrentIndex((p) => (p + 1) % images.length);
      if (e.key === 'ArrowLeft') setCurrentIndex((p) => (p - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [images.length, isOpen, onClose]);

  const saveHistorySnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const snapshot = canvas.toDataURL('image/png');
    if (historyRef.current[historyRef.current.length - 1] === snapshot) return;
    historyRef.current = [...historyRef.current, snapshot];
    setUndoCount(historyRef.current.length - 1);
  };

  const syncCanvasSize = () => {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (!image || !canvas) return;
    canvas.width = image.clientWidth;
    canvas.height = image.clientHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    historyRef.current = [canvas.toDataURL('image/png')];
    setUndoCount(0);
  };

  useEffect(() => {
    if (!isOpen) return;
    setViewportHeightVar();
    const onResize = () => {
      setViewportHeightVar();
      updateImageLayout();
      syncCanvasSize();
    };
    const visualViewport = window.visualViewport;
    window.addEventListener('resize', onResize);
    visualViewport?.addEventListener('resize', onResize);
    const raf = window.requestAnimationFrame(onResize);
    const delayed = window.setTimeout(onResize, 120);
    return () => {
      window.removeEventListener('resize', onResize);
      visualViewport?.removeEventListener('resize', onResize);
      window.cancelAnimationFrame(raf);
      window.clearTimeout(delayed);
    };
  }, [isOpen, currentIndex]);

  useEffect(() => {
    if (!isOpen) return;
    setViewportHeightVar();
    updateImageLayout();
    return () => {
      document.documentElement.style.removeProperty('--pv-vh');
      setImageMaxHeight(null);
    };
  }, [isOpen]);

  const drawLine = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = eraseEnabled ? 'destination-out' : 'source-over';
    ctx.strokeStyle = eraseEnabled ? 'rgba(0,0,0,1)' : brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  };

  const getCanvasPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawEnabled) return;
    const point = getCanvasPoint(e);
    drawingRef.current = true;
    hasDrawnInStrokeRef.current = true;
    lastPointRef.current = point;
    drawLine(point, point);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawEnabled || !drawingRef.current || !lastPointRef.current) return;
    const point = getCanvasPoint(e);
    drawLine(lastPointRef.current, point);
    hasDrawnInStrokeRef.current = true;
    lastPointRef.current = point;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (drawingRef.current && hasDrawnInStrokeRef.current) saveHistorySnapshot();
    drawingRef.current = false;
    hasDrawnInStrokeRef.current = false;
    lastPointRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || historyRef.current.length <= 1) return;
    historyRef.current = historyRef.current.slice(0, -1);
    const previousSnapshot = historyRef.current[historyRef.current.length - 1];
    if (!previousSnapshot) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setUndoCount(historyRef.current.length - 1);
    };
    img.src = previousSnapshot;
  };

  const handleClearMarks = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveHistorySnapshot();
  };

  const exportAnnotatedImage = async () => {
    const baseImageSrc = images[currentIndex];
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!baseImageSrc || !canvas || !image) return;
    setSaving(true);
    try {
      const merged = await new Promise<string>((resolve, reject) => {
        const base = new Image();
        base.onload = () => {
          const mergedCanvas = document.createElement('canvas');
          mergedCanvas.width = base.naturalWidth;
          mergedCanvas.height = base.naturalHeight;
          const ctx = mergedCanvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not create drawing context.'));
            return;
          }
          ctx.drawImage(base, 0, 0, mergedCanvas.width, mergedCanvas.height);
          const annotation = new Image();
          annotation.onload = () => {
            ctx.drawImage(annotation, 0, 0, mergedCanvas.width, mergedCanvas.height);
            resolve(mergedCanvas.toDataURL('image/png'));
          };
          annotation.onerror = () => resolve(mergedCanvas.toDataURL('image/png'));
          annotation.src = canvas.toDataURL('image/png');
        };
        base.onerror = () => reject(new Error('Failed to load source image.'));
        base.src = baseImageSrc;
      });

      onSaveAnnotated(merged, currentIndex);
      handleClearMarks();
      setDrawEnabled(false);
      setEraseEnabled(false);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen || images.length === 0 || !currentImage) return null;

  return (
    <div className="pv-overlay" role="dialog" aria-modal="true">
      <div className="pv-dialog" ref={dialogRef}>
        <div className="pv-header" ref={headerRef}>
          <p className="pv-title">{title} - Image {currentIndex + 1} / {images.length}</p>
          <div className="pv-controls">
            <button type="button" onClick={() => setCurrentIndex((p) => (p - 1 + images.length) % images.length)}>Prev</button>
            <button type="button" onClick={() => setCurrentIndex((p) => (p + 1) % images.length)}>Next</button>
            <button type="button" onClick={onClose} className="ghost">Close</button>
          </div>
        </div>

        <div className="pv-toolbar" ref={toolbarRef}>
          <button type="button" onClick={() => setDrawEnabled((p) => !p)} className={drawEnabled ? 'active' : ''}>{drawEnabled ? 'Drawing On' : 'Draw'}</button>
          <button type="button" onClick={() => { setEraseEnabled((p) => !p); if (!drawEnabled) setDrawEnabled(true); }} className={eraseEnabled ? 'active' : ''}>{eraseEnabled ? 'Eraser On' : 'Eraser'}</button>

          <div className="pv-brush-group">
            <label>Color</label>
            <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} aria-label="Brush color" />
            <label htmlFor="brush-size">Brush</label>
            <input id="brush-size" type="range" min={2} max={18} value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} />
          </div>

          <button type="button" onClick={handleUndo} disabled={undoCount === 0}>Undo</button>
          <button type="button" onClick={handleClearMarks}>Clear</button>
          <button type="button" onClick={exportAnnotatedImage} disabled={saving} className="primary">{saving ? 'Saving...' : 'Save'}</button>
        </div>

        <div className="pv-body">
          <div className="pv-image-wrap">
            <img
              ref={imageRef}
              src={currentImage}
              alt={`Viewer image ${currentIndex + 1}`}
              className="pv-image"
              style={imageMaxHeight ? { maxHeight: `${imageMaxHeight}px` } : undefined}
              onLoad={() => {
                updateImageLayout();
                syncCanvasSize();
              }}
            />
            <canvas ref={canvasRef} className={`pv-canvas ${drawEnabled ? (eraseEnabled ? 'erase' : 'draw') : 'disabled'}`} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp} />
          </div>
        </div>
      </div>
    </div>
  );
}

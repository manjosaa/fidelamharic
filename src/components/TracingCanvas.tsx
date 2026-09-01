import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  PenTool,
  RotateCcw,
  Volume2,
  Eraser,
  Undo2,
  Download,
  Palette,
} from 'lucide-react';
import { FidelFamily, Language } from '../types';
import { speechService } from '../services/speechService';

interface TracingCanvasProps {
  fidel: FidelFamily;
  lang: Language;
}

export const TracingCanvas: React.FC<TracingCanvasProps> = ({ fidel, lang }) => {
  const isFr = lang === 'fr';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeFormIndex, setActiveFormIndex] = useState<number>(0);
  const [penColor, setPenColor] = useState<string>('#28324A');
  const [lineWidth, setLineWidth] = useState<number>(6);
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [history, setHistory] = useState<ImageData[]>([]);

  const activeForm = fidel.forms[activeFormIndex] || fidel.base;

  // Handle active form change
  const handleSelectForm = (idx: number) => {
    setActiveFormIndex(idx);
    speechService.speak(fidel.forms[idx]);
    clearCanvas();
  };

  // Resize and redraw background guide
  const drawGuide = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // We keep user drawing if any, or clear if empty
  }, []);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.floor(rect.width);
    const height = Math.min(320, Math.max(220, Math.floor(rect.width * 0.55)));

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      initCanvas();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas]);

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Save history before new stroke
    const dpr = window.devicePixelRatio || 1;
    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-10), snapshot]);

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = isEraser ? '#FFFFFF' : penColor;
    ctx.lineWidth = isEraser ? lineWidth * 2.5 : lineWidth;
    setIsDrawing(true);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHistory([]);
  };

  const undo = () => {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prevSnapshot = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    ctx.putImageData(prevSnapshot, 0, 0);
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `fidel-${activeForm}-practice.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const colors = [
    { label: 'Encre', value: '#28324A' },
    { label: 'Vert', value: '#3E6650' },
    { label: 'Rouge', value: '#A83A28' },
    { label: 'Or', value: '#C4881F' },
  ];

  return (
    <section id="section-tracing" className="mb-6">
      <div className="flex items-center justify-between border-b border-dashed border-[#CFC3A6] pb-2 mb-3">
        <h2 className="font-serif font-bold text-lg sm:text-xl text-[#28324A] flex items-center gap-2">
          <span className="text-xl sm:text-2xl text-[#C4881F] font-serif">5.</span>
          <span>{isFr ? 'Atelier de traçage & écriture' : 'Letter Tracing & Handwriting'}</span>
        </h2>
        <button
          onClick={() => speechService.speak(activeForm)}
          className="text-xs text-[#3E6650] hover:text-[#28324A] flex items-center gap-1 px-2 py-1 bg-white/70 hover:bg-[#EAD9AF] rounded-md border border-[#CFC3A6] transition-colors"
          title="Écouter"
        >
          <Volume2 className="w-3.5 h-3.5 text-[#C4881F]" />
          <span className="font-amh font-bold text-sm">{activeForm}</span>
        </button>
      </div>

      <p className="text-xs sm:text-sm text-[#5C6478] mb-3">
        {isFr
          ? 'Choisissez une forme ci-dessous et entraînez-vous à tracer la lettre au doigt ou au stylet sur l’écran tactile :'
          : 'Choose a form below and practice tracing with your finger or stylus on the interactive drawing board:'}
      </p>

      {/* Form selection tabs for tracing */}
      <div className="no-print flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-3">
        {fidel.forms.map((f, i) => {
          const isSelected = i === activeFormIndex;
          return (
            <button
              key={f}
              onClick={() => handleSelectForm(i)}
              className={`min-w-[42px] h-11 px-2.5 rounded-xl font-amh text-lg font-bold transition-all flex flex-col items-center justify-center shrink-0 border ${
                isSelected
                  ? 'bg-[#3E6650] text-white border-[#3E6650] shadow-sm scale-105'
                  : 'bg-white text-[#28324A] border-[#CFC3A6] hover:bg-[#F7F1E4]'
              }`}
            >
              <span>{f}</span>
              <span className={`text-[9px] font-sans ${isSelected ? 'text-white/80' : 'text-[#5C6478]'}`}>
                {i + 1}
              </span>
            </button>
          );
        })}
      </div>

      {/* Interactive Touch Drawing Board (No-print) */}
      <div className="no-print bg-white border border-[#CFC3A6] rounded-xl p-3 shadow-xs mb-4">
        {/* Canvas Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#CFC3A6]/40 pb-2.5 mb-2.5 text-xs">
          {/* Colors & Width */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 bg-[#F7F1E4] p-1 rounded-lg border border-[#CFC3A6]">
              {colors.map((c) => (
                <button
                  key={c.value}
                  onClick={() => {
                    setPenColor(c.value);
                    setIsEraser(false);
                  }}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    !isEraser && penColor === c.value
                      ? 'border-[#28324A] scale-110 shadow-xs'
                      : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.value }}
                  title={c.label}
                />
              ))}
            </div>

            {/* Eraser Toggle */}
            <button
              onClick={() => setIsEraser(!isEraser)}
              className={`p-1.5 rounded-lg border transition-all flex items-center gap-1 ${
                isEraser
                  ? 'bg-[#A83A28] text-white border-[#A83A28]'
                  : 'bg-white border-[#CFC3A6] text-[#5C6478] hover:text-[#28324A]'
              }`}
              title={isFr ? 'Gomme' : 'Eraser'}
            >
              <Eraser className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">
                {isFr ? 'Gomme' : 'Eraser'}
              </span>
            </button>

            {/* Line width pills */}
            <div className="flex items-center gap-1 bg-[#F7F1E4] p-1 rounded-lg border border-[#CFC3A6]">
              {[3, 6, 10].map((w) => (
                <button
                  key={w}
                  onClick={() => setLineWidth(w)}
                  className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                    lineWidth === w
                      ? 'bg-[#28324A] text-white'
                      : 'text-[#5C6478] hover:bg-white'
                  }`}
                  title={`${w}px`}
                >
                  <span
                    className="rounded-full bg-current"
                    style={{ width: `${w + 1}px`, height: `${w + 1}px` }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons: Undo, Clear, Save */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={undo}
              disabled={history.length === 0}
              className="p-1.5 bg-white border border-[#CFC3A6] rounded-lg text-[#5C6478] hover:text-[#28324A] disabled:opacity-30 transition-colors"
              title={isFr ? 'Annuler' : 'Undo'}
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={clearCanvas}
              className="flex items-center gap-1 px-2 py-1.5 bg-white border border-[#CFC3A6] rounded-lg text-[#5C6478] hover:text-[#A83A28] hover:border-[#A83A28] transition-colors"
              title={isFr ? 'Effacer le tableau' : 'Clear drawing'}
            >
              <RotateCcw className="w-3 h-3" />
              <span className="text-[11px]">{isFr ? 'Effacer' : 'Clear'}</span>
            </button>
            <button
              onClick={downloadDrawing}
              className="p-1.5 bg-white border border-[#CFC3A6] rounded-lg text-[#5C6478] hover:text-[#3E6650] transition-colors"
              title={isFr ? 'Télécharger le dessin' : 'Save image'}
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Canvas Area with Ghost Character Guide */}
        <div
          ref={containerRef}
          className="relative w-full h-[220px] sm:h-[260px] bg-[#FAF8F3] rounded-lg overflow-hidden border border-dashed border-[#CFC3A6] flex items-center justify-center select-none touch-none cursor-crosshair"
        >
          {/* Background Ghost Guide of current Fidel letter */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
            <span className="font-amh text-8xl sm:text-9xl font-bold text-[#28324A]/10 leading-none">
              {activeForm}
            </span>
          </div>

          {/* Dotted Notebook Baseline guides */}
          <div className="absolute inset-x-0 top-1/4 border-b border-dashed border-[#CFC3A6]/40 pointer-events-none" />
          <div className="absolute inset-x-0 top-2/4 border-b border-[#CFC3A6]/40 pointer-events-none" />
          <div className="absolute inset-x-0 top-3/4 border-b border-dashed border-[#CFC3A6]/40 pointer-events-none" />

          {/* Interactive HTML5 Canvas */}
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="absolute inset-0 w-full h-full z-10 touch-none"
          />
        </div>
      </div>

      {/* Printable/Workbook handwriting line traces (visible on web and in print!) */}
      <div className="space-y-3 p-4 bg-white/70 border border-[#CFC3A6] rounded-xl">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#5C6478] border-b border-[#CFC3A6]/60 pb-1.5 mb-2">
          {isFr ? 'Lignes de calligraphie (7 formes)' : 'Handwriting Lines (7 Forms)'}
        </div>
        <div className="space-y-3">
          {fidel.forms.map((form, i) => (
            <div
              key={form}
              className="flex items-center gap-3 sm:gap-4 group hover:bg-[#F7F1E4]/60 p-1.5 rounded-lg transition-colors"
            >
              {/* Primary clickable model letter */}
              <button
                onClick={() => speechService.speak(form)}
                className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-white border border-[#CFC3A6] flex items-center justify-center font-amh text-2xl sm:text-3xl font-bold text-[#3E6650] hover:bg-[#EAD9AF] shrink-0 shadow-xs cursor-pointer"
                title={isFr ? `Écouter ${form}` : `Listen to ${form}`}
              >
                {form}
              </button>

              {/* Dotted ghost handwriting practice cells */}
              <div className="flex-1 flex items-center gap-2 sm:gap-4 border-b border-[#CFC3A6] pb-1.5">
                {[1, 2, 3, 4].map((slot) => (
                  <span
                    key={slot}
                    className="flex-1 text-center font-amh text-2xl sm:text-3xl font-normal text-[#C9BCA0] select-none"
                  >
                    {form}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

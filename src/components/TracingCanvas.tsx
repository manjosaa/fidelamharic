import React, { useRef, useState, useEffect } from 'react';
import { FidelFamily, Language } from '../types';
import { ORDER_NAMES } from '../data/fidelData';
import { Undo2, Trash2, Volume2, Eraser, PenTool } from 'lucide-react';
import { speechService } from '../services/speechService';

interface TracingCanvasProps {
  fidel: FidelFamily;
  lang: Language;
}

export const TracingCanvas: React.FC<TracingCanvasProps> = ({ fidel, lang }) => {
  const isFr = lang === 'fr';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedFormIndex, setSelectedFormIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState('#28324A');
  const [strokeWidth, setStrokeWidth] = useState(8);
  const [isEraser, setIsEraser] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);

  const activeGlyph = fidel.forms[selectedFormIndex];
  const orderInfo = ORDER_NAMES[selectedFormIndex];

  // Draw background guidelines and watermark letter
  const drawGuidelines = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Fill paper background
    ctx.fillStyle = '#F7F1E4';
    ctx.fillRect(0, 0, width, height);

    // Horizontal notebook lines
    const lineCount = 5;
    const spacing = height / lineCount;
    ctx.strokeStyle = '#E2D6BC';
    ctx.lineWidth = 1.5;

    for (let i = 1; i < lineCount; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * spacing);
      ctx.lineTo(width, i * spacing);
      ctx.stroke();
    }

    // Red left margin line
    ctx.strokeStyle = 'rgba(168, 58, 40, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(35, 0);
    ctx.lineTo(35, height);
    ctx.stroke();

    // Watermark letter in center
    ctx.save();
    ctx.fillStyle = 'rgba(40, 50, 74, 0.12)';
    ctx.font = `${Math.floor(height * 0.72)}px "Noto Serif Ethiopic", serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(activeGlyph, width / 2, height / 2);
    ctx.restore();
  };

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Handle high DPI
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    drawGuidelines(ctx, rect.width, rect.height);
    setHistory([]);
  };

  useEffect(() => {
    initCanvas();
  }, [fidel.base, selectedFormIndex]);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-15), data]);
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveState();
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = isEraser ? strokeWidth * 2.5 : strokeWidth;
    ctx.strokeStyle = isEraser ? '#F7F1E4' : penColor;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const last = history[history.length - 1];
    ctx.putImageData(last, 0, 0);
    setHistory((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    initCanvas();
  };

  const handleSelectForm = (idx: number) => {
    setSelectedFormIndex(idx);
    speechService.speak(fidel.forms[idx]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-cinzel text-base font-bold text-[#28324A] flex items-center gap-2">
          <span className="text-[#C4881F]">5.</span>
          <span>{isFr ? 'Atelier de calligraphie & tracé' : 'Tracing & Calligraphy Canvas'}</span>
        </h3>
        <button
          onClick={() => speechService.speak(activeGlyph)}
          className="flex items-center gap-1 text-xs text-[#5C6478] hover:text-[#3E6650] bg-white/80 border border-[#CFC3A6] px-2.5 py-1 rounded-lg transition shadow-2xs"
        >
          <Volume2 className="w-3.5 h-3.5 text-[#C4881F]" />
          <span className="font-ethiopic font-bold">{activeGlyph}</span>
        </button>
      </div>

      <p className="text-xs text-[#5C6478] leading-relaxed">
        {isFr
          ? 'Sélectionnez une forme parmi les 7 ordres, puis tracez-la sur les lignes de cahier :'
          : 'Pick one of the 7 forms below, then trace its strokes on the lined canvas:'}
      </p>

      {/* 7 Forms Tabs */}
      <div className="grid grid-cols-7 gap-1">
        {fidel.forms.map((form, idx) => {
          const isSelected = idx === selectedFormIndex;
          return (
            <button
              key={form}
              onClick={() => handleSelectForm(idx)}
              className={`py-1 rounded-xl border flex flex-col items-center justify-center transition shadow-2xs ${
                isSelected
                  ? 'bg-[#3E6650] text-white border-[#3E6650]'
                  : 'bg-white/80 text-[#28324A] border-[#CFC3A6] hover:border-[#C4881F]'
              }`}
            >
              <span className="font-ethiopic text-xl font-bold">{form}</span>
              <span className={`text-[9px] ${isSelected ? 'text-white/80' : 'text-[#8A93A6]'}`}>
                {idx + 1}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-xs text-[#5C6478]">
        <span className="font-medium">
          {isFr ? 'Ordre' : 'Order'} {selectedFormIndex + 1} : {orderInfo?.nameAmh} ({isFr ? orderInfo?.nameFr : orderInfo?.nameEn})
        </span>
        <span className="text-[#C4881F] font-semibold">
          {isFr ? 'Voyelle :' : 'Vowel:'} {orderInfo?.vowel}
        </span>
      </div>

      {/* Canvas Paper Card */}
      <div className="bg-[#F7F1E4] border-2 border-[#CFC3A6] rounded-2xl p-1 shadow-sm overflow-hidden relative">
        <canvas
          ref={canvasRef}
          className="w-full h-56 rounded-xl touch-none cursor-crosshair block"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      {/* Canvas Tooling Controls */}
      <div className="bg-white/90 border border-[#CFC3A6] rounded-xl p-2.5 flex items-center justify-between gap-2 flex-wrap text-xs shadow-xs">
        {/* Colors */}
        <div className="flex items-center gap-1.5">
          {['#28324A', '#3E6650', '#A83A28', '#C4881F'].map((c) => (
            <button
              key={c}
              onClick={() => {
                setPenColor(c);
                setIsEraser(false);
              }}
              style={{ backgroundColor: c }}
              className={`w-6 h-6 rounded-full border transition ${
                !isEraser && penColor === c ? 'ring-2 ring-[#C4881F] scale-110' : 'opacity-80'
              }`}
            />
          ))}
        </div>

        {/* Thickness */}
        <div className="flex items-center gap-1">
          {[
            { size: 4, label: isFr ? 'Fin' : 'Fine' },
            { size: 8, label: isFr ? 'Moyen' : 'Med' },
            { size: 14, label: isFr ? 'Épais' : 'Thick' },
          ].map((item) => (
            <button
              key={item.size}
              onClick={() => setStrokeWidth(item.size)}
              className={`px-2 py-1 rounded-lg border text-[11px] transition ${
                strokeWidth === item.size
                  ? 'bg-[#EDE3CC] border-[#C4881F] font-bold text-[#28324A]'
                  : 'bg-white border-[#CFC3A6] text-[#5C6478]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Action buttons (Eraser, Undo, Clear) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsEraser(!isEraser)}
            className={`p-1.5 rounded-lg border transition ${
              isEraser
                ? 'bg-[#A83A28] text-white border-[#A83A28]'
                : 'bg-white text-[#5C6478] border-[#CFC3A6] hover:border-[#A83A28]'
            }`}
            title="Gomme"
          >
            <Eraser className="w-4 h-4" />
          </button>
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            className="p-1.5 rounded-lg border border-[#CFC3A6] bg-white text-[#5C6478] hover:border-[#28324A] disabled:opacity-40 transition"
            title="Annuler le dernier trait"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleClear}
            className="p-1.5 rounded-lg border border-[#CFC3A6] bg-white text-[#A83A28] hover:bg-[#A83A28]/10 transition"
            title="Effacer le canevas"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

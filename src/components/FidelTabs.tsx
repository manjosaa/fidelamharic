import React, { useRef, useEffect } from 'react';
import { FidelFamily } from '../types';
import { FIDEL_DATA } from '../data/fidelData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { speechService } from '../services/speechService';

interface FidelTabsProps {
  currentFidel: FidelFamily;
  onSelectFidel: (fidel: FidelFamily) => void;
}

export const FidelTabs: React.FC<FidelTabsProps> = ({
  currentFidel,
  onSelectFidel,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentIndex = FIDEL_DATA.findIndex((f) => f.base === currentFidel.base);

  const prevFidel = currentIndex > 0 ? FIDEL_DATA[currentIndex - 1] : null;
  const nextFidel = currentIndex < FIDEL_DATA.length - 1 ? FIDEL_DATA[currentIndex + 1] : null;

  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentFidel.base]);

  return (
    <div className="flex items-center gap-1.5 w-full mb-3">
      {prevFidel && (
        <button
          onClick={() => {
            speechService.speak(prevFidel.base);
            onSelectFidel(prevFidel);
          }}
          className="p-2 bg-white border border-[#CFC3A6] hover:border-[#C4881F] text-[#28324A] rounded-xl transition shadow-xs shrink-0"
          title="Lettre précédente"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex items-center gap-1.5 overflow-x-auto py-1 px-1 scrollbar-none flex-1"
        style={{ scrollbarWidth: 'none' }}
      >
        {FIDEL_DATA.map((item) => {
          const isSelected = item.base === currentFidel.base;
          return (
            <button
              key={item.base}
              data-active={isSelected ? 'true' : 'false'}
              onClick={() => {
                speechService.speak(item.base);
                onSelectFidel(item);
              }}
              className={`px-3 py-1.5 rounded-t-xl rounded-b-md border transition shrink-0 flex items-center justify-center min-w-[42px] ${
                isSelected
                  ? 'bg-[#F7F1E4] border-[#C4881F] text-[#3E6650] font-bold shadow-xs'
                  : 'bg-white/80 border-[#CFC3A6] text-[#5C6478] hover:bg-white hover:border-[#C4881F]'
              }`}
            >
              <span className="font-ethiopic text-xl leading-none">{item.base}</span>
            </button>
          );
        })}
      </div>

      {nextFidel && (
        <button
          onClick={() => {
            speechService.speak(nextFidel.base);
            onSelectFidel(nextFidel);
          }}
          className="p-2 bg-white border border-[#CFC3A6] hover:border-[#C4881F] text-[#28324A] rounded-xl transition shadow-xs shrink-0"
          title="Lettre suivante"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

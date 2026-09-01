import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FidelFamily } from '../types';
import { FIDEL_DATA } from '../data/fidelData';
import { speechService } from '../services/speechService';

interface FidelTabsProps {
  currentFidel: FidelFamily;
  onSelectFidel: (fidel: FidelFamily) => void;
}

export const FidelTabs: React.FC<FidelTabsProps> = ({
  currentFidel,
  onSelectFidel,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll to active tab on change
  useEffect(() => {
    if (activeTabRef.current && containerRef.current) {
      const container = containerRef.current;
      const element = activeTabRef.current;
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      if (
        elementRect.left < containerRect.left ||
        elementRect.right > containerRect.right
      ) {
        element.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  }, [currentFidel.base]);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSelect = (fidel: FidelFamily) => {
    onSelectFidel(fidel);
    speechService.speak(fidel.base);
  };

  // Find prev and next letters
  const currentIndex = FIDEL_DATA.findIndex((f) => f.base === currentFidel.base);
  const prevFidel = currentIndex > 0 ? FIDEL_DATA[currentIndex - 1] : null;
  const nextFidel = currentIndex < FIDEL_DATA.length - 1 ? FIDEL_DATA[currentIndex + 1] : null;

  return (
    <div id="fidel-tabs-container" className="no-print relative mb-2 flex items-center">
      {/* Scroll Left Button */}
      <button
        id="scroll-tabs-left-btn"
        onClick={() => scroll('left')}
        className="hidden md:flex items-center justify-center w-8 h-8 rounded-l-lg bg-[#F7F1E4] border border-[#CFC3A6] text-[#28324A] hover:bg-[#EAD9AF] shrink-0 transition-colors z-10"
        aria-label="Scroll tabs left"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Tabs list with horizontal scroll */}
      <div
        ref={containerRef}
        id="tabs-scroll-area"
        className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-1 w-full scroll-smooth"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {FIDEL_DATA.map((fidel) => {
          const isActive = fidel.base === currentFidel.base;
          return (
            <button
              key={fidel.base}
              ref={isActive ? activeTabRef : null}
              id={`tab-fidel-${fidel.base}`}
              onClick={() => handleSelect(fidel)}
              className={`min-w-[40px] sm:min-w-[44px] h-10 px-2 rounded-t-lg font-amh text-lg sm:text-xl font-bold flex items-center justify-center transition-all shrink-0 border-t border-x ${
                isActive
                  ? 'bg-[#F7F1E4] text-[#28324A] border-[#C4881F] shadow-sm transform -translate-y-0.5 border-b-2 border-b-transparent z-10 ring-1 ring-[#C4881F]/30'
                  : 'bg-white/80 text-[#5C6478] border-[#CFC3A6] hover:bg-white hover:text-[#28324A]'
              }`}
              title={fidel.name || fidel.base}
            >
              <span>{fidel.base}</span>
            </button>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      <button
        id="scroll-tabs-right-btn"
        onClick={() => scroll('right')}
        className="hidden md:flex items-center justify-center w-8 h-8 rounded-r-lg bg-[#F7F1E4] border border-[#CFC3A6] text-[#28324A] hover:bg-[#EAD9AF] shrink-0 transition-colors z-10"
        aria-label="Scroll tabs right"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Quick Prev / Next jump buttons on phone */}
      <div className="flex md:hidden items-center gap-1 ml-1 shrink-0">
        {prevFidel && (
          <button
            onClick={() => handleSelect(prevFidel)}
            className="p-1.5 bg-white border border-[#CFC3A6] rounded-md text-xs font-bold text-[#5C6478] hover:text-[#28324A]"
            title={`Précédent: ${prevFidel.base}`}
          >
            ← {prevFidel.base}
          </button>
        )}
        {nextFidel && (
          <button
            onClick={() => handleSelect(nextFidel)}
            className="p-1.5 bg-white border border-[#CFC3A6] rounded-md text-xs font-bold text-[#5C6478] hover:text-[#28324A]"
            title={`Suivant: ${nextFidel.base}`}
          >
            {nextFidel.base} →
          </button>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { FidelFamily, Language } from '../types';
import { ORDER_NAMES } from '../data/fidelData';
import { Volume2 } from 'lucide-react';
import { speechService } from '../services/speechService';

interface FidelChartProps {
  fidel: FidelFamily;
  lang: Language;
}

export const FidelChart: React.FC<FidelChartProps> = ({ fidel, lang }) => {
  const isFr = lang === 'fr';

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-cinzel text-base font-bold text-[#28324A] flex items-center gap-2">
          <span className="text-[#C4881F]">1.</span>
          <span>{isFr ? 'Tableau du fidel' : 'Fidel Chart & Orders'}</span>
        </h3>
        <span className="text-xs text-[#5C6478] flex items-center gap-1">
          <Volume2 className="w-3.5 h-3.5 text-[#C4881F]" />
          {isFr ? '7 ordres vocaliques' : '7 vowel orders'}
        </span>
      </div>

      <p className="text-xs text-[#5C6478] leading-relaxed">
        {isFr
          ? 'Chaque consonne se décline en sept formes selon la voyelle associée. Touchez une lettre ou un mot pour écouter :'
          : 'Each consonant root inflects into seven distinct forms depending on the vowel sound. Tap any letter or word to listen:'}
      </p>

      {/* Table Container */}
      <div className="border border-[#CFC3A6] rounded-xl overflow-hidden bg-white/90 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#EDE3CC]/60 border-b border-[#CFC3A6] text-[#5C6478] font-semibold">
                <th className="py-2 px-3 w-8">#</th>
                <th className="py-2 px-3">{isFr ? 'Forme' : 'Form'}</th>
                <th className="py-2 px-3">{isFr ? 'Son' : 'Sound'}</th>
                <th className="py-2 px-3">{isFr ? 'Exemple' : 'Example'}</th>
                <th className="py-2 px-3">{isFr ? 'Signification' : 'Meaning'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CFC3A6]/40">
              {fidel.forms.map((form, index) => {
                const orderInfo = ORDER_NAMES[index];
                const vocab = fidel.vocab.find((v) => v.form === form);
                const sound = vocab?.translit.split(' ')[0] || orderInfo?.vowel || '';

                return (
                  <tr
                    key={form}
                    className="hover:bg-[#EDE3CC]/30 transition group cursor-pointer"
                    onClick={() => speechService.speak(vocab?.word || form)}
                  >
                    <td className="py-2 px-3 font-cinzel font-bold text-[#C4881F]">
                      {index + 1}
                    </td>
                    <td className="py-2 px-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speechService.speak(form);
                        }}
                        className="font-ethiopic text-2xl font-bold text-[#3E6650] hover:text-[#C4881F] transition bg-[#EDE3CC]/40 px-2 py-0.5 rounded-lg inline-block"
                      >
                        {form}
                      </button>
                    </td>
                    <td className="py-2 px-3 text-[#5C6478] italic">
                      {sound}
                    </td>
                    <td className="py-2 px-3">
                      {vocab ? (
                        <div className="flex items-center gap-1.5">
                          <span className="font-ethiopic font-semibold text-sm text-[#28324A]">
                            {vocab.word}
                          </span>
                          <Volume2 className="w-3.5 h-3.5 text-[#C4881F] opacity-70 group-hover:opacity-100 transition" />
                        </div>
                      ) : (
                        <span className="text-[#8A93A6]">—</span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-[#5C6478]">
                      {vocab ? (isFr ? vocab.fr : vocab.en) : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

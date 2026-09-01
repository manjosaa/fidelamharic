import React from 'react';
import { Volume2 } from 'lucide-react';
import { FidelFamily, Language } from '../types';
import { ORDER_NAMES } from '../data/fidelData';
import { speechService } from '../services/speechService';

interface FidelChartProps {
  fidel: FidelFamily;
  lang: Language;
}

export const FidelChart: React.FC<FidelChartProps> = ({ fidel, lang }) => {
  const isFr = lang === 'fr';

  const handleSpeak = (text: string) => {
    speechService.speak(text);
  };

  return (
    <section id="section-fidel-chart" className="mb-8">
      <div className="flex items-center justify-between border-b border-dashed border-[#CFC3A6] pb-2 mb-3">
        <h2 className="font-serif font-bold text-lg sm:text-xl text-[#28324A] flex items-center gap-2">
          <span className="text-xl sm:text-2xl text-[#C4881F] font-serif">1.</span>
          <span>{isFr ? 'Tableau du fidel' : 'Fidel Chart & Orders'}</span>
        </h2>
        <span className="text-xs text-[#5C6478] flex items-center gap-1">
          <Volume2 className="w-3.5 h-3.5 text-[#C4881F]" />
          {isFr ? '7 ordres vocaliques' : '7 vowel orders'}
        </span>
      </div>

      <p className="text-xs sm:text-sm text-[#5C6478] mb-3">
        {isFr
          ? 'Chaque consonne se décline en sept formes selon la voyelle associée. Touchez une lettre ou un mot pour écouter :'
          : 'Each consonant root inflects into seven distinct forms depending on the vowel sound. Tap any letter or word to listen:'}
      </p>

      {/* Responsive Table / Card Container */}
      <div className="overflow-x-auto rounded-lg border border-[#CFC3A6] bg-white/70 shadow-xs">
        <table className="w-full text-left border-collapse min-w-[320px]">
          <thead>
            <tr className="bg-[#EDE3CC]/60 border-b border-[#CFC3A6] text-[11px] sm:text-xs text-[#5C6478] font-bold uppercase tracking-wider">
              <th className="py-2.5 px-3 sm:px-4">#</th>
              <th className="py-2.5 px-3 sm:px-4">{isFr ? 'Forme' : 'Form'}</th>
              <th className="py-2.5 px-3 sm:px-4">{isFr ? 'Son' : 'Sound'}</th>
              <th className="py-2.5 px-3 sm:px-4">{isFr ? 'Exemple' : 'Example'}</th>
              <th className="py-2.5 px-3 sm:px-4">{isFr ? 'Signification' : 'Meaning'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#CFC3A6]/40 text-xs sm:text-sm">
            {fidel.forms.map((form, index) => {
              const orderInfo = ORDER_NAMES[index];
              const vocab = fidel.vocab.find((v) => v.form === form);
              const sound = vocab
                ? vocab.translit.split(' ')[0].split(',')[0]
                : orderInfo
                ? orderInfo.vowel
                : '';
              const meaning = vocab ? (isFr ? vocab.fr : vocab.en) : '—';

              return (
                <tr
                  key={form}
                  className="hover:bg-[#F7F1E4] transition-colors group"
                >
                  {/* Order Index */}
                  <td className="py-2 px-3 sm:px-4 font-serif text-[#C4881F] text-xs sm:text-sm font-semibold">
                    {index + 1}
                  </td>

                  {/* Glyph Button */}
                  <td className="py-2 px-3 sm:px-4">
                    <button
                      id={`glyph-btn-${form}`}
                      onClick={() => handleSpeak(vocab ? vocab.word : form)}
                      className="font-amh text-2xl sm:text-3xl text-[#3E6650] font-bold px-2 py-0.5 rounded-lg hover:bg-[#EAD9AF] active:scale-95 transition-all inline-flex items-center justify-center min-w-[38px] cursor-pointer"
                      title={isFr ? `Écouter ${form}` : `Listen to ${form}`}
                    >
                      {form}
                    </button>
                  </td>

                  {/* Phonetic sound */}
                  <td className="py-2 px-3 sm:px-4 font-serif italic text-[#5C6478] text-xs sm:text-sm">
                    {sound}
                  </td>

                  {/* Example Word */}
                  <td className="py-2 px-3 sm:px-4 font-amh">
                    {vocab ? (
                      <button
                        id={`word-btn-${vocab.word}`}
                        onClick={() => handleSpeak(vocab.word)}
                        className="text-sm sm:text-base font-semibold text-[#28324A] hover:text-[#3E6650] px-2 py-1 rounded-md hover:bg-[#EAD9AF]/60 transition-colors flex items-center gap-1.5 cursor-pointer"
                        title={isFr ? `Écouter "${vocab.word}"` : `Listen to "${vocab.word}"`}
                      >
                        <span>{vocab.word}</span>
                        <Volume2 className="w-3 h-3 text-[#C4881F] opacity-70 group-hover:opacity-100" />
                      </button>
                    ) : (
                      <span className="text-[#CFC3A6]">—</span>
                    )}
                  </td>

                  {/* Meaning */}
                  <td className="py-2 px-3 sm:px-4 text-[#5C6478] text-xs sm:text-sm">
                    {meaning}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

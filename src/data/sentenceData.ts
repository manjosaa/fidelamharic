import { AmharicSentence, GrammarRule, DifficultWordItem, SentencePuzzle } from '../types';

export const AMHARIC_SENTENCES: AmharicSentence[] = [
  {
    id: 's1',
    amharic: 'ትልቁ ልጅ ጣፋጭ ዳቦ ይበላል።',
    translit: 'Tələqu ləǧ ṭafač dabo yəbälal.',
    en: 'The big boy eats delicious bread.',
    fr: 'Le grand garçon mange du pain délicieux.',
    category: 'daily',
    categoryLabelAm: 'የዕለት ተዕለት',
    categoryLabelEn: 'Daily Life',
    categoryLabelFr: 'Vie Quotidienne',
    difficulty: 'beginner',
    grammarPattern: '[ቅጽል / Adj + Def] + [ስም / Noun] + [ቅጽል / Adj] + [ስም / Noun] + [ግሥ / Verb]',
    grammarTipEn: 'Notice SOV order: Subject (ትልቁ ልጅ) comes first, Object (ጣፋጭ ዳቦ) in the middle, and Verb (ይበላል) at the end. The definite article "-ኡ" attaches to the adjective "ትልቅ" → "ትልቁ".',
    grammarTipFr: 'Notez l’ordre SOV : Sujet (ትልቁ ልጅ) au début, Objet (ጣፋጭ ዳቦ) au milieu, et Verbe (ይበላል) à la fin. L’article défini « -ኡ » se fixe sur l’adjectif « ትልቅ » → « ትልቁ ».',
    tokens: [
      {
        word: 'ትልቁ',
        translit: 'tələq-u',
        pos: 'adjective',
        posLabelAm: 'ቅጽል (Adjective)',
        en: 'the big',
        fr: 'le grand',
        root: 'ትልቅ (tələq)',
        explanationEn: 'Adjective with masculine definite suffix "-u" (-ኡ).',
        explanationFr: 'Adjectif avec suffixe défini masculin « -u » (-ኡ).'
      },
      {
        word: 'ልጅ',
        translit: 'ləǧ',
        pos: 'noun',
        posLabelAm: 'ስም (Noun)',
        en: 'child / boy',
        fr: 'enfant / garçon',
        root: 'ልጅ',
        explanationEn: 'Subject noun (masculine).',
        explanationFr: 'Nom sujet (masculin).'
      },
      {
        word: 'ጣፋጭ',
        translit: 'ṭafač',
        pos: 'adjective',
        posLabelAm: 'ቅጽል (Adjective)',
        en: 'delicious / sweet',
        fr: 'délicieux / sucré',
        root: 'ጣፈጠ (to be sweet)',
        explanationEn: 'Adjective modifying the object "ዳቦ". Uses ejective consonant "ጠ" (ṭ).',
        explanationFr: 'Adjectif qualifiant le nom « ዳቦ ». Utilise la consonne éjective « ጠ » (ṭ).'
      },
      {
        word: 'ዳቦ',
        translit: 'dabo',
        pos: 'noun',
        posLabelAm: 'ስም (Noun)',
        en: 'bread',
        fr: 'pain',
        root: 'ዳቦ',
        explanationEn: 'Direct object noun.',
        explanationFr: 'Nom objet direct.'
      },
      {
        word: 'ይበላል',
        translit: 'yə-bäl-al',
        pos: 'verb',
        posLabelAm: 'ግሥ (Verb)',
        en: 'he eats',
        fr: 'il mange',
        root: 'በላ (bälla - to eat)',
        explanationEn: 'Present/future tense, 3rd person masculine singular (yə- ... -al).',
        explanationFr: 'Présent/futur, 3e personne du singulier masculin (yə- ... -al).'
      }
    ]
  },
  {
    id: 's2',
    amharic: 'ቆንጆዋ ልጅ አዲስ መጽሐፍ ታነባለች።',
    translit: 'Qonǧowa ləǧ addis mäṣḥaf tanäbbaläč.',
    en: 'The beautiful girl reads a new book.',
    fr: 'La belle fille lit un nouveau livre.',
    category: 'school',
    categoryLabelAm: 'ትምህርትና ንባብ',
    categoryLabelEn: 'School & Reading',
    categoryLabelFr: 'École & Lecture',
    difficulty: 'beginner',
    grammarPattern: '[ቅጽል / Adj + Fem Def] + [ስም / Noun] + [ቅጽል / Adj] + [ስም / Noun] + [ግሥ / Verb]',
    grammarTipEn: 'Feminine agreement: The feminine definite marker "-ዋ" (-wa) attaches to the adjective "ቆንጆ", and the verb takes feminine prefix/suffix "ት-...-አለች" (ታነባለች).',
    grammarTipFr: 'Accord au féminin : Le marqueur défini féminin « -ዋ » (-wa) se fixe sur « ቆንጆ », et le verbe prend le préfixe/suffixe féminin « ት-...-አለች » (ታነባለች).',
    tokens: [
      {
        word: 'ቆንጆዋ',
        translit: 'qonǧo-wa',
        pos: 'adjective',
        posLabelAm: 'ቅጽል (Adjective)',
        en: 'the beautiful',
        fr: 'la belle',
        root: 'ቆንጆ (qonǧo)',
        explanationEn: 'Adjective with feminine definite suffix "-wa" (-ዋ).',
        explanationFr: 'Adjectif avec suffixe défini féminin « -wa » (-ዋ).'
      },
      {
        word: 'ልጅ',
        translit: 'ləǧ',
        pos: 'noun',
        posLabelAm: 'ስም (Noun)',
        en: 'girl / child',
        fr: 'fille / enfant',
        root: 'ልጅ',
        explanationEn: 'Subject noun understood as feminine due to "ቆንጆዋ".',
        explanationFr: 'Nom sujet compris au féminin grâce à « ቆንጆዋ ».'
      },
      {
        word: 'አዲስ',
        translit: 'addis',
        pos: 'adjective',
        posLabelAm: 'ቅጽል (Adjective)',
        en: 'new',
        fr: 'nouveau / neuf',
        root: 'አዲስ',
        explanationEn: 'Adjective placed right before the modified noun "መጽሐፍ".',
        explanationFr: 'Adjectif placé juste avant le nom qualifié « መጽሐፍ ».'
      },
      {
        word: 'መጽሐፍ',
        translit: 'mäṣḥaf',
        pos: 'noun',
        posLabelAm: 'ስም (Noun)',
        en: 'book',
        fr: 'livre',
        root: 'ጻፈ (ṣafä - to write)',
        explanationEn: 'Noun derived from root "to write" with prefix "mä-". Contains ejective "ጸ/ጽ" and "ሐ".',
        explanationFr: 'Nom dérivé de la racine « écrire ». Contient l’éjective « ጽ » et le « ሐ ».'
      },
      {
        word: 'ታነባለች',
        translit: 't-anäbb-aläč',
        pos: 'verb',
        posLabelAm: 'ግሥ (Verb)',
        en: 'she reads',
        fr: 'elle lit',
        root: 'አነበበ (anäbbäbä - to read)',
        explanationEn: 'Present/future tense, 3rd person feminine singular (t-...-aläč).',
        explanationFr: 'Présent/futur, 3e personne du singulier féminin (t-...-aläč).'
      }
    ]
  },
  {
    id: 's3',
    amharic: 'ፈጣኑ ውሻ ወደ ቤቱ ይሮጣል።',
    translit: 'Fäṭṭanu wəšša wädä betu yəroṭal.',
    en: 'The fast dog runs to the house.',
    fr: 'Le chien rapide court vers la maison.',
    category: 'action',
    categoryLabelAm: 'እንቅስቃሴና እንስሳት',
    categoryLabelEn: 'Animals & Motion',
    categoryLabelFr: 'Animaux & Mouvement',
    difficulty: 'beginner',
    grammarPattern: '[ቅጽል / Adj + Def] + [ስም / Noun] + [መስተዋድድ / Prep] + [ስም / Noun + Def] + [ግሥ / Verb]',
    grammarTipEn: '"ወደ" (wädä) is a preposition meaning "towards/to". In Amharic, prepositions precede nouns, while the verb "ይሮጣል" remains at the very end.',
    grammarTipFr: '« ወደ » (wädä) est une préposition signifiant « vers/à ». En amharique, la préposition précède le nom, tandis que le verbe « ይሮጣል » reste à la toute fin.',
    tokens: [
      {
        word: 'ፈጣኑ',
        translit: 'fäṭṭan-u',
        pos: 'adjective',
        posLabelAm: 'ቅጽል (Adjective)',
        en: 'the fast',
        fr: 'le rapide',
        root: 'ፈጣን (fast)',
        explanationEn: 'Contains doubled "ṭ" (gemination) and masculine article "-u".',
        explanationFr: 'Comporte le « ṭ » doublé et le suffixe défini masculin « -u ».'
      },
      {
        word: 'ውሻ',
        translit: 'wəšša',
        pos: 'noun',
        posLabelAm: 'ስም (Noun)',
        en: 'dog',
        fr: 'chien',
        root: 'ውሻ',
        explanationEn: 'Subject noun.',
        explanationFr: 'Nom sujet.'
      },
      {
        word: 'ወደ',
        translit: 'wädä',
        pos: 'particle',
        posLabelAm: 'መስተዋድድ (Preposition)',
        en: 'towards / to',
        fr: 'vers / à',
        root: 'ወደ',
        explanationEn: 'Directional preposition.',
        explanationFr: 'Préposition de direction.'
      },
      {
        word: 'ቤቱ',
        translit: 'bet-u',
        pos: 'noun',
        posLabelAm: 'ስም (Noun)',
        en: 'the house',
        fr: 'la maison',
        root: 'ቤት (bet - house)',
        explanationEn: 'Noun with definite article suffix "-u" (-ኡ).',
        explanationFr: 'Nom avec le suffixe défini « -u » (-ኡ).'
      },
      {
        word: 'ይሮጣል',
        translit: 'yə-roṭ-al',
        pos: 'verb',
        posLabelAm: 'ግሥ (Verb)',
        en: 'he runs',
        fr: 'il court',
        root: 'ሮጠ (roṭä - to run)',
        explanationEn: 'Present/future verb ending in ejective "ጠ" (ṭ).',
        explanationFr: 'Verbe au présent/futur se terminant par l’éjective « ጠ » (ṭ).'
      }
    ]
  },
  {
    id: 's4',
    amharic: 'ደማቁ ፀሐይ በጠዋት ታበራለች።',
    translit: 'Dämaqu ṣähay bäṭäwat tabäraläč.',
    en: 'The bright sun shines in the morning.',
    fr: 'Le soleil éclatant brille le matin.',
    category: 'nature',
    categoryLabelAm: 'ተፈጥሮና ቀለማት',
    categoryLabelEn: 'Nature & Light',
    categoryLabelFr: 'Nature & Lumière',
    difficulty: 'intermediate',
    grammarPattern: '[ቅጽል / Adj + Def] + [ስም / Noun] + [ቅጥያ / Prefix Prep + ስም / Noun] + [ግሥ / Verb]',
    grammarTipEn: 'In Amharic grammar, "ፀሐይ" (sun) is traditionally treated as feminine, so the verb takes feminine agreement "ታበራለች" (she/it shines). The prefix "በ-" (bä-) means "in/at/by".',
    grammarTipFr: 'En grammaire amharique, « ፀሐይ » (soleil) est traité au féminin, donc le verbe prend l’accord féminin « ታበራለች ». Le préfixe « በ- » (bä-) signifie « en/à/le ».',
    tokens: [
      {
        word: 'ደማቁ',
        translit: 'dämaq-u',
        pos: 'adjective',
        posLabelAm: 'ቅጽል (Adjective)',
        en: 'the bright / vivid',
        fr: 'l’éclatant / vif',
        root: 'ደማቅ (bright)',
        explanationEn: 'Adjective with definite suffix "-u". Contains uvular ejective "ቀ" (q).',
        explanationFr: 'Adjectif avec suffixe défini « -u ». Contient l’éjective « ቀ » (q).'
      },
      {
        word: 'ፀሐይ',
        translit: 'ṣähay',
        pos: 'noun',
        posLabelAm: 'ስም (Noun)',
        en: 'sun',
        fr: 'soleil',
        root: 'ፀሐይ',
        explanationEn: 'Feminine celestial noun. Written with ejective "ፀ" and pharyngeal "ሐ".',
        explanationFr: 'Nom céleste féminin. S’écrit avec l’éjective « ፀ » et « ሐ ».'
      },
      {
        word: 'በጠዋት',
        translit: 'bä-ṭäwat',
        pos: 'adverb',
        posLabelAm: 'ተውሳከ ግሥ (Adverbial phrase)',
        en: 'in the morning',
        fr: 'le matin / au matin',
        root: 'ጠዋት (morning)',
        explanationEn: 'Preposition prefix "bä-" attached directly to the noun "ṭäwat".',
        explanationFr: 'Préfixe « bä- » rattaché directement au nom « ṭäwat ».'
      },
      {
        word: 'ታበራለች',
        translit: 't-abär-aläč',
        pos: 'verb',
        posLabelAm: 'ግሥ (Verb)',
        en: 'she/it shines',
        fr: 'elle/il brille',
        root: 'አበራ (abärra - to illuminate)',
        explanationEn: 'Present/future tense, feminine agreement.',
        explanationFr: 'Présent/futur, accord féminin.'
      }
    ]
  },
  {
    id: 's5',
    amharic: 'እናቴ ትኩስ ቡና በስኒ አፈላች።',
    translit: 'Ənnate təkus buna bä-səni afällač.',
    en: 'My mother brewed hot coffee in a cup.',
    fr: 'Ma mère a préparé du café chaud dans une tasse.',
    category: 'food',
    categoryLabelAm: 'ባህልና ምግብ',
    categoryLabelEn: 'Culture & Coffee',
    categoryLabelFr: 'Culture & Café',
    difficulty: 'intermediate',
    grammarPattern: '[ስም + ባለቤት ቅጥያ / Noun + Poss] + [ቅጽል / Adj] + [ስም / Noun] + [ቅጥያ + ስም / Prep + Noun] + [ግሥ / Past Verb]',
    grammarTipEn: 'Past tense verb "አፈላች" (afällač) uses geminated "ል" (ll) and feminine past suffix "-ች" (-č). The possessive suffix "-ኤ" (-e) on "እናት" creates "እናቴ" (my mother).',
    grammarTipFr: 'Le verbe au passé « አፈላች » utilise la gémination du « ል » (ll) et la marque du passé féminin « -ች » (-č). Le suffixe possessif « -ኤ » (-e) sur « እናት » forme « እናቴ » (ma mère).',
    tokens: [
      {
        word: 'እናቴ',
        translit: 'ənnat-e',
        pos: 'noun',
        posLabelAm: 'ስም (Noun + Possessive)',
        en: 'my mother',
        fr: 'ma mère',
        root: 'እናት (mother)',
        explanationEn: 'Noun with 1st person possessive suffix "-e" (-ኤ).',
        explanationFr: 'Nom avec suffixe possessif 1re personne « -e » (-ኤ).'
      },
      {
        word: 'ትኩስ',
        translit: 'təkus',
        pos: 'adjective',
        posLabelAm: 'ቅጽል (Adjective)',
        en: 'hot / fresh',
        fr: 'chaud / frais',
        root: 'ተኮሰ (to iron/burn)',
        explanationEn: 'Adjective for hot food or drink.',
        explanationFr: 'Adjectif qualifiant un aliment ou boisson chaude.'
      },
      {
        word: 'ቡና',
        translit: 'buna',
        pos: 'noun',
        posLabelAm: 'ስም (Noun)',
        en: 'coffee',
        fr: 'café',
        root: 'ቡና',
        explanationEn: 'Object noun (Ethiopian coffee).',
        explanationFr: 'Nom objet (café éthiopien).'
      },
      {
        word: 'በስኒ',
        translit: 'bä-səni',
        pos: 'particle',
        posLabelAm: 'መስተዋድድ + ስም (Prep + Noun)',
        en: 'in a cup',
        fr: 'dans une tasse',
        root: 'ስኒ (small handleless cup)',
        explanationEn: 'Preposition "bä-" + traditional ceramic coffee cup "səni".',
        explanationFr: 'Préposition « bä- » + tasse à café traditionnelle « səni ».'
      },
      {
        word: 'አፈላች',
        translit: 'a-fälla-č',
        pos: 'verb',
        posLabelAm: 'ግሥ (Past Verb)',
        en: 'she boiled / brewed',
        fr: 'elle a fait bouillir / préparé',
        root: 'ፈላ (fälla - to boil)',
        explanationEn: 'Causative past verb (a- prefix) with 3rd person feminine past suffix "-č".',
        explanationFr: 'Verbe causatif au passé (préfixe a-) avec suffixe féminin « -č ».'
      }
    ]
  },
  {
    id: 's6',
    amharic: 'ጎበዙ ተማሪ አስቸጋሪውን ትምህርት አጠና።',
    translit: 'Gobäzu tämari asčäggariw-ən təmhərt aṭänna.',
    en: 'The smart student studied the difficult lesson.',
    fr: 'L’élève travailleur a étudié la leçon difficile.',
    category: 'school',
    categoryLabelAm: 'ትምህርትና ጥናት',
    categoryLabelEn: 'Study & Mastery',
    categoryLabelFr: 'Études & Apprentissage',
    difficulty: 'advanced',
    grammarPattern: '[ቅጽል + Def / Adj] + [ስም / Noun] + [ቅጽል + Def + Obj / Adj + -n] + [ስም / Noun] + [ግሥ / Verb]',
    grammarTipEn: 'Accusative suffix "-ን" (-ən): When a direct object is definite, the suffix "-ን" must attach to the modifying adjective ("አስቸጋሪው" → "አስቸጋሪውን").',
    grammarTipFr: 'Suffixe accusatif « -ን » (-ən) : Quand l’objet direct est défini, le suffixe accusatif « -ን » se fixe sur l’adjectif (« አስቸጋሪው » → « አስቸጋሪውን »).',
    tokens: [
      {
        word: 'ጎበዙ',
        translit: 'gobäz-u',
        pos: 'adjective',
        posLabelAm: 'ቅጽል (Adjective)',
        en: 'the smart / hardworking',
        fr: 'le travailleur / doué',
        root: 'ጎበዝ (clever/brave)',
        explanationEn: 'Adjective with masculine definite article "-u".',
        explanationFr: 'Adjectif avec suffixe défini masculin « -u ».'
      },
      {
        word: 'ተማሪ',
        translit: 'tämari',
        pos: 'noun',
        posLabelAm: 'ስም (Noun)',
        en: 'student',
        fr: 'élève / étudiant',
        root: 'ተማረ (tämharä - to learn)',
        explanationEn: 'Agent noun derived from the verb "to learn".',
        explanationFr: 'Nom d’agent dérivé du verbe « apprendre ».'
      },
      {
        word: 'አስቸጋሪውን',
        translit: 'as-čäggari-w-ən',
        pos: 'adjective',
        posLabelAm: 'ቅጽል (Adjective + Def + Obj)',
        en: 'the difficult (acc.)',
        fr: 'la difficile (acc.)',
        root: 'ቸገረ (čäggärä - to be difficult)',
        explanationEn: 'Adjective bearing BOTH the definite article "-w" and the accusative direct object marker "-ən" (-ን).',
        explanationFr: 'Adjectif portant à la fois l’article défini « -w » et le suffixe d’objet direct accusatif « -ən » (-ን).'
      },
      {
        word: 'ትምህርት',
        translit: 'təmhərt',
        pos: 'noun',
        posLabelAm: 'ስም (Noun)',
        en: 'lesson / education',
        fr: 'leçon / matière',
        root: 'ተማረ',
        explanationEn: 'Direct object noun.',
        explanationFr: 'Nom objet direct.'
      },
      {
        word: 'አጠና',
        translit: 'a-ṭänna',
        pos: 'verb',
        posLabelAm: 'ግሥ (Past Verb)',
        en: 'he studied',
        fr: 'il a étudié',
        root: 'ጠና (to be strong) → አጠና (to study)',
        explanationEn: 'Past tense verb with geminated "n" and ejective "ጠ" (ṭ).',
        explanationFr: 'Verbe au passé avec le « n » géminé et l’éjective « ጠ » (ṭ).'
      }
    ]
  },
  {
    id: 's7',
    amharic: 'ቀዩ አበባ በመስክ ውስጥ በሚያምር ሁኔታ ያብባል።',
    translit: 'Qäyyu abäba bä-mäsk wəsṭ bä-miyamər huneta yabbəbal.',
    en: 'The red flower blooms beautifully in the field.',
    fr: 'La fleur rouge s’épanouit magnifiquement dans le champ.',
    category: 'nature',
    categoryLabelAm: 'ተፈጥሮ',
    categoryLabelEn: 'Nature & Flora',
    categoryLabelFr: 'Nature & Flore',
    difficulty: 'advanced',
    grammarPattern: '[ቅጽል + Def] + [ስም] + [መስተዋድድ ፍሬም / Prep Frame] + [ተውሳከ ግሥ / Adverbial] + [ግሥ]',
    grammarTipEn: 'Circumposition "በ...ውስጥ" (bä-...-wəsṭ) surrounds the noun to mean "inside/in". Adverbial phrases are often built using "በ...ሁኔታ" (in a ... manner).',
    grammarTipFr: 'La locution « በ...ውስጥ » (bä-...-wəsṭ) encadre le nom pour signifier « à l’intérieur de ». Les adverbes de manière utilisent souvent « በ...ሁኔታ » (d’une manière...).',
    tokens: [
      {
        word: 'ቀዩ',
        translit: 'qäyy-u',
        pos: 'adjective',
        posLabelAm: 'ቅጽል (Adjective)',
        en: 'the red',
        fr: 'la rouge',
        root: 'ቀይ (red)',
        explanationEn: 'Color adjective with masculine/default definite suffix "-u".',
        explanationFr: 'Adjectif de couleur avec suffixe défini « -u ».'
      },
      {
        word: 'አበባ',
        translit: 'abäba',
        pos: 'noun',
        posLabelAm: 'ስም (Noun)',
        en: 'flower',
        fr: 'fleur',
        root: 'አበበ (to bloom)',
        explanationEn: 'Noun meaning flower.',
        explanationFr: 'Nom signifiant fleur.'
      },
      {
        word: 'በመስክ',
        translit: 'bä-mäsk',
        pos: 'noun',
        posLabelAm: 'መስተዋድድ + ስም',
        en: 'in field',
        fr: 'dans le champ',
        root: 'መስክ (field)',
        explanationEn: 'Preposition "bä-" + field "mäsk".',
        explanationFr: 'Préposition « bä- » + champ « mäsk ».'
      },
      {
        word: 'ውስጥ',
        translit: 'wəsṭ',
        pos: 'particle',
        posLabelAm: 'መስተዋድድ (Postposition)',
        en: 'inside / in',
        fr: 'dans / à l’intérieur',
        root: 'ውስጥ',
        explanationEn: 'Postposition completing the "bä-...-wəsṭ" spatial frame.',
        explanationFr: 'Postposition complétant la locution « በ...ውስጥ ».'
      },
      {
        word: 'በሚያምር',
        translit: 'bä-miyamər',
        pos: 'adjective',
        posLabelAm: 'ቅጽል (Adverbial participle)',
        en: 'beautifully / in a lovely',
        fr: 'd’une belle / gracieuse',
        root: 'አማረ (ammarä - to be beautiful)',
        explanationEn: 'Relative verb participle acting as adverb modifier.',
        explanationFr: 'Participe relatif agissant comme modificateur adverbial.'
      },
      {
        word: 'ሁኔታ',
        translit: 'huneta',
        pos: 'noun',
        posLabelAm: 'ስም (Noun)',
        en: 'manner / condition',
        fr: 'manière / condition',
        root: 'ሆነ (honä - to be)',
        explanationEn: 'Abstract noun meaning condition or manner.',
        explanationFr: 'Nom abstrait signifiant état ou manière.'
      },
      {
        word: 'ያብባል',
        translit: 'y-abbəb-al',
        pos: 'verb',
        posLabelAm: 'ግሥ (Verb)',
        en: 'it blooms',
        fr: 'il s’épanouit / fleurit',
        root: 'አበበ (abbäbä - to bloom)',
        explanationEn: 'Present/future tense of the verb "to blossom".',
        explanationFr: 'Présent/futur du verbe « fleurir ».'
      }
    ]
  },
  {
    id: 's8',
    amharic: 'ረጅሙ ባቡር ወደ አዲስ አበባ በሰላም ደረሰ።',
    translit: 'Räǧǧəmu babur wädä Addis Abäba bä-sälam därräsä.',
    en: 'The long train arrived safely in Addis Ababa.',
    fr: 'Le long train est arrivé en toute sécurité à Addis-Abeba.',
    category: 'action',
    categoryLabelAm: 'ጉዞና ከተማ',
    categoryLabelEn: 'Travel & City',
    categoryLabelFr: 'Voyage & Ville',
    difficulty: 'advanced',
    grammarPattern: '[ቅጽል + Def] + [ስም] + [መስተዋድድ + ስም] + [ተውሳከ ግሥ] + [ግሥ / Past Verb]',
    grammarTipEn: 'Idiomatic adverb "በሰላም" (bä-sälam = in peace / safely). The past tense verb "ደረሰ" (därräsä = arrived) anchors the sentence at the conclusion.',
    grammarTipFr: 'Adverbe idiomatique « በሰላም » (bä-sälam = en paix / sain et sauf). Le verbe au passé « ደረሰ » (därräsä = arrivé) clôture la phrase.',
    tokens: [
      {
        word: 'ረጅሙ',
        translit: 'räǧǧəm-u',
        pos: 'adjective',
        posLabelAm: 'ቅጽል (Adjective)',
        en: 'the long / tall',
        fr: 'le long / grand',
        root: 'ረጅም (long)',
        explanationEn: 'Adjective with geminated "ǧǧ" and masculine definite suffix "-u".',
        explanationFr: 'Adjectif avec consonne double « ǧǧ » et suffixe défini « -u ».'
      },
      {
        word: 'ባቡር',
        translit: 'babur',
        pos: 'noun',
        posLabelAm: 'ስም (Noun)',
        en: 'train',
        fr: 'train',
        root: 'ባቡር',
        explanationEn: 'Noun meaning train.',
        explanationFr: 'Nom signifiant train.'
      },
      {
        word: 'ወደ',
        translit: 'wädä',
        pos: 'particle',
        posLabelAm: 'መስተዋድድ (Preposition)',
        en: 'to / towards',
        fr: 'à / vers',
        root: 'ወደ',
        explanationEn: 'Preposition of destination.',
        explanationFr: 'Préposition de destination.'
      },
      {
        word: 'አዲስ አበባ',
        translit: 'Addis Abäba',
        pos: 'noun',
        posLabelAm: 'የተጸውዖ ስም (Proper Noun)',
        en: 'Addis Ababa ("New Flower")',
        fr: 'Addis-Abeba (« Nouvelle Fleur »)',
        root: 'አዲስ + አበባ',
        explanationEn: 'Compound proper noun meaning "New Flower", the capital of Ethiopia.',
        explanationFr: 'Nom propre composé signifiant « Nouvelle Fleur », capitale de l’Éthiopie.'
      },
      {
        word: 'በሰላም',
        translit: 'bä-sälam',
        pos: 'adverb',
        posLabelAm: 'ተውሳከ ግሥ (Adverbial)',
        en: 'safely / peacefully',
        fr: 'en sécurité / paisiblement',
        root: 'ሰላም (peace)',
        explanationEn: 'Preposition "bä-" + "sälam" (peace) = "safely".',
        explanationFr: 'Préposition « bä- » + « sälam » (paix) = « en sécurité ».'
      },
      {
        word: 'ደረሰ',
        translit: 'därräsä',
        pos: 'verb',
        posLabelAm: 'ግሥ (Past Verb)',
        en: 'he / it arrived',
        fr: 'il est arrivé',
        root: 'ደረሰ (to arrive)',
        explanationEn: '3rd person masculine singular past tense.',
        explanationFr: '3e personne du singulier masculin au passé.'
      }
    ]
  }
];

export const GRAMMAR_RULES: GrammarRule[] = [
  {
    id: 'sov-order',
    titleAm: 'የአረፍተ ነገር ቅደም ተከተል (ባለቤት - ተሳቢ - ማሰሪያ አንቀጽ)',
    titleEn: 'SOV Sentence Structure (Subject - Object - Verb)',
    titleFr: 'Structure SOV (Sujet - Objet - Verbe)',
    badge: 'መሰረታዊ ሕግ (Golden Rule)',
    concept: 'Word Order',
    formula: '[ባለቤት / Subject] + [ተሳቢ / Object] + [ማሰሪያ አንቀጽ / Verb]',
    explanationEn: 'Unlike English or French (which use Subject-Verb-Object "SVO"), Amharic strictly places the VERB at the very end of the sentence (Subject-Object-Verb "SOV"). If you put the verb in the middle, native speakers will find it unnatural.',
    explanationFr: 'Contrairement au français ou à l’anglais (qui utilisent Sujet-Verbe-Objet « SVO »), l’amharique place rigoureusement le VERBE à la fin absolue de la phrase (Sujet-Objet-Verbe « SOV »). Placer le verbe au milieu constitue une faute majeure.',
    examples: [
      {
        amharic: 'አበበ ዳቦ በላ።',
        translit: 'Abäbä dabo bälla.',
        en: 'Abebe ate bread. (Lit: Abebe [S] bread [O] ate [V])',
        fr: 'Abebe a mangé du pain. (Lit: Abebe [S] pain [O] a mangé [V])',
        breakdown: 'አበበ (Subject) + ዳቦ (Object) + በላ (Verb)'
      },
      {
        amharic: 'ተማሪዋ መጽሐፍ ታነባለች።',
        translit: 'Tämariwa mäṣḥaf tanäbbaläč.',
        en: 'The student reads a book. (Lit: The student [S] book [O] reads [V])',
        fr: 'L’élève lit un livre. (Lit: L’élève [S] livre [O] lit [V])',
        breakdown: 'ተማሪዋ (Subject) + መጽሐፍ (Object) + ታነባለች (Verb)'
      }
    ],
    pitfallsEn: [
      '❌ Avoid putting the verb before the object: Do NOT say "አበበ በላ ዳቦ"',
      '✔️ Always remember: The main verb is the anchor that closes the sentence!'
    ],
    pitfallsFr: [
      '❌ Ne placez jamais le verbe avant l’objet : Ne dites PAS « አበበ በላ ዳቦ »',
      '✔️ Règle d’or : Le verbe principal est l’ancre qui clôture la phrase !'
    ]
  },
  {
    id: 'adjective-position',
    titleAm: 'የቅጽልና የስም አቀማመጥ (ቅጽል ይቀድማል)',
    titleEn: 'Adjective Placement (Adjective Precedes Noun)',
    titleFr: 'Place de l’Adjectif (L’Adjectif Précède le Nom)',
    badge: 'ቅጽል + ስም',
    concept: 'Adjectives',
    formula: '[ቅጽል / Adjective] + [ስም / Noun]',
    explanationEn: 'In Amharic, adjectives ALWAYS precede the noun they describe (just like in English, but unlike French where adjectives often follow the noun). Furthermore, when making a phrase definite, the definite suffix attaches to the ADJECTIVE, not the noun!',
    explanationFr: 'En amharique, les adjectifs précèdent TOUJOURS le nom qu’ils qualifient (comme en anglais, à l’inverse du français où l’adjectif suit souvent le nom). De plus, pour rendre le groupe nominal défini, le suffixe défini s’accroche à l’ADJECTIF !',
    examples: [
      {
        amharic: 'ትልቅ ቤት → ትልቁ ቤት',
        translit: 'tələq bet → tələqu bet',
        en: 'a big house → the big house (definite "-u" is on "tələq")',
        fr: 'une grande maison → la grande maison (le « -u » défini est sur « tələq »)',
        breakdown: 'ትልቅ (big) + -ኡ (the) + ቤት (house)'
      },
      {
        amharic: 'ቆንጆ አበባ → ቆንጆዋ አበባ',
        translit: 'qonǧo abäba → qonǧowa abäba',
        en: 'a beautiful flower → the beautiful flower (feminine "-wa" on "qonǧo")',
        fr: 'une belle fleur → la belle fleur (le suffixe féminin « -wa » sur « qonǧo »)',
        breakdown: 'ቆንጆ (beautiful) + -ዋ (the fem.) + አበባ (flower)'
      }
    ],
    pitfallsEn: [
      '❌ Do not attach "-u" to both words: Say "ትልቁ ቤት", NOT "ትልቁ ቤቱ"',
      '✔️ The adjective steals the definite article marker from the noun!'
    ],
    pitfallsFr: [
      '❌ Ne doublez pas l’article défini : Dites « ትልቁ ቤት », et NON « ትልቁ ቤቱ »',
      '✔️ L’adjectif capte la marque de l’article défini à la place du nom !'
    ]
  },
  {
    id: 'definite-articles',
    titleAm: 'የአመልካች ቅጥያዎች (-ኡ፣ -ው፣ -ዋ፣ -ይቱ)',
    titleEn: 'Definite Article Suffixes (-u, -w, -wa, -ytu)',
    titleFr: 'Suffixes d’Article Défini (-u, -w, -wa, -ytu)',
    badge: 'መለያ ቅጥያ (The Articles)',
    concept: 'Definiteness',
    formula: 'Consonant end: +ኡ (-u) / Vowel end: +ው (-w) | Fem: +ዋ (-wa) / +ይቱ (-ytu)',
    explanationEn: 'Amharic does not have a standalone word for "the" (like English "the" or French "le/la"). Instead, it attaches suffixes to the end of nouns/adjectives depending on ending vowel/consonant and gender.',
    explanationFr: 'L’amharique n’a pas de mot séparé pour « le/la/les ». Il utilise des suffixes rattachés à la fin du nom ou de l’adjectif, selon la terminaison (voyelle ou consonne) et le genre.',
    examples: [
      {
        amharic: 'ቤት (house) + ኡ = ቤቱ (the house)',
        translit: 'bet + u = betu',
        en: 'The house (masculine / consonant end)',
        fr: 'La maison (masculin / fin consonne)',
        breakdown: 'Consonant ending takes -ኡ (-u)'
      },
      {
        amharic: 'ውሻ (dog) + ው = ውሻው (the dog)',
        translit: 'wəšša + w = wəššaw',
        en: 'The dog (masculine / vowel end takes -w)',
        fr: 'Le chien (masculin / fin voyelle prend -w)',
        breakdown: 'Vowel ending takes -ው (-w)'
      },
      {
        amharic: 'ሴት (woman) + ዋ = ሴቷ (the woman)',
        translit: 'set + wa = setwa (or setəywa)',
        en: 'The woman (feminine takes -wa / -twa)',
        fr: 'La femme (féminin prend -wa / -twa)',
        breakdown: 'Feminine ending takes -ዋ (-wa)'
      }
    ],
    pitfallsEn: [
      'Remember: If the word ends in a 6th order consonant (e.g. ት), add ኡ (ቤቱ). If it ends in 4th/1st order (e.g. ሻ), add ው (ውሻው).'
    ],
    pitfallsFr: [
      'Rappel : Si le mot se termine par un 6e ordre (ex. ት), ajoutez ኡ (ቤቱ). S’il se termine par un 4e ordre voyelle (ex. ሻ), ajoutez ው (ውሻው).'
    ]
  },
  {
    id: 'accusative-marker',
    titleAm: 'የቀጥተኛ ተሳቢ መለያ ቅጥያ (-ን / -n)',
    titleEn: 'Direct Object Accusative Marker (-ን / -n)',
    titleFr: 'Marqueur Accusatif d’Objet Direct (-ን / -n)',
    badge: 'ተሳቢ ቅጥያ (-ን)',
    concept: 'Direct Object',
    formula: '[Definite Object / Proper Noun] + [-ን / -n]',
    explanationEn: 'Whenever a direct object is definite (e.g. "the book", "Abebe", "my friend"), you MUST attach the accusative suffix "-ን" (-n) to it. If the object is modified by an adjective, "-ን" attaches to the adjective!',
    explanationFr: 'Dès qu’un objet direct est défini (ex. « le livre », « Abebe », « mon ami »), vous DEVEZ lui ajouter le suffixe accusatif « -ን » (-n). Si l’objet est précédé d’un adjectif, le suffixe « -ን » se fixe sur l’adjectif !',
    examples: [
      {
        amharic: 'መጽሐፉን አየሁ።',
        translit: 'Mäṣḥafun ayyähu.',
        en: 'I saw THE book. (መጽሐፍ + ኡ + ን)',
        fr: 'J’ai vu LE livre. (መጽሐፍ + ኡ + ን)',
        breakdown: 'መጽሐፍ (book) + -ኡ (the) + -ን (accusative)'
      },
      {
        amharic: 'አበበን ጠራሁ።',
        translit: 'Abäbän ṭärrahu.',
        en: 'I called Abebe. (Proper noun takes "-n")',
        fr: 'J’ai appelé Abebe. (Nom propre prend « -n »)',
        breakdown: 'አበበ (Abebe) + -ን (accusative marker)'
      }
    ],
    pitfallsEn: [
      'Indefinite objects do NOT take "-ን": "መጽሐፍ አየሁ" (I saw a book) vs "መጽሐፉን አየሁ" (I saw the book).'
    ],
    pitfallsFr: [
      'Les objets indéfinis ne prennent PAS « -ን » : « መጽሐፍ አየሁ » (J’ai vu un livre) vs « መጽሐፉን አየሁ » (J’ai vu le livre).'
    ]
  },
  {
    id: 'verb-conjugation',
    titleAm: 'የግሥ እርባታና ጾታ (ወንድ፣ ሴት፣ ብዙ)',
    titleEn: 'Verb Conjugation & Gender Distinction',
    titleFr: 'Conjugaison & Distinction Masculin/Féminin',
    badge: 'የግሥ እርባታ',
    concept: 'Verbs',
    formula: 'Past: በላ (he) / በላች (she) / በሉ (they) | Present: ይበላል (he) / ትበላለች (she)',
    explanationEn: 'Amharic distinguishes between masculine and feminine in 2nd and 3rd person singular! For example, "you" (masc: አንተ / fem: አንቺ) and "he/she" (እሱ / እሷ) change the verb prefixes and suffixes.',
    explanationFr: 'L’amharique distingue le masculin et le féminin aux 2e et 3e personnes du singulier ! Par exemple, « tu » (masc: አንተ / fem: አንቺ) et « il/elle » (እሱ / እሷ) modifient les préfixes et suffixes verbaux.',
    examples: [
      {
        amharic: 'እሱ ይሄዳል (He goes) vs እሷ ትሄዳለች (She goes)',
        translit: 'Əssu yəhedal vs Əsswa təhedaläč',
        en: 'Present tense gender distinction (yə- vs tə-...-aläč)',
        fr: 'Distinction de genre au présent (yə- vs tə-...-aläč)',
        breakdown: 'Masculine prefix "yə-" vs Feminine prefix "tə-" + suffix "-aläč"'
      },
      {
        amharic: 'እሱ ሄደ (He went) vs እሷ ሄደች (She went) vs እነሱ ሄዱ (They went)',
        translit: 'Əssu hedä vs Əsswa hedäč vs Ənnässu hedu',
        en: 'Past tense suffixes: -ä (masc), -äč (fem), -u (plural)',
        fr: 'Suffixes du passé : -ä (masc), -äč (fém), -u (pluriel)',
        breakdown: 'Root: ሄደ (hedä)'
      }
    ],
    pitfallsEn: [
      'Always check who the subject is before choosing between "ይ-" (he) and "ት-" (she/you masc)!'
    ],
    pitfallsFr: [
      'Vérifiez toujours le sujet avant de choisir entre « ይ- » (il) et « ት- » (elle/tu masc) !'
    ]
  }
];

export const DIFFICULT_WORDS: DifficultWordItem[] = [
  {
    id: 'diff-ejectives',
    amharic: 'ጠ፣ ጨ፣ ቀ፣ ጰ፣ ጸ/ፀ (የጉሮሮ ፈንጂ ድምጾች)',
    translit: 'ṭ, č̣, q, p̣, ṣ (Ejective Consonants)',
    en: 'The 5 Explosive Ejective Consonants',
    fr: 'Les 5 Consonnes Éjectives Explosives',
    category: 'ejective',
    categoryLabelAm: 'ፈንጂ ድምጾች',
    categoryLabelEn: 'Ejectives',
    categoryLabelFr: 'Éjectives',
    phoneticTip: 'Close your glottis (throat airway), build air pressure in the mouth, and release with a sharp "pop" without exhaling air from the lungs!',
    explanationEn: 'Amharic has 5 ejective consonants formed by closing the vocal cords and releasing trapped air with a crisp glottalic pop. English and French do not have these sounds, so learners often confuse them with non-ejective soft letters.',
    explanationFr: 'L’amharique possède 5 consonnes éjectives produites en fermant les cordes vocales et en libérant l’air avec un claquement net. Le français ne possède pas ces sons, d’où la confusion fréquente avec les consonnes douces.',
    comparison: {
      word1: {
        amharic: 'ጠጣ',
        translit: 'ṭäṭṭa',
        meaningEn: 'He drank (Ejective ṭ)',
        meaningFr: 'Il a bu (Éjective ṭ)',
        note: 'Sharp explosive "ṭ" with closed glottis'
      },
      word2: {
        amharic: 'ተማረ',
        translit: 'tämharä',
        meaningEn: 'He learned (Soft t)',
        meaningFr: 'Il a appris (t doux)',
        note: 'Standard gentle dental "t"'
      }
    },
    sampleSentence: {
      amharic: 'ጣፋጩን ሻይ በጠዋት ጠጣ።',
      translit: 'Ṭafačun šay bäṭäwat ṭäṭṭa.',
      en: 'He drank the delicious tea in the morning.',
      fr: 'Il a bu le thé délicieux au matin.'
    }
  },
  {
    id: 'diff-gemination',
    amharic: 'ጥብቅ እና ላልት (Consonant Doubling / Təbəq)',
    translit: 'Təbəq vs Lalat (Geminated vs Soft)',
    en: 'Consonant Doubling (Gemination) that Alters Meaning',
    fr: 'Le Redoublement Consonantique (Gémination / Təbəq)',
    category: 'gemination',
    categoryLabelAm: 'ጥብቅ ቃል',
    categoryLabelEn: 'Gemination',
    categoryLabelFr: 'Gémination',
    phoneticTip: 'Hold the consonant sound for twice the duration before releasing the vowel (like Italian "pizza" vs "pisa").',
    explanationEn: 'In Amharic, doubling a consonant (ጥብቅ / Təbəq) is not shown by a double letter in writing, but it COMPLETELY changes the word meaning! This is one of the most critical pronunciation subtleties for learners.',
    explanationFr: 'En amharique, redoubler une consonne (ጥብቅ / Təbəq) n’est pas visible graphiquement mais change TOTALEMENT le sens du mot ! C’est l’une des subtilités phonétiques majeures.',
    comparison: {
      word1: {
        amharic: 'አለ',
        translit: 'alä (soft l)',
        meaningEn: 'He said (ላልት / soft)',
        meaningFr: 'Il a dit (ላልት / doux)',
        note: 'Single short "l" sound'
      },
      word2: {
        amharic: 'አለ',
        translit: 'allä (doubled ll)',
        meaningEn: 'There is / exists (ጥብቅ / doubled)',
        meaningFr: 'Il y a / existe (ጥብቅ / géminé)',
        note: 'Hold the "l" twice as long!'
      }
    },
    sampleSentence: {
      amharic: 'ቤት ውስጥ ዳቦ አለ አለ።',
      translit: 'Bet wəsṭ dabo allä alä.',
      en: 'He said (alä) there is (allä) bread inside the house.',
      fr: 'Il a dit (alä) qu’il y a (allä) du pain dans la maison.'
    }
  },
  {
    id: 'diff-homophones',
    amharic: 'ተመሳሳይ ድምጽ ያላቸው ፊደላት (ሀ/ሐ/ኀ፣ ሰ/ሠ፣ አ/ዐ፣ ጸ/ፀ)',
    translit: 'Homophones: ha (ሀ/ሐ/ኀ), sä (ሰ/ሠ), a (አ/ዐ), ṣä (ጸ/ፀ)',
    en: 'Homophones: Different Letters with Identical Sounds',
    fr: 'Homophones : Lettres Différentes au Son Identique',
    category: 'homophone',
    categoryLabelAm: 'የድምጽ አምሳያ',
    categoryLabelEn: 'Homophones',
    categoryLabelFr: 'Homophones',
    phoneticTip: 'In modern spoken Amharic, ሀ, ሐ, and ኀ sound identical; ሰ and ሠ sound identical; አ and ዐ sound identical; ጸ and ፀ sound identical.',
    explanationEn: 'Originally in Ge\'ez (ancient Ethiopic), these letters represented distinct guttural or pharyngeal sounds. In modern Amharic, their sounds have merged, but traditional spelling is preserved for etymological accuracy.',
    explanationFr: 'À l’origine en Guèze, ces lettres représentaient des sons distincts. En amharique moderne, leurs sons ont fusionné, mais l’orthographe traditionnelle est scrupuleusement conservée.',
    comparison: {
      word1: {
        amharic: 'ሰማይ',
        translit: 'sämay',
        meaningEn: 'Sky / Heaven (written with regular ሰ)',
        meaningFr: 'Ciel (écrit avec ሰ classique)',
        note: 'Spelled with ንጉሥ ሰ'
      },
      word2: {
        amharic: 'ሥራ',
        translit: 'səra',
        meaningEn: 'Work / Job (traditionally written with ሠ)',
        meaningFr: 'Travail (écrit traditionnellement avec ሠ)',
        note: 'Spelled with ሐመር ሠ'
      }
    },
    sampleSentence: {
      amharic: 'በሰማይ ላይ ፀሐይ ደምቃ ታበራለች።',
      translit: 'Bä-sämay lay ṣähay dämqa tabäraläč.',
      en: 'In the sky, the sun shines brightly.',
      fr: 'Dans le ciel, le soleil brille vivement.'
    }
  },
  {
    id: 'diff-compound',
    amharic: 'የተዋቀሩ ውስብስብ ቃላት (Compound & Idiomatic Words)',
    translit: 'Compound Nouns & Words',
    en: 'Compound & Polysyllabic Amharic Words',
    fr: 'Mots Composés et Polysyllabiques',
    category: 'compound',
    categoryLabelAm: 'ቅንብር ቃላት',
    categoryLabelEn: 'Compound Words',
    categoryLabelFr: 'Mots Composés',
    phoneticTip: 'Break the compound into its two root parts to easily understand and pronounce it.',
    explanationEn: 'Amharic creates rich vocabulary by linking two nouns with the construct state marker "-ä" (e.g., ቤተ-መንግሥት = house of government / palace, ቤተ-መጽሐፍት = house of books / library).',
    explanationFr: 'L’amharique enrichit son vocabulaire en combinant deux noms avec le morphème de liaison « -ä » (ex. ቤተ-መንግሥት = maison de gouvernement / palais, ቤተ-መጽሐፍት = bibliothèque).',
    comparison: {
      word1: {
        amharic: 'ቤተ-መጽሐፍት',
        translit: 'betä-mäṣḥafət',
        meaningEn: 'Library (House of Books)',
        meaningFr: 'Bibliothèque (Maison des Livres)',
        note: 'ቤት (house) + መጽሐፍት (books)'
      },
      word2: {
        amharic: 'እግዚአብሔር ይመስገን',
        translit: 'əgzi’abəher yəmmäsgän',
        meaningEn: 'Thanks be to God / Thank you',
        meaningFr: 'Dieu soit loué / Merci',
        note: 'Most common expression for gratitude and well-being'
      }
    },
    sampleSentence: {
      amharic: 'ተማሪዎቹ ወደ ቤተ-መጽሐፍት ገቡ።',
      translit: 'Tämariwoču wädä betä-mäṣḥafət gäbbu.',
      en: 'The students entered into the library.',
      fr: 'Les étudiants sont entrés dans la bibliothèque.'
    }
  }
];

export const SENTENCE_PUZZLES: SentencePuzzle[] = [
  {
    id: 'p1',
    targetSentenceAm: 'ትልቁ ልጅ ዳቦ ይበላል።',
    translit: 'Tələqu ləǧ dabo yəbälal.',
    en: 'The big boy eats bread.',
    fr: 'Le grand garçon mange du pain.',
    scrambledWords: ['ይበላል', 'ትልቁ', 'ዳቦ', 'ልጅ'],
    correctOrder: ['ትልቁ', 'ልጅ', 'ዳቦ', 'ይበላል'],
    hintEn: 'Remember SOV order: Adjective + Subject Noun + Object Noun + Verb at the end!',
    hintFr: 'Rappelez-vous l’ordre SOV : Adjectif + Sujet + Objet + Verbe à la fin !',
    posMap: {
      'ትልቁ': 'adjective',
      'ልጅ': 'noun',
      'ዳቦ': 'noun',
      'ይበላል': 'verb'
    }
  },
  {
    id: 'p2',
    targetSentenceAm: 'ቆንጆዋ ልጅ መጽሐፍ ታነባለች።',
    translit: 'Qonǧowa ləǧ mäṣḥaf tanäbbaläč.',
    en: 'The beautiful girl reads a book.',
    fr: 'La belle fille lit un livre.',
    scrambledWords: ['ታነባለች', 'መጽሐፍ', 'ቆንጆዋ', 'ልጅ'],
    correctOrder: ['ቆንጆዋ', 'ልጅ', 'መጽሐፍ', 'ታነባለች'],
    hintEn: 'Start with the feminine adjective "ቆንጆዋ", then subject "ልጅ", object "መጽሐፍ", and finish with verb "ታነባለች".',
    hintFr: 'Commencez par l’adjectif féminin « ቆንጆዋ », puis sujet « ልጅ », objet « መጽሐፍ », et terminez par le verbe « ታነባለች ».',
    posMap: {
      'ቆንጆዋ': 'adjective',
      'ልጅ': 'noun',
      'መጽሐፍ': 'noun',
      'ታነባለች': 'verb'
    }
  },
  {
    id: 'p3',
    targetSentenceAm: 'ፈጣኑ ውሻ ወደ ቤቱ ይሮጣል።',
    translit: 'Fäṭṭanu wəšša wädä betu yəroṭal.',
    en: 'The fast dog runs to the house.',
    fr: 'Le chien rapide court vers la maison.',
    scrambledWords: ['ይሮጣል', 'ውሻ', 'ፈጣኑ', 'ወደ', 'ቤቱ'],
    correctOrder: ['ፈጣኑ', 'ውሻ', 'ወደ', 'ቤቱ', 'ይሮጣል።'],
    hintEn: 'Adjective "ፈጣኑ" + Noun "ውሻ" + Preposition "ወደ" + Noun "ቤቱ" + Verb "ይሮጣል".',
    hintFr: 'Adjectif « ፈጣኑ » + Nom « ውሻ » + Préposition « ወደ » + Nom « ቤቱ » + Verbe « ይሮጣል ».',
    posMap: {
      'ፈጣኑ': 'adjective',
      'ውሻ': 'noun',
      'ወደ': 'particle',
      'ቤቱ': 'noun',
      'ይሮጣል': 'verb'
    }
  },
  {
    id: 'p4',
    targetSentenceAm: 'ጎበዙ ተማሪ ትምህርቱን አጠና።',
    translit: 'Gobäzu tämari təmhərtun aṭänna.',
    en: 'The smart student studied his lesson.',
    fr: 'L’élève travailleur a étudié sa leçon.',
    scrambledWords: ['አጠና', 'ተማሪ', 'ትምህርቱን', 'ጎበዙ'],
    correctOrder: ['ጎበዙ', 'ተማሪ', 'ትምህርቱን', 'አጠና'],
    hintEn: 'Subject phrase "ጎበዙ ተማሪ" comes first, then object "ትምህርቱን", then past verb "አጠና".',
    hintFr: 'Le groupe sujet « ጎበዙ ተማሪ » en premier, puis l’objet « ትምህርቱን », puis le verbe « አጠና ».',
    posMap: {
      'ጎበዙ': 'adjective',
      'ተማሪ': 'noun',
      'ትምህርቱን': 'noun',
      'አጠና': 'verb'
    }
  }
];

export const NOUN_CATALOG = [
  { amharic: 'ልጅ', translit: 'ləǧ', en: 'child / boy', fr: 'enfant / garçon', gender: 'm' },
  { amharic: 'ልጅቷ', translit: 'ləǧətwa', en: 'the girl', fr: 'la fille', gender: 'f' },
  { amharic: 'ውሻው', translit: 'wəššaw', en: 'the dog', fr: 'le chien', gender: 'm' },
  { amharic: 'ድመቷ', translit: 'dəmätwa', en: 'the cat', fr: 'le chat', gender: 'f' },
  { amharic: 'ተማሪው', translit: 'tämariw', en: 'the student', fr: 'l’étudiant', gender: 'm' },
  { amharic: 'አስተማሪው', translit: 'astämariw', en: 'the teacher', fr: 'l’enseignant', gender: 'm' },
  { amharic: 'መጽሐፉ', translit: 'mäṣḥafu', en: 'the book', fr: 'le livre', gender: 'm' },
  { amharic: 'ዳቦ', translit: 'dabo', en: 'bread', fr: 'pain', gender: 'm' },
  { amharic: 'ውሃ', translit: 'wəha', en: 'water', fr: 'eau', gender: 'm' },
  { amharic: 'ቡና', translit: 'buna', en: 'coffee', fr: 'café', gender: 'm' }
];

export const ADJECTIVE_CATALOG = [
  { amharic: 'ትልቅ', translit: 'tələq', en: 'big / great', fr: 'grand' },
  { amharic: 'ትንሽ', translit: 'tənəš', en: 'small / little', fr: 'petit' },
  { amharic: 'ቆንጆ', translit: 'qonǧo', en: 'beautiful', fr: 'beau / belle' },
  { amharic: 'ጎበዝ', translit: 'gobäz', en: 'smart / hardworking', fr: 'travailleur / doué' },
  { amharic: 'ፈጣን', translit: 'fäṭṭan', en: 'fast / quick', fr: 'rapide' },
  { amharic: 'ጣፋጭ', translit: 'ṭafač', en: 'delicious / sweet', fr: 'délicieux' },
  { amharic: 'አዲስ', translit: 'addis', en: 'new', fr: 'nouveau' },
  { amharic: 'ቀይ', translit: 'qäyy', en: 'red', fr: 'rouge' },
  { amharic: 'ጥቁር', translit: 'ṭəqur', en: 'black', fr: 'noir' },
  { amharic: 'ብልህ', translit: 'bələh', en: 'wise / clever', fr: 'sage / astucieux' }
];

export const VERB_CATALOG = [
  { amharic: 'ይበላል', translit: 'yəbälal', en: 'he eats', fr: 'il mange', subjectType: 'he' },
  { amharic: 'ትበላለች', translit: 'təbälaläč', en: 'she eats', fr: 'elle mange', subjectType: 'she' },
  { amharic: 'ይጠጣል', translit: 'yəṭäṭal', en: 'he drinks', fr: 'il boit', subjectType: 'he' },
  {
    amharic: 'ያነባል',
    translit: 'yanäbal',
    en: 'he reads',
    fr: 'il lit',
    subjectType: 'he'
  },
  { amharic: 'ታነባለች', translit: 'tanäbbaläč', en: 'she reads', fr: 'elle lit', subjectType: 'she' },
  { amharic: 'ይሮጣል', translit: 'yəroṭal', en: 'he runs', fr: 'il court', subjectType: 'he' },
  { amharic: 'ትሮጣለች', translit: 'təroṭaläč', en: 'she runs', fr: 'elle court', subjectType: 'she' },
  { amharic: 'ያጠናል', translit: 'yaṭänal', en: 'he studies', fr: 'il étudie', subjectType: 'he' },
  { amharic: 'ተማረ', translit: 'tämharä', en: 'he learned (past)', fr: 'il a appris (passé)', subjectType: 'he' },
  { amharic: 'አየ', translit: 'ayyä', en: 'he saw (past)', fr: 'il a vu (passé)', subjectType: 'he' }
];

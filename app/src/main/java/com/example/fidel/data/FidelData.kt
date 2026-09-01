package com.example.fidel.data

import com.example.fidel.model.FidelFamily
import com.example.fidel.model.OrderInfo
import com.example.fidel.model.VocabItem

val ORDER_NAMES = listOf(
    OrderInfo(1, "ግዕዝ", "Ge'ez (1st)", "Guèze (1er)", "ä / e"),
    OrderInfo(2, "ካዕብ", "Ka'eb (2nd)", "Ka'eb (2e)", "u"),
    OrderInfo(3, "ሣልስ", "Sals (3rd)", "Sals (3e)", "i"),
    OrderInfo(4, "ራብዕ", "Rabi (4th)", "Rabi (4e)", "a"),
    OrderInfo(5, "ኃምስ", "Hamis (5th)", "Hamis (5e)", "e / é"),
    OrderInfo(6, "ሳድስ", "Sadis (6th)", "Sadis (6e)", "ə / silence"),
    OrderInfo(7, "ሳብዕ", "Sab'e (7th)", "Sab'e (7e)", "o")
)

val FIDEL_DATA = listOf(
    FidelFamily(
        base = "ሀ",
        name = "Hoi Ha",
        forms = listOf("ሀ", "ሁ", "ሂ", "ሃ", "ሄ", "ህ", "ሆ"),
        vocab = listOf(
            VocabItem("ሀ", "ሀገር", "hager", "Pays", "Country"),
            VocabItem("ሁ", "ሁኔታ", "huneta", "Situation", "Situation"),
            VocabItem("ሂ", "ሂሳብ", "hisab", "Mathématiques, facture", "Mathematics, bill"),
            VocabItem("ሃ", "ሃሳብ", "hasab", "Idée, pensée", "Idea, thought"),
            VocabItem("ሄ", "ሄሊኮፕተር", "helikopter", "Hélicoptère", "Helicopter"),
            VocabItem("ህ", "ህይወት", "hiywet", "Vie", "Life"),
            VocabItem("ሆ", "ሆድ", "hod", "Estomac, ventre", "Stomach, belly")
        )
    ),
    FidelFamily(
        base = "ለ",
        name = "Lawe La",
        forms = listOf("ለ", "ሉ", "ሊ", "ላ", "ሌ", "ል", "ሎ"),
        vocab = listOf(
            VocabItem("ለ", "ለምን", "lemin", "Pourquoi", "Why"),
            VocabItem("ሉ", "ሉል", "lul", "Perle, globe", "Pearl, globe"),
            VocabItem("ሊ", "ሊትር", "litr", "Litre", "Litre"),
            VocabItem("ላ", "ላም", "lam", "Vache", "Cow"),
            VocabItem("ሌ", "ሌሊት", "lelit", "Nuit", "Night"),
            VocabItem("ል", "ልብ", "lib", "Cœur", "Heart"),
            VocabItem("ሎ", "ሎሚ", "lomi", "Citron", "Lemon")
        )
    ),
    FidelFamily(
        base = "ሐ",
        name = "Hawt Ha",
        forms = listOf("ሐ", "ሑ", "ሒ", "ሓ", "ሔ", "ሕ", "ሖ"),
        vocab = listOf(
            VocabItem("ሐ", "ሐምሌ", "hamle", "Juillet (mois éthiopien)", "July (Ethiopian month)"),
            VocabItem("ሑ", "ምሑር", "mihur", "Érudit, savant", "Scholar, intellectual"),
            VocabItem("ሒ", "ብሒል", "bihil", "Dicton, proverbe", "Proverb, saying"),
            VocabItem("ሓ", "ብርሓን", "birhan", "Lumière", "Light"),
            VocabItem("ሔ", "ሔዋን", "hewan", "Ève (nom propre)", "Eve (proper name)"),
            VocabItem("ሕ", "ሕይወት", "hiywet", "Vie (orthographe classique)", "Life (classical)"),
            VocabItem("ሖ", "ሖረ", "hore", "Est allé / a voyagé", "Went / travelled")
        )
    ),
    FidelFamily(
        base = "መ",
        name = "May Ma",
        forms = listOf("መ", "ሙ", "ሚ", "ማ", "ሜ", "ም", "ሞ"),
        vocab = listOf(
            VocabItem("መ", "መጽሐፍ", "metsihaf", "Livre", "Book"),
            VocabItem("ሙ", "ሙዚቃ", "muziqa", "Musique", "Music"),
            VocabItem("ሚ", "ሚዛን", "mizan", "Balance, équilibre", "Scale, balance"),
            VocabItem("ማ", "ማር", "mar", "Miel", "Honey"),
            VocabItem("ሜ", "ሜዳ", "meda", "Champ, plaine", "Field, open area"),
            VocabItem("ም", "ምግብ", "migib", "Nourriture, repas", "Food, meal"),
            VocabItem("ሞ", "ሞባይል", "mobayl", "Téléphone mobile", "Mobile phone")
        )
    ),
    FidelFamily(
        base = "ሠ",
        name = "Sawt Sa",
        forms = listOf("ሠ", "ሡ", "ሢ", "ሣ", "ሤ", "ሥ", "ሦ"),
        vocab = listOf(
            VocabItem("ሠ", "ሠራተኛ", "seratenya", "Travailleur, employé", "Worker, employee"),
            VocabItem("ሡ", "ሡሪ", "suri", "Pantalon (classique)", "Trousers (classical)"),
            VocabItem("ሢ", "ሢመት", "shimet/simet", "Nomination, titre", "Appointment, title"),
            VocabItem("ሣ", "ሣር", "sar", "Herbe", "Grass"),
            VocabItem("ሤ", "ሴት", "set", "Femme", "Woman"),
            VocabItem("ሥ", "ሥራ", "sira", "Travail, emploi", "Work, job"),
            VocabItem("ሦ", "ሦስት", "sost", "Trois (chiffre 3)", "Three (number 3)")
        )
    ),
    FidelFamily(
        base = "ረ",
        name = "Rees Ra",
        forms = listOf("ረ", "ሩ", "ሪ", "ራ", "ሬ", "ር", "ሮ"),
        vocab = listOf(
            VocabItem("ረ", "ረዥም", "rezhim", "Grand, long", "Tall, long"),
            VocabItem("ሩ", "ሩዝ", "ruz", "Riz", "Rice"),
            VocabItem("ሪ", "ሪፖርት", "riport", "Rapport, compte-rendu", "Report"),
            VocabItem("ራ", "ራስ", "ras", "Tête, soi-même", "Head, self"),
            VocabItem("ሬ", "ሬዲዮ", "radiyo", "Radio", "Radio"),
            VocabItem("ር", "ርዝመት", "rizmet", "Longueur", "Length"),
            VocabItem("ሮ", "ሮጠ", "rote", "A couru (verbe)", "Ran (verb)")
        )
    ),
    FidelFamily(
        base = "ሰ",
        name = "Sat Sa",
        forms = listOf("ሰ", "ሱ", "ሲ", "ሳ", "ሴ", "ስ", "ሶ"),
        vocab = listOf(
            VocabItem("ሰ", "ሰማይ", "semay", "Ciel", "Sky"),
            VocabItem("ሱ", "ሱቅ", "suq", "Boutique, magasin", "Shop, store"),
            VocabItem("ሲ", "ሲኒማ", "sinima", "Cinéma", "Cinema, movies"),
            VocabItem("ሳ", "ሳምንት", "samint", "Semaine", "Week"),
            VocabItem("ሴ", "ሴት", "set", "Femme, fille", "Woman, female"),
            VocabItem("ስ", "ስም", "sim", "Nom, prénom", "Name"),
            VocabItem("ሶ", "ሶስት", "sost", "Trois", "Three")
        )
    ),
    FidelFamily(
        base = "ሸ",
        name = "Sha",
        forms = listOf("ሸ", "ሹ", "ሺ", "ሻ", "ሼ", "ሽ", "ሾ"),
        vocab = listOf(
            VocabItem("ሸ", "ሸማ", "shema", "Tissu traditionnel", "Traditional cloth"),
            VocabItem("ሹ", "ሹራብ", "shurab", "Pull-over, chandail", "Sweater, pullover"),
            VocabItem("ሺ", "ሺህ", "shih", "Mille (1000)", "Thousand (1000)"),
            VocabItem("ሻ", "ሻይ", "shay", "Thé", "Tea"),
            VocabItem("ሼ", "ሼፍ", "shef", "Chef cuisinier", "Chef"),
            VocabItem("ሽ", "ሽንኩርት", "shinkurt", "Oignon", "Onion"),
            VocabItem("ሾ", "ሾርባ", "shorba", "Soupe, bouillon", "Soup")
        )
    ),
    FidelFamily(
        base = "ቀ",
        name = "Qaf Qa",
        forms = listOf("ቀ", "ቁ", "ቂ", "ቃ", "ቄ", "ቅ", "ቆ"),
        vocab = listOf(
            VocabItem("ቀ", "ቀለም", "qelem", "Couleur, encre", "Color, ink"),
            VocabItem("ቁ", "ቁርስ", "qurs", "Petit-déjeuner", "Breakfast"),
            VocabItem("ቂ", "ቂጣ", "qita", "Pain plat traditionnel", "Traditional flatbread"),
            VocabItem("ቃ", "ቃል", "qal", "Mot, parole, promesse", "Word, speech, promise"),
            VocabItem("ቄ", "ቄስ", "qes", "Prêtre", "Priest"),
            VocabItem("ቅ", "ቅቤ", "qibe", "Beurre clarifié", "Butter, ghee"),
            VocabItem("ቆ", "ቆሎ", "qolo", "Grains d’orge grillés", "Roasted grain snack")
        )
    ),
    FidelFamily(
        base = "በ",
        name = "Bet Ba",
        forms = listOf("በ", "ቡ", "ቢ", "ባ", "ቤ", "ብ", "ቦ"),
        vocab = listOf(
            VocabItem("በ", "በግ", "beg", "Mouton, agneau", "Sheep, lamb"),
            VocabItem("ቡ", "ቡና", "buna", "Café", "Coffee"),
            VocabItem("ቢ", "ቢስክሌት", "bisiklet", "Bicyclette, vélo", "Bicycle, bike"),
            VocabItem("ባ", "ባህር", "bahir", "Mer, océan", "Sea, ocean"),
            VocabItem("ቤ", "ቤት", "bet", "Maison, demeure", "House, home"),
            VocabItem("ብ", "ብር", "bir", "Birr (monnaie), argent", "Birr (currency), silver"),
            VocabItem("ቦ", "ቦታ", "bota", "Lieu, endroit, place", "Place, location")
        )
    ),
    FidelFamily(
        base = "ተ",
        name = "Taw Ta",
        forms = listOf("ተ", "ቱ", "ቲ", "ታ", "ቴ", "ት", "ቶ"),
        vocab = listOf(
            VocabItem("ተ", "ተማሪ", "temari", "Élève, étudiant", "Student, pupil"),
            VocabItem("ቱ", "ቱሪስት", "turist", "Touriste", "Tourist"),
            VocabItem("ቲ", "ቲማቲም", "timatim", "Tomate", "Tomato"),
            VocabItem("ታ", "ታክሲ", "taksi", "Taxi", "Taxi"),
            VocabItem("ቴ", "ቴሌቪዥን", "televizhin", "Télévision", "Television"),
            VocabItem("ት", "ትምህርት", "timhirt", "Éducation, école", "Education, school"),
            VocabItem("ቶ", "ቶሎ", "tolo", "Vite, rapidement", "Quickly, fast")
        )
    ),
    FidelFamily(
        base = "ቸ",
        name = "Cha",
        forms = listOf("ቸ", "ቹ", "ቺ", "ቻ", "ቼ", "ች", "ቾ"),
        vocab = listOf(
            VocabItem("ቸ", "ቸርነት", "chernet", "Bonté, bienveillance", "Kindness, goodness"),
            VocabItem("ቹ", "ቹንግ", "chung", "Poussin (jeune)", "Chick"),
            VocabItem("ቺ", "ቺዝ", "chiz", "Fromage", "Cheese"),
            VocabItem("ቻ", "ቻይና", "chayna", "Chine", "China"),
            VocabItem("ቼ", "ቼክ", "chek", "Chèque bancaire", "Check / cheque"),
            VocabItem("ች", "ችግር", "chigir", "Problème, difficulté", "Problem, difficulty"),
            VocabItem("ቾ", "ቾኮሌት", "chokolet", "Chocolat", "Chocolate")
        )
    ),
    FidelFamily(
        base = "ኀ",
        name = "Harm Ha",
        forms = listOf("ኀ", "ኁ", "ኂ", "ኃ", "ኄ", "ኅ", "ኆ"),
        vocab = listOf(
            VocabItem("ኀ", "ኀይለ", "hayle", "Puissance de", "Power of"),
            VocabItem("ኃ", "ኃይል", "hayl", "Force, énergie, puissance", "Power, force, energy"),
            VocabItem("ኅ", "ኅብረት", "hibret", "Union, communauté", "Union, community"),
            VocabItem("ኄ", "ኄር", "her", "Bon, juste", "Good, virtuous")
        )
    ),
    FidelFamily(
        base = "ነ",
        name = "Nahas Na",
        forms = listOf("ነ", "ኑ", "ኒ", "ና", "ኔ", "ን", "ኖ"),
        vocab = listOf(
            VocabItem("ነ", "ነብር", "nebir", "Léopard / Tigre", "Leopard / Tiger"),
            VocabItem("ኑ", "ኑሮ", "nuro", "Vie quotidienne, existence", "Daily life, living"),
            VocabItem("ኒ", "ስኒ", "sini", "Tasse à café traditionnelle", "Coffee cup"),
            VocabItem("ና", "ናሙና", "namuna", "Échantillon, modèle", "Sample, model"),
            VocabItem("ኔ", "ኔትወርክ", "netwerk", "Réseau (télécom)", "Network"),
            VocabItem("ን", "ንብ", "nib", "Abeille", "Bee"),
            VocabItem("ኖ", "ኖራ", "nora", "Chaux, craie", "Chalk, limestone")
        )
    ),
    FidelFamily(
        base = "ኘ",
        name = "Nya",
        forms = listOf("ኘ", "ኙ", "ኚ", "ኛ", "ኜ", "ኝ", "ኞ"),
        vocab = listOf(
            VocabItem("ኘ", "አገኘ", "agenye", "A trouvé / a rencontré", "Found / met"),
            VocabItem("ኙ", "እኛ", "inya", "Nous", "We / Us"),
            VocabItem("ኛ", "እንግሊዘኛ", "ingilizenya", "Langue anglaise", "English language"),
            VocabItem("ኝ", "ጓደኛ", "gwadenya", "Ami(e), camarade", "Friend, companion"),
            VocabItem("ኞ", "እነኞቹ", "inenyochu", "Ceux-là, ces gens", "Those ones")
        )
    ),
    FidelFamily(
        base = "አ",
        name = "Alf A",
        forms = listOf("አ", "ኡ", "ኢ", "ኣ", "ኤ", "እ", "ኦ"),
        vocab = listOf(
            VocabItem("አ", "አበባ", "abeba", "Fleur", "Flower"),
            VocabItem("ኡ", "ኡደት", "udet", "Cycle, rotation", "Cycle, orbit"),
            VocabItem("ኢ", "ኢትዮጵያ", "ityoppya", "Éthiopie", "Ethiopia"),
            VocabItem("ኣ", "ኣየር", "ayer", "Air, atmosphère", "Air, atmosphere"),
            VocabItem("ኤ", "ኤርፖርት", "erport", "Aéroport", "Airport"),
            VocabItem("እ", "እናት", "enat", "Mère, maman", "Mother, mom"),
            VocabItem("ኦ", "ኦክስጅን", "oksijin", "Oxygène", "Oxygen")
        )
    ),
    FidelFamily(
        base = "ከ",
        name = "Kaf Ka",
        forms = listOf("ከ", "ኩ", "ኪ", "ካ", "ኬ", "ክ", "ኮ"),
        vocab = listOf(
            VocabItem("ከ", "ከተማ", "ketema", "Ville", "City, town"),
            VocabItem("ኩ", "ኩሽና", "kushina", "Cuisine (pièce)", "Kitchen"),
            VocabItem("ኪ", "ኪስ", "kis", "Poche", "Pocket"),
            VocabItem("ካ", "ካርታ", "karta", "Carte géographique", "Map"),
            VocabItem("ኬ", "ኬክ", "kek", "Gâteau", "Cake"),
            VocabItem("ክ", "ክረምት", "kiremt", "Saison des pluies", "Rainy season"),
            VocabItem("ኮ", "ኮረብታ", "korebta", "Colline", "Hill")
        )
    ),
    FidelFamily(
        base = "ኸ",
        name = "Kha",
        forms = listOf("ኸ", "ኹ", "ኺ", "ኻ", "ኼ", "ኽ", "ኾ"),
        vocab = listOf(
            VocabItem("ኸ", "ኸዲጃ", "khedija", "Khadija (prénom)", "Khadija (name)"),
            VocabItem("ኹ", "ሁሉ / ኹሉ", "kullu", "Tout, chacun", "All, everything"),
            VocabItem("ኻ", "ኻሊድ", "khalid", "Khalid (prénom)", "Khalid (name)"),
            VocabItem("ኽ", "አይዞኽ", "ayzokh", "Courage à toi (masc.)", "Be strong / cheer up")
        )
    ),
    FidelFamily(
        base = "ወ",
        name = "Waw Wa",
        forms = listOf("ወ", "ዉ", "ዊ", "ዋ", "ዌ", "ው", "ዎ"),
        vocab = listOf(
            VocabItem("ወ", "ወተት", "wetet", "Lait", "Milk"),
            VocabItem("ዉ", "ዉጤት", "wutet", "Résultat, score", "Result, outcome"),
            VocabItem("ዊ", "ኪዊ", "kiwi", "Kiwi (fruit)", "Kiwi (fruit)"),
            VocabItem("ዋ", "ዋጋ", "waga", "Prix, tarif", "Price, cost"),
            VocabItem("ዌ", "ኖርዌይ", "norweey", "Norvège", "Norway"),
            VocabItem("ው", "ውሃ", "wuha", "Eau", "Water"),
            VocabItem("ዎ", "ወንድሞቼ / ዎ", "wo", "Suffixe pluriel respectueux", "Plural suffix / respectful")
        )
    ),
    FidelFamily(
        base = "ዐ",
        name = "Ayn A",
        forms = listOf("ዐ", "ዑ", "ዒ", "ዓ", "ዔ", "ዕ", "ዖ"),
        vocab = listOf(
            VocabItem("ዐ", "ዐቢይ", "abiy", "Grand, majeur, éminent", "Great, major, prominent"),
            VocabItem("ዑ", "ዑደት", "udet", "Pèlerinage, cycle", "Cycle, circumambulation"),
            VocabItem("ዒ", "ዒድ", "id", "Aïd (fête)", "Eid (holiday)"),
            VocabItem("ዓ", "ዓመት", "amet", "Année, an", "Year"),
            VocabItem("ዕ", "ዕቃ", "iqa", "Objet, bagage, fourniture", "Object, item, baggage"),
            VocabItem("ዖ", "ዖዝ", "oz", "Oz (terre légendaire)", "Oz")
        )
    ),
    FidelFamily(
        base = "ዘ",
        name = "Zay Za",
        forms = listOf("ዘ", "ዙ", "ዚ", "ዛ", "ዜ", "ዝ", "ዞ"),
        vocab = listOf(
            VocabItem("ዘ", "ዘፈን", "zefen", "Chanson, musique", "Song, track"),
            VocabItem("ዙ", "ዙሪያ", "zuriya", "Autour, alentours", "Around, surrounding"),
            VocabItem("ዚ", "ዚምባብዌ", "zimbabwe", "Zimbabwe", "Zimbabwe"),
            VocabItem("ዛ", "ዛፍ", "zaf", "Arbre", "Tree"),
            VocabItem("ዜ", "ዜና", "zena", "Actualités, nouvelles", "News, report"),
            VocabItem("ዝ", "ዝናብ", "zinab", "Pluie", "Rain"),
            VocabItem("ዞ", "ዞረ", "zore", "A tourné, a circulé", "Turned, rotated")
        )
    ),
    FidelFamily(
        base = "ዠ",
        name = "Zha",
        forms = listOf("ዠ", "ዡ", "ዢ", "ዣ", "ዤ", "ዥ", "ዦ"),
        vocab = listOf(
            VocabItem("ዠ", "ዠመረ", "zhemere", "A commencé (dialectal)", "Began / started"),
            VocabItem("ዢ", "ዢጂንፒንግ", "zhijinping", "Xi Jinping (nom)", "Xi Jinping"),
            VocabItem("ዣ", "ጃንጥላ / ዣንጥላ", "zhantila", "Parapluie", "Umbrella"),
            VocabItem("ዥ", "ጋራዥ", "garazh", "Garage mécanique", "Garage"),
            VocabItem("ዦ", "ቴሌቪዥን / ዦ", "televizhon", "Télévision", "Television")
        )
    ),
    FidelFamily(
        base = "የ",
        name = "Yaman Ya",
        forms = listOf("የ", "ዩ", "ዪ", "ያ", "ዬ", "ይ", "ዮ"),
        vocab = listOf(
            VocabItem("የ", "የካቲት", "yekatit", "Février (mois éthiopien)", "February (Ethiopian month)"),
            VocabItem("ዩ", "ዩኒቨርሲቲ", "yuniversiti", "Université", "University"),
            VocabItem("ዪ", "ዪርጋለም", "yirgalem", "Yirgalem (ville)", "Yirgalem (city)"),
            VocabItem("ያ", "ያ", "ya", "Celui-là, cela", "That one, that"),
            VocabItem("ዬ", "ዬመን", "yemen", "Yémen", "Yemen"),
            VocabItem("ይ", "ይቅርታ", "yiqirta", "Pardon, désolé", "Sorry, excuse me"),
            VocabItem("ዮ", "ዮጋ", "yoga", "Yoga", "Yoga")
        )
    ),
    FidelFamily(
        base = "ደ",
        name = "Dent Da",
        forms = listOf("ደ", "ዱ", "ዲ", "ዳ", "ዴ", "ድ", "ዶ"),
        vocab = listOf(
            VocabItem("ደ", "ደመና", "demena", "Nuage", "Cloud"),
            VocabItem("ዱ", "ዱባ", "duba", "Citrouille, potiron", "Pumpkin, squash"),
            VocabItem("ዲ", "ዲሽ", "dish", "Antenne parabolique", "Satellite dish"),
            VocabItem("ዳ", "ዳቦ", "dabo", "Pain", "Bread"),
            VocabItem("ዴ", "ዴስክ", "desk", "Bureau de travail", "Desk"),
            VocabItem("ድ", "ድመት", "dimet", "Chat", "Cat"),
            VocabItem("ዶ", "ዶሮ", "doro", "Poulet, poule", "Chicken, hen")
        )
    ),
    FidelFamily(
        base = "ጀ",
        name = "Jant Ja",
        forms = listOf("ጀ", "ጁ", "ጂ", "ጃ", "ጄ", "ጅ", "ጆ"),
        vocab = listOf(
            VocabItem("ጀ", "ጀልባ", "jelba", "Bateau, barque", "Boat"),
            VocabItem("ጁ", "ጁስ", "jus", "Jus de fruit frais", "Juice"),
            VocabItem("ጂ", "ጂንስ", "jinsi", "Pantalon jean", "Jeans"),
            VocabItem("ጃ", "ጃኬት", "jaket", "Veste, blouson", "Jacket"),
            VocabItem("ጄ", "ጄነራል", "jeneral", "Général d’armée", "General"),
            VocabItem("ጅ", "ጅብ", "jib", "Hyène", "Hyena"),
            VocabItem("ጆ", "ጆሮ", "joro", "Oreille", "Ear")
        )
    ),
    FidelFamily(
        base = "ገ",
        name = "Gaml Ga",
        forms = listOf("ገ", "ጉ", "ጊ", "ጋ", "ጌ", "ግ", "ጎ"),
        vocab = listOf(
            VocabItem("ገ", "ገበሬ", "gebere", "Agriculteur, fermier", "Farmer, cultivator"),
            VocabItem("ጉ", "ጉዞ", "guzo", "Voyage, trajet", "Journey, trip"),
            VocabItem("ጊ", "ጊዜ", "gize", "Temps, moment, époque", "Time, era"),
            VocabItem("ጋ", "ጋዜጣ", "gazeta", "Journal papier", "Newspaper"),
            VocabItem("ጌ", "ጌጣጌጥ", "getaget", "Bijoux, parures", "Jewelry, ornament"),
            VocabItem("ግ", "ግድግዳ", "gidgida", "Mur, paroi", "Wall"),
            VocabItem("ጎ", "ጎማ", "goma", "Pneu, roue en caoutchouc", "Tire, rubber")
        )
    ),
    FidelFamily(
        base = "ጠ",
        name = "Tayt Ta",
        forms = listOf("ጠ", "ጡ", "ጢ", "ጣ", "ጤ", "ጥ", "ጦ"),
        vocab = listOf(
            VocabItem("ጠ", "ጠረጴዛ", "tereppeza", "Table", "Table"),
            VocabItem("ጡ", "ጡንቻ", "tuncha", "Muscle, force", "Muscle, strength"),
            VocabItem("ጢ", "ጢስ", "tis", "Fumée", "Smoke"),
            VocabItem("ጣ", "ጣት", "tat", "Doigt", "Finger"),
            VocabItem("ጤ", "ጤና", "tena", "Santé, bien-être", "Health, wellness"),
            VocabItem("ጥ", "ጥርስ", "tirs", "Dent", "Tooth"),
            VocabItem("ጦ", "ጦር", "tor", "Lance, armée, guerre", "Spear, war, army")
        )
    ),
    FidelFamily(
        base = "ጨ",
        name = "Chayt Cha",
        forms = listOf("ጨ", "ጩ", "ጪ", "ጫ", "ጬ", "ጭ", "ጮ"),
        vocab = listOf(
            VocabItem("ጨ", "ጨው", "chew", "Sel", "Salt"),
            VocabItem("ጩ", "ጩኸት", "chuhet", "Cri, clameur", "Shout, scream, clamor"),
            VocabItem("ጪ", "ጫጩት / ጪ", "chachut", "Poussin", "Chick"),
            VocabItem("ጫ", "ጫማ", "chama", "Chaussures", "Shoes"),
            VocabItem("ጬ", "ጬማ", "chema", "Amertume, herbe", "Bitterness"),
            VocabItem("ጭ", "ጭቃ", "chiqa", "Boue, terre glaise", "Mud, clay"),
            VocabItem("ጮ", "ጮኸ", "chohe", "A crié, a hurlé", "Shouted, yelled")
        )
    ),
    FidelFamily(
        base = "ጰ",
        name = "Pait Pa",
        forms = listOf("ጰ", "ጱ", "ጲ", "ጳ", "ጴ", "ጵ", "ጶ"),
        vocab = listOf(
            VocabItem("ጰ", "ጳጳስ", "pappas", "Évêque, patriarche", "Bishop, pope"),
            VocabItem("ጴ", "ጴጥሮስ", "petros", "Pierre (prénom)", "Peter (name)"),
            VocabItem("ጵ", "ኢትዮጵያ", "ityoppya", "Éthiopie (avec ጵ)", "Ethiopia (with ጵ)"),
            VocabItem("ጳ", "ጳውሎስ", "pawlos", "Paul (prénom)", "Paul (name)")
        )
    ),
    FidelFamily(
        base = "ጸ",
        name = "Saday Tsa",
        forms = listOf("ጸ", "ጹ", "ጺ", "ጻ", "ጼ", "ጽ", "ጾ"),
        vocab = listOf(
            VocabItem("ጸ", "ጸሐይ", "tsehay", "Soleil", "Sun"),
            VocabItem("ጻ", "ጻድቅ", "tsadiq", "Juste, saint, intègre", "Righteous, saint"),
            VocabItem("ጽ", "ጽሑፍ", "tsihuf", "Écriture, document, texte", "Writing, text, article"),
            VocabItem("ጾ", "ጾም", "tsom", "Jeûne spirituel", "Fasting"),
            VocabItem("ጸ", "ጸሎት", "tselot", "Prière", "Prayer")
        )
    ),
    FidelFamily(
        base = "ፀ",
        name = "Sappa Tsa",
        forms = listOf("ፀ", "ፁ", "ፂ", "ፃ", "ፄ", "ፅ", "ፆ"),
        vocab = listOf(
            VocabItem("ፀ", "ፀሐይ", "tsehay", "Soleil (orthographe alternative)", "Sun (alternate spelling)"),
            VocabItem("ፃ", "ሕፃን", "hitsan", "Bébé, nourrisson", "Baby, infant"),
            VocabItem("ፅ", "ፅሁፍ", "tsihuf", "Écriture, texte", "Writing, text"),
            VocabItem("ፆ", "ፆም", "tsom", "Jeûne", "Fasting"),
            VocabItem("ፀ", "ፀጉር", "tsegur", "Cheveux, poil", "Hair")
        )
    ),
    FidelFamily(
        base = "ፈ",
        name = "Af Fa",
        forms = listOf("ፈ", "ፉ", "ፊ", "ፋ", "ፌ", "ፍ", "ፎ"),
        vocab = listOf(
            VocabItem("ፈ", "ፈረስ", "feres", "Cheval", "Horse"),
            VocabItem("ፉ", "ፉጨት", "fuchet", "Sifflet, sifflement", "Whistle"),
            VocabItem("ፊ", "ፊልም", "film", "Film de cinéma", "Movie, film"),
            VocabItem("ፋ", "ፋብሪካ", "fabrika", "Usine, manufacture", "Factory, plant"),
            VocabItem("ፌ", "ፌስታል", "festal", "Sac plastique", "Plastic bag"),
            VocabItem("ፍ", "ፍየል", "fiyel", "Chèvre, bouc", "Goat"),
            VocabItem("ፎ", "ፎቶ", "foto", "Photographie", "Photo, picture")
        )
    ),
    FidelFamily(
        base = "ፐ",
        name = "Psa Pa",
        forms = listOf("ፐ", "ፑ", "ፒ", "ፓ", "ፔ", "ፕ", "ፖ"),
        vocab = listOf(
            VocabItem("ፐ", "ፐርሰንት", "persent", "Pourcentage (%)", "Percentage (%)"),
            VocabItem("ፑ", "ፑል", "pul", "Piscine, billard", "Pool, swimming pool"),
            VocabItem("ፒ", "ፒያኖ", "piyano", "Piano", "Piano"),
            VocabItem("ፓ", "ፓርክ", "park", "Parc public, jardin", "Park, garden"),
            VocabItem("ፔ", "ፔዳል", "pedal", "Pédale de vélo", "Pedal"),
            VocabItem("ፕ", "ፕላስቲክ", "plastik", "Matière plastique", "Plastic"),
            VocabItem("ፖ", "ፖሊስ", "polis", "Police, policier", "Police, officer")
        )
    )
)

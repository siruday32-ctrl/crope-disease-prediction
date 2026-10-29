import { DiseaseInfo, CropType } from '../types';

export const CROP_LIST: CropType[] = [
  'Tomato',
  'Potato',
  'Corn (Maize)',
  'Rice',
  'Wheat',
  'Apple',
  'Grape',
  'Pepper (Bell)',
  'Cotton'
];

// Helper to create visual SVG data URLs for sample leaves
function createLeafSvg(
  bgHue: number,
  spots: Array<{ cx: number; cy: number; r: number; color: string }>,
  veinColor = '#3b7a57',
  leafColor = '#4a934a'
): string {
  const spotsSvg = spots
    .map(
      (s) =>
        `<circle cx="${s.cx}" cy="${s.cy}" r="${s.r}" fill="${s.color}" opacity="0.85" filter="url(#blur)" />`
    )
    .join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="100%" height="100%">
    <defs>
      <radialGradient id="grad" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="${leafColor}" />
        <stop offset="100%" stop-color="#1e4620" />
      </radialGradient>
      <filter id="blur">
        <feGaussianBlur stdDeviation="2" />
      </filter>
    </defs>
    <rect width="320" height="320" fill="#f8fafc" rx="16"/>
    <!-- Leaf Blade Base -->
    <path d="M 160 40 C 240 70, 270 180, 160 270 C 50 180, 80 70, 160 40 Z" fill="url(#grad)" stroke="#1a3d1c" stroke-width="2"/>
    <!-- Central Vein -->
    <path d="M 160 48 Q 162 160 160 270" stroke="${veinColor}" stroke-width="4" stroke-linecap="round" fill="none"/>
    <!-- Secondary Veins -->
    <path d="M 160 100 Q 210 110 225 125 M 160 100 Q 110 110 95 125" stroke="${veinColor}" stroke-width="2" fill="none"/>
    <path d="M 160 150 Q 220 160 235 180 M 160 150 Q 100 160 85 180" stroke="${veinColor}" stroke-width="2" fill="none"/>
    <path d="M 160 200 Q 210 210 215 230 M 160 200 Q 110 210 105 230" stroke="${veinColor}" stroke-width="2" fill="none"/>
    <!-- Disease Lesions / Symptoms -->
    ${spotsSvg}
    <!-- Stem -->
    <path d="M 160 270 L 160 300" stroke="#5c4033" stroke-width="6" stroke-linecap="round"/>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const CROP_DISEASES: DiseaseInfo[] = [
  // --- TOMATO ---
  {
    id: 'tomato_early_blight',
    crop: 'Tomato',
    name: 'Early Blight',
    scientificName: 'Alternaria solani',
    pathogen: 'Fungal',
    description:
      'Early blight causes characteristic dark concentric rings (target spots) on older leaves. Leaves turn yellow around spots and drop prematurely, causing sunscald on ripening fruit.',
    symptoms: [
      'Brown to black circular spots with concentric target-board rings',
      'Chlorotic yellow halos surrounding necrotic lesions',
      'Lower/older leaves infected first before spreading upward',
      'Collar rot on stems and sunken leathery rot on stem-end of fruit'
    ],
    causes: [
      'Alternaria solani fungus surviving in infected crop debris or soil',
      'Splashing raindrops or overhead irrigation dispersing fungal spores',
      'Warm and humid microclimates within dense plant canopies'
    ],
    favorableConditions: {
      tempRange: '24°C - 29°C (75°F - 85°F)',
      humidity: '> 80% relative humidity or persistent leaf wetness',
      triggers: 'Alternating wet and dry periods with dense foliage'
    },
    organicTreatments: [
      'Apply Copper octanoate or Bordeaux mixture every 7-10 days',
      'Spray Bacillus subtilis (bio-fungicide) upon initial symptom detection',
      'Prune lower 12 inches of infected foliage to improve air circulation',
      'Apply organic mulch (straw or pine needles) to prevent soil-splash'
    ],
    chemicalTreatments: [
      'Chlorothalonil 75% WP @ 2g/L water',
      'Mancozeb 75% WP @ 2.5g/L preventive foliar spray',
      'Azoxystrobin 23% SC @ 1ml/L at early lesion stage',
      'Difenoconazole 25% EC @ 0.5ml/L for curative control'
    ],
    prevention: [
      '3-year crop rotation avoiding Solanaceae family (potato, eggplant, pepper)',
      'Use drip or furrow irrigation instead of overhead sprinklers',
      'Stake plants and maintain 60cm row spacing for ventilation',
      'Sanitize pruning tools with 70% isopropyl alcohol between rows'
    ],
    sampleImage: createLeafSvg(
      120,
      [
        { cx: 130, cy: 110, r: 16, color: '#4a2810' },
        { cx: 195, cy: 135, r: 22, color: '#3d1f0b' },
        { cx: 120, cy: 170, r: 28, color: '#381c08' },
        { cx: 180, cy: 210, r: 18, color: '#4a2810' },
        { cx: 140, cy: 225, r: 12, color: '#663d14' },
        { cx: 185, cy: 165, r: 10, color: '#c7b032' }
      ],
      '#2f592f',
      '#477c38'
    ),
    riskFactors: ['High rainfall', 'Overhead watering', 'Stagnant canopy air']
  },
  {
    id: 'tomato_late_blight',
    crop: 'Tomato',
    name: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    pathogen: 'Fungal',
    description:
      'Aggressive water-mold oomycete causing rapid foliar collapse, water-soaked dark lesions, and white cottony fungal growth on leaf undersides in damp weather.',
    symptoms: [
      'Water-soaked, pale greenish-gray lesions expanding quickly into large dark brown blotches',
      'Delicate white fungal downy mildew visible on leaf undersides in humid mornings',
      'Entire canopy can collapse, wilt, and blacken within 4 to 7 days',
      'Greasy, olive-brown blotches on green or ripe tomatoes'
    ],
    causes: [
      'Oomycete Phytophthora infestans windblown spores traveling miles',
      'Cool, wet weather with continuous leaf moisture > 10 hours'
    ],
    favorableConditions: {
      tempRange: '15°C - 22°C (60°F - 72°F)',
      humidity: '> 90% humidity and heavy fog/dew',
      triggers: 'Persistent cool overcast drizzle and high relative humidity'
    },
    organicTreatments: [
      'Copper sulfate / Fixed copper sprays applied immediately on warning',
      'Potassium bicarbonate sprays to reduce leaf surface acidity',
      'Uproot and bag severely infected plants immediately (do not compost!)'
    ],
    chemicalTreatments: [
      'Metalaxyl + Mancozeb (Ridomil Gold) @ 2.5g/L water',
      'Cymoxanil 8% + Mancozeb 64% WP @ 2g/L water',
      'Dimethomorph 50% WP @ 1g/L for rapid translaminar protection'
    ],
    prevention: [
      'Plant certified disease-free and late-blight resistant seeds (e.g., Defiant, Mountain Magic)',
      'Destroy volunteer potato and tomato plants in early spring',
      'Ensure rapid foliage dry-off using morning drip watering',
      'Monitor local agricultural university late-blight forecasting alerts'
    ],
    sampleImage: createLeafSvg(
      120,
      [
        { cx: 140, cy: 120, r: 35, color: '#1c221a' },
        { cx: 210, cy: 160, r: 40, color: '#242b22' },
        { cx: 110, cy: 190, r: 32, color: '#1e241c' },
        { cx: 165, cy: 220, r: 25, color: '#30382d' }
      ],
      '#1b331a',
      '#36542f'
    ),
    riskFactors: ['Cool foggy mornings', 'Dew > 10 hours', 'Nearby potato fields']
  },
  {
    id: 'tomato_yellow_leaf_curl',
    crop: 'Tomato',
    name: 'Yellow Leaf Curl Virus (TYLCV)',
    scientificName: 'Begomovirus / Geminiviridae',
    pathogen: 'Viral',
    description:
      'Devastating viral disease transmitted by silverleaf whiteflies (Bemisia tabaci). Causes severe stunting, upward leaf cupping, and complete cessation of fruit set.',
    symptoms: [
      'Upward curling and cupping of leaflets with prominent yellow (chlorotic) margins',
      'Marked reduction in leaf size giving a bushy, erect "bonsai" appearance',
      'Severe plant stunting and node shortening',
      'Flower drop with little or no fruit formation'
    ],
    causes: [
      'Transmission by adult Silverleaf Whiteflies feeding on plant sap',
      'Infected seedling transplants brought into non-infested greenhouses'
    ],
    favorableConditions: {
      tempRange: '25°C - 35°C (77°F - 95°F)',
      humidity: 'Dry, warm seasons that promote rapid whitefly reproduction',
      triggers: 'High whitefly populations and lack of insect barrier nets'
    },
    organicTreatments: [
      'Hang yellow sticky traps (1 trap per 20 sq meters) to trap whitefly vectors',
      'Foliar spray with Cold-Pressed Neem Oil (5ml/L) + insecticidal soap',
      'Introduce natural predators: Encarsia formosa parasitic wasps or Chrysoperla',
      'Cover nursery beds with 50-mesh insect netting to protect young plants'
    ],
    chemicalTreatments: [
      'Imidacloprid 17.8% SL @ 0.5ml/L water for vector control',
      'Thiamethoxam 25% WG @ 0.3g/L drench or spray',
      'Acetamiprid 20% SP @ 0.4g/L rotation to prevent insecticide resistance'
    ],
    prevention: [
      'Grow TYLCV-resistant hybrids (e.g., Tycoon, Crista, Grandeur)',
      'Maintain a 2-month host-free bridge period between successive crops',
      'Eliminate weeds like Solanum nigrum and Datura around farm perimeter'
    ],
    sampleImage: createLeafSvg(
      60,
      [
        { cx: 110, cy: 90, r: 22, color: '#ded728' },
        { cx: 210, cy: 110, r: 26, color: '#e8e235' },
        { cx: 90, cy: 160, r: 25, color: '#f0eb4a' },
        { cx: 225, cy: 180, r: 28, color: '#ded728' },
        { cx: 160, cy: 230, r: 24, color: '#e0d826' }
      ],
      '#476b25',
      '#5c8728'
    ),
    riskFactors: ['Whitefly outbreak', 'Weedy field margins', 'Late-season planting']
  },
  {
    id: 'tomato_healthy',
    crop: 'Tomato',
    name: 'Healthy Foliage',
    scientificName: 'Solanum lycopersicum (Normal)',
    pathogen: 'None (Healthy)',
    description:
      'Vibrant deep green foliage with uniform chlorophyll pigmentation, clean smooth margins, and intact turgid leaf veins without spots, curling, or lesions.',
    symptoms: [
      'Uniform lush deep green coloration across upper and lower leaf surfaces',
      'Firm, turgid leaf structure with intact epidermal layer',
      'No chlorosis, necrosis, brown spots, or mold present',
      'Balanced vegetative shoot growth and healthy blossom formation'
    ],
    causes: [
      'Optimal soil nutrient balance (N-P-K + secondary micronutrients)',
      'Adequate sunlight (6-8 hours daily) and controlled soil moisture',
      'Effective pest exclusion and clean cultural practices'
    ],
    favorableConditions: {
      tempRange: '20°C - 28°C (68°F - 82°F)',
      humidity: '50% - 70% moderate humidity',
      triggers: 'Optimal irrigation scheduling and balanced fertilization'
    },
    organicTreatments: [
      'Maintain standard compost tea or seaweed extract foliar feeding',
      'Continue proactive Trichoderma soil enrichment for root health',
      'Mulch soil bed with 2 inches of clean straw'
    ],
    chemicalTreatments: [
      'No chemical interventions needed. Maintain routine scout monitoring.'
    ],
    prevention: [
      'Keep maintaining scheduled bi-weekly scout monitoring',
      'Maintain soil pH between 6.2 and 6.8',
      'Sanitize garden tools regularly to prevent pathogen introduction'
    ],
    sampleImage: createLeafSvg(
      120,
      [],
      '#1b4f1b',
      '#348534'
    ),
    riskFactors: ['Over-fertilization with excess nitrogen', 'Water stress']
  },

  // --- POTATO ---
  {
    id: 'potato_early_blight',
    crop: 'Potato',
    name: 'Early Blight',
    scientificName: 'Alternaria solani',
    pathogen: 'Fungal',
    description:
      'Target-like circular brown lesions on potato foliage that gradually merge, causing severe leaf blighting and tuber quality decline.',
    symptoms: [
      'Brown circular spots with characteristic concentric rings on potato leaves',
      'Leaves senesce prematurely starting from the base of the plant',
      'Tubers develop dark, sunken, leathery dry rot lesions'
    ],
    causes: [
      'Alternaria fungus carried in infected seed tubers or solanaceous plant residue'
    ],
    favorableConditions: {
      tempRange: '22°C - 30°C (72°F - 86°F)',
      humidity: 'High humidity following dry, warm daytime periods',
      triggers: 'Plant stress during tuber initiation stage'
    },
    organicTreatments: [
      'Copper hydroxide or copper oxychloride 50% WP @ 2.5g/L',
      'Proactive sprays of Bacillus amyloliquefaciens'
    ],
    chemicalTreatments: [
      'Chlorothalonil 75% WP @ 2g/L or Mancozeb 75% WP @ 2.5g/L',
      'Difenoconazole + Azoxystrobin @ 1ml/L'
    ],
    prevention: [
      'Plant certified disease-free seed tubers',
      'Avoid nitrogen deficiency which accelerates plant senescence',
      'Destroy potato vines 2 weeks before harvesting tubers'
    ],
    sampleImage: createLeafSvg(
      110,
      [
        { cx: 140, cy: 110, r: 18, color: '#45260c' },
        { cx: 180, cy: 150, r: 24, color: '#3b2009' },
        { cx: 120, cy: 190, r: 19, color: '#45260c' },
        { cx: 195, cy: 215, r: 15, color: '#543011' }
      ],
      '#23471f',
      '#3d6f34'
    ),
    riskFactors: ['Warm alternating weather', 'Nutrient-stressed plants']
  },
  {
    id: 'potato_late_blight',
    crop: 'Potato',
    name: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    pathogen: 'Fungal',
    description:
      'Historical causal organism of the Irish Potato Famine. Rapidly destroys potato vines and causes irregular sunken reddish-brown tuber rot.',
    symptoms: [
      'Large irregular water-soaked dark purplish-brown lesions on leaflets and petiole',
      'White downy sporulation on leaf undersides in high humidity',
      'Vine collapse and rotting stench across fields in severe outbreaks',
      'Dry granular rust-brown rot penetrating into tuber flesh'
    ],
    causes: ['Infected cull piles, volunteer tubers, or seed potatoes'],
    favorableConditions: {
      tempRange: '10°C - 20°C (50°F - 68°F)',
      humidity: '> 90% humidity and wet leaf surface',
      triggers: 'Cool, wet, overcast periods lasting 2-3 consecutive days'
    },
    organicTreatments: [
      'Immediate application of fixed copper compounds',
      'Rogue and destroy infected stems and haulms'
    ],
    chemicalTreatments: [
      'Cymoxanil + Mancozeb (Curzate) @ 2.5g/L water',
      'Mandipropamid (Revus) @ 0.8ml/L water',
      'Fluopicolide + Propamocarb (Infinito) @ 1.5ml/L'
    ],
    prevention: [
      'Inspect and plant only certified seed potatoes',
      'Eliminate all cull piles and volunteer potatoes',
      'Hilling up soil deeply over tubers to prevent spore wash-down'
    ],
    sampleImage: createLeafSvg(
      110,
      [
        { cx: 130, cy: 100, r: 32, color: '#141c14' },
        { cx: 190, cy: 140, r: 42, color: '#1c261b' },
        { cx: 140, cy: 200, r: 35, color: '#111710' }
      ],
      '#1c381c',
      '#30572e'
    ),
    riskFactors: ['Cool rain', 'High humidity', 'Undumped cull piles']
  },
  {
    id: 'potato_healthy',
    crop: 'Potato',
    name: 'Healthy Foliage',
    scientificName: 'Solanum tuberosum (Normal)',
    pathogen: 'None (Healthy)',
    description:
      'Clean, deep green potato compound leaves with smooth margins and normal venation.',
    symptoms: ['Uniform dark green foliage', 'No spots, blotches, or wilting'],
    causes: ['Optimal fertility, certified seed, and pest control'],
    favorableConditions: {
      tempRange: '18°C - 24°C',
      humidity: '50% - 70%',
      triggers: 'Consistent irrigation and healthy seedbed'
    },
    organicTreatments: ['Regular compost tea and seaweed foliar sprays'],
    chemicalTreatments: ['None required.'],
    prevention: ['Routine weekly scouting and proper hilling'],
    sampleImage: createLeafSvg(120, [], '#1f4d1f', '#367836'),
    riskFactors: ['None']
  },

  // --- CORN (MAIZE) ---
  {
    id: 'corn_common_rust',
    crop: 'Corn (Maize)',
    name: 'Common Rust',
    scientificName: 'Puccinia sorghi',
    pathogen: 'Fungal',
    description:
      'Presents as oval to elongate cinnamon-brown pustules scattered across both leaf surfaces. Pustules rupture the epidermis and release powdery reddish-brown spores.',
    symptoms: [
      'Small, circular to elongate reddish-brown or golden pustules on both upper and lower leaf surfaces',
      'Spore powder easily rubs off on fingers like cinnamon dust',
      'Leaf chlorosis surrounding dense clusters of pustules',
      'Premature death of leaves reducing photosynthetic kernel fill'
    ],
    causes: [
      'Airborne urediniospores blown northward on summer storm fronts from subtropical regions'
    ],
    favorableConditions: {
      tempRange: '16°C - 24°C (60°F - 75°F)',
      humidity: '> 95% relative humidity or 6+ hours of dew',
      triggers: 'Cool, humid weather and susceptible sweet corn varieties'
    },
    organicTreatments: [
      'Sulfur 80% WDG @ 3g/L spray applied early before severe infection',
      'Neem-based botanical formulations to suppress spore germination'
    ],
    chemicalTreatments: [
      'Pyraclostrobin (Headline) @ 1ml/L',
      'Azoxystrobin + Propiconazole (Quilt Xcel) @ 1ml/L',
      'Tebuconazole 25.9% EC @ 1ml/L'
    ],
    prevention: [
      'Plant rust-resistant corn hybrids with Rp gene resistance',
      'Plant early in the season before airborne spore arrival peaks',
      'Maintain balanced nitrogen fertilization (avoid excessive N)'
    ],
    sampleImage: createLeafSvg(
      90,
      [
        { cx: 155, cy: 80, r: 8, color: '#9c3814' },
        { cx: 165, cy: 110, r: 9, color: '#b3471b' },
        { cx: 145, cy: 135, r: 8, color: '#9c3814' },
        { cx: 170, cy: 165, r: 10, color: '#b3471b' },
        { cx: 150, cy: 190, r: 9, color: '#9c3814' },
        { cx: 160, cy: 220, r: 11, color: '#8a2d0d' },
        { cx: 140, cy: 240, r: 7, color: '#b3471b' }
      ],
      '#2c5922',
      '#447e37'
    ),
    riskFactors: ['High humidity', 'Dew > 6 hours', 'Cool cloudy spells']
  },
  {
    id: 'corn_northern_leaf_blight',
    crop: 'Corn (Maize)',
    name: 'Northern Corn Leaf Blight (NCLB)',
    scientificName: 'Exserohilum turcicum',
    pathogen: 'Fungal',
    description:
      'Large, long, cigar-shaped grayish-green to tan lesions that run parallel to the leaf veins, leading to significant foliage loss and yield reduction.',
    symptoms: [
      'Elongate elliptical "cigar-shaped" lesions 1 to 6 inches long',
      'Lesions turn grayish-green to tan with dark sporulation during wet weather',
      'Begins on lower leaves and progresses up the plant canopy towards ear leaf'
    ],
    causes: [
      'Fungus overwintering in corn residue from the previous season'
    ],
    favorableConditions: {
      tempRange: '18°C - 27°C (65°F - 80°F)',
      humidity: 'Extended periods of wetness (> 6-12 hours of leaf moisture)',
      triggers: 'Conservation tillage leaving high surface residue'
    },
    organicTreatments: [
      'Copper-based bactericides/fungicides at initial tassel stage',
      'Bio-protective Trichoderma viride seed and foliar inoculants'
    ],
    chemicalTreatments: [
      'Azoxystrobin + Difenoconazole @ 1ml/L',
      'Trifloxystrobin 50% WG @ 0.5g/L',
      'Propiconazole 25% EC @ 1ml/L'
    ],
    prevention: [
      'Select resistant corn hybrids with Ht gene resistance',
      'Tillage management to bury infected corn residue',
      'Crop rotation with soybean, wheat, or alfalfa for 1-2 years'
    ],
    sampleImage: createLeafSvg(
      100,
      [
        { cx: 165, cy: 120, r: 24, color: '#6e5e40' },
        { cx: 150, cy: 180, r: 28, color: '#594a30' },
        { cx: 160, cy: 230, r: 18, color: '#7a6a4a' }
      ],
      '#2b4f24',
      '#437539'
    ),
    riskFactors: ['Continuous corn-on-corn', 'Heavy surface crop debris']
  },
  {
    id: 'corn_healthy',
    crop: 'Corn (Maize)',
    name: 'Healthy Foliage',
    scientificName: 'Zea mays (Normal)',
    pathogen: 'None (Healthy)',
    description:
      'Strong erect maize leaf blades with vivid emerald green pigmentation, distinct parallel venation, and clean epidermis.',
    symptoms: ['Long, clean blade without lesions or pustules'],
    causes: ['Proper spacing, hybrid vigor, and weed-free field'],
    favorableConditions: {
      tempRange: '20°C - 32°C',
      humidity: '40% - 65%',
      triggers: 'Adequate sunshine and balanced fertilization'
    },
    organicTreatments: ['Maintain organic mulching and nitrogen side-dressing'],
    chemicalTreatments: ['None required.'],
    prevention: ['Maintain balanced soil fertility and proper plant density'],
    sampleImage: createLeafSvg(120, [], '#1f4a1c', '#3c8235'),
    riskFactors: ['Drought stress during silking']
  },

  // --- RICE ---
  {
    id: 'rice_bacterial_leaf_blight',
    crop: 'Rice',
    name: 'Bacterial Leaf Blight (BLB)',
    scientificName: 'Xanthomonas oryzae pv. oryzae',
    pathogen: 'Bacterial',
    description:
      'Severe vascular disease in rice paddies causing wavy water-soaked stripes along leaf margins that turn yellowish-white with milky bacterial ooze beads.',
    symptoms: [
      'Water-soaked to yellowish stripes beginning at leaf tips and margins',
      'Lesions enlarge with undulating or wavy margins running down the blade',
      'Leaves turn bleached grayish-white and die (kresek phase in young seedlings)',
      'Opaque amber bacterial exudate beads visible on blades in morning dew'
    ],
    causes: [
      'Xanthomonas bacteria entering through hydathodes, stomata, or root/foliar wounds during storms'
    ],
    favorableConditions: {
      tempRange: '25°C - 34°C (77°F - 93°F)',
      humidity: '> 85% relative humidity and heavy monsoon rains',
      triggers: 'Typhoons, strong gusty winds, and standing flood water'
    },
    organicTreatments: [
      'Pseudomonas fluorescens 2% WP foliar spray @ 10g/L',
      'Cow dung supernatant spray (traditional organic protective foliar wash)',
      'Drain excess standing water from paddy fields for 3-4 days'
    ],
    chemicalTreatments: [
      'Streptomycin sulphate + Tetracycline hydrochloride (Plantomycin) @ 1g/10L',
      'Copper oxychloride 50% WP @ 2.5g/L water',
      'Bismerthiazol 20% WP @ 1.5g/L'
    ],
    prevention: [
      'Grow resistant rice cultivars containing Xa gene clusters',
      'Avoid excessive split applications of chemical nitrogen fertilizer',
      'Ensure proper drainage to prevent field flooding during typhoons',
      'Clean bunds and eradicate alternative weed hosts like Leersia hexandra'
    ],
    sampleImage: createLeafSvg(
      60,
      [
        { cx: 120, cy: 90, r: 24, color: '#e6cf5e' },
        { cx: 110, cy: 140, r: 30, color: '#ded168' },
        { cx: 105, cy: 200, r: 28, color: '#f0e278' },
        { cx: 115, cy: 250, r: 18, color: '#fff08a' }
      ],
      '#365426',
      '#4f7a36'
    ),
    riskFactors: ['Monsoon flooding', 'Wind damage', 'Excess nitrogen']
  },
  {
    id: 'rice_blast',
    crop: 'Rice',
    name: 'Rice Blast',
    scientificName: 'Magnaporthe oryzae (Pyricularia oryzae)',
    pathogen: 'Fungal',
    description:
      'One of the most destructive cereal diseases worldwide. Produces spindle-shaped or diamond-shaped lesions with grayish-white centers and brownish-red borders on leaves and neck nodes.',
    symptoms: [
      'Diamond- or spindle-shaped lesions with pointed ends on leaves',
      'Lesion center is gray/whitish surrounded by a dark brown or reddish border',
      'Neck blast: rotting of the panicle neck causing empty white panicles ("white heads")',
      'Rapid leaf desiccating and whole-tillering death under epidemic conditions'
    ],
    causes: [
      'Airborne conidia spores landing on wet rice leaves and producing appressoria'
    ],
    favorableConditions: {
      tempRange: '20°C - 28°C (68°F - 82°F)',
      humidity: '> 90% humidity and long leaf wetness (dew > 10 hours)',
      triggers: 'Excessive nitrogen fertilizer and cloudy, drizzly days'
    },
    organicTreatments: [
      'Foliar spray with Neem oil + Pongamia pinata extract (5ml/L)',
      'Bio-fungicide Bacillus subtilis or Trichoderma harzianum @ 5g/L',
      'Application of silica-rich amendments (calcium silicate slag) to strengthen cell walls'
    ],
    chemicalTreatments: [
      'Tricyclazole 75% WP @ 0.6g/L (standard high-efficiency blast cure)',
      'Isoprothiolane 40% EC @ 1.5ml/L',
      'Kasugamycin 3% SL @ 2ml/L'
    ],
    prevention: [
      'Plant blast-resistant rice cultivars suited to the agro-climatic zone',
      'Adopt split nitrogen fertilizer management combined with potassium',
      'Maintain continuous water depth of 2-5cm to suppress spore development',
      'Treat seeds with Tricyclazole before nursery bed sowing'
    ],
    sampleImage: createLeafSvg(
      90,
      [
        { cx: 160, cy: 110, r: 16, color: '#d1cebf' },
        { cx: 155, cy: 150, r: 20, color: '#c4c0b1' },
        { cx: 165, cy: 190, r: 17, color: '#dedad0' },
        { cx: 158, cy: 230, r: 12, color: '#bfbbb0' }
      ],
      '#2d4a1f',
      '#477a33'
    ),
    riskFactors: ['High nitrogen application', 'Cloudy humid weather', 'Dense planting']
  },

  // --- APPLE ---
  {
    id: 'apple_scab',
    crop: 'Apple',
    name: 'Apple Scab',
    scientificName: 'Venturia inaequalis',
    pathogen: 'Fungal',
    description:
      'Common fungal affliction of apple orchards, causing velvety olive-green to black crusty lesions on leaves and corky, cracked blemishes on fruit.',
    symptoms: [
      'Olive-green, velvety or soot-like circular spots on upper leaf surfaces',
      'Lesions darken with age to brown or black with distinct fuzzy margins',
      'Severe infection causes leaf curling, dwarfing, and early summer defoliation',
      'Fruit develops dark, scabby, cracked blemishes that ruin marketability'
    ],
    causes: [
      'Ascospores discharged from overwintered leaves on orchard floor during spring rains'
    ],
    favorableConditions: {
      tempRange: '13°C - 24°C (55°F - 75°F)',
      humidity: 'Continuous leaf wetness for 9 to 28 hours (Mills period)',
      triggers: 'Frequent spring rainfall coinciding with green tip and bloom'
    },
    organicTreatments: [
      'Liquid lime sulfur applied in dormant or green tip stage',
      'Micronized Wettable Sulfur @ 3g/L before rain events',
      'Potassium bicarbonate sprays during early infection windows',
      'Mow and shred orchard floor leaves in autumn with 5% urea solution to speed decomposition'
    ],
    chemicalTreatments: [
      'Captan 50% WP @ 2.5g/L or Mancozeb 75% WP @ 2g/L',
      'Myclobutanil (Rally) 40% WSP @ 0.5g/L',
      'Difenoconazole 25% EC @ 0.5ml/L for curative kickback activity'
    ],
    prevention: [
      'Plant scab-resistant apple cultivars (e.g., Liberty, Prima, Enterprise, GoldRush)',
      'Prune canopy annually to maximize sunlight penetration and fast foliage drying',
      'Apply nitrogen fertilizer to fallen leaves in late autumn to speed decay'
    ],
    sampleImage: createLeafSvg(
      100,
      [
        { cx: 140, cy: 95, r: 18, color: '#2b3624' },
        { cx: 190, cy: 130, r: 24, color: '#222b1c' },
        { cx: 125, cy: 175, r: 26, color: '#2b3624' },
        { cx: 175, cy: 215, r: 20, color: '#1a2115' }
      ],
      '#21421c',
      '#3a6b32'
    ),
    riskFactors: ['Spring rain events', 'Unpruned dense canopies', 'Old leaf litter']
  },

  // --- GRAPE ---
  {
    id: 'grape_black_rot',
    crop: 'Grape',
    name: 'Black Rot',
    scientificName: 'Guignardia bidwellii',
    pathogen: 'Fungal',
    description:
      'Destructive vineyard disease causing reddish-brown circular foliar lesions with black pepper-like pycnidia dots, and shriveling grape berries into hard black mummies.',
    symptoms: [
      'Small, circular reddish-brown necrotic spots with dark borders on leaves',
      'Tiny black pimple-like dots (pycnidia) arranged in rings inside leaf lesions',
      'Infected grape berries turn soft and brown, then shrivel into hard black wrinkled mummies',
      'Shoots develop elongated dark purple to black cankers'
    ],
    causes: [
      'Fungus overwintering in mummified berries hanging on vines or fallen on soil'
    ],
    favorableConditions: {
      tempRange: '21°C - 27°C (70°F - 80°F)',
      humidity: 'Requires only 6-7 hours of continuous leaf wetness at optimal temps',
      triggers: 'Warm, rainy weather in spring and early vineyard bloom'
    },
    organicTreatments: [
      'Bordeaux mixture (copper sulfate + slaked lime) sprays',
      'Copper octanoate sprays every 10-14 days through bloom',
      'Meticulously hand-pick and dispose of all mummified berries from trellises during winter pruning'
    ],
    chemicalTreatments: [
      'Myclobutanil 40% WSP @ 0.5g/L',
      'Mancozeb 75% WP @ 2.5g/L (apply up to bloom stage)',
      'Kresoxim-methyl 44.3% SC @ 0.7ml/L'
    ],
    prevention: [
      'Summer canopy management: shoot thinning and leaf pulling around grape clusters',
      'Maintain clean vineyard floor with proper mowing and herbicide strips',
      'Avoid overhead irrigation that wets vineyard foliage'
    ],
    sampleImage: createLeafSvg(
      110,
      [
        { cx: 130, cy: 110, r: 20, color: '#4a2416' },
        { cx: 200, cy: 140, r: 22, color: '#3d1c10' },
        { cx: 150, cy: 180, r: 25, color: '#4a2416' },
        { cx: 185, cy: 220, r: 18, color: '#33150b' }
      ],
      '#2b4d24',
      '#437a38'
    ),
    riskFactors: ['Mummies left on vine', 'Rainy early summer', 'Poor cluster air flow']
  },

  // --- PEPPER ---
  {
    id: 'pepper_bacterial_spot',
    crop: 'Pepper (Bell)',
    name: 'Bacterial Spot',
    scientificName: 'Xanthomonas campestris pv. vesicatoria',
    pathogen: 'Bacterial',
    description:
      'Causes small, water-soaked, blistering spots on bell pepper leaves and fruit that turn dark brown with greasy margins, resulting in premature leaf drop.',
    symptoms: [
      'Small (1-3mm), circular water-soaked dark spots on leaves',
      'Lesions turn necrotic with yellow halos and ragged holes as centers drop out',
      'Heavy defoliation exposing bell peppers to direct solar scalding',
      'Raised, blister-like or scabby warty spots on green and ripe bell peppers'
    ],
    causes: [
      'Bacterial pathogen carried on infested seed coats or plant residue'
    ],
    favorableConditions: {
      tempRange: '24°C - 30°C (75°F - 86°F)',
      humidity: '> 85% humidity with driving rains or sprinkler irrigation',
      triggers: 'Storm splash and working in fields when pepper leaves are wet'
    },
    organicTreatments: [
      'Fixed copper + Mancozeb mix (or copper alone for organic)',
      'Bacillus amyloliquefaciens foliar spray @ 5g/L',
      'Acibenzolar-S-methyl (systemic acquired resistance inducer)'
    ],
    chemicalTreatments: [
      'Copper hydroxide 77% WP @ 2g/L combined with Mancozeb @ 1.5g/L',
      'Streptomycin sulfate sprays in nursery stage'
    ],
    prevention: [
      'Hot water seed treatment (50°C for 25 minutes) before sowing',
      'Plant resistant bell pepper hybrids with Bs1, Bs2, Bs3 genes',
      'Never cultivate or spray pepper fields while foliage is wet from morning dew'
    ],
    sampleImage: createLeafSvg(
      115,
      [
        { cx: 120, cy: 100, r: 10, color: '#2b1b11' },
        { cx: 145, cy: 125, r: 12, color: '#3b2518' },
        { cx: 190, cy: 130, r: 14, color: '#2b1b11' },
        { cx: 135, cy: 175, r: 15, color: '#3b2518' },
        { cx: 175, cy: 200, r: 11, color: '#2b1b11' },
        { cx: 150, cy: 235, r: 13, color: '#3b2518' }
      ],
      '#264c20',
      '#407834'
    ),
    riskFactors: ['Overhead irrigation', 'Driving rain storms', 'Contaminated seeds']
  },

  // --- WHEAT ---
  {
    id: 'wheat_leaf_rust',
    crop: 'Wheat',
    name: 'Leaf Rust (Brown Rust)',
    scientificName: 'Puccinia triticina',
    pathogen: 'Fungal',
    description:
      'Widespread foliar fungus producing small, round orange-brown pustules scattered across the upper leaf blade surface of wheat crops.',
    symptoms: [
      'Small, circular to oval bright orange-brown pustules',
      'Pustules occur predominantly on upper leaf blades rather than leaf sheaths',
      'Heavy infection accelerates leaf senescence and severely reduces grain weight (thousand-grain weight)'
    ],
    causes: [
      'Airborne urediniospores surviving across seasons on green volunteer wheat'
    ],
    favorableConditions: {
      tempRange: '15°C - 22°C (59°F - 72°F)',
      humidity: 'At least 4-6 hours of continuous dew or moisture',
      triggers: 'Mild winters followed by warm, humid spring weather'
    },
    organicTreatments: [
      'Sulfur dusting @ 25 kg/hectare',
      'Bio-protective Trichoderma harzianum foliar formulations'
    ],
    chemicalTreatments: [
      'Propiconazole 25% EC (Tilt) @ 1ml/L',
      'Tebuconazole 25.9% EC @ 1ml/L',
      'Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1ml/L'
    ],
    prevention: [
      'Sow rust-resistant wheat varieties recommended for the region',
      'Eradicate volunteer wheat plants before the new sowing season',
      'Avoid delayed sowing dates which expose crops to peak spring spore showers'
    ],
    sampleImage: createLeafSvg(
      90,
      [
        { cx: 150, cy: 90, r: 6, color: '#d95a14' },
        { cx: 165, cy: 115, r: 7, color: '#e66a20' },
        { cx: 145, cy: 145, r: 6, color: '#c95110' },
        { cx: 160, cy: 175, r: 8, color: '#d95a14' },
        { cx: 152, cy: 205, r: 7, color: '#e66a20' },
        { cx: 165, cy: 235, r: 6, color: '#d95a14' }
      ],
      '#2d5721',
      '#437a34'
    ),
    riskFactors: ['Mild winter', 'Late wheat planting', 'Neighboring infected fields']
  }
];

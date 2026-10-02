import type { DiseaseInfo, CropType } from './types';

export const DISEASE_DATABASE: DiseaseInfo[] = [
  {
    id: 'maize-gray-leaf-spot',
    crop: 'maize',
    name: 'Gray Leaf Spot',
    description:
      'A fungal disease caused by Cercospora zeae-maydis, producing rectangular gray-to-tan lesions along leaf veins.',
    visualCharacteristics: [
      'Rectangular gray-to-tan lesions confined between leaf veins',
      'Lesions with distinct parallel margins following vein patterns',
      'Yellow halos surrounding older lesion sites',
      'Symptoms typically appear on lower leaves first, spreading upward',
    ],
    management: [
      'Remove and destroy affected plant debris to reduce fungal inoculum',
      'Improve field airflow through proper plant spacing and weed control',
      'Consider planting resistant maize varieties in subsequent seasons',
      'Follow locally approved agricultural guidance for fungicide application timing',
    ],
    prevention: [
      'Practice crop rotation with non-host crops for at least one season',
      'Avoid planting maize in consecutive cycles on the same field',
      'Monitor fields regularly during periods of high humidity and rainfall',
      'Use balanced fertilization to maintain plant vigor and natural resistance',
    ],
  },
  {
    id: 'maize-northern-leaf-blight',
    crop: 'maize',
    name: 'Northern Leaf Blight',
    description:
      'A fungal disease caused by Exserohilum turcicum, producing long cigar-shaped gray lesions on maize leaves.',
    visualCharacteristics: [
      'Long cigar-shaped gray-to-tan lesions with dark margins',
      'Lesions spanning across leaf veins, unlike Gray Leaf Spot',
      'Olive-green fungal sporulation visible in humid conditions',
      'Lesions coalescing on severely affected leaves causing large necrotic areas',
    ],
    management: [
      'Remove infected plant material to reduce sources of reinfection',
      'Improve air circulation by managing plant density and weed growth',
      'Select tolerant or resistant maize hybrids for future planting',
      'Follow locally approved agricultural guidance for fungicide use during early infection stages',
    ],
    prevention: [
      'Rotate crops with legumes or other non-host species to break disease cycles',
      'Avoid overhead irrigation that prolongs leaf wetness',
      'Monitor for early symptoms during warm, humid weather periods',
      'Incorporate crop residues into soil to accelerate decomposition',
    ],
  },
  {
    id: 'maize-common-rust',
    crop: 'maize',
    name: 'Common Rust',
    description:
      'A fungal disease caused by Puccinia sorghi, producing cinnamon-brown rust pustules on both leaf surfaces.',
    visualCharacteristics: [
      'Small cinnamon-brown to rust-colored raised pustules on leaf surfaces',
      'Pustules scattered across both upper and lower leaf surfaces',
      'Yellow halos surrounding individual rust pustules',
      'Severe infection causing leaf yellowing and premature drying',
    ],
    management: [
      'Remove severely infected plants to slow disease spread',
      'Improve field drainage to reduce humidity around plants',
      'Plant rust-resistant maize varieties suited to your region',
      'Follow locally approved agricultural guidance for fungicide application',
    ],
    prevention: [
      'Practice crop rotation to reduce overwintering fungal spores',
      'Avoid late planting which increases exposure to peak rust periods',
      'Monitor fields during cool, humid weather favorable to rust development',
      'Maintain balanced nutrition to support natural plant defense mechanisms',
    ],
  },
  {
    id: 'tomato-early-blight',
    crop: 'tomato',
    name: 'Early Blight',
    description:
      'A fungal disease caused by Alternaria solani, producing distinctive target-like concentric ring lesions.',
    visualCharacteristics: [
      'Dark brown lesions with characteristic concentric rings resembling targets',
      'Yellowing tissue surrounding the concentric ring lesions',
      'Lesions often starting on older, lower leaves and spreading upward',
      'Stem lesions appearing as dark sunken spots near the soil line',
    ],
    management: [
      'Remove and destroy infected leaves to reduce fungal spread',
      'Mulch around plants to prevent soil-borne spores from splashing onto leaves',
      'Support plants with stakes or cages to improve air circulation',
      'Follow locally approved agricultural guidance for fungicide application',
    ],
    prevention: [
      'Rotate tomatoes with non-solanaceous crops for at least two seasons',
      'Avoid overhead watering; use drip irrigation to keep foliage dry',
      'Space plants adequately to promote airflow and reduce humidity',
      'Remove plant debris at season end to eliminate overwintering inoculum',
    ],
  },
  {
    id: 'tomato-late-blight',
    crop: 'tomato',
    name: 'Late Blight',
    description:
      'A devastating oomycete disease caused by Phytophthora infestans, producing dark water-soaked lesions.',
    visualCharacteristics: [
      'Large dark brown to black water-soaked lesions on leaves',
      'White fuzzy fungal growth visible on leaf undersides in humid conditions',
      'Lesions expanding rapidly under cool, wet weather conditions',
      'Dark greasy spots on stems and green fruit in advanced stages',
    ],
    management: [
      'Immediately remove and destroy infected plants to prevent rapid spread',
      'Avoid working in fields when foliage is wet to reduce spore dispersal',
      'Improve drainage and reduce humidity around plants through proper spacing',
      'Follow locally approved agricultural guidance for fungicide application promptly',
    ],
    prevention: [
      'Use certified disease-free seeds and resistant tomato varieties',
      'Avoid overhead irrigation and water early in the day',
      'Destroy volunteer tomato and potato plants that can harbor the pathogen',
      'Monitor fields closely during cool, rainy periods favorable to late blight',
    ],
  },
  {
    id: 'potato-late-blight',
    crop: 'potato',
    name: 'Late Blight',
    description:
      'A serious oomycete disease caused by Phytophthora infestans, the pathogen responsible for historic potato famines.',
    visualCharacteristics: [
      'Dark water-soaked lesions on leaflets that expand rapidly',
      'White sporulation visible on leaf undersides in moist conditions',
      'Dark brown to black stem lesions in advanced infection stages',
      'Lesions spreading quickly during cool, humid weather with prolonged leaf wetness',
    ],
    management: [
      'Remove and destroy infected plants immediately to prevent rapid spread',
      'Avoid compacting soil around plants to maintain good drainage',
      'Hill soil around plants to protect tubers from spore contamination',
      'Follow locally approved agricultural guidance for fungicide application timing',
    ],
    prevention: [
      'Plant certified disease-free seed potatoes only',
      'Rotate potatoes with non-host crops for at least three seasons',
      'Eliminate volunteer potato plants and cull piles that harbor the pathogen',
      'Monitor fields during cool, wet weather and act at first sign of symptoms',
    ],
  },
];

export const HEALTHY_INFO = {
  id: 'healthy',
  crop: 'maize' as CropType,
  name: 'Healthy',
  description: 'No disease symptoms detected. The leaf appears healthy with normal coloration.',
  visualCharacteristics: [
    'Uniform green leaf coloration without discoloration',
    'No visible lesions, spots, or fungal growth',
    'Intact leaf structure without necrosis or chlorosis',
  ],
  management: [
    'Continue regular monitoring to catch any issues early',
    'Maintain balanced fertilization and irrigation practices',
    'Keep records of healthy crop conditions for future reference',
  ],
  prevention: [
    'Continue good agricultural practices including crop rotation',
    'Monitor fields regularly especially during disease-favorable weather',
    'Maintain proper plant spacing and field hygiene',
  ],
};

export function getDiseasesByCrop(crop: CropType): DiseaseInfo[] {
  return DISEASE_DATABASE.filter((d) => d.crop === crop);
}

export function getDiseaseById(id: string): DiseaseInfo | undefined {
  return DISEASE_DATABASE.find((d) => d.id === id);
}

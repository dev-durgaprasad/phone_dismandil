// Appearance configuration. Colours drive the body material, frames drive the
// metal finish. Both are blocked while the phone shows an internal cutaway.
export const COLOURS = [
  {
    id: 'silver',
    name: 'Studio Silver',
    body: '#b8c4cc',
    back: '#c9d3da',
    accent: '#dfe7ec',
    roughness: 0.32,
    metalness: 0.92
  },
  {
    id: 'green',
    name: 'Electric Green',
    body: '#8fa63a',
    back: '#a6bd3f',
    accent: '#edff39',
    roughness: 0.24,
    metalness: 0.86
  },
  {
    id: 'blue',
    name: 'Sky Blue',
    body: '#7fa3c4',
    back: '#93b6d4',
    accent: '#cfe4f5',
    roughness: 0.28,
    metalness: 0.9
  },
  {
    id: 'graphite',
    name: 'Graphite',
    body: '#4a545c',
    back: '#525d66',
    accent: '#8d9aa4',
    roughness: 0.42,
    metalness: 0.88
  },
  {
    id: 'black',
    name: 'Midnight Black',
    body: '#1b2126',
    back: '#212830',
    accent: '#5b6a76',
    roughness: 0.38,
    metalness: 0.9
  }
]

export const FRAMES = [
  { id: 'standard', name: 'Standard Frame', roughness: 0.34, metalness: 0.9, tint: '#cdd6dc' },
  { id: 'titanium', name: 'Titanium Frame', roughness: 0.22, metalness: 1, tint: '#8e9ba4' },
  { id: 'matte', name: 'Matte Frame', roughness: 0.72, metalness: 0.62, tint: '#5c666d' }
]

export const DEFAULT_APPEARANCE = { colour: 'silver', frame: 'standard' }

export const colourById = (id) => COLOURS.find((c) => c.id === id) || COLOURS[0]
export const frameById = (id) => FRAMES.find((f) => f.id === id) || FRAMES[0]

// Exploded view layer order, from the outside in.
export const LAYER_ORDER = ['back', 'battery', 'board', 'camera', 'display', 'front']

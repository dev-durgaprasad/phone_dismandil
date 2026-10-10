// The technical architecture diagram: seven systems, connected by animated lines.
export const ARCHITECTURE = [
  {
    id: 'display',
    label: 'DISPLAY',
    x: 50,
    y: 6,
    text: 'The output surface. Everything else exists to feed it.'
  },
  {
    id: 'battery',
    label: 'BATTERY',
    x: 12,
    y: 34,
    text: 'Stores the energy. Its curve is negotiated with the charging controller.'
  },
  {
    id: 'board',
    label: 'PROCESSOR',
    x: 50,
    y: 42,
    text: 'Where computation happens, at the centre of the logic board.'
  },
  {
    id: 'camera',
    label: 'CAMERA',
    x: 88,
    y: 34,
    text: 'Captures light, then hands raw frames to the image processor.'
  },
  {
    id: 'memory',
    label: 'MEMORY',
    x: 22,
    y: 72,
    text: 'Working and long-term storage, bonded to keep latency short.'
  },
  {
    id: 'connectivity',
    label: 'CONNECTIVITY',
    x: 78,
    y: 72,
    text: 'Radio, satellite and antenna paths, each on a quiet ground plane.'
  },
  {
    id: 'charging',
    label: 'CHARGING',
    x: 50,
    y: 94,
    text: 'The port and controller pair that sets the safe charge rate.'
  }
]

export const ARCH_LINKS = [
  ['board', 'display'],
  ['board', 'camera'],
  ['board', 'memory'],
  ['board', 'connectivity'],
  ['board', 'charging'],
  ['battery', 'charging'],
  ['battery', 'board'],
  ['memory', 'display'],
  ['connectivity', 'camera']
]

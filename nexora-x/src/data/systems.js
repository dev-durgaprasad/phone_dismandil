// The four interactive systems of the NEXORA X.
// `anchor` is a percentage of the phone stage (never the viewport), so the
// hotspots stay locked to the device on every screen size.

export const SYSTEMS = [
  {
    id: 'display',
    index: '01',
    label: 'DISPLAY',
    anchor: { x: 30, y: 35 },
    hover: {
      title: 'OLED DISPLAY',
      lines: ['120Hz', 'AMOLED PANEL'],
      note: 'Display inspection'
    },
    reveal: { body: 0, display: 1, camera: 0, battery: 0, board: 0, back: 0 },
    detail: {
      id: 'display',
      title: 'DISPLAY',
      kicker: '01 / 04 — VISUAL SYSTEM',
      description:
        'A precision-engineered high-refresh display designed for clarity, colour and responsiveness.',
      focus: { target: 'display', distance: 5.4, polar: 1.16, azimuth: -0.22 },
      components: [
        {
          name: 'OLED Panel',
          text: 'Self-emissive pixels switch individually, so true black needs no backlight and contrast stays absolute.'
        },
        {
          name: 'Touch Layer',
          text: 'A capacitive grid samples the glass at 240Hz, registering the first contact before the finger settles.'
        },
        {
          name: 'Cover Glass',
          text: 'Ion-exchange glass with an oleophobic coating: thin, rigid and resistant to fingerprints.'
        },
        {
          name: 'Display Controller',
          text: 'Drives refresh timing, colour calibration and adaptive refresh from 1Hz to 120Hz.'
        }
      ]
    }
  },
  {
    id: 'camera',
    index: '02',
    label: 'CAMERA',
    anchor: { x: 72, y: 30 },
    hover: {
      title: 'PRO CAMERA SYSTEM',
      lines: ['MAIN SENSOR', 'ULTRA-WIDE', 'TELEPHOTO'],
      note: 'Camera module inspection'
    },
    reveal: { body: 0, display: 0, camera: 1, battery: 0, board: 0, back: 0 },
    detail: {
      id: 'camera',
      title: 'CAMERA SYSTEM',
      kicker: '02 / 04 — OPTICAL SYSTEM',
      description:
        'Three optics, one sensor pipeline. Each lens is aligned to the same focal plane so switching never breaks framing.',
      focus: { target: 'camera', distance: 4.6, polar: 1.05, azimuth: 0.62 },
      components: [
        {
          name: 'Main Sensor',
          text: 'A large-format sensor collects more light per pixel, keeping the frame clean at night.'
        },
        {
          name: 'Ultra-Wide Sensor',
          text: 'A 120° field of view with corrected distortion, so edges stay straight.'
        },
        {
          name: 'Telephoto Lens',
          text: 'A folded optical path reaches native magnification without a thicker camera island.'
        },
        {
          name: 'Optical Stabilization',
          text: 'Lens-shift compensation corrects for hand movement in real time.'
        },
        {
          name: 'Image Processor',
          text: 'Computes the final frame: noise, tone, depth and motion all resolved on-device.'
        }
      ]
    }
  },
  {
    id: 'battery',
    index: '03',
    label: 'BATTERY',
    anchor: { x: 35, y: 70 },
    hover: {
      title: 'BATTERY',
      lines: ['HIGH-DENSITY CELL'],
      note: 'Battery cutaway'
    },
    reveal: { body: 1, display: 0, camera: 0, battery: 1, board: 0, back: 0 },
    detail: {
      id: 'battery',
      title: 'BATTERY',
      kicker: '03 / 04 — POWER SYSTEM',
      description:
        'The cell isolated from the phone: a layered pouch, a protection circuit and a thermal path designed to move heat away from the display.',
      focus: { target: 'battery', distance: 5.0, polar: 1.22, azimuth: -0.1 },
      components: [
        {
          name: 'Battery Cell',
          text: 'A stacked-cell pouch delivers high density in a thin profile and recovers charge quickly.'
        },
        {
          name: 'Protection Circuit',
          text: 'Watches voltage, temperature and current, cutting the path before a fault can spread.'
        },
        {
          name: 'Connector',
          text: 'A low-profile board-to-board contact survives thousands of insertions.'
        },
        {
          name: 'Thermal Layer',
          text: 'A graphite sheet spreads heat across the cell instead of trapping it in one spot.'
        },
        {
          name: 'Charging Controller',
          text: 'Negotiates the fastest safe charge curve with the charger and the cell together.'
        }
      ]
    }
  },
  {
    id: 'board',
    index: '04',
    label: 'MOTHERBOARD',
    anchor: { x: 68, y: 70 },
    hover: {
      title: 'LOGIC BOARD',
      lines: ['PROCESSING', 'MEMORY', 'POWER MANAGEMENT'],
      note: 'Logic board cutaway'
    },
    reveal: { body: 1, display: 0, camera: 0, battery: 0, board: 1, back: 0 },
    detail: {
      id: 'board',
      title: 'LOGIC BOARD',
      kicker: '04 / 04 — LOGIC SYSTEM',
      description:
        'The dense centre of the device: processor, memory and power management on a dark board, connected by traces thinner than a hair.',
      focus: { target: 'board', distance: 4.9, polar: 1.18, azimuth: 0.34 },
      components: [
        {
          name: 'Processor',
          text: 'The central processing system responsible for computation and device performance.'
        },
        {
          name: 'Memory',
          text: 'Fast stacked memory sits directly on the processor package to cut latency.'
        },
        {
          name: 'Storage',
          text: 'UFS storage is bonded to the board, keeping reads short and thermals predictable.'
        },
        {
          name: 'Power Management',
          text: 'A dedicated controller sequences voltages so each rail stays clean and efficient.'
        },
        {
          name: 'Connectivity',
          text: 'The radio section is shielded on its own ground plane to keep signals quiet.'
        },
        {
          name: 'Charging Controller',
          text: 'Handles protocol negotiation and protects the cell during every charge cycle.'
        }
      ]
    }
  }
]

export const systemById = (id) => SYSTEMS.find((s) => s.id === id)

export const BRAND = {
  name: 'NEXORA',
  product: 'NEXORA X',
  tagline: 'Technology, inside out.',
  support: 'Explore beneath the surface.',
  instruction: 'Select a component to begin.'
}

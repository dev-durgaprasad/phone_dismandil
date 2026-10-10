import { DEFAULT_APPEARANCE } from './appearance.js'

// One small store for the cross-module contracts:
//   - appearance changes are refused while a cutaway or detail view is open
//   - the WebGL layer reacts to hover / detail / explode state
const state = {
  appearance: { ...DEFAULT_APPEARANCE },
  hover: null, // system id
  detail: null, // system id
  cutaway: false, // true while an internal cutaway is visible
  mode: 'hero', // hero | explode | lab | detail
  quality: 'high' // high | low
}

const listeners = new Set()

export const getState = () => state

export const subscribe = (fn) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export const setState = (patch) => {
  let changed = false
  for (const [key, value] of Object.entries(patch)) {
    if (state[key] !== value) {
      state[key] = value
      changed = true
    }
  }
  if (changed) listeners.forEach((fn) => fn(state, patch))
  return changed
}

// Appearance is only ever changed from a neutral phone: no cutaway, no detail.
export const canChangeAppearance = () => !state.cutaway && !state.detail

export const setAppearance = (patch) => {
  if (!canChangeAppearance()) return false
  const next = { ...state.appearance, ...patch }
  return setState({ appearance: next })
}

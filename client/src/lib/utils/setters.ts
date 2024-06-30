import type { LayerSettings } from '@/types/layers';

/**
 * *`setOpacity`*
 * Set opacity
 * @param {Number} o
 * @param {Number} base
 * @returns {Number} opacity
 */
type SetOpacityProps = { o: number; base: number };
export const setOpacity = ({ o = 1, base = 1 }: SetOpacityProps) => {
  return o * base;
};

/**
 * *`setVisibility`*
 * Set visibility
 * @param {Boolean} v
 * @param {String} type
 * @returns {String | Boolean} visibility
 */
type SetVisibilityProps = { v: LayerSettings['visibility']; type: 'mapbox' | 'deckgl' };
export const setVisibility = ({ v = 'visible', type = 'mapbox' }: SetVisibilityProps) => {
  if (type === 'deckgl') {
    return v === 'visible' ? true : false;
  }

  return v;
};

const SETTERS = {
  setOpacity,
  setVisibility,
} as const;

export default SETTERS;

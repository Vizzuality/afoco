export const BASEMAPS = [
  {
    label: 'Light',
    value: 'basemap-light',
    preview: `/images/map/light.png`,
    settings: {
      labels: 'dark',
      boundaries: 'boundaries-dark',
      roads: 'dark',
    },
  },
  {
    label: 'Satellite',
    value: 'basemap-satellite',
    preview: `/images/map/satellite.png`,
    settings: {
      labels: 'light',
      boundaries: 'boundaries-light',
      roads: 'light',
    },
  },
];

export const LABELS = [
  {
    label: 'Dark labels',
    slug: 'dark',
  },
  {
    label: 'Light labels',
    slug: 'light',
  },
  {
    label: 'No labels',
    slug: 'none',
  },
];

export const BOUNDARIES = [
  {
    label: 'Dark boundaries',
    slug: 'dark',
  },
  {
    label: 'Light boundaries',
    slug: 'light',
  },
];

export const ROADS = [
  {
    label: 'Dark roads',
    slug: 'dark',
  },
  {
    label: 'Light roads',
    slug: 'light',
  },
];

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
    id: '1059d2b8cfa87b8d894b5373ea556666',
    label: 'Dark labels',
    slug: 'dark',
  },
  {
    id: '5924e7eeda116f817dd89f1d8d418721',
    label: 'Light labels',
    slug: 'light',
  },
  {
    id: 'asdfasdfasdfasdf',
    label: 'No labels',
    slug: 'none',
  },
];

export const BOUNDARIES = [
  {
    id: 'ae861f3122c21ad7754e66d3cead38e6',
    label: 'Dark boundaries',
    slug: 'dark',
  },
  {
    id: '31b240eba06a254ade36f1dde6a3c07e',
    label: 'Light boundaries',
    slug: 'light',
  },
];

export const ROADS = [
  {
    id: '4e240a8b884456747dcd07d41b4d5543',
    label: 'Dark roads',
    slug: 'dark',
  },
  {
    id: 'edb80ef589e776ec6c2568b2fc6ad74c',
    label: 'Light roads',
    slug: 'light',
  },
];

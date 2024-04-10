export type Bbox = [number, number, number, number];

export const LEGEND_TYPE = ['basic', 'choropleth', 'gradient'] as const;

export type LegendType = (typeof LEGEND_TYPE)[number];

export type Legend = {
  type: LegendType;
  name?: string;
  info?: string;
  description?: string;
  items: { color: string; value: string; notes?: string }[];
  intersections?: { id: number; color: string }[];
  notes?: string;
};

export type MapSettings = {
  basemap: string;
  labels: string;
  boundaries: boolean;
  roads: boolean;
};

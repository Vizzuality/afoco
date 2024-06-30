type TotalBeneficiariesData = {
  year: string;
  uv: number;
};

export const totalProjectsValue = {
  afoco_funding: 730000,
  national_funding: 100000,
  total_funding: 830000,
};

export const totalInterventionArea = [
  { name: 'Plantation area', value: 'area_plantation_total' },
  { name: 'Reforestation', value: 'area_reforested_total' },
  { name: 'Protection', value: 'area_protected_total' },
];

export const totalBeneficiariesData: TotalBeneficiariesData[] = [
  {
    year: '2022',
    uv: 126,
  },
  {
    year: '2023',
    uv: 347,
  },
  {
    year: '2024',
    uv: 0,
  },
  {
    year: '2025',
    uv: 0,
  },
  {
    year: '2026',
    uv: 0,
  },
];

type CommunityBeneficiaries = {
  name: string;
  value: number;
}[];

type Funding = {
  name: string;
  value: number;
}[];

export const communityBeneficiaries: CommunityBeneficiaries = [
  { name: 'Female', value: 70 },
  { name: 'Male', value: 30 },
];

export const funding: Funding = [
  { name: 'AFoCO Funding', value: 33.6 },
  { name: 'National Contributions', value: 50 },
];

export const seedsPlanted = [
  { name: 'Meranti', value: 300 },
  { name: 'Teak', value: 200 },
  { name: 'Borneo Ironwood', value: 100 },
  { name: 'Other', value: 150 },
];

export const usefulLinks = [
  {
    title: 'Country Information Hub',
    description:
      'Archive of forestry and forestry-related laws, strategies, plans and policies in each Party.',
    link: '#',
  },
  {
    title: 'Global forest Watch country dashboard',
    description:
      'Explore interactive maps and charts that summarise key statistics about the Indonesia’s forest.',
    link: '#',
  },
];

type CommunityBeneficiaries = {
  name: string;
  value: number;
}[];

type Links = {
  title: string;
  description: string;
  link: string;
}[];

export const communityBeneficiaries: CommunityBeneficiaries = [
  { name: 'Female', value: 70 },
  { name: 'Male', value: 30 },
];

export const usefulLinks: Links = [
  {
    title: 'Country Information Hub',
    description:
      'Archive of forestry and forestry-related laws, strategies, plans and policies in each Party.',
    link: 'country_information_link',
  },
  {
    title: 'Global forest Watch country dashboard',
    description:
      'Explore interactive maps and charts that summarise key statistics about the Indonesia’s forest.',
    link: 'gfw_link',
  },
];

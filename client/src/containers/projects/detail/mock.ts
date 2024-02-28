type TrainedPeoplePerYearData = {
  year: string;
  uv: number;
};

type FundingInUSD = {
  name: string;
  value: number;
}[];

type CommunityBeneficiaries = {
  name: string;
  value: number;
}[];

type ProjectFundingInfrastructure = {
  name: string;
  value: number;
  info: string;
}[];

export const trainedPeoplePerYearData: TrainedPeoplePerYearData[] = [
  {
    year: '2000',
    uv: 40,
  },
  {
    year: '2001',
    uv: 30,
  },
  {
    year: '2002',
    uv: 20,
  },
  {
    year: '2003',
    uv: 27,
  },
  {
    year: '2004',
    uv: 95,
  },
  {
    year: '2005',
    uv: 90,
  },
  {
    year: '2006',
    uv: 90,
  },
  {
    year: '2007',
    uv: 80,
  },
  {
    year: '2008',
    uv: 90,
  },
  {
    year: '2009',
    uv: 30,
  },
  {
    year: '2010',
    uv: 40,
  },
  {
    year: '2011',
    uv: 10,
  },
  {
    year: '2012',
    uv: 10,
  },
  {
    year: '2013',
    uv: 20,
  },
  {
    year: '2014',
    uv: 10,
  },
];

export const fundingInUSD: FundingInUSD = [
  { name: 'AFoCO Funding', value: 50 },
  { name: 'National Contributions', value: 300 },
];

export const communityBeneficiaries: CommunityBeneficiaries = [
  { name: 'Female', value: 70 },
  { name: 'Male', value: 30 },
];

export const projectFundingInfrastructure: ProjectFundingInfrastructure = [
  {
    name: 'Computer and IT items',
    value: 12,
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nibh urna, sollicitudin tincidunt hendrerit vitae, gravida eget magna. Etiam tincidunt leo hendrerit tellus luctus tincidunt. Donec accumsan purus viverra mattis ornare. Duis vulputate mattis urna, ac tincidunt metus dapibus sed. Sed a dictum ante. Sed tristique at nibh vel elementum. Nunc suscipit scelerisque magna sit amet vulputate. Donec condimentum pellentesque diam eu vestibulum. Aliquam interdum auctor pulvinar. Sed consectetur sed nisi eu porttitor. Cras faucibus lacus ex. Nulla sit amet placerat nulla.',
  },
  {
    name: 'Drones',
    value: 2,
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nibh urna, sollicitudin tincidunt hendrerit vitae, gravida eget magna. Etiam tincidunt leo hendrerit tellus luctus tincidunt. Donec accumsan purus viverra mattis ornare. Duis vulputate mattis urna, ac tincidunt metus dapibus sed. Sed a dictum ante. Sed tristique at nibh vel elementum. Nunc suscipit scelerisque magna sit amet vulputate. Donec condimentum pellentesque diam eu vestibulum. Aliquam interdum auctor pulvinar. Sed consectetur sed nisi eu porttitor. Cras faucibus lacus ex. Nulla sit amet placerat nulla.',
  },
  {
    name: 'Vehicles or heavy machine',
    value: 2,
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nibh urna, sollicitudin tincidunt hendrerit vitae, gravida eget magna. Etiam tincidunt leo hendrerit tellus luctus tincidunt. Donec accumsan purus viverra mattis ornare. Duis vulputate mattis urna, ac tincidunt metus dapibus sed. Sed a dictum ante. Sed tristique at nibh vel elementum. Nunc suscipit scelerisque magna sit amet vulputate. Donec condimentum pellentesque diam eu vestibulum. Aliquam interdum auctor pulvinar. Sed consectetur sed nisi eu porttitor. Cras faucibus lacus ex. Nulla sit amet placerat nulla.',
  },
  {
    name: 'Other equipment',
    value: 0,
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nibh urna, sollicitudin tincidunt hendrerit vitae, gravida eget magna. Etiam tincidunt leo hendrerit tellus luctus tincidunt. Donec accumsan purus viverra mattis ornare. Duis vulputate mattis urna, ac tincidunt metus dapibus sed. Sed a dictum ante. Sed tristique at nibh vel elementum. Nunc suscipit scelerisque magna sit amet vulputate. Donec condimentum pellentesque diam eu vestibulum. Aliquam interdum auctor pulvinar. Sed consectetur sed nisi eu porttitor. Cras faucibus lacus ex. Nulla sit amet placerat nulla.',
  },
  {
    name: 'Buildings renovated',
    value: 0,
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nibh urna, sollicitudin tincidunt hendrerit vitae, gravida eget magna. Etiam tincidunt leo hendrerit tellus luctus tincidunt. Donec accumsan purus viverra mattis ornare. Duis vulputate mattis urna, ac tincidunt metus dapibus sed. Sed a dictum ante. Sed tristique at nibh vel elementum. Nunc suscipit scelerisque magna sit amet vulputate. Donec condimentum pellentesque diam eu vestibulum. Aliquam interdum auctor pulvinar. Sed consectetur sed nisi eu porttitor. Cras faucibus lacus ex. Nulla sit amet placerat nulla.',
  },
  {
    name: 'Watch towers built',
    value: 1,
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nibh urna, sollicitudin tincidunt hendrerit vitae, gravida eget magna. Etiam tincidunt leo hendrerit tellus luctus tincidunt. Donec accumsan purus viverra mattis ornare. Duis vulputate mattis urna, ac tincidunt metus dapibus sed. Sed a dictum ante. Sed tristique at nibh vel elementum. Nunc suscipit scelerisque magna sit amet vulputate. Donec condimentum pellentesque diam eu vestibulum. Aliquam interdum auctor pulvinar. Sed consectetur sed nisi eu porttitor. Cras faucibus lacus ex. Nulla sit amet placerat nulla.',
  },
  {
    name: 'Livelihood facilities built',
    value: 1,
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nibh urna, sollicitudin tincidunt hendrerit vitae, gravida eget magna. Etiam tincidunt leo hendrerit tellus luctus tincidunt. Donec accumsan purus viverra mattis ornare. Duis vulputate mattis urna, ac tincidunt metus dapibus sed. Sed a dictum ante. Sed tristique at nibh vel elementum. Nunc suscipit scelerisque magna sit amet vulputate. Donec condimentum pellentesque diam eu vestibulum. Aliquam interdum auctor pulvinar. Sed consectetur sed nisi eu porttitor. Cras faucibus lacus ex. Nulla sit amet placerat nulla.',
  },
];

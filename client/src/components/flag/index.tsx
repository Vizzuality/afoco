import Image from 'next/image';

const DEFAULT_CDN_URL = 'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/';
const DEFAULT_CDN_SUFFIX = 'svg';

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  cdnSuffix?: string;
  cdnUrl?: string;
  countryCode: string;
  width?: number;
  height?: number;
  svg?: true;
}

export type CountryFlagProps = ImgProps;

export const CountryFlag = ({
  cdnSuffix = DEFAULT_CDN_SUFFIX,
  cdnUrl = DEFAULT_CDN_URL,
  countryCode,
  height = 26.66,
  width = 40,
  svg = true,
  className,
}: CountryFlagProps) => {
  if (typeof countryCode !== 'string') {
    return null;
  }
  if (svg) {
    const flagUrl = `${cdnUrl}${countryCode.toLowerCase()}.${cdnSuffix}`;

    return (
      <Image
        alt={'Flag of ' + countryCode}
        src={flagUrl}
        width={width}
        height={height}
        className={className}
      />
    );
  }
};

export default CountryFlag;

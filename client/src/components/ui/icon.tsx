import cx from 'clsx';

interface BrowserSpriteSymbol {
  id: string;
  viewBox: string;
  content: string;
  node: SVGSymbolElement;
}

export interface IconProps {
  icon?:
    | {
        id: string;
        viewBox: string;
      }
    | BrowserSpriteSymbol;
  className?: string;
  style?: Record<string, string | number>;
}

export const Icon = ({ icon, className = 'w-5 h-5', style }: IconProps) => (
  <svg
    className={cx({
      'fill-current': true,
      [className]: className,
    })}
    viewBox={icon?.viewBox || '0 0 32 32'}
    style={style}
  >
    <use xlinkHref={`#${icon?.id}`} />
  </svg>
);

export default Icon;

import { useEffect, useState, MouseEvent, useCallback } from 'react';
import { useAtomValue } from 'jotai';
import { hoveredProjectMapAtom, openAtom } from '@/store';
import { Popup } from 'react-map-gl';

const PopupContainer = ({
  longitude,
  latitude,
  info,
  header,
}: {
  longitude: number;
  latitude: number;
  info?:
    | (
        | {
            id: string;
            name: string;
          }
        | undefined
      )[]
    | undefined;
  header?: string | null;
}) => {
  const hoveredProjectMap = useAtomValue(hoveredProjectMapAtom);

  const [scrollableArea, setScrollableArea] = useState<boolean>(false);

  useEffect(() => {
    if (hoveredProjectMap?.length !== 1) return;
  }, [hoveredProjectMap, scrollableArea]);

  const handleScrollableArea = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const dataId = e.currentTarget.getAttribute('data-id');
      if (dataId) {
        const element = document.getElementById(dataId);
        if (!scrollableArea && element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        setScrollableArea(true);
      }
    },
    [scrollableArea, setScrollableArea]
  );

  return (
    <Popup
      latitude={latitude}
      longitude={longitude}
      closeOnClick={false}
      style={{
        padding: 0,
      }}
      closeOnMove={false}
      maxWidth="300px"
      className="c-popup"
    >
      <div className="pointer-events-none absolute left-0 top-0 h-4 w-full rounded-lg bg-gradient-to-b from-white" />
      <div className="max-h-[49vh] space-y-2.5 overflow-y-auto overflow-x-hidden pr-8 text-slate-800 shadow-[0_20px_15px_rgba(0,0,0,0.1)]"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-full rounded-lg bg-gradient-to-t from-white" />
      <h3 className="pb-1 text-xs uppercase text-gray-500">{header}</h3>
      <div className="space-y-2">
        {info?.map((i) => (
          <p
            className="text-xs text-yellow-900"
            data-id={i?.id}
            onMouseEnter={handleScrollableArea}
            onMouseLeave={() => setScrollableArea(false)}
          >
            {i?.name}
          </p>
        ))}
      </div>
    </Popup>
  );
};

export default PopupContainer;

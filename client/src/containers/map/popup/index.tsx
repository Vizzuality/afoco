import { Popup } from 'react-map-gl';

const PopupContainer = ({
  longitude,
  latitude,
  info,
  header,
}: {
  longitude: number;
  latitude: number;
  info?: string | null;
  header?: string | null;
}) => {
  return (
    <Popup
      latitude={latitude}
      longitude={longitude}
      closeOnClick={false}
      style={{
        padding: 0,
      }}
      maxWidth="300px"
      className="c-popup"
    >
      <div className="pointer-events-none absolute left-0 top-0 h-4 w-full rounded-lg bg-gradient-to-b from-white" />
      <div className="max-h-[49vh] space-y-2.5 overflow-y-auto overflow-x-hidden pr-8 text-slate-800 shadow-[0_20px_15px_rgba(0,0,0,0.1)]"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-full rounded-lg bg-gradient-to-t from-white" />
      <h3 className="pb-1 text-xs uppercase text-gray-500">{header}</h3>
      <p className="text-xs text-yellow-900">{info}</p>
    </Popup>
  );
};

export default PopupContainer;

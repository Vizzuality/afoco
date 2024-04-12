import React from 'react';

import { extent } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { BarChart, Bar, Rectangle, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const CustomizedXAxisTick = ({
  x,
  y,
  payload,
}: {
  x: number;
  y: number;
  payload: { value: string };
}) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#7C828A" fontSize={12}>
        {payload.value}
      </text>
    </g>
  );
};
const CustomizedYAxisTick = ({
  x,
  y,
  payload,
}: {
  x: number;
  y: number;
  payload: { value: string };
}) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0 - 10} y={0} dy={0} dx={-2} textAnchor="middle" fill="#7C828A" fontSize={12}>
        {payload.value}
      </text>
    </g>
  );
};

const CustomTooltip = ({
  active,
  label,
  payload,
}: {
  active: boolean;
  label: string;
  payload: { value: string }[];
}) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="shadow-tooltip bg-gradient-tooltip m-auto rounded-md border p-2">
      <div className="flex space-x-2">
        <p>Value</p>
        <p className="font-bold">{payload[0].value}</p>
      </div>
      <div className="flex space-x-2">
        <p>Year:</p>
        <p className="font-bold">{label}</p>
      </div>
    </div>
  );
};

const getExt = (data: number[]) => extent(data) as [number, number];

export default function BarChartComponent({
  data,
  barDataKey,
  barRadius,
  fillBar,
  margin,
  xAxisDataKey,
}: {
  data: { [key: string]: unknown }[];
  barDataKey: string;
  barRadius?: [number, number, number, number];
  fillBar?: string;
  margin?: { top: number; right: number; bottom: number; left: number };
  xAxisDataKey: string;
}) {
  const xData = data.map((d) => Number(d[xAxisDataKey]));
  const extX = getExt(xData);

  const xScale = scaleLinear()
    .domain([extX[0] - 1, extX[1] + 1])
    .nice();

  const xTicks = xScale.ticks(3);

  const ticksY = data.map((d) => Number(d[barDataKey])).flat() as number[];
  const maxYtick = Math.round(Math.max(...ticksY) / 10) * 10;
  const mediumYtick = Math.round(maxYtick / 2 / 10) * 10;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={500} height={300} data={data} margin={margin}>
        <XAxis
          dataKey={xAxisDataKey}
          axisLine={false}
          tickLine={false}
          tick={CustomizedXAxisTick}
          ticks={xTicks}
          scale={xScale}
          domain={extX}
          type="number"
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          ticks={[0, mediumYtick, maxYtick]}
          tick={CustomizedYAxisTick}
        />
        <Tooltip
          cursor={{ fill: 'transparent' }}
          content={<CustomTooltip label={xAxisDataKey} active={false} payload={[]} />}
        />
        <Bar
          dataKey={barDataKey}
          fill={fillBar}
          radius={barRadius}
          activeBar={<Rectangle stroke="#D48D00" strokeWidth={2} />}
          barSize={19.75}
          alignmentBaseline="middle"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

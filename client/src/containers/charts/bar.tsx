import React from 'react';

import { extent } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { BarChart, Bar, Rectangle, XAxis, YAxis, ResponsiveContainer } from 'recharts';
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
      <text x={0} y={0} dy={0} dx={-2} textAnchor="middle" fill="#7C828A" fontSize={12}>
        {payload.value}
      </text>
    </g>
  );
};

export default function BarChartComponent({
  data,
  activeStyles,
  barDataKey,
  barRadius,
  fillBar,
  margin,
  xAxisDataKey,
}: {
  data: { [key: string]: unknown }[];
  activeStyles?: { stroke: string };
  barDataKey: string;
  barRadius?: [number, number, number, number];
  fillBar?: string;
  margin?: { top: number; right: number; bottom: number; left: number };
  xAxisDataKey: string;
}) {
  const Yticks = data.map((d) => Number(d[barDataKey])).flat() as number[];
  const maxYtick = Math.round(Math.max(...Yticks) / 10) * 10;
  const mediumYtick = Math.round(maxYtick / 2 / 10) * 10;
  const ext = extent(data, (d) => Number(d.year)) as [number, number];
  const scaleYticks = [0, mediumYtick, maxYtick];

  const scale = scaleLinear().domain(ext);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={500} height={300} data={data} margin={margin}>
        <XAxis
          dataKey="year"
          axisLine={false}
          tickLine={false}
          scale={scale}
          ticks={scale.ticks(5)}
          domain={ext}
          includeHidden
          tick={CustomizedXAxisTick}
        />
        <YAxis axisLine={false} tickLine={false} ticks={scaleYticks} tick={CustomizedYAxisTick} />
        <Bar
          dataKey={barDataKey}
          fill={fillBar}
          radius={barRadius}
          activeBar={<Rectangle stroke={activeStyles?.stroke} />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

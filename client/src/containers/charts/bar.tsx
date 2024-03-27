import React from 'react';

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
  const Xticks = data.map((d) => Number(d[xAxisDataKey])).flat() as number[];
  const Yticks = data.map((d) => Number(d[barDataKey])).flat() as number[];
  const scaleXticks = scaleLinear().domain(Xticks).ticks(2).map(String);
  const maxYtick = Math.round(Math.max(...Yticks) / 10) * 10;
  const mediumYtick = Math.round(maxYtick / 2 / 10) * 10;
  const scaleYticks = [0, mediumYtick, maxYtick];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={500} height={300} data={data} margin={margin}>
        <XAxis
          dataKey={xAxisDataKey}
          axisLine={false}
          tickLine={false}
          ticks={scaleXticks}
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

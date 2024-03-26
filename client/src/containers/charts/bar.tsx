import React from 'react';

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

  yAxisTicks,
}: {
  data: { [key: string]: unknown }[];
  activeStyles?: { stroke: string };
  barDataKey: string;
  barRadius?: [number, number, number, number];
  fillBar?: string;
  margin?: { top: number; right: number; bottom: number; left: number };
  xAxisDataKey: string;
  yAxisTicks?: string[];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={500} height={300} data={data} margin={margin}>
        <XAxis
          dataKey={xAxisDataKey}
          axisLine={false}
          tickLine={false}
          ticks={
            [
              data[0][xAxisDataKey],
              // data[Math.round((data.length - 1) / 2)][xAxisDataKey],
              data[data.length - 1][xAxisDataKey],
            ] as string[]
          }
          tick={CustomizedXAxisTick}
        />
        <YAxis axisLine={false} tickLine={false} ticks={yAxisTicks} tick={CustomizedYAxisTick} />
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

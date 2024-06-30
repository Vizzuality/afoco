import React from 'react';

import { useParams } from 'next/navigation';

import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from 'recharts';
import { Payload } from 'recharts/types/component/DefaultLegendContent';

import { cn } from '@/lib/classnames';

const COLORS = ['#ECAA00', '#70CCB0'];

const BGS = ['bg-[#ECAA00]', 'bg-[#70CCB0]'];

export const CustomizedLegend = ({ payload }: { payload: Payload[] }) => {
  const params = useParams();
  return (
    <div
      className={cn({ 'ml-48 flex w-full flex-col space-y-2': true, 'ml-44': !!params?.country })}
    >
      {payload.map((entry, index: number) => (
        <div key={index} className="flex items-start space-x-2">
          <div className={cn({ [`mt-1 h-3 w-3 rounded-full ${BGS[index]}`]: true })} />
          <span
            className={cn({
              'text-xs font-light': true,
              'max-w-[80px]': !!params?.country,
            })}
            key={`item-${index}`}
          >
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function PieChartComponent({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="50%" height="100%">
      <PieChart width={100} height={200}>
        <text
          x="50%"
          y="45%"
          dy={8}
          textAnchor="middle"
          fill={'#000000'}
          fontSize={32}
          fontWeight={800}
        >
          {data.reduce((acc, curr) => acc + curr.value, 0)}
        </text>
        <text
          x="50%"
          y="55%"
          dy={8}
          textAnchor="middle"
          fill={'#949494'}
          fontSize={14}
          fontWeight={300}
        >
          Total funding
        </text>

        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#ECAA00"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend content={<CustomizedLegend payload={[]} />} verticalAlign="middle" />
      </PieChart>
    </ResponsiveContainer>
  );
}

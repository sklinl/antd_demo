import React from 'react';
import {Area, AreaChart, ResponsiveContainer} from 'recharts';

type ExtraRevenueGraphProps = {
  data: any[];
};

const ExtraRevenueGraph: React.FC<ExtraRevenueGraphProps> = ({data}) => {
  return (
    <ResponsiveContainer height={200} width='100%'>
      <AreaChart
        width={500}
        height={100}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <Area
          type='monotone'
          dataKey='revenue'
          stroke='#4C51BF'
          fill='#4C51BF'
          strokeWidth={4}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ExtraRevenueGraph;

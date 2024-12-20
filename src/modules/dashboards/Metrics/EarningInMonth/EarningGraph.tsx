import React from 'react';
import {Cell, Pie} from 'recharts';
import {StyledEarningMonthGraph} from './index.styled';
import type {EarningInMonthDataType} from '@crema/types/models/dashboards/Metrics';

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

type EarningGraphProps = {
  data: EarningInMonthDataType[];
};

const EarningGraph: React.FC<EarningGraphProps> = ({data}) => {
  return (
    <StyledEarningMonthGraph width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={150}
        fill='#8884d8'
        dataKey='value'
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </StyledEarningMonthGraph>
  );
};

export default EarningGraph;

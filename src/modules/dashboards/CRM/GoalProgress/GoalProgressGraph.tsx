import React from 'react';
import {Bar, BarChart, Tooltip, XAxis, YAxis} from 'recharts';
import {StyledGoalChart} from './index.styled';
import type {ProgressGraphDataType} from '@crema/types/models/dashboards/CRM';

type GoalProgressGraphProps = {
  progressGraphData: ProgressGraphDataType[];
};

const GoalProgressGraph: React.FC<GoalProgressGraphProps> = ({
  progressGraphData,
}) => {
  return (
    <StyledGoalChart>
      <BarChart
        barGap={5}
        barSize={8}
        data={progressGraphData}
        margin={{top: 50}}
      >
        <XAxis dataKey='name' axisLine={false} tickLine={false} />
        <YAxis hide />
        <Tooltip labelStyle={{color: 'black'}} />
        <Bar dataKey='progress' stackId='a' fill='#3182CE' />
        <Bar dataKey='actual' stackId='a' fill='#E53E3E' />
      </BarChart>
    </StyledGoalChart>
  );
};

export default GoalProgressGraph;

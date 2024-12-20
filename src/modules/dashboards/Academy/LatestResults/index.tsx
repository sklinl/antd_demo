import React from 'react';
import AppCard from '@crema/components/AppCard';
import {useIntl} from 'react-intl';
import {List, Progress} from 'antd';
import {
  StyledLatestResultItem,
  StyledLatestResultSecondItem,
  StyledLatestResultsFirstItem,
} from './index.styled';
import {LatestResultDataType} from '@crema/types/models/dashboards/AcademyType';

const getColor = (percentage: number) => {
  if (percentage < 50) {
    return '#F5585B';
  }
  return '#0A8FDC';
};

type ResultItemProps = {
  result: LatestResultDataType;
};

const ResultItem: React.FC<ResultItemProps> = ({result}) => {
  return (
    <StyledLatestResultItem className='item-hover'>
      <StyledLatestResultsFirstItem>
        <h3 className='text-truncate'>{result.chapter}</h3>
        <p className='text-truncate'>- {result.topic}</p>
      </StyledLatestResultsFirstItem>
      <StyledLatestResultSecondItem>
        <Progress
          percent={result.percentage}
          strokeColor={getColor(result.percentage)}
          trailColor='#d6d6d6'
          strokeWidth={5}
        />
      </StyledLatestResultSecondItem>
    </StyledLatestResultItem>
  );
};

type LatestResultsProps = {
  latestResults: LatestResultDataType[];
};

const LatestResults: React.FC<LatestResultsProps> = ({latestResults}) => {
  const {messages} = useIntl();
  return (
    <AppCard
      heightFull
      title={messages['academy.latestResults'] as string}
      className='no-card-space-ltr-rtl'
    >
      <List
        dataSource={latestResults}
        renderItem={(data, index) => <ResultItem key={index} result={data} />}
      />
    </AppCard>
  );
};

export default LatestResults;

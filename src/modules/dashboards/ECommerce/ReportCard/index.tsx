import React from 'react';
import AppCard from '@crema/components/AppCard';
import StatGraphs from './StaticsGraph';
import {
  StyledContainer,
  StyledFlex,
  StyledFlex2,
  StyledPercentage,
  StyledSecondary,
  StyledSuccess,
  StyledTitle,
} from './index.styled';
import {rgba} from 'polished';
import type {ReportCardsType} from '@crema/types/models/dashboards/Ecommerce';
import {
  MdAccountBalanceWallet,
  MdBarChart,
  MdPieChart,
  MdPublic,
} from 'react-icons/md';

const getIcon = (icon: string) => {
  switch (icon) {
    case 'public':
      return <MdPublic size={30} />;
    case 'pie_chart':
      return <MdPieChart size={30} />;
    case 'bar_chart':
      return <MdBarChart size={30} />;
    case 'account_balance_wallet':
      return <MdAccountBalanceWallet size={30} />;
  }
};

type ReportCardProps = {
  data: ReportCardsType;
};

const ReportCard: React.FC<ReportCardProps> = ({data}) => {
  return (
    <AppCard>
      <StyledFlex>
        <StyledContainer>
          <StyledFlex2>
            <StyledTitle>{data.value}</StyledTitle>
            {data?.percentageChange && (
              <StyledSuccess>
                <StyledPercentage
                  style={{
                    color: data.percentageChange > 0 ? '#11C15B' : '#F04F47',
                  }}
                >
                  {data.percentageChange > 0 ? '+' : ''}
                  {data.percentageChange}%
                </StyledPercentage>
              </StyledSuccess>
            )}
          </StyledFlex2>
          <StyledSecondary>{data.type}</StyledSecondary>
        </StyledContainer>
        <div
          style={{
            color: data.color,
            padding: 8,
            backgroundColor: rgba(data.color, 0.1),
            borderRadius: '50%',
          }}
        >
          {getIcon(data.icon)}
        </div>
      </StyledFlex>
      <StatGraphs
        id={data.id}
        graphData={data.graphData}
        strokeColor={data.color}
      />
    </AppCard>
  );
};

export default ReportCard;

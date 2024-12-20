import React from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import DayTemperature from './DayTemperature';
import {SearchOutlined} from '@ant-design/icons';
import {
  StyledTempCard,
  StyledTempContent,
  StyledTempHeader,
  StyledTempHeaderAction,
  StyledTempHeaderColor,
  StyledTempHeaderContent,
} from './index.styled';
import type {TemperaturesType} from '@crema/types/models/dashboards/Widgets';

type TemperatureCardProps = {
  temperatures: TemperaturesType[];
};

const TemperatureCard: React.FC<TemperatureCardProps> = ({temperatures}) => {
  return (
    <StyledTempCard heightFull className='no-card-space'>
      <StyledTempHeaderColor>
        <StyledTempHeader>
          <h3>
            <IntlMessages id='dashboard.newYork' />
          </h3>
          <StyledTempHeaderAction>
            <SearchOutlined className='pointer' />
          </StyledTempHeaderAction>
        </StyledTempHeader>

        <StyledTempHeaderContent>
          <h1>
            -32<sup>0</sup>
          </h1>
          <p>
            <img src={'/assets/images/weather/weather1.png'} alt='weather' />
            <IntlMessages id='dashboard.heavySnow' />
          </p>
        </StyledTempHeaderContent>
      </StyledTempHeaderColor>

      <StyledTempContent>
        {temperatures.map((day) => {
          return <DayTemperature key={day.id} day={day} />;
        })}
      </StyledTempContent>
    </StyledTempCard>
  );
};

export default TemperatureCard;

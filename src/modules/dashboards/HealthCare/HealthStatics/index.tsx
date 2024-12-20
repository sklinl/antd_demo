import React, {useState} from 'react';
import AppCard from '@crema/components/AppCard';
import AppSelect from '@crema/components/AppSelect';
import {useIntl} from 'react-intl';
import StaticsGraph from './StaticsGraph';
import type {HeathStaticsDataType} from '@crema/types/models/dashboards/HealthCare';

type HealthStaticsProps = {
  data: HeathStaticsDataType;
};

const HealthStatics: React.FC<HealthStaticsProps> = ({data}) => {
  const [graphData, setGraphData] = useState(data.dataOne);
  const handleYearChange = (value: number) => {
    switch (value) {
      case 2017:
        setGraphData(data.dataTwo);
        break;
      case 2018:
        setGraphData(data.dataThree);
        break;
      case 2021:
        setGraphData(data.dataOne);
        break;
      default:
        setGraphData(data.dataOne);
    }
  };

  const handleMonthChange = (value: string) => {
    switch (value) {
      case 'June':
        setGraphData(data.dataTwo);
        break;
      case 'July':
        setGraphData(data.dataThree);
        break;
      case 'August':
        setGraphData(data.dataOne);
        break;
      default:
        setGraphData(data.dataThree);
    }
  };

  const {messages} = useIntl();
  return (
    <AppCard
      title={messages['healthCare.staticsHealthCare'] as string}
      extra={
        <div className='ant-row ant-row-middle'>
          <AppSelect
            menus={[2021, 2018, 2017]}
            defaultValue={2021}
            onChange={handleYearChange}
          />
          <AppSelect
            menus={[
              messages['common.june'],
              messages['common.july'],
              messages['common.august'],
            ]}
            defaultValue={messages['common.june']}
            onChange={handleMonthChange}
          />
        </div>
      }
    >
      <StaticsGraph data={graphData} />
    </AppCard>
  );
};

export default HealthStatics;

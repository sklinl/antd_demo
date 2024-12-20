import React from 'react';
import CoinStats from './CoinStats';
import IntlMessages from '@crema/helpers/IntlMessages';
import AppRowContainer from '@crema/components/AppRowContainer';
import {Col} from 'antd';
import {blue, purple, orange, red} from '@ant-design/colors';
import type {CoinsDataType} from '@crema/types/models/dashboards/Crypto';

type Props = {
  coinsData: CoinsDataType;
};

const Coins: React.FC<Props> = ({coinsData}) => {
  return (
    <>
      <h2 className='card-outer-title text-uppercase'>
        <IntlMessages id='dashboard.coins' />
      </h2>
      <AppRowContainer>
        <Col xs={24} sm={12}>
          <CoinStats
            icon={'/assets/images/bitcoin.svg'}
            bgColor={purple[4]}
            data={coinsData.bitcoin}
            heading={<IntlMessages id='dashboard.bitcoinPrice' />}
          />
        </Col>

        <Col xs={24} sm={12}>
          <CoinStats
            icon={'/assets/images/etherium.svg'}
            bgColor={blue[5]}
            data={coinsData.etherium}
            heading={<IntlMessages id='dashboard.etheriumPrice' />}
          />
        </Col>

        <Col xs={24} sm={12}>
          <CoinStats
            icon={'/assets/images/litcoin.svg'}
            bgColor={orange[4]}
            data={coinsData.liteCoin}
            heading={<IntlMessages id='dashboard.litecoinPrice' />}
          />
        </Col>

        <Col xs={24} sm={12}>
          <CoinStats
            icon={'/assets/images/ripple.svg'}
            bgColor={red[4]}
            data={coinsData.ripple}
            heading={<IntlMessages id='dashboard.ripplePrice' />}
          />
        </Col>
      </AppRowContainer>
    </>
  );
};

export default Coins;

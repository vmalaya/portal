import React from 'react';
import CardItem from '../CardItem';
import { Space, Typography } from 'antd';

import './styles.scss';

const { Title } = Typography;

const CardsList = ({ title, cards, type }) => {
  return (
    <div className={'cards-list'}>
      <Title level={3}>Your {title}</Title>
      <Space direction="vertical" style={{ width: '100%' }}>
        {cards.map((card) =>
          <CardItem title={card.title} key={card.uuid}  uuid={card.uuid} type={type} />)}
      </Space>
    </div>
  );
};

export default CardsList;
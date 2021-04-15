import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import './styles.scss'

const { Title } = Typography;

const CardItem = ({ title = 'new item', uuid, type }) => {
  return (
    <div className={'card-wrapper'}>
      <Card hoverable>
        <Button
          type="primary"
          shape="circle"
          className={"card-delete-btn"}
          danger
          icon={
            <CloseOutlined/>
          }
          size={'small'}
         />
        <Link to={`/${type}/${uuid}`}>
          <Title level={4} style={{ 'margin': 0 }}>{title}</Title>
        </Link>
      </Card>
    </div>
  );
};

export default CardItem;
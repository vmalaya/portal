import React from 'react';
import {Typography, Row, Col, Layout, PageHeader, Space, Button } from 'antd';

const {Title, Paragraph} = Typography;
const { Content } = Layout;

const TaskInfo = ({title, description, setIsToUpdateInfo }) => {
  return (
    <Content style={{ 'padding': '20px' }}>
      <PageHeader
        backIcon={false}
        className="site-page-header"
        onBack={() => null}
        title="Task"
        subTitle=""
      />
      <Space direction="vertical" style={{ 'width': '100%' }}>
        <Row align="bottom" gutter={4}>
          <Col span={6}>
            <Title level={4} style={{margin: 0}}>Title: </Title>
          </Col>
          <Col>
            <Paragraph style={{margin: 0}}>{title}</Paragraph>
          </Col>
        </Row>
      </Space>
      <Row align="bottom" gutter={4}>
        <Col span={6}>
          <Title level={4} style={{margin: 0}}>Description: </Title>
        </Col>
        <Col>
          <Paragraph style={{margin: 0}}>{description}</Paragraph>
        </Col>
      </Row>
      <Space direction="vertical" style={{ 'width': '100%' }}>
        <Row style={{marginTop: "20px"}}>
          <Col span={8}/>
          <Col span={8} style={{ 'display': 'flex', 'justifyContent': 'center' }}>
            <Button type={'primary'} onClick={() => setIsToUpdateInfo(true)}> Edit Task </Button>
          </Col>
          <Col span={8}/>
        </Row>
      </Space>
    </Content>
  );
};

export default TaskInfo;
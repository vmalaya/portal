import React from 'react';
import { Button, Col, Form, Input, Layout, PageHeader, Row, Space } from 'antd';

const { TextArea } = Input;
const { Content } = Layout;

const TaskForm = ({ title, description }) => {
  return (
    <Content style={{ 'padding': '20px' }}>
      <PageHeader
        backIcon={false}
        className="site-page-header"
        onBack={() => null}
        title="Task"
        subTitle=""
      />
      <Form>
        <Space direction="vertical" style={{ 'width': '100%' }}>
          <Input placeholder={'Name the task...'} value={title} />
          <TextArea autoSize={{ minRows: 12 }} placeholder={'Add a description...'} value={description} />
          <Row>
            <Col span={8}/>
            <Col span={8} style={{ 'display': 'flex', 'justifyContent': 'center' }}>
              <Button type={'primary'}> Save Task </Button>
            </Col>
            <Col span={8}/>
          </Row>
        </Space>
      </Form>
    </Content>
  );
};

export default TaskForm;
import React from 'react';
import { Button, Col, Form, Input, Layout, PageHeader, Row, Space } from 'antd';

const { TextArea } = Input;
const { Content } = Layout;

const TaskForm = ({ title, description, onDescriptionUpdate, onTitleUpdate, onTaskInfoUpdate }) => {
  return (
    <Content style={{ 'padding': '20px' }}>
      <PageHeader
        backIcon={false}
        className="site-page-header"
        onBack={() => null}
        title="Task"
        subTitle=""
      />
      <Form onFinish={onTaskInfoUpdate}>
        <Space direction="vertical" style={{ 'width': '100%' }}>
          <Input
            placeholder={'Name the task...'}
            value={title}
            onChange={(e) => onTitleUpdate(e)}
          />
          <TextArea
            autoSize={{ minRows: 12 }}
            placeholder={'Add a description...'}
            value={description}
            onChange={(e) => onDescriptionUpdate(e)}
          />
          <Row>
            <Col span={8}/>
            <Col span={8} style={{ 'display': 'flex', 'justifyContent': 'center' }}>
              <Button htmlType={"submit"} type={'primary'}> Save Task </Button>
            </Col>
            <Col span={8}/>
          </Row>
        </Space>
      </Form>
    </Content>
  );
};

export default TaskForm;
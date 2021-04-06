import React from 'react';
import { Button, Layout, PageHeader } from 'antd';
import CardsList from '../../components/CardsList';
import { mockedTasks } from './mockedTasks';

const { Content } = Layout;

const Tasks = () => {
  return (
    <Content style={{ 'padding': '20px' }}>
      <PageHeader
        backIcon={false}
        className="site-page-header"
        onBack={() => null}
        title="Tasks"
        subTitle=""
      />
      <Button style={{ 'marginBottom': '20px' }} type="primary">Add Task</Button>
      <CardsList title={"Tasks"} cards={mockedTasks} />
    </Content>
  );
};

export default Tasks;

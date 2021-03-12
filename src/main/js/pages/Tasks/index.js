import React from 'react';
import { Layout, Menu, PageHeader } from 'antd';

const { Header, Content } = Layout;

const Tasks = ()=> {
  return(
    <Layout>
      <Header>
        <Menu theme={"dark"} mode={"horizontal"}>
          <Menu.Item>Tasks</Menu.Item>
          <Menu.Item>Groups</Menu.Item>
          <Menu.Item>Logout</Menu.Item>
        </Menu>
      </Header>
      <Content>
        <PageHeader
          backIcon={false}
          className="site-page-header"
          onBack={() => null}
          title="Tasks"
          subTitle=""
        />
      </Content>
    </Layout>
  );
};

export default Tasks;

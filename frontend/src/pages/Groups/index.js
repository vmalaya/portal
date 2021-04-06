import React from 'react';
import { Button, Layout, PageHeader } from 'antd';
import CardsList from '../../components/CardsList';
import { mockedGroups} from './mockedGroups';

const { Content } = Layout;

const Groups = () => {
  return (
    <Content style={{ 'padding': '20px' }}>
      <PageHeader
        backIcon={false}
        className="site-page-header"
        onBack={() => null}
        title="Groups"
        subTitle=""
      />
      <Button style={{ 'marginBottom': '20px'}} type="primary">Create New Group</Button>
      <CardsList title={"Groups"} cards={mockedGroups}/>
    </Content>
   );
};

export default Groups;

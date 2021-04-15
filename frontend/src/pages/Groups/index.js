import React, { useEffect, useState } from 'react';
import { Button, Layout, PageHeader } from 'antd';
import axios from 'axios';
import CardsList from '../../components/CardsList';

const { Content } = Layout;

const Groups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() =>{
    axios({
      method: "GET",
      url: "http://localhost:8080/api/classes"
    })
    .then((resp) => {
      const groups = resp.data._embedded.classes;
      setGroups(groups);
    })
    .catch((err) => console.error(err))
  }, []);

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
      <CardsList title={"Groups"} cards={groups} type="groups"/>
    </Content>
   );
};

export default Groups;

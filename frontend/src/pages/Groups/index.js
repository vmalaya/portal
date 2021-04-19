import React, { useEffect, useState } from 'react';
import { Button, Layout, PageHeader } from 'antd';
import axios from 'axios';
import randomize from 'randomatic';

import CardsList from '../../components/CardsList';

const { Content } = Layout;

const Groups = ({ setNewGroup }) => {
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

  const handleGroupCreation = () => {
    const data = {
      uuid: randomize('0', 6),
      name: "New Group",
      owner: "http://localhost:8080/api/teachers/1"
    };
    
    axios({
      method: "POST",
      url: "http://localhost:8080/api/classes",
      data
    }).then((response) => {
      setNewGroup({status: true, uuid: data.uuid});  
    }).catch((error) => {
      console.error('an error happend while creating a task: ', error);
    });
  }

  return (
    <Content style={{ 'padding': '20px' }}>
      <PageHeader
        backIcon={false}
        className="site-page-header"
        onBack={() => null}
        title="Groups"
        subTitle=""
      />
      <Button style={{ 'marginBottom': '20px'}} type="primary" onClick={handleGroupCreation}>Create New Group</Button>
      <CardsList title={"Groups"} cards={groups} type="groups"/>
    </Content>
   );
};

export default Groups;

import React, {useState, useEffect} from 'react';
import { Button, Layout, PageHeader } from 'antd';
import CardsList from '../../components/CardsList';
import axios from 'axios';
import randomize from 'randomatic'

const { Content } = Layout;

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8080/api/tasks"
    }).then((response) => {
      setTasks(response.data._embedded.tasks);
    })
  }, []);

  const handleButtonClick= () => {
    const data = {
      uuid: randomize('0', 6),
      title: "",
      description: "",
      createdBy: "http://localhost:8080/api/teachers/1"
    };
    axios({
      method: "POST",
      url: "http://localhost:8080/api/tasks",
      data
    }).then((response) => {
      console.log(response)
    })

  };

  return (
    <Content style={{ 'padding': '20px' }}>
      <PageHeader
        backIcon={false}
        className="site-page-header"
        onBack={() => null}
        title="Tasks"
        subTitle=""
      />
      <Button style={{ 'marginBottom': '20px' }} type="primary" onClick={handleButtonClick}>Add Task</Button>
      <CardsList title={"Tasks"} cards={tasks} />
    </Content>
  );
};

export default Tasks;

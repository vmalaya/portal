import React, {useState, useEffect} from 'react';
import { Button, Layout, PageHeader } from 'antd';
import CardsList from '../../components/CardsList';
import axios from 'axios';
import randomize from 'randomatic'

const { Content } = Layout;

const Tasks = ({setNewTask, userAuthorized}) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8080/api/tasks",
      headers: {
        Authorization: `Basic ${userAuthorized.token}`
      }
    }).then((response) => {
      setTasks(response.data._embedded.tasks);
    }).catch((error) => {
      console.error('an error happend while fetching tasks: ', error);
    });
  }, []);

  const handleButtonClick = () => {
    const data = {
      uuid: randomize('0', 6),
      title: "",
      description: "",
      createdBy: "http://localhost:8080/api/teachers/1"
    };
    
    axios({
      method: "POST",
      url: "http://localhost:8080/api/tasks",
      data,
      headers: {
        Authorization: `Basic ${userAuthorized.token}`
      }
    }).then(() => {
      setNewTask({status: true, uuid: data.uuid});  
    }).catch((error) => {
      console.error('an error happend while creating a task: ', error);
    });
  };

  const handleTaskRemoval = (uuid) => {
    const filteredTasks = tasks.filter((task) => task.uuid !== uuid );
    axios({
      method: "DELETE",
      url: `http://localhost:8080/api/tasks/${uuid}`,
      headers: {
        Authorization: `Basic ${userAuthorized.token}`
      }
    }).then(() => {
      setTasks(filteredTasks);
    })
  }

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
      <CardsList title={"Tasks"} cards={tasks} type="tasks" onRemove={handleTaskRemoval} />
    </Content>
  );
};

export default Tasks;

import React, {useState} from 'react';
import { Row, Col } from 'antd';
import TaskForm from '../../components/TaskForm';
import TaskSidebar from '../../components/TaskSidebar';


const Task = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (

        <Row>
          <Col span={16}>
            <TaskForm title={title} description={description} />
          </Col>
          <Col span={8}>
            <TaskSidebar/>
          </Col>
        </Row>

  )
};

export default Task;
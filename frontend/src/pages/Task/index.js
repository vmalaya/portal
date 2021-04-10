import React from 'react';
import { Row, Col } from 'antd';
import TaskForm from '../../components/TaskForm';
import TaskSidebar from '../../components/TaskSidebar';


const Task = () => {
  return (

        <Row>
          <Col span={16}>
            <TaskForm />
          </Col>
          <Col span={8}>
            <TaskSidebar/>
          </Col>
        </Row>

  )
};

export default Task;
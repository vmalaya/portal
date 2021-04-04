import React from 'react';
import { Row, Col } from 'antd';
import TaskForm from '../../components/TaskForm';


const Task = () => {
  return (

        <Row>
          <Col span={16}>
            <TaskForm />
          </Col>
          <Col span={8}></Col>
        </Row>

  )
};

export default Task;
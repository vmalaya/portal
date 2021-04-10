import React, { useState } from 'react';
import { Button, Modal, Typography, Row, Col } from 'antd';
import CustomSelect from '../../components/CustomSelect';

import './styles.scss';

const { Title } = Typography;

const TaskSidebar = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  
  const handleModalStatusCahnge = () => {
    setIsVisibleModal(!isVisibleModal);
  }

  return (
    <div className="task-sidebar">
      <Button type="primary" block size={"large"}>Assign to...</Button>
      <Modal title={""} visible={true} onClick={handleModalStatusCahnge}>
        <Row gutter={20}>
          <Col span={12}>
            <Title level={4}>Assign to a User</Title>
            <CustomSelect targetType={"user"} />
          </Col>
          <Col span={12}>
            <Title level={4}>Assign to a Group</Title>
            <CustomSelect targetType={"group"} />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default TaskSidebar;

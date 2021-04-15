import React, { useState } from 'react';
import { Button, Modal, Typography, Row, Col, Space } from 'antd';
import CustomSelect from '../../components/CustomSelect';
import AssigneeList from '../../components/AssigneeList';

import './styles.scss';

const { Title } = Typography;

const TaskSidebar = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  
  const handleModalStatusCahnge = () => {
    setIsVisibleModal(!isVisibleModal);
  }

  return (
    <div className="task-sidebar">
      <Button type="primary" block size={"large"} onClick={handleModalStatusCahnge}>Assign to...</Button>
      <Modal width="100%" title={""} visible={isVisibleModal} onOk={handleModalStatusCahnge} destroyOnClose={true} onCancel={handleModalStatusCahnge}>
        <Row gutter={20}>
          <Col span={12}>
            <Title level={4}>Assign to a User</Title>
            <CustomSelect targetType={"user"} />
            <Space direction="vertical" style={{width: "100%"}}>
              <AssigneeList assigneeType={"user"} />
            </Space>
          </Col>
          <Col span={12}>
            <Title level={4}>Assign to a Group</Title>
            <CustomSelect targetType={"group"} />
            <Space direction="vertical" style={{width: "100%"}}>
              <AssigneeList assigneeType={"group"} />
            </Space>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default TaskSidebar;

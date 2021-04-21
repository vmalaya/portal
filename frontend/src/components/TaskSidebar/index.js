import React, { useState } from 'react';
import { Button, Modal, Typography, Row, Col, Space } from 'antd';
import CustomSelect from '../../components/CustomSelect';
import AssigneeList from '../../components/AssigneeList';

import './styles.scss';

const { Title } = Typography;

const TaskSidebar = ({ userAssignees=[], userMembers=[], onUserAdd, onUserDelete, groupAssignees=[], groupMembers=[], onGroupAdd, onGroupDelete }) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  
  const handleModalStatusCahnge = () => {
    setIsVisibleModal(!isVisibleModal);
  }

  return (
    <div className="task-sidebar">
      <Button type="primary" block size={"large"} onClick={handleModalStatusCahnge}>Assign to...</Button>

      <Space direction="vertical" style={{width: "100%"}}>
        <AssigneeList
          assignees={userMembers}
          onRemove={onUserDelete}
          assigneeType={"user"}
          enableShowMore={groupMembers.length > 5}
          onShowMore={() => {setIsVisibleModal(true)}}
        />
      </Space>

      <Space direction="vertical" style={{width: "100%"}}>
        <AssigneeList
          assigneeType={"group"}
          onRemove={onGroupDelete}
          assignees={groupMembers}
          enableShowMore={groupMembers.length > 5}
          onShowMore={() => {setIsVisibleModal(true)}}
        />
      </Space>

      <Modal
        width="100%"
        title={""}
        visible={isVisibleModal}
        onOk={handleModalStatusCahnge} 
        destroyOnClose={true} 
        onCancel={handleModalStatusCahnge}
        footer={[<Button type="primary" onClick={handleModalStatusCahnge}>Close</Button>]}
      >
        <Row gutter={20}>
          <Col span={12}>
            <Title level={4}>Assign to a User</Title>
            <CustomSelect 
              targetType={"user"}
              options={userAssignees}
              onChange={onUserAdd}
            />
            <Space direction="vertical" style={{width: "100%"}}>
              <AssigneeList
                assignees={userMembers}
                onRemove={onUserDelete}
                assigneeType={"user"} 
              />
            </Space>
          </Col>
          <Col span={12}>
            <Title level={4}>Assign to a Group</Title>
            <CustomSelect
              targetType={"group"}
              options={groupAssignees} 
              onChange={onGroupAdd}
            />
            <Space direction="vertical" style={{width: "100%"}}>
              <AssigneeList
                assigneeType={"group"}
                assignees={groupMembers}
                onRemove={onGroupDelete}
              />
            </Space>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default TaskSidebar;

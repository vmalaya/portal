import React, {useState, useEffect} from 'react';
import { List, Button, Typography, Avatar } from 'antd';
import { UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';

import './styles.scss';


const { Title } = Typography;

const mockedAssignees = [
  {
    name: "Assignee 1",
    description: "This task is assigned to this user",
    uuid: "123456"
  },
  {
    name: "Assignee 2",
    description: "This task is assigned to this user",
    uuid: "654321"
  },
  {
    name: "Assignee 3",
    description: "This task is assigned to this user",
    uuid: "123321"
  }
];

const AssigneeList = ({assigneeType}) => {
  const [assignees, setAssignees] = useState("");

  useEffect(() => {
     setAssignees(mockedAssignees);
  }, []);

return (
<div>
  <Title className="assignee-title" level={5}>Assigned {assigneeType}s</Title>
  <div className="assignee-list-wrapper">
    <List
      itemLayout="horizontal"
      dataSource={assignees}
      renderItem={item => (
        <List.Item
          actions={[<Button danger default>Unassign</Button>]}
        >
          <List.Item.Meta
            avatar={
              <Avatar icon={assigneeType === "user" ? <UserAddOutlined /> : <UsergroupAddOutlined />} />
            }
            title={item.name}
            description={item.description}
          />
        </List.Item>
      )}
    />
  </div>
  
</div>
)
}

export default AssigneeList;
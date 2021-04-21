import React from 'react';
import { List, Button, Typography, Avatar } from 'antd';
import { UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';

import './styles.scss';


const { Title } = Typography;

const AssigneeList = ({ assigneeType, assignees, onRemove, enableShowMore, onShowMore }) => {

return (
<div>
  <Title className="assignee-title" level={5}>Assigned {assigneeType}s</Title>
  <div className="assignee-list-wrapper">
    <List
      itemLayout="horizontal"
      dataSource={assignees}
      renderItem={item => (
        <List.Item
          actions={[<Button danger default onClick={() => onRemove((item.uuid))}>Remove</Button>]}
        >
          <List.Item.Meta
            avatar={
              <Avatar icon={assigneeType === "user" ? <UserAddOutlined /> : <UsergroupAddOutlined />} />
            }
            title={item.username || item.name}
          />
        </List.Item>
      )}
    />
    {
      enableShowMore && 
        <Button 
          style={{margin: "20px 0 0 auto", display: "block"}}
          type={"primary"}
          onClick={onShowMore}
          
        >
          Show more
        </Button>
    }
  </div>
  
</div>
)
}

export default AssigneeList;
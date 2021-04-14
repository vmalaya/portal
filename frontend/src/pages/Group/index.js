import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Typography, PageHeader, Layout } from 'antd';
import CustomSelect from '../../components/CustomSelect';
import AssigneeList from '../../components/AssigneeList';
import axios from 'axios';

import './styles.scss';

const { Title } = Typography;
const { Content } = Layout;

const Group = () => {
  const {groupId} = useParams();

  const [assignees, setAssignees] = useState([]);
  const [initialNormalizing, setInitialNormalizing] = useState(false);
  const [members, setMembers] = useState([]);
  const [group, setGroup] = useState({});

  useEffect(() => {
      axios({
        method: "GET",
        url: "http://localhost:8080/api/students"        
      }).then((response) => {
        const assignees = response.data._embedded.students;
        setAssignees(assignees);
        setInitialNormalizing(true);
      }).catch(err => console.error("an error occurred while fetching assignees", err));

      axios({
        method: "GET",
        url: `http://localhost:8080/api/classes/${groupId}`        
      }).then((response) => {
        const groupData = response.data;
        setGroup(groupData);
      }).catch(err => console.error("an error occurred while fetching group data", err));

      axios({
        method: "GET",
        url: `http://localhost:8080/api/classes/${groupId}/students`        
      }).then((response) => {
        console.log(response)
        const members = response.data._embedded.students;
        setMembers(members);
        setInitialNormalizing(true);
      }).catch(err => console.error("an error occurred while fetching members", err));
  }, []);

  useEffect(() => {
    if ( initialNormalizing && assignees.length && members.length) {
      let filteredAssignees;
       members.forEach((member) => {
        filteredAssignees = assignees.filter(
          assignee => ((assignee.uuid || assignee.id) !== (member.uuid || member.id))
        );
      });

      setAssignees(filteredAssignees);
      setInitialNormalizing(false);
    }
  }, [assignees, members]);

  const handleAddMember = (assigneeUuid) => {
    if (assignees.length) {
      const assignee = assignees.find(
        (assignee) =>( (assignee.uuid || assignee.id) === assigneeUuid)
      );
      setMembers([...members, assignee]);

      axios({
        method: "POST",
        url: `http://localhost:8080/api/classes/${groupId}/students`,
        data: { 
          uuid: assignee.id || assignee.uuid,
          username: assignee.username
        }    
      }).catch(err => {
          console.error(err);
        });

      const filteredAssignees = assignees.filter(
        assignee => ((assignee.uuid || assignee.id) !== assigneeUuid)
      );
      setAssignees(filteredAssignees);
    }
  }

  const handleMemberRemoval = (memberUuid) => {
    const member = members.find(
      (member) =>( (member.uuid || member.id) === memberUuid)
    );
    setAssignees([...assignees, member]);
    
    const filteredMembers = members.filter(
      member => ((member.uuid || member.id) !== memberUuid)
    );
    setMembers(filteredMembers);
  };
  
  return (
    <Content style={{ 'padding': '20px' }}>
      <PageHeader title={`Group ${group.name ? group.name : ""}`} />
      <div className="group-wrapper">
        <Row>
          <Col span={4}>
            <Title level={3}>Add a new member</Title>
          </Col>
          <Col span={6}>
            <CustomSelect targetType={"user"} options={assignees} onChange={handleAddMember} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <AssigneeList assigneeType={"user"} assignees={members} onRemove={handleMemberRemoval} />
          </Col>
        </Row>
      </div>
    </Content>
  )
}

export default Group;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'antd';
import axios from 'axios';
import TaskForm from '../../components/TaskForm';
import TaskSidebar from '../../components/TaskSidebar';


const Task = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [initialNormalizing, setInitialNormalizing] = useState(false);
  const [userAssignees, setUserAssignees] = useState([]);
  const [userMembers, setUserMembers] = useState([]);
  const { taskId } = useParams();

  useEffect(() => {

    // Send request to get task's title and description.
    axios({
      method: "GET",
      url: `http://localhost:8080/api/tasks/${taskId}`
    }).then((resp) => {
      const { title, description } = resp.data;
      setTitle(title);
      setDescription(description);
    });

    // Send request to get all available potential assignees.
    axios({
      method: "GET",
      url: "http://localhost:8080/api/students"        
    }).then((response) => {
      const assignees = response.data._embedded.students;
      setUserAssignees(assignees);
      setInitialNormalizing(true);
    }).catch(err => console.error("an error occurred while fetching assignees", err));

    // Send request to get all assigned members.
    axios({
      method: "GET",
      url: `http://localhost:8080/api/tasks/${taskId}/students`        
    }).then((response) => {
      const members = response.data._embedded.students;
      setUserMembers(members);
      setInitialNormalizing(true);
    }).catch(err => console.error("an error occurred while fetching members", err));
  }, []);

  useEffect(() => {
    if ( initialNormalizing && userAssignees.length && userMembers.length) {
      let filteredAssignees;
       userMembers.forEach((member) => {
        filteredAssignees = userAssignees.filter(
          assignee => ((assignee.uuid || assignee.id) !== (member.uuid || member.id))
        );
      });

      setUserAssignees(filteredAssignees);
      setInitialNormalizing(false);
    }
  }, [userAssignees, userMembers]);

  const handleAddUserMember = (assigneeUuid) => {
    if (userAssignees.length) {
      const assignee = userAssignees.find(
        (assignee) =>( (assignee.uuid || assignee.id) === assigneeUuid)
      );
      setUserMembers([...userMembers, assignee]);

      axios({
        method: "POST",
        url: `http://localhost:8080/api/tasks/${taskId}/students`,
        data: { 
          uuid: assignee.id || assignee.uuid,
          username: assignee.username
        }    
      }).catch(err => {
          console.error(err);
        });

      const filteredAssignees = userAssignees.filter(
        assignee => ((assignee.uuid || assignee.id) !== assigneeUuid)
      );
      setUserAssignees(filteredAssignees);
    }
  }

  const handleUserMemberRemoval = (memberUuid) => {
    const member = userMembers.find(
      (member) =>( (member.uuid || member.id) === memberUuid)
    );
    setUserAssignees([...userAssignees, member]);
    
    const filteredMembers = userMembers.filter(
      member => ((member.uuid || member.id) !== memberUuid)
    );
    setUserMembers(filteredMembers);
  };

  return (

        <Row>
          <Col span={16}>
            <TaskForm title={title} description={description} />
          </Col>
          <Col span={8}>
            <TaskSidebar
              userAssignees={userAssignees}
              userMembers={userMembers}
              onUserAdd={handleAddUserMember}
              onUserDelete={handleUserMemberRemoval}
            />
          </Col>
        </Row>

  )
};

export default Task;
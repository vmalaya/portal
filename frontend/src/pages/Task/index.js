import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'antd';
import axios from 'axios';
import randomize from 'randomatic';
import TaskForm from '../../components/TaskForm';
import TaskSidebar from '../../components/TaskSidebar';


const Task = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [initialNormalizing, setInitialNormalizing] = useState(false);
  const [initialGroupNormalizing, setInitialGroupNormalizing] = useState(false);
  const [userAssignees, setUserAssignees] = useState([]);
  const [userMembers, setUserMembers] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupAssignees, setGroupAssignees] = useState([]);
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
      url: `http://localhost:8080/api/taskStudents/search/findAllStudentByTaskUuid?uuid=${taskId}`        
    }).then((response) => {
      const members = response.data._embedded.students;
      setUserMembers(members);
      setInitialNormalizing(true);
    }).catch(err => console.error("an error occurred while fetching members", err));

    axios({
      method: "GET",
      url : `http://localhost:8080/api/taskClasses/search/findAllClassesByTaskUuid?uuid=${taskId}`
    }).then(resp => {
      const groupMembers = resp.data._embedded.classes;
      setGroupMembers(groupMembers);
    }).catch(err => console.error("an error occurred while fetching member groups", err));

    axios({
      method: "GET",
      url: "http://localhost:8080/api/classes"        
    }).then((response) => {
      const assignees = response.data._embedded.classes;
      setGroupAssignees(assignees);
      setInitialGroupNormalizing(true);
    }).catch(err => console.error("an error occurred while fetching assignees", err));
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

  useEffect(() => {
    if ( initialGroupNormalizing && groupAssignees.length && groupMembers.length) {
      let filteredAssignees;
       groupMembers.forEach((member) => {
        filteredAssignees = groupMembers.filter(
          assignee => ((assignee.uuid || assignee.id) !== (member.uuid || member.id))
        );
      });

      setGroupAssignees(filteredAssignees);
      setInitialGroupNormalizing(false);
    }
  }, [groupAssignees, groupMembers]);

  const handleAddUserMember = (assigneeUuid) => {
    if (userAssignees.length) {
      const assignee = userAssignees.find(
        (assignee) =>( (assignee.uuid || assignee.id) === assigneeUuid)
      );
      setUserMembers([...userMembers, assignee]);
      axios({
        method: "POST",
        url: `http://localhost:8080/api/taskStudents`,
        data: { 
          uuid: randomize('0', 6),
          student: assignee._links.self.href,
          task: `http://localhost:8080/api/tasks/${taskId}`
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

  const handleAddGroupMember = (groupAssigneeUuid) => {
    if (groupAssignees.length) {
      const assignee = groupAssignees.find(
        (assignee) =>(assignee.uuid === groupAssigneeUuid)
      );
      setGroupMembers([...groupMembers, assignee]);
      axios({
        method: "POST",
        url: `http://localhost:8080/api/taskClasses`,
        data: { 
          uuid: randomize('0', 6),
          classEntity: assignee._links.self.href,
          task: `http://localhost:8080/api/tasks/${taskId}`
        }
      }).catch(err => {
          console.error(err);
        });

      const filteredAssignees = groupAssignees.filter(
        assignee => ((assignee.uuid || assignee.id) !== groupAssigneeUuid)
      );
      setGroupAssignees(filteredAssignees);
    }
  }

  const handleDescritionUpdate = (e) => {
    setDescription(e.target.value);
  }

  const handleTitleUpdate = (e) => {
    setTitle(e.target.value);
  }

  const handleTaskInfoUpdate = () => {
    axios({
      method: "PUT",
      url:`http://localhost:8080/api/tasks/${taskId}`,
      data: { title, description }
    });
  }

  return (

        <Row>
          <Col span={16}>
            <TaskForm title={title}
              description={description}
              onDescriptionUpdate={handleDescritionUpdate} 
              onTitleUpdate={handleTitleUpdate}
              onTaskInfoUpdate={handleTaskInfoUpdate}
            />
          </Col>
          <Col span={8}>
            <TaskSidebar
              userAssignees={userAssignees}
              userMembers={userMembers}
              onUserAdd={handleAddUserMember}
              onUserDelete={handleUserMemberRemoval}
              groupMembers={groupMembers}
              groupAssignees={groupAssignees}
              onGroupAdd={handleAddGroupMember}
            />
          </Col>
        </Row>

  )
};

export default Task;
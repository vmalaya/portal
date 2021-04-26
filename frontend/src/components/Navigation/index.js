import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Layout, Menu, Typography, Modal } from 'antd';
import './styles.scss';

const { Header } = Layout;
const { Title } = Typography;

const Navigation = ({setUserStatus}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogout = () => {
    setIsModalVisible(false);
    setUserStatus(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogoutClick = () => {
    setIsModalVisible(true);
  }

  return (<Header>
    <Menu theme={'dark'} mode={'horizontal'}>
      <Menu.Item>
        <Link to={'/'}>Tasks</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={'/groups'}>Groups</Link>
      </Menu.Item>
    </Menu>
    <Button className={"nav-btn-logout"} type={'default'} ghost onClick={handleLogoutClick}>Logout</Button>
    <Modal title="Log out" visible={isModalVisible} onOk={handleLogout} onCancel={handleCancel}>
        <Title level={4}>Are you sure you want to leave?</Title>
    </Modal>
  </Header>);
};

export default Navigation;
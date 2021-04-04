import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Layout, Menu } from 'antd';
import './styles.scss';

const { Header } = Layout;

const Navigation = () => {
  return (<Header>
    <Menu theme={'dark'} mode={'horizontal'}>
      <Menu.Item><Link to={'/'}>Tasks</Link></Menu.Item>
      <Menu.Item><Link to={'/groups'}>Groups</Link></Menu.Item>
    </Menu>
    <Button className={"nav-btn-logout"} type={'default'} ghost>Logout</Button>
  </Header>);
};

export default Navigation;
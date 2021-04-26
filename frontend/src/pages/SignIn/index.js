import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Typography } from 'antd';

import axios from 'axios';

const tailLayout = {
  wrapperCol: { span: 24, offset: 4 },
};

const { Title } = Typography;

const SignIn = ({ setUserStatus }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (username.length && password.length) {
      axios({
        method: 'GET',
        url: `http://localhost:8080/api`,
        auth: { username, password },
      }).then((resp) => {
        if (+resp.status === 200) {
          const token = btoa(`${username}:${password}`)
          setUserStatus({token});
        }
      });
    }
  };

  const handleInputChange = (text, isUsername) => {
    isUsername ? setUsername(text) : setPassword(text);
  };

  return (
    <Row justify="center" align="middle" style={{paddingTop: '20vh'}}>
      <Col justify="center" span={11} xl={10} xxl={8}>     
          <Form
          name="basic"
          labelCol={{span: 4}}
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          style={{maxWidth: 550}}
          >
            <Form.Item {...tailLayout}><Title  level={1}>Sign In</Title></Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input size="large" onChange={(e) => handleInputChange(e.target.value, true)} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password size="large" onChange={(e) => handleInputChange(e.target.value)} />
            </Form.Item>

            <Form.Item {...tailLayout} >
              <Button type="primary" htmlType="submit" size="large" style={{width: '100%' }}>
                Submit
              </Button>
            </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default SignIn;
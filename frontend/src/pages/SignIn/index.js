import React from 'react';
import { Form, Input, Button, Row, Col, Typography } from 'antd';

const tailLayout = {
  wrapperCol: { span: 24, offset: 4 },
};

const { Title } = Typography;

const SignIn = () => {

  return (
    <Row justify="center" align="middle" style={{paddingTop: '20vh'}}>
      <Col span={8}/>
      <Col span={8}> 
          
          <Form
          name="basic"
          labelCol={{span: 4}}
          initialValues={{ remember: true }}
          >
            <Form.Item {...tailLayout}><Title  level="1">Sign In</Title></Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item {...tailLayout} >
              <Button type="primary" htmlType="submit" size="large" style={{width: '100%' }}>
                Submit
              </Button>
            </Form.Item>
        </Form>
      </Col>
      <Col span={8}/>
    </Row>
  )
}

export default SignIn;
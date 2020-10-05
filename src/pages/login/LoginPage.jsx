import React from 'react'
import { Form, Input, Button, Card } from 'antd'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions/auth'

const PageContainer = styled.div`
width: 100%;
max-width: 600px;
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
padding: 30px;
.ant-card {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
`

const LoginPage = props => {
  const dispatch = useDispatch()
  const authState = useSelector(state => state.auth)
  const [form] = Form.useForm()

  const handleFinish = values => {
    dispatch(login(values.username, values.password))
  }

  return (
    <PageContainer>
      <Card
        actions={[
          <Button loading={authState.status === "loading"} onClick={() => form.submit()}>Login</Button>
        ]}
      >
        <Form
          form={form}
          name="basic"
          onFinish={handleFinish}
        // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your valid email!', type: 'email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your valid password!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  )
}

export default LoginPage
import React, { useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import { UserOutlined, GlobalOutlined, DashboardOutlined, FileOutlined, CommentOutlined, LogoutOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/actions/auth';

const AppContainer = styled.div`
.site-layout-root {
  min-height: 100vh;
}
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.site-layout-content-wrapper {
  background: #fff;
  padding: 16px;
  min-height: 360px;
  height: 100%;
}

.site-layout-background {
  background: #fff;
}
.site-layout-header {
  text-align: right;
}
.site-layout-footer {
  border-top: 1px solid #DDD;
  text-align: center;
}

`

const { Header, Content, Footer, Sider } = Layout;

const DefaultLayout = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const authState = useSelector(state => state.auth)
  
  useEffect(() => {
    if(!authState.token){
      history.push('/auth/login')
    }
  }, [authState.token])

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <AppContainer className='App'>
      <Layout className='site-layout-root'>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          // onBreakpoint={broken => {
          //   console.log(broken);
          // }}
          // onCollapse={(collapsed, type) => {
          //   console.log(collapsed, type);
          // }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" selectedKeys={props.selectedMenu ? [props.selectedMenu] : undefined} >
          <Menu.Item key="home" icon={<DashboardOutlined />}><Link to='/'>Home</Link></Menu.Item>
            <Menu.Item key="articles" icon={<FileOutlined />}><Link to='/articles'>Articles</Link></Menu.Item>
            <Menu.Item key="statics" icon={<GlobalOutlined />}><Link to='/static-pages'>Static Pages</Link></Menu.Item>
            <Menu.Item key="users" icon={<UserOutlined />}><Link to='/users'>Users</Link></Menu.Item>
            <Menu.Item key="comments" icon={<CommentOutlined />}><Link to='/comments'>Comments</Link></Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className='site-layout-header'>
            <Button type='link' icon={<LogoutOutlined />} onClick={handleLogout}>Logout</Button>
          </Header>
          <Content style={{ margin: '16px' }}>
            <div className="site-layout-content-wrapper">
              {props.children || null}
            </div>
          </Content>
          <Footer className='site-layout-footer'>Irvan's blog © 2020 Created by Irvan</Footer>
        </Layout>
      </Layout>
    </AppContainer>
  )
}

export default DefaultLayout

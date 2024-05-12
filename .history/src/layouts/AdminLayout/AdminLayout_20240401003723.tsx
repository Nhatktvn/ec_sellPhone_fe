import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import { BiCategory } from 'react-icons/bi'
import { FaShoppingCart } from 'react-icons/fa'
import { Layout, Menu, Button, theme } from 'antd'

const { Header, Sider, Content } = Layout

interface Props {
  children?: React.ReactNode
}
const AdminLayout: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <Layout className='h-[100vh]'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='demo-logo-vertical' />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Quản lý người dùng'
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Quản lý sản phẩm'
            },
            {
              key: '3',
              icon: <BiCategory />,
              label: 'Quản lý danh mục'
            },
            {
              key: '4',
              icon: <FaShoppingCart />,
              label: 'Quản lý đơn hàng'
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout

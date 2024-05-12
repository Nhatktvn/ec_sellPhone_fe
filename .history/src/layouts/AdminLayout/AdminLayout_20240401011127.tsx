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
import { Layout, Menu, Button, theme, Collapse } from 'antd'

const { Header, Sider, Content } = Layout

interface Props {
  children?: React.ReactNode
  title: String
}
const AdminLayout: React.FC<Props> = ({ children, title }) => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <Layout className='relative'>
      <Sider trigger={null} collapsible collapsed={collapsed} className='fixed'>
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
      <Layout className={`${collapsed ? 'ml-[80px]' : 'ml-[200px]'} relative duration-[4000]`}>
        <Header style={{ padding: 0, background: colorBgContainer }} className='flex items-center fixed z-10 w-full'>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 50,
              height: 50
            }}
          />
          <h3 className='text-2xl font-medium'>{title}</h3>
        </Header>
        <Content
          style={{
            margin: '80px 16px 15px 16px',
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

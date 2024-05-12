import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import { BiCategory } from 'react-icons/bi'
import { FaSitemap, FaShoppingCart } from 'react-icons/fa'
import { Layout, Menu, Button, theme } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

const { Header, Sider, Content } = Layout

interface Props {
  children?: React.ReactNode
  title: String
}
const AdminLayout: React.FC<Props> = ({ children, title }) => {
  const navigation = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <Layout className='relative'>
      <Sider
        trigger={<Link to='/' />}
        collapsible
        collapsed={collapsed}
        className='h-[100vh]'
        style={{
          position: 'fixed',
          zIndex: '2'
        }}
      >
        <div className='demo-logo-vertical m-5 flex items-center gap-4 w-full justify-center'>
          {/* <div className='w-10 h-10 bg-red-400'>
            <img src='' alt='' />
          </div> */}
          <h3 className={`${collapsed && 'hidden'} text-white`}>Welcome, Admin</h3>
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          // items={[
          //   {
          //     key: '1',
          //     icon: <UserOutlined />,
          //     label: 'Quản lý người dùng'
          //   },
          //   {
          //     key: '2',
          //     icon: <VideoCameraOutlined />,
          //     label: 'Quản lý sản phẩm'
          //   },
          //   {
          //     key: '3',
          //     icon: <BiCategory />,
          //     label: 'Quản lý danh mục'
          //   },
          //   {
          //     key: '4',
          //     icon: <FaShoppingCart />,
          //     label: 'Quản lý đơn hàng'
          //   }
          // ]}
        >
          <Menu.Item key='1' icon={<UserOutlined />}>
            <Link to='/admin/manage-users'>Quản lý người dùng</Link>
          </Menu.Item>
          <Menu.Item key='2' icon={<BiCategory />}>
            <Link to='/admin/manage-categories'>Quản lý danh mục</Link>
          </Menu.Item>
          <Menu.Item key='3' icon={<FaSitemap />}>
            <Link to='/admin/manage-products'>Quản lý sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key='4' icon={<FaShoppingCart />}>
            <Link to='/admin/manage-orders'>Quản lý đơn hàng</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className={`${collapsed ? 'ml-[80px]' : 'ml-[200px]'} relative duration-300`}>
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

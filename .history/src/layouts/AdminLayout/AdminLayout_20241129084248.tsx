import React, { useEffect, useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import { BiCategory } from 'react-icons/bi'
import { FaSitemap, FaShoppingCart } from 'react-icons/fa'
import { RiCoupon2Line } from 'react-icons/ri'
import { Layout, Menu, Button, theme } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cartList } from '../../slices/cartSlice'
import { logout } from '../../slices/authSlice'
import { AiOutlineDashboard } from 'react-icons/ai'
const { Header, Sider, Content } = Layout

interface Props {
  children?: React.ReactNode
  title: string
}
const AdminLayout: React.FC<Props> = ({ children, title }) => {
  const navigation = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    document.title = title
  }, [location.pathname])
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const logoutUser = () => {
    dispatch(cartList([]))
    dispatch(logout())
    localStorage.removeItem('accessToken')
    navigation('/')
  }
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
        <div className='demo-logo-vertical my-5 flex flex-col items-center w-full gap-2 '>
          {/* <div className='w-10 h-10 bg-red-400'>
            <img src='' alt='' />
          </div> */}
          <h3 className='text-white text-center w-full text-xl font-medium duration-300'> Page Admin</h3>
          <button className='text-white  bg-red-600 p-1 rounded-md text-center hover:scale-95' onClick={logoutUser}>
            Đăng xuất
          </button>
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
          <Menu.Item key='1' icon={<AiOutlineDashboard />}>
            <Link to='/admin/manage-orders'>Dashboard</Link>
          </Menu.Item>
          <Menu.Item key='2' icon={<UserOutlined />}>
            <Link to='/admin/manage-users'>Quản lý người dùng</Link>
          </Menu.Item>
          <Menu.Item key='3' icon={<BiCategory />}>
            <Link to='/admin/manage-categories'>Quản lý danh mục</Link>
          </Menu.Item>
          <Menu.Item key='4' icon={<BiCategory />}>
            <Link to='/admin/manage-brands'>Quản lý thương hiệu</Link>
          </Menu.Item>
          <Menu.Item key='5' icon={<FaSitemap />}>
            <Link to='/admin/manage-products'>Quản lý sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key='6' icon={<RiCoupon2Line />}>
            <Link to='/admin/manage-coupon'>Quản lý phiếu giảm</Link>
          </Menu.Item>
          <Menu.Item key='7' icon={<FaShoppingCart />}>
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
            // background: colorBgContainer,
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

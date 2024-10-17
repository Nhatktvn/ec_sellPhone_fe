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
import { Layout, Menu, Button, theme } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cartList } from '../../slices/cartSlice'
import { logout } from '../../slices/authSlice'

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
          <Menu.Item key='1' icon={<UserOutlined />}>
            <Link to='/admin/manage-users'>Quản lý người dùng</Link>
          </Menu.Item>
          <Menu.Item key='2' icon={<BiCategory />}>
            <Link to='/admin/manage-categories'>Quản lý danh mục</Link>
          </Menu.Item>
          <Menu.Item key='3' icon={<BiCategory />}>
            <Link to='/admin/manage-brands'>Quản lý thương hiệu</Link>
          </Menu.Item>
          <Menu.Item key='4' icon={<FaSitemap />}>
            <Link to='/admin/manage-products'>Quản lý sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key='5' icon={<FaShoppingCart />}>
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
      <div
        id='static-modal'
        data-modal-backdrop='static'
        tabIndex={-1}
        aria-hidden='true'
        className='hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'
      >
        <div className='relative p-4 w-full max-w-2xl max-h-full'>
          {/* Modal content */}
          <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            {/* Modal header */}
            <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>Static modal</h3>
              <button
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-hide='static-modal'
              >
                <svg
                  className='w-3 h-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className='p-4 md:p-5 space-y-4'>
              <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
                With less than a month to go before the European Union enacts new consumer privacy laws for its
                citizens, companies around the world are updating their terms of service agreements to comply.
              </p>
              <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is
                meant to ensure a common set of data rights in the European Union. It requires organizations to notify
                users as soon as possible of high-risk data breaches that could personally affect them.
              </p>
            </div>
            {/* Modal footer */}
            <div className='flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600'>
              <button
                data-modal-hide='static-modal'
                type='button'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                I accept
              </button>
              <button
                data-modal-hide='static-modal'
                type='button'
                className='py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminLayout

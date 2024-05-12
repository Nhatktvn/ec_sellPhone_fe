import { useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ActiveAccount from './pages/AcctiveAccount/ActiveAccount'
import ConfirmActive from './pages/AcctiveAccount/ConfirmActive'
import AdminLayout from './layouts/AdminLayout'
import ManageUser from './pages/Admin/ManageUser/ManageUser'
import ManageCategory from './pages/Admin/ManageCategory/ManageCategory'
import ManaegProduct from './pages/Admin/ManageProduct/ManaegProduct'
import ManageOrder from './pages/Admin/ManageOrder/ManageOrder'
import Page404 from './pages/404/Page404'
import AddNewProduct from './pages/Admin/ManageProduct/AddNewProduct'
import ProtectedRouter from './protectedRouter/ProtectedRouter'
// import AdminTable from './pages/Admin/AdminTable'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      )
    },
    {
      path: '/login',
      element: (
        <RegisterLayout titileHeader='Đăng nhập'>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout titileHeader='Đăng ký'>
          <Register />
        </RegisterLayout>
      )
    },
    {
      path: '/active-account',
      element: (
        <RegisterLayout titileHeader='Kích hoạt tài khoản'>
          <ActiveAccount />
        </RegisterLayout>
      )
    },
    {
      path: '/confirm-active',
      element: (
        <RegisterLayout titileHeader='Kích hoạt tài khoản'>
          <ConfirmActive />
        </RegisterLayout>
      )
    },
    {
      path: '/danh-sach/:category',
      element: (
        <ProtectedRouter>
          <MainLayout>
            <ProductList />
          </MainLayout>
        </ProtectedRouter>
      )
    },
    {
      path: '/dien-thoai/:id',
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '/forgot-password',
      element: (
        <MainLayout>
          <ForgotPassword />
        </MainLayout>
      )
    },
    {
      path: '/reset-password',
      element: (
        <MainLayout>
          <ResetPassword />
        </MainLayout>
      )
    },
    {
      path: '/admin/manage-users',
      element: (
        <AdminLayout title={'Manage User'}>
          <ManageUser />
        </AdminLayout>
      )
    },
    {
      path: '/admin/manage-categories',
      element: (
        <AdminLayout title={'Manage Category'}>
          <ManageCategory />
        </AdminLayout>
      )
    },
    {
      path: '/admin/manage-products',
      element: (
        <AdminLayout title={'Manage Product'}>
          <ManaegProduct />
        </AdminLayout>
      )
    },
    {
      path: '/admin/manage-products/add-new',
      element: (
        <AdminLayout title={'Add new product'}>
          <AddNewProduct />
        </AdminLayout>
      )
    },
    {
      path: '/admin/manage-orders',
      element: (
        <AdminLayout title={'Manage Order'}>
          <ManageOrder />
        </AdminLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <Page404 />
        </MainLayout>
      )
    }
  ])
  return routeElements
}

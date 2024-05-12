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
import AddNewCategory from './pages/Admin/ManageCategory/AddNewCategory'
import ListCart from './pages/ListCart'
// import AdminTable from './pages/Admin/AdminTable'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout title='Trang chủ'>
          <HomePage />
        </MainLayout>
      )
    },
    {
      path: '/dang-nhap',
      element: (
        // <RegisterLayout titileHeader='Đăng nhập'>
        //   <Login />
        // </RegisterLayout>
        <MainLayout title='Đăng nhập'>
          <Login />
        </MainLayout>
      )
    },
    {
      path: '/dang-ki',
      element: (
        // <RegisterLayout titileHeader='Đăng ký'>
        //   <Register />
        // </RegisterLayout>
        <MainLayout title='Đăng kí'>
          <Register />
        </MainLayout>
      )
    },
    {
      path: '/kich-hoat-tai-khoan',
      element: (
        // <RegisterLayout titileHeader='Kích hoạt tài khoản'>
        //   <ActiveAccount />
        // </RegisterLayout>
        <MainLayout title='Xác thực tài khoản'>
          <ActiveAccount />
        </MainLayout>
      )
    },
    {
      path: '/xac-thuc',
      element: (
        // <RegisterLayout titileHeader='Kích hoạt tài khoản'>
        //   <ConfirmActive />
        // </RegisterLayout>
        <MainLayout title='Xác thực code'>
          <ConfirmActive />
        </MainLayout>
      )
    },
    {
      path: '/danh-sach/:category',
      element: (
        <MainLayout title='Danh sách'>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '/dien-thoai/:id',
      element: (
        <MainLayout title='Chi tiết'>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '/quen-mat-khau',
      element: (
        <MainLayout title='Quên mật khẩu'>
          <ForgotPassword />
        </MainLayout>
      )
    },
    {
      path: '/reset-password',
      element: (
        <MainLayout title='Đặt lại mật khẩu'>
          <ResetPassword />
        </MainLayout>
      )
    },
    {
      path: '/gio-hang',
      element: (
        <MainLayout title='Giỏ hàng'>
          <ListCart />
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
      path: '/admin/manage-categories/add-new',
      element: (
        <AdminLayout title={'Add new category'}>
          <AddNewCategory />
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
        <MainLayout title='404'>
          <Page404 />
        </MainLayout>
      )
    }
  ])
  return routeElements
}

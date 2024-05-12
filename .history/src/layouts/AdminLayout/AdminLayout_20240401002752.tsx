import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import { Layout, Menu, Button, theme } from 'antd'

const { Header, Sider, Content } = Layout

interface Props {
  children?: React.ReactNode
}
function AdminLayout({ children }: Props) {
  return <div>{children}</div>
}

export default AdminLayout

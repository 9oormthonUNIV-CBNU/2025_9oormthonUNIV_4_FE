import React from 'react'
import { Outlet } from 'react-router'
import styled from 'styled-components'

const AdminContainer = styled.div`
  margin-left: 360px;
  margin-right: 360px;
`
const AdminLayout = () => {
  return (
    <AdminContainer>
      <Outlet />
    </AdminContainer>
  )
}

export default AdminLayout

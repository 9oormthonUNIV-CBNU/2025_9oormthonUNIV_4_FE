import React from 'react'
import { Outlet } from 'react-router'
import styled from 'styled-components'

const AuthLayout = () => {
  const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  `
  return (
    <Wrapper>
      <Outlet/>
    </Wrapper>
  )
}

export default AuthLayout

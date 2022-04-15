import React from 'react'

// components
import Login from "../components/login/Login";
import Navebar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar';


// style
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
`

const LoginPage = () => {
  return (
    <Container >
        <Navebar />
        <Login />
        <Sidebar />
    </Container >
  )
}

export default LoginPage


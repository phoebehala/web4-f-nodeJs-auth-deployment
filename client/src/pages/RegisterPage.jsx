import React from 'react'

// components
import Register from "../components/register/Register";
import Navebar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar';


// style
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
`

const RegisterPage = () => {
  return (
    <Container >
        <Navebar />
        <Register />
        <Sidebar />
    </Container >
  )
}

export default RegisterPage
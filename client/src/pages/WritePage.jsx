import React from 'react'

// components
import Write from '../components/Write/Write';
import Navebar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar';


// style
import styled from 'styled-components';


const Container = styled.div`
    display: flex;
`


const WritePage = () => {
  return (
    <Container>
        <Navebar />
        <Write />
        <Sidebar />
    </Container>
  )
}

export default WritePage
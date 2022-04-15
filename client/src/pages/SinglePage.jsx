import React from 'react'

// components
import SinglePost from '../components/singlePost/SinglePost';
import Navebar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar';

// style
import styled from 'styled-components';

const Container = styled.div`
    display: flex;

`

const SinglePage = () => {
  return (
    <Container>
        <Navebar />
        <SinglePost/>
        <Sidebar />
    </Container>
  )
}

export default SinglePage

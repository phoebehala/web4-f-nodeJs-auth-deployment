import React from 'react'

// components
import Settings from '../components/settings/Settings'
import Navebar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar';


// style
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
`

const SettingPage = () => {
  return (
    <Container >
        <Navebar />
        <Settings/>
        <Sidebar />
    </Container >
  )
}

export default SettingPage
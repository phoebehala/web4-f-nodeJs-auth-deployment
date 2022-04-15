import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


// components
import Posts from '../components/posts/Posts';
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar';

// style
import styled from 'styled-components';



const Container = styled.div`
    display: flex;
`

const Home = () => {

  const [posts, setPosts] = useState([]);

  //const location = useLocation();
  //console.log('location from Home.jsx:',location); // {pathname: '/', search: '?user=ali', hash: '', state: null, key: 'default'}
  const {search} =useLocation();
  console.log('{search} =useLocation() from Home.jsx:',search);
  
 
  useEffect(()=>{
      const fethPosts = async ()=>{
          const res =  await axios.get(`${process.env.REACT_APP_HOST_URL}/myProxy/v1/api/posts`+search)
          //const res =  await publicRequest.get("/api/posts"+search)
          console.log(res);
          setPosts(res.data)
          
      }
      fethPosts()
  },[search]) // ,[search] >>> as a dependencies

  return (
    <Container>
        <Navbar />
        <Posts posts={posts}/>
        <Sidebar />
    </Container>
  )
}

export default Home
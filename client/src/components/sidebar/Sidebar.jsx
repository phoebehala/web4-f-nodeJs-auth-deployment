import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// style
import styled from 'styled-components';
import './sidebar.css'
import {mobile, tablet} from '../../util/responsive';

// contextAPI
import { useContext } from "react";
import { Context } from "../../context/Context"; 

const Container = styled.div`
    /* position: fixed;
    width: 160px;
    right:0px;
    z-index: -1;
    overflow: scroll; */
  
    flex:2;
  
    padding: 20px 3% 20px 2%;
    padding-bottom: 30px;
    background-color: #fdfbfb;
    border-left: #fdfbfb 1px solid;
    padding-left: 2%;

    display: flex;
    flex-direction: column;
    align-items: center;

    ${tablet({  display:"none"})}


`
const SidebarBtnAreaVistor = styled.div`
   display: flex;
   align-items: center;

   width: 100%;
   justify-content:end;


`
const SidebarBtnAreaUser = styled.div`
   display: flex;
   align-items: center;

   width: 100%;
   justify-content:space-between;

`
const Greeting = styled.span`
    font-family: 'Varela Round', sans-serif;
    color:gray;
`
const SidebarBtn = styled.button`
    cursor: pointer;
    margin: 3px;
    background-color: black;
    border: none;
    color: white;
    border-radius: 10px;
    padding: 10px;
    font-family: 'Varela Round', sans-serif;
    font-size: 0.8rem;
    :hover{
      font-weight:600;
    }
`

const SidebarItem = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;

   margin-bottom: 50px;

   ${tablet({ display:"none"})}
`

const SidebarTitle = styled.span`
   margin: 10px;
   padding: 5px;
   margin-bottom: 20px;
   width: 80%;
   border-top: 1px solid #ebe5e5;
   border-bottom: 1px solid #ebe5e5;
   font-family: 'Varela Round', sans-serif;
   font-size: 0.8rem;
   color: #222;
   font-weight: 600;
   line-height: 20px;
   text-align: center;
`
const AboutPhoto = styled.img`
    width: 100%;
    padding: 30px;
`
const AboutDesc = styled.p`
    font-family: 'Varela Round', sans-serif;
    font-size: 0.9rem;
    color: #444;
    line-height: 24px;
    padding: 2%;
`

const SidebarList = styled.ul`
   list-style: none;
   /* margin-bottom: 30px; */

   display: flex;
   flex-wrap: wrap;
   justify-content: space-evenly;

   padding-left: 0px;

   
`
const SidebarListItem = styled.li`
   display: inline-block;
   border: 1px solid #ebe5e5 ;
   padding: 3% 5%;
   border-radius: 20%;
   margin: 5px 15px 0 0;
   font-size: 1rem;
   font-family: 'Varela Round', sans-serif;

  
   cursor: pointer;
   text-align: center;

   :hover{
     font-weight: 700;
   }
`


const Sidebar = () => {
  const [cats, setCats]=useState([]); // [] empty array >>> initial state

  useEffect(()=>{
      const getCats = async ()=>{
          //const res = await axios.get(`${process.env.REACT_APP_HOST_URL}/myProxy/v1/api/categories`)
          const res = await axios.get('/myProxy/v1/api/categories')
          console.log(res);
          setCats(res.data)
      }
      getCats()
  },[])

  // const {user, dispatch} >>> taking these properties from my 'Context' (contextAPI) 
  const {user, dispatch} = useContext(Context);
  const handleLogout = ()=>{
    dispatch({type:"LOGOUT"});
  }

  return (
    <Container>

        {/* if there is no user, showing buttons for LOGIN and REGISTER */}
        {user?(
          <SidebarBtnAreaUser>
            <Greeting>Hi {user.username}!</Greeting>
            <SidebarBtn onClick={handleLogout }>LOGOUT</SidebarBtn>
          </SidebarBtnAreaUser>
       
        ):(
            <SidebarBtnAreaVistor>
                <Link className="link" to="/login">
                  < SidebarBtn>Login </SidebarBtn>
                </Link>
                <Link className="link" to="/register">
                  <SidebarBtn>Register</SidebarBtn>
                </Link>
          </SidebarBtnAreaVistor>
          )

        } 
        

        <SidebarItem>
          <SidebarTitle>
            ABOUT US
          </SidebarTitle>
          <AboutPhoto src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3TJWsVHNuBh6395nlaZy_eEpke_YChNPnSQ&usqp=CAU" alt="" />
          <AboutDesc>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, nisi. Magni distinctio excepturi fugiat fuga veniam sed porro voluptatum. Nisi hic porro ut esse nostrum sint minus soluta quam ab!
          </AboutDesc>
        </SidebarItem>

        <SidebarItem>
          <SidebarTitle>
            CATEGORIES
          </SidebarTitle>
          <SidebarList>
            { cats.map((c)=>(
                  <Link to={`/?cat=${c.name}`} className="link"> 
                      <SidebarListItem>{c.name}</SidebarListItem>
                  </Link>
              ))}
          </SidebarList>
        </SidebarItem>  

        <SidebarItem>
          <SidebarTitle>
              FOLLOW US
          </SidebarTitle>
          <SidebarList>
              <i className="sidebarIcon fab fa-facebook-square"></i>
              <i className="sidebarIcon fab fa-twitter-square"></i>
              <i className="sidebarIcon fab fa-pinterest-square"></i>
              <i className="sidebarIcon fab fa-instagram-square"></i>
          </SidebarList>
        </SidebarItem>  

    </Container>
  )
}

export default Sidebar
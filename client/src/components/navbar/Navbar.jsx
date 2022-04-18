import React from 'react';

import { Link } from "react-router-dom";

// style
import styled from 'styled-components'
import {AddBox, AddBoxOutlined, AddBoxRounded, AddBoxSharp, Apple, CreateOutlined, CropOriginal, ExitToApp, Home, InsertDriveFileOutlined, LocalActivity, Save, SaveAlt, Star, StarBorderTwoTone} from '@material-ui/icons';
import {mobile, tablet} from '../../util/responsive';

// materialUI components
import Tooltip from '@mui/material/Tooltip';

// contextAPI
import { useContext } from "react";
import { Context } from "../../context/Context"; 

const Container = styled.div`

    position: fixed;

    flex:1;
    /* background-color: aliceblue; */
    /* background-color:  #fdfbfb; */
    border-right: solid 5px #fdfbfb;
    
    display: flex;
    flex-direction: column;
    align-items: center;  

    width:80px;

    ${tablet({ backgroundColor:'#fff', bottom:'0', width:'100vw', flex:'none', flexDirection: 'row', borderRight:'none', borderTop:'solid 5px #fdfbfb'})}
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100vh;

    ${tablet({ width:'100%', height:'80px', flexDirection: 'row'})}
   
`
const Logo = styled.div`
    flex:1;

    margin-top: 40px;
    ${tablet({  marginTop:0,  marginLeft:'10px'})}
`
const LogoImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
`

const Navitem = styled.div`
    flex:8;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    ${tablet({  flexDirection: 'row'})}
`
const Navuser = styled.div`
    flex:1;

`
const UsrePhoto = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;

    margin-bottom: 30px;
`

const SidebarBtn = styled.button`
    visibility: hidden;
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
    ${tablet({ visibility: visible })}

`


const Navbar = () => {
  // const {user} >>> taking these properties from my 'Context' (contextAPI) 
  const {user, dispatch} = useContext(Context);
  console.log('user',user);
  
  const publicFolder = "https://web-mern-blog.herokuapp.com/myProxy/v1/images/"

  const handleLogout = ()=>{
    dispatch({type:"LOGOUT"});
  }

  return (
    <Container>
      <Wrapper>
        <Logo>
            <Link className="link" to="/">
                {/* <Apple /> */}
              <LogoImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx7JpONA0Vja3aawP1pOcPQ2H7M32948aqoA&usqp=CAU" alt=""/>
            </Link>
        </Logo>
        

        <Navitem>

          <Tooltip title="Home" placement="top">
            <Link className="link" to="/">
              <Home />
            </Link>
          </Tooltip>

          <Tooltip title="View My Posts" placement="top">
          {user ?
                <Link className="link" to={`/?user=${user.username}`}>
                  <InsertDriveFileOutlined />
                </Link>
                :
                <Link className="link" to={`/login`}>
                <InsertDriveFileOutlined />
              </Link>
          }
          </Tooltip>

          <Tooltip title="Write a Post" placement="top">
            <Link className="link" to="/write">
              <CreateOutlined />
            </Link>
          </Tooltip>
            

        </Navitem>


        <Navuser>
            {/* {user?(
                  <Link to={'/settings'}>
                    <UsrePhoto  src={publicFolder+user.profilePic} alt="" />
                  </Link>   
                ):(
                  <Link className="link" to="/login">
                      <ExitToApp />
                   </Link>
                )
                
            } */}


            {user?( // if ther is a user
              user.profilePic? (  

                // if the user has profilePicture
                <Tooltip title="Setting" placement="top">
                  <Link to={'/settings'}>
                      <UsrePhoto  src={publicFolder+user.profilePic} alt="" />
                  </Link> 
                </Tooltip>
              ):( 
                <Tooltip title="Setting" placement="top">
                  <Link to={'/settings'}>
                    <UsrePhoto  src="https://w7.pngwing.com/pngs/340/956/png-transparent-profile-user-icon-computer-icons-user-profile-head-ico-miscellaneous-black-desktop-wallpaper.png" alt="" />
                  </Link> 
                </Tooltip>
                )  
                
        
    
            ):( // if ther is no user
              <Tooltip title="Log In" placement="top">
                <Link className="link" to="/login">
                  <ExitToApp />
                </Link>
              </Tooltip>
            )
                
            }   

          {/* for tablet */}
            {user && <SidebarBtn onClick={handleLogout }>LOGOUT</SidebarBtn> } 

        </Navuser>
    

      </Wrapper>
    
    </Container>
  )
}

export default Navbar
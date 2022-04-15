import React from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

// contextAPI 
import { useContext, useEffect } from 'react'
import { Context } from '../../context/Context'

// style
import styled from 'styled-components';
import {mobile, tablet} from '../../util/responsive'

const Container = styled.div`
     flex:7;

     width:100%;

     margin-left: 80px;   /* due to the fixed navbar */

    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${tablet({ flex:'none', marginLeft: '0px' })}
   
    /* background: 
        linear-gradient(
            rgba(255,255,255,0.5),
            rgba(255,255,255,0.5)
        ),
        url(https://lujustar.com/wp-content/uploads/%E8%AD%9A%E6%9D%BE%E9%9F%BB%E5%B0%81%E9%9D%A2.jpg);
    background-size: cover;   */
`
const LoginTitle = styled.span`
    font-size: 50px;
`
const LoginForm = styled.form`
    margin-top: 20px;
    display: flex;
    flex-direction: column;

    width:250px;
`
const FormLabel = styled.label`
    margin: 10px 0 ;
`
const FormInput = styled.input`
    padding: 10px;
    background-color: white;
    border: none;
`
const FormButton = styled.button`
    margin-top: 20px;
    cursor: pointer;
    background-color: lightcoral;
    border: none;
    color: white;
    border-radius: 10px;
    padding: 10px;

    :disabled{
        /* if the button is disabled, ... */
        cursor: not-allowed;
        background-color: grey;
    }
`
const Remark = styled.div`
   margin-top: 10px;
   
   /* display: flex;
   align-items: center;
   justify-content: space-around; */
 
   
`
// const Hr = styled.hr`
//     flex:1;

//      width: 30%;
//      height: 0;
//      border-top: red 1px solid;
//      display: block;
//      align-items: center;

// ` 
const RemarkText = styled.span`
    /* flex:3;
    text-align: center; */

   color:grey;
   font-family: 'Lora', serif;
   font-style: italic;
   font-size: 14px;
`
const LoginRegisterClick = styled.span`
    font-style:normal;
    cursor: pointer;
    border: none;
    padding: 10px;
    color: lightcoral;
    :hover{
        font-weight: 900;
    }
    
    
`


const Login = () => {
    const [ username, setUsername ]= useState("");
    const [ password, setPassword ]= useState("");

    // const {user, dispatch, isFetching} >>> taking these properties from my 'Context' (contextAPI)
    const {user, dispatch, isFetching, error} = useContext(Context)

    const handleSubmit = async (e)=>{
        e.preventDefault(); // prevent from reloading the page when clicking submit
        
        dispatch({type:"LOGIN_START"}) // so it goes to Actions.js to find this type {type:"LOGIN_START"} of actions
        
        try {
            // to perform POST requests with Axios
            const res = await axios.post("https://web-mern-blog.herokuapp.com/myProxy/v1/api/auth/login", {
                username: username,  // .current >>> the property of 
                password: password
            })
            console.log('res',res);
            dispatch({type: "LOGIN_SUCCESS", payload: res.data}) 
        } catch (error) {
            dispatch({type:"LOGIN_FAILURE"})
        }
    }
    console.log("user from login.jsx",user);
    console.log("isFetching from login.jsx",isFetching);
    console.log("error from login.jsx",error);
    
    

  return (
    <Container>
        <LoginTitle>Login</LoginTitle>
        <LoginForm onSubmit={handleSubmit}>
            <FormLabel>Username</FormLabel>
            <FormInput type="text"  placeholder="Enter your username..."
                       onChange={e=>setUsername(e.target.value)} />

            <FormLabel>Password</FormLabel>
            <FormInput type="password" placeholder="Enter your password..." 
                        onChange={e=>setPassword(e.target.value)} />
        {error && <span style={{color:"red", marginTop:"30px", textAlign: "center"}}>Something went wrong</span> }  
            <FormButton type="submit" disabled={isFetching}>Login</FormButton>
            
        </LoginForm>

        <Remark>
      
           
       
            < RemarkText>Do not have an account?
                <Link className="link" to="/register">
                    <LoginRegisterClick>Register</LoginRegisterClick>
                </Link>
            </RemarkText>
       
  
        </Remark>

    </Container>
  )
}

export default Login
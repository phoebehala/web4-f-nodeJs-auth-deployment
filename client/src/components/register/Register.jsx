import React from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import {  useState } from "react";
import { useNavigate  } from "react-router-dom";

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
`
const Remark = styled.div`
   margin-top: 10px;
   
`
const RemarkText = styled.span`

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


const Register = () => {
    const [ username, setUsername ]= useState("");
    const [ email, setEmail ]= useState("");
    const [ password, setPassword ]= useState("");
    const [ error, setError] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = async (e)=>{
        e.preventDefault(); // prevent from reloading the page when clicking submit
        setError(false)
        try {
            // to perform POST requests with Axios
            const res = await axios.post("https://web-mern-blog.herokuapp.com/myProxy/v1/api/auth/register",{
                username: username,
                email: email,
                password: password
            })
            console.log(res);
            //res.data && window.location.replace("/login") // redirect the user to "/login" if successfully registered
            res.data && navigate("/login")
        } catch (error) {
            console.log(error);
            setError(true)
            
        }
    }

  return (
    <Container>
        <LoginTitle>Register</LoginTitle>
        <LoginForm  onSubmit={handleSubmit}>
            <FormLabel>Username</FormLabel>
            <FormInput type="text"  placeholder="Enter your username..." 
                       onChange={e=>setUsername(e.target.value)}/>

            <FormLabel>Email</FormLabel>
            <FormInput type="text"  placeholder="Enter your email..." 
                       onChange={e=>setEmail(e.target.value)}/>

            <FormLabel>Password</FormLabel>
            <FormInput type="password" placeholder="Enter your password..." 
                       onChange={e=>setPassword(e.target.value)}/>
        {error && <span style={{color:"red", marginTop:"30px", textAlign: "center"}}>Something went wrong</span> }
            <FormButton type="submit">Register</FormButton>
            
            
        </LoginForm>

        <Remark>
            < RemarkText>Already have an account?
                <Link className="link" to="/login">
                    <LoginRegisterClick>Login</LoginRegisterClick>
                </Link>
            </RemarkText> 
        </Remark>

    </Container>
  )
}

export default Register
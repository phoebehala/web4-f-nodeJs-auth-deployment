import React from 'react'

import { useState } from "react";
import axios from "axios";


// style
import styled from 'styled-components'
import "./settings.css";
import {mobile, tablet} from '../../util/responsive'


// contextAPI
import { useContext } from "react";
import { Context } from "../../context/Context";

const Container = styled.div`
    flex:7;
    width:100%;
    margin-left: 80px;   /* due to the fixed navbar */

    display: flex;
    
    ${tablet({ flex:'none', marginLeft: '0px' })}
`
const Wrapper = styled.div`
    flex: 9;
    padding: 30px 10%;
    
`
const SettingsTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center; 
`
const SettingUpadteTitle = styled.span`
    font-size: 2.5rem;
    margin: 20px; 
    /* color: lightcoral; */
    cursor: pointer;
`
const SettingDeleteTitle = styled.span`
    font-size: 0.9rem;
    color: red;
    cursor: pointer;
    :hover{
        font-weight: 900;
    }
`

const SettingsForm = styled.form`
    display: flex;
    flex-direction: column;
`
const ProfilePictureLabel = styled.label`
    font-size: 20px;
    margin-top: 20px;
`
const FormLabel = styled.label`
    font-size: 20px;
    margin-top: 20px;
`
const FormInput = styled.input`
    color: gray;
    margin: 10px 0;
    height: 30px;
    border: none;
    border-bottom: 1px solid lightgray;
`
const SettingsPPic = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0;
`
const PPicImg = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 20%;
    object-fit: cover;
   
`
const PPicLabel = styled.label`
    font-size: 20px;
    width: 70px;
    border-radius: 20%;
    object-fit: cover;

`
const FromSubmit = styled.button`
    width: 150px;
    align-self: center;
    border: none;
    border-radius: 10px;
    color: white;
    background-color:lightcoral;
    padding:10px;
    margin-top: 2;
`

const Settings = () => {
   
    // contextAPI
    const {user, dispatch} = useContext(Context);

    const publicFolder = "https://web-mern-blog.herokuapp.com/myProxy/v1/images/"

    const [file, setFile] = useState(null);
    const [username, setUsername] =useState("");
    const [email, setEmail] =useState("");
    const [password, setPassword] = useState("");

    const [success, setSuccess] = useState(false);



    const handleSubmit = async (e)=>{
        // console.log('submited');

        e.preventDefault();
        dispatch({ type: "UPDATE_START" });

        const updatedUser = {
            userId: user._id,
            username: username,
            email: email,
            password: password
        };

        if(file){ // if a user upload the image/file
            //console.log(file);

            const data = new FormData(); 
            const filename = Date.now()+file.name // Date.now() >>> random number. we can use UUID instaed

            data.append('name',filename);
            data.append('file',file)
            
            console.log(data);
            updatedUser.profilePic=filename; 
            console.log(' updatedUser from Settings.jsx: ', updatedUser);

            try {
                await axios.post('https://web-mern-blog.herokuapp.com/myProxy/v1/api/upload',data)   // '/upload' taken from api/server.js
            } catch (error) {
                
            }

        }

        try {
            const res = await axios.put('https://web-mern-blog.herokuapp.com/myProxy/v1/api/users/'+user._id,
                                         updatedUser,
                                         {headers: {token: `Bearer ${user.accessToken}`}}
                                         );
            setSuccess(true)
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
            res.data && window.location.replace("/login") // redirect the user to "/login" if successfully registered
        } catch (error) {
            dispatch({ type: "UPDATE_FAILURE" });
        }
        
    }

  return (
        <Container>
            < Wrapper>
                <SettingsTitle>
                    <SettingUpadteTitle>Update Your Account</SettingUpadteTitle>
                    <SettingDeleteTitle>Delete Account</SettingDeleteTitle>
                </SettingsTitle>
                <SettingsForm onSubmit={handleSubmit}>
                    <ProfilePictureLabel htmlFor="">Profile Picture</ProfilePictureLabel>
                    
                    <SettingsPPic>
                        <PPicImg
                            src={file ? URL.createObjectURL(file) : publicFolder+user.profilePic}
                            alt="" 
                        />

                        <PPicLabel htmlFor="fileInput">
                            <i  className=" settingsPPIcon far fa-user-circle"></i>
                        </PPicLabel>
                        <input type="file" id="fileInput" style={{display:"none"}}
                                onChange={(e)=>{setFile(e.target.files[0])}}/>

                    </SettingsPPic>


                    <FormLabel >Username</FormLabel>
                    <FormInput type="text" placeholder={user.username} onChange={(e)=>{setUsername(e.target.value)}} />

                    <FormLabel >Email</FormLabel>
                    <FormInput type="text" placeholder={user.email} onChange={(e)=>{setEmail(e.target.value)}} />

                    <FormLabel >Password</FormLabel>
                    <FormInput type="password" onChange={(e)=>{setPassword(e.target.value)}}/>

                    <FromSubmit type="submit">Update</FromSubmit >

                    {success && (
                        <span
                            style={{ color: "green", textAlign: "center", marginTop: "20px" }}
                        >
                            Profile has been updated...
                         </span>
                    )}
                </SettingsForm >

            </ Wrapper>

     
        </Container>
  )
}

export default Settings
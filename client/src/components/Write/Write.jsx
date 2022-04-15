import React from 'react'
import { useState, useEffect} from "react";
import { useLocation } from "react-router";

import axios from "axios";

// style
import "./write.css";
import styled from 'styled-components';
import {mobile, tablet} from '../../util/responsive'

// contextAPI
import { useContext } from "react";
import { Context } from "../../context/Context";


const Container = styled.div`
    flex:7;
    /* width:100%; */
    margin-left: 80px;   /* due to the fixed navbar */

    ${tablet({ flex:'none', marginLeft: '0px' })}
`
const Wrapper = styled.div`
    padding: 30px 10%;
`

const WriteImg = styled.img`
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 10px;
`

const WriteFormGroup = styled.div`
     display: flex;
     align-items: center;
`
const FileInputLabel  = styled.label``
const FileInput  = styled.input``
const TitleInput  = styled.input`
   font-size: 30px;
   font-family: 'Varela Round', sans-serif;
    border: none;
    padding: 20px;
   
    :focus{
    outline: none;
  }
  
`
const WriteText  = styled.textarea`
    font-size: 30px;
    border: none;
    padding: 20px;

    font-size: 20px;
    height: 100vh;
    width: 100%;
    font-family: 'Varela Round', sans-serif;
`

const WriteForm = styled.form`
    position: relative;
`
const WriteSubmit = styled.button`
    position:absolute;
    top: 20px;
    right:0px;
    color: white;
    background-color: lightcoral;
    padding: 10px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    font-family: 'Varela Round', sans-serif;
`

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;

    margin: 30px 0px;
`;
const Filter = styled.div`
    display: flex;
    align-items: center;
`;
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
    color:grey;
    font-family: 'Varela Round', sans-serif;
  
`;
const FilterCats = styled.select`
    margin-left: 10px;
    padding: 5px;
    color:grey;
    
`;
const FilterCatOption = styled.option``;


const Write = () => {

    /* can use useRed() insaed */
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null); 
    const [selectedCat, setSelectedCat] = useState([]); // this new post's category

    const [cats, setCats]=useState([]); // [] empty array >>> initial state
    useEffect(()=>{
        const getCats = async ()=>{
            const res = await axios.get('https://web-mern-blog.herokuapp.com/myProxy/v1/api/categories')
            console.log(res);
            setCats(res.data)
        }
        getCats()
    },[])


    const handleSelectedCat = (e) => {
        selectedCat.push(e.target.value)
        setSelectedCat(selectedCat);
        //console.log(e.target.value);
      };

    // contextAPI
    const {user} = useContext(Context);

    const handleSubmit = async (e)=>{
      e.preventDefault();

      console.log('selectedCat',selectedCat);

      const newPost = {
          username: user.username,
          title: title,
          desc:desc,
          categories:selectedCat
      };

      if(file){ // if a user upload the image/file
          console.log(file);

          const data = new FormData(); 
          const filename = Date.now()+file.name // Date.now() >>> random number. can use UUID instaed

          data.append('name',filename);
          data.append('file',file)
          
          console.log(data);
          newPost.photo=filename; // create a property 'photo' for data. the value is'filename'
          console.log(newPost);

          try {
              await axios.post('https://web-mern-blog.herokuapp.com/myProxy/v1/api/upload',data)   // '/upload' taken from api/routes/index.js
          } catch (error) {
              console.log(error);
          }

      }

      try {

          const res = await axios.post('https://web-mern-blog.herokuapp.com/myProxy/v1/api/posts/', 
                                        newPost,
                                      { headers: {token: `Bearer ${user.accessToken}`}}
                                      );
         // window.location.replace("/post/"+res.data._id); // if successfully create the post, go to this single post
           window.location.replace(`/?user=${user.username}`);
        } catch (error) {
          
      }
      
    }




  return (
    <Container>
        <Wrapper>
          {/* if there is a file, bother the right hand side */}
          { file && (
            <WriteImg
              src={URL.createObjectURL(file)} // URL.createObjectURL(file) >>> create URL for this file
              alt=""
            />
          )}

          <WriteForm  onSubmit={handleSubmit}>
            <WriteFormGroup>
                <FileInputLabel  htmlFor="fileInput">
                    <i className=" writeIcon  fas fa-plus"></i>
                </FileInputLabel >
                <FileInput type="file" id='fileInput' style={{display:"none"}}
                          // .file[0] >>> only let user upload signle file. file[0] means the first one
                          onChange={e=>setFile(e.target.files[0])}/>

                    {/* autoFocus={true} >>> it specifies that an <input> element should automatically get focus when the page loads. */}
                <TitleInput type="text" placeholder='Title'  autoFocus={true}
                            onChange={e=>setTitle(e.target.value)}/>
            </WriteFormGroup>

            <FilterContainer>
                <Filter>
                    <FilterTitle>Category</FilterTitle>
                        <FilterCats onChange={handleSelectedCat}>

                            {cats.map((c)=>(
                                <FilterCatOption>{c.name}</FilterCatOption>
                            ))}
                        </FilterCats>

                </Filter>


            </FilterContainer>

            <WriteFormGroup>
                <WriteText
                    placeholder="Tell your story..." 
                    type="text" 
                    className='writeInput writeText'
                    onChange={e=>setDesc(e.target.value)}
                ></WriteText>
            </WriteFormGroup>

            <WriteSubmit type="submit">Publish</WriteSubmit>

          </WriteForm>
          

        </Wrapper>

    </Container>
  )
}

export default Write
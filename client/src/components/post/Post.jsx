import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

// style
import styled from 'styled-components';



const Container = styled.div`
    /* background-color: pink; */
`
const Wrapper = styled.div`
   display: flex;
   align-items: center;

   padding: 5%;
`

// LEFT
const Left = styled.div`
    flex:3;
   
`
const PostInfo = styled.div`
    display: flex;
    align-items:center;

    width: 55%;
    justify-content: space-between;
`
const AutherImage = styled.img`
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    
`
const PostAuther = styled.span`

` 


const PostContent = styled.div`
    margin-top: 20px;
`
const PostTitle = styled.span`
    font-family: 'Josefin Sans', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin-top: 15px;
    cursor: pointer;

`
const PostDate = styled.span`
    font-family: 'Lora', serif;
    font-style: italic;
    font-size: 0.8rm;
    color: #999;
`

const PostDesc = styled.p`
    font-family: 'Varela Round', sans-serif;
    font-size: 1rm;
    color: #444;
    line-height: 24px;

    overflow: hidden;
    text-overflow: ellipsis;

    margin-top: 15px;

    max-height: 100px;
`

const PostCats = styled.div`
    margin-top: 20px;
`
const PostCat = styled.span`
    font-family: 'Varela Round', sans-serif;
    font-size: 0.8rm;
    line-height: 20px;
    margin: 15px 5px 0 5px;
    border:1px solid none;
    background-color:#ebe5e5;
    padding: 1% 3%;
    border-radius: 20%;
    cursor: pointer;
`


// RIGHT
const Right = styled.div`
    flex:1;

    padding-left: 5%;
    
`
const PostImage = styled.img`
    width:150px;
    height:150px;
    object-fit: cover;
    border-radius: 7px;


`

// const Hr = styled.hr`
//     width: 50%;
//     border-bottom: red 1px solid;
//     display: block;
//     align-items: center;
//     margin-left:10%;
// ` 

            //post={post:{post}}
const Post = ({post}) => {
    //console.log('{post}',post);

    const publicFolder = "https://web-mern-blog.herokuapp.com/myProxy/v1/images/"

    // useEffect(()=>{
    //     const auther = post.username
    //     const getAutherPic = async ()=>{
    //         const res = await axios.get('http://localhost:3000/myProxy/v1/api/users')
    //         console.log(res);
    //         setCats(res.data)
    //     }
    //     getAutherPic()
    // },[])

  return (
    <Container>
         <Wrapper>
            <Left>

                <PostInfo>
                    
                    <AutherImage
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUR_o351MDDeZeHB_8wTc617eAhQmVAHVMevkS2ucYwkKezx6tVgHq9XsTHQjqTgQk71c&usqp=CAU"
                                alt=""
                    />

                    <Link to={`/?user=${post.username}`} className="link">
                        <PostAuther>{post.username}</PostAuther>
                    </Link>
                    
                    <PostDate> {new Date(post.createdAt).toDateString()}</PostDate>
        
                </PostInfo>
                
                <PostContent >
                    <Link to={`/post/${post._id}`} className="link">  {/* className="link" >>> stylle from index.html */}
                        <PostTitle>{post.title} </PostTitle>
                     </Link>
                    <PostDesc>
                    {post.desc.slice(0, 200).concat('...')}
                    </PostDesc> 
                </PostContent>
                
                
                <PostCats>
                    {console.log("post.categories",post.categories)}
                    {post.categories && 
                        post.categories.map((c) =>( 
                                // <PostCat>{c.name} </PostCat>
                                <PostCat>{c} </PostCat>
                            ))} 
                </PostCats>

        
                

            </Left>
             
            <Right>
                {post.photo && (
                    <PostImage 
                        src={publicFolder+post.photo}
                        alt="" />
                                              
                    )}
            </Right>
            
           
        </Wrapper>
        <hr style={{width:"80%", borderTop:"1px solid #fdfbfb", marginLeft:"10%"}}/>
       
    </Container>
  )
}

export default Post
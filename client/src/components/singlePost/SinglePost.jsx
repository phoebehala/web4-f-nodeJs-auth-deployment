import {useLocation} from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// contextAPI
import { useContext } from "react";
import { Context } from "../../context/Context";

// style
import "./singlePost.css";
import styled from 'styled-components';
import {mobile, tablet} from '../../util/responsive'


const Container = styled.div`
    flex:7;
    width:100%;

    margin-left: 80px;   /* due to the fixed navbar */

    padding: 0 2%;

    ${tablet({ flex:'none', marginLeft: '0px' })}
`
const Wrapper = styled.div`
    padding: 30px;
    padding-right: 0;
`
const SinglePostImag = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 5px;
`
const SinglePostTitle = styled.h1`
    text-align: center;
    margin: 10px;
    /* font-family: 'Lora', serif; */
    font-family: 'Varela Round', sans-serif;
    font-size: 28px;
`
const SinglePostEdit = styled.div`
    float: right;
    font-size: 16px;
`

const SinglePostInfo = styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-family: 'Varela Round', sans-serif;
    /* color: #b39656; */
    color: #999;
`
const SinglePostAuther = styled.span`
    color: #999;
    font-family: 'Varela Round', sans-serif;
`;
const SinglePostDate = styled.span`
    font-family: 'Varela Round', sans-serif;
`;

const PostCats = styled.div`
    margin: 20px 0;
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

const SinglePostDesc = styled.div`
    color: #666;
    font-style: 18px;
    line-height: 25px;
    font-family: 'Varela Round', sans-serif;
`
// for editin mode
const SinglePostTitleInput = styled.input`
    font-family: "Lora", serif;
    font-size: 28px;
    text-align: center;
    border: none;
    color: gray;
    border-bottom: 1px solid lightgray;

    display: block;
    margin: auto;
    font-family: 'Varela Round', sans-serif;
`
const SinglePostDescInput = styled.textarea`
    border: none;
    color: #666;
    font-size: 18px;
    line-height: 25px;
    :focus{
        outline: none;
    }

    display: block;
    width:100%;
    min-height: 50vh;
    font-family: 'Varela Round', sans-serif;

`
const SinglePostButton = styled.button`
    width: 100px;
    border: none;
    background-color: lightcoral;
    padding: 5px;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    align-self: flex-end;
    margin-top: 20px;
    font-family: 'Varela Round', sans-serif;
`




export default function SinglePost() {
    const location = useLocation();
    console.log(location.pathname.split('/')[2]); // location.pathname >>> /post/61f1cb00290ccc6c4ac58754 
    const path = location.pathname.split('/')[2];
    const [post, setPost] = useState({})  // {} empty object >>> innitial state

    const publicFolder = "https://web-mern-blog.herokuapp.com/myProxy/v1/images/"

    // contextAPI
    const {user} = useContext(Context);

    // for editing
    const [ title, setTitle] = useState("");
    const [ desc, setDesc ] = useState("");
    const [ updateMode, setUpdateMode] = useState(false);

    useEffect(()=>{
        const getPost = async ()=>{
            const res = await axios.get(`https://web-mern-blog.herokuapp.com/myProxy/v1/api/posts/${path}`)
            console.log(res);
            setPost(res.data)

            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        getPost()

    }, [path, updateMode]) // every time the path or updateMode get changed, fire the function



    const handleDelete = async()=>{
        try {
            await axios.delete(`https://web-mern-blog.herokuapp.com/myProxy/v1/api/posts/${path}`, {
                headers: {token: `Bearer ${user.accessToken}`},
                data:{username: user.username} // let db to check if the user who clicks delete button is the author of this post 
            })
            window.location.replace('/')
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdate = async ()=>{
        try { 
            //console.log("updated title and desc",title,desc);
            await axios.put(`https://web-mern-blog.herokuapp.com/myProxy/v1/api/posts/${path}`, {
                // let db to check if the user who clicks delete button is the author of this post 
                    username: user.username,
                    title: title,
                    desc:desc
                },
                {headers: {token: `Bearer ${user.accessToken}`}}
                )
            //window.location.reload()
            setUpdateMode(false)

        } catch (error) {
            console.log(error);
        }
    }


  return (
        <Container >
            <Wrapper>
                {/* if there is post.photo, bother the right hand side */}
                {post.photo && (
                    <SinglePostImag 
                        src={publicFolder+post.photo}
                        alt=""
                        className="" 
                    />
                )}
                {/* if it is updateMode, show the <input/>, otherwise go with <h1 /> */}
                { updateMode ? (
                        <SinglePostTitleInput
                            type="text" 
                            value={title} 
                            className="singlePostTitleInput"
                            autoFocus
                            onChange={(e)=>{setTitle(e.target.value)}}
                        />)
                    : (
                        <SinglePostTitle>
                            {post.title}

                            {/* post.username === user.username >>> to check if the login user is an auther of this post -- only auther can see edit and delete button */}
                            {/* user?.username >>> (? for optional) -- if ther is no user, do't check its username */}
                            {post.username === user?.username && 
                                
                                <SinglePostEdit>
                                    <i className="singlePostIcon far fa-edit" onClick={()=>{setUpdateMode(true)}}></i>
                                    <i className="singlePostIcon fas fa-trash-alt" onClick={handleDelete}></i>
                                </SinglePostEdit>
                            }
                        </SinglePostTitle>


                    )}
                
                <SinglePostInfo>
                    <SinglePostAuther>
                        Auther 
                        <Link to={`/?user=${post.username}`} className="link">
                            <b style={{marginLeft:"5px", color:"teal"}}>{post.username}</b>
                        </Link>
                    </SinglePostAuther>
                    <SinglePostDate>{new Date(post.createdAt).toDateString()}</SinglePostDate>
                </SinglePostInfo>

                <PostCats>
                    {console.log("post.categories",post.categories)}
                    {post.categories && 
                        post.categories.map((c) =>( 
                                // <PostCat>{c.name} </PostCat>
                                <PostCat>{c} </PostCat>
                            ))} 
                </PostCats>

                {/* if it is updateMode, show the <textarea/>, otherwise go with <p /> */}
                {updateMode ? (
                        <SinglePostDescInput
                            className="singlePostDescInput"
                            value={desc}
                            onChange={(e)=>{setDesc(e.target.value)}}
                    
                        />
                    ):(
 
                        <SinglePostDesc>
                            {post.desc}
                        </SinglePostDesc>

                    ) }


                {/* if it is updateMode, bother the right hand side (show the button) */}
                { updateMode && (
                    <SinglePostButton onClick={handleUpdate}>Update</SinglePostButton>
                )}
                
            </Wrapper>
        </Container >
    );
}
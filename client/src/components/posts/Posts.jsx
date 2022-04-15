import React from 'react'

// component
import Post from "../post/Post";

// style
import styled from 'styled-components'
import {mobile, tablet} from '../../util/responsive'

const Container = styled.div`
    /* background-color: tomato; */
    flex:7;

    width:100%;

    margin-left: 80px;   /* due to the fixed navbar */
    
    ${tablet({ flex:'none', marginLeft: '0px' })}

`
const Posts = ({posts}) => {

  return (
    <Container>
      { posts.length===0 
        ? ( <p style={{margin:"50px"}}>There is no post !</p>)
        :posts && posts.map((p) =>(
            // jsx
            <Post post={p} />
        ))}
      
        {/* {posts.map((p) =>{
                    // js
                    console.log('each post',p)
              })}
       */}
    </Container>
  )
}

export default Posts
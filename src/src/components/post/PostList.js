import React from 'react';
import {Link} from 'react-router-dom';

const List = (props) => {
  const posts = props.posts;
  let listPosts = '';
  if(posts.length){
   listPosts = posts.map((post,index) =>
  <div key={index}>
    <h1>{post.title}</h1>
    <p>{post.description}</p>
    <a onClick={() => props.viewPost(post)}>
    &nbsp;<span className="glyphicon glyphicon-envelope"></span>
    </a>
    { props.loginUser.id === post.userId &&
        <a onClick={() => props.editPost(post)}>
          &nbsp;<span className="glyphicon glyphicon-edit"></span>
        </a> }
    { props.loginUser.id === post.userId &&   
        <a onClick={() => props.deletePost(post)}>
        &nbsp;<span className="glyphicon glyphicon-trash"></span>
        </a>
    } 
    <hr/>
  </div>
  );
}
    return (
        <div>
            <div className="col-sm-8 text-left"> 
            <div className="text-right">
            <Link className="btn btn-primary" to="/posts/new">
                Add a Post
            </Link>
            </div>
            <h3 className="text-center" >Posts</h3>
            {listPosts ? listPosts : <div className="text-center">No post found.</div>}
            </div>
        </div>
    );
};

export default List;
import React from "react";
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import queryString from 'query-string'
import InfiniteScroll from "react-infinite-scroll-component";
import { postActions } from '../../actions/index';
import loadingImage from '../../loader-image.gif';

class Scroll extends React.Component {
  
   constructor(props){
       super(props);
       const values = queryString.parse(this.props.location.search);
       let userId = values.userId; 
       this.state = {
        term: "", 
        loginUser : JSON.parse(localStorage.getItem('user')),
        postUserId: userId
      }
       this.fetchMoreData = this.fetchMoreData.bind(this);
       this.onInputChange = this.onInputChange.bind(this);
       this.onFormSubmit = this.onFormSubmit.bind(this);
   } 
  
   componentWillReceiveProps(nextProps) {
    const values = queryString.parse(nextProps.location.search);
    let userId = values.userId; 
    console.log("nextProps==",nextProps);
    this.setState({
      postUserId: userId,
      term: ""
    })
   }

   componentDidMount() {
    this.props.fetchPosts(this.state.postUserId);
  }

    fetchMoreData = () => {
      this.props.fetchPosts(this.props.posts[0]['userId'],this.props.posts.length);
  };

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    this.props.emptyPost();
    event.preventDefault();
    // We need to go and fetch post data with search term
    this.props.fetchPosts(this.state.postUserId,0, this.state.term);
    console.log(this.props);
  //  this.setState({ term: "" });
  }

  render() {
  if (this.props.posts.isError) {
      return <p>Sorry! There was an error loading the posts</p>;
  }

  if (this.props.posts.isLoading) {
      return <p>Loading…</p>;
  } 
    return (
       <div className="col-sm-8 text-left"> 
       <div className="text-right">
       <Link className="btn btn-primary" to="/posts/new">
           Add a Post
       </Link>
       </div>
       <hr />
       <div>
       <form onSubmit={this.onFormSubmit} className="input-group">
       <input
         placeholder="Search any word or phrase"
         className="form-control col-sm-4"
         value={this.state.term}
         onChange={this.onInputChange}
       />
       <span className="input-group-btn">
         <button type="submit" className="btn btn-default">Submit</button>
       </span>
     </form>
     </div>
        <hr />
        {this.props.posts.length ?  <InfiniteScroll
          dataLength={this.props.posts.length}
          next={this.fetchMoreData}
          hasMore={this.props.hasMore}
          loader={ <img src={loadingImage}  alt="Loading..." />}
        >
        
       {  this.props.posts.map((post,index) => (
        <div key={index}>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <a onClick={() => this.props.viewPost(post)}>
          &nbsp;<span className="glyphicon glyphicon-envelope"></span>
          </a>
          { this.props.loginUser.id === post.userId &&
              <a onClick={() => this.props.editPost(post)}>
                &nbsp;<span className="glyphicon glyphicon-edit"></span>
              </a> }
          { this.props.loginUser.id === post.userId &&   
              <a onClick={() => this.props.deletePost(post)}>
              &nbsp;<span className="glyphicon glyphicon-trash"></span>
              </a>
          } 
          <hr/>
        </div>
        )
        )
    }
        </InfiniteScroll>
        : <div className="text-center">No post found.</div>}
      </div> 
    );
  }
}

function mapStateToProps(state) {
  return { 
    posts: state.posts.posts,
    hasMore: state.posts.hasMore
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    emptyPost : () => dispatch(postActions.emptyPost()),
    fetchPosts: (userId, startLimit = 0, searchTerm = '' ) => dispatch(postActions.getPosts(userId, startLimit, searchTerm))};
};

export default connect(mapStateToProps,mapDispatchToProps)(Scroll);
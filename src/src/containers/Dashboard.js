import React, { Component } from 'react'
import { connect } from 'react-redux';
import LeftSideBar from '../components/layout/LeftSideBar';
import RightSideBar from '../components/layout/RightSideBar';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
// import PostList from '../components/post/PostList';
import Scroll from '../components/post/Scroll';
import NewPostForm from '../components/post/NewPostForm';
import EditPostForm from '../components/post/EditPostForm';
import ViewPostForm from '../components/post/ViewPostForm';
import ChangePassword from '../components/account-setting/ChangePassword';
import Profile from '../components/account-setting/Profile';

import { postActions,userActions } from '../actions/index';

export class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginUser : JSON.parse(localStorage.getItem('user'))
    }
    
    this.logout = this.logout.bind(this);
    this.createPost = this.createPost.bind(this);
    this.editPost = this.editPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.viewPost = this.viewPost.bind(this);
    this.closeViewPost = this.closeViewPost.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.getPosts = this.getPosts.bind(this);
  }

  componentDidMount() {
    this.props.getUsers();
    this.props.updateLoginUserDetails();
  }

  logout() {
    localStorage.removeItem('user');
    window.location.reload();
  }

  getPosts(userId){
    this.props.emptyPost();
    if(this.props.location.pathname === '/dashboard'){
      this.props.history.push(`/dashboard?userId=${userId}`);
      this.props.getPosts(userId);
    }else{
      this.props.history.push(`/dashboard?userId=${userId}`);
    }
  }

  createPost(values){
    values.userId = this.state.loginUser.id;
    this.props.createPost(values,this.props.history);
  }

  editPost(post) {
    post.pathname = '/posts/edit';
    this.props.history.push(post,'/posts/edit');
  }

  updatePost(values){
    values.userId = this.state.loginUser.id;
    this.props.updatePost(values,this.props.history);
  }
  
  deletePost(values) {
    values.userId = this.state.loginUser.id;
    this.props.deletePost(values,this.props.history);
  }

  viewPost(post) {
    post.pathname = '/posts/view';
    this.props.history.push(post,'/posts/view');
  }

  closeViewPost(values){
    this.props.history.push(`/dashboard?userId=${values.userId}`);
  }

  changePassword(values){
    let loginUserData = JSON.parse(localStorage.getItem('user'));
    delete values.confirmpassword;
    values.id = loginUserData.id;
    console.log("changePassword values",values);
    this.props.changePassword(values,this.props.history);
  }

  updateProfile(values){
    delete values.confirmpassword;
    this.props.updateProfile(values,this.props.history);
  }

  render() {
    console.log(this.props.location.pathname);
    return (
        <div>
        <Header logout={this.logout}  loginUser= {this.props.loginUser}/>
        <div className="container-fluid text-center">    
        <div className="row content">
          <LeftSideBar loginUser= {this.props.loginUser} getPosts= {this.getPosts} />
          { /* this.props.location.pathname === '/dashboard'  &&   <PostList loginUser= {this.props.loginUser} posts={this.props.posts.posts} viewPost={this.viewPost}  editPost={this.editPost} deletePost={this.deletePost}/> */ }
          { this.props.location.pathname === '/dashboard'  &&   <Scroll location={this.props.location} loginUser= {this.props.loginUser} viewPost={this.viewPost}  editPost={this.editPost} deletePost={this.deletePost} /> }
          { this.props.location.pathname === '/posts/new'  &&   <NewPostForm onSubmit={this.createPost} /> }
          { this.props.location.pathname === '/posts/edit'  &&   <EditPostForm loginUserId= {this.props.loginUser.id} onSubmit={this.updatePost} history={this.props.history} initData = {{title:this.props.location.title, description: this.props.location.description,id: this.props.location.id, userId: this.props.location.userid}} /> }
          { this.props.location.pathname ==='/posts/view'  &&   <ViewPostForm loginUserId= {this.props.loginUser.id} onSubmit={this.closeViewPost} history={this.props.history} initData = {{title:this.props.location.title, description: this.props.location.description,id: this.props.location.id, userId: this.props.location.userid}} /> }
          { this.props.location.pathname === '/profile'  &&   <Profile onSubmit={this.updateProfile} history={this.props.history} initData = {JSON.parse(localStorage.getItem('user'))} /> }
          { this.props.location.pathname === '/change-password'  &&   <ChangePassword onSubmit={this.changePassword} initData = {JSON.parse(localStorage.getItem('user'))} /> }
          <RightSideBar users={this.props.users} getPosts= {this.getPosts} />
        </div>
      </div>
      <Footer/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    users: state.users,
    hasErrored: state.hasErrored,
    isLoading: state.isLoading,
    loginUser: state.loginUser 
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: (userId) => dispatch(postActions.getPosts(userId)),
    emptyPost : () => dispatch(postActions.emptyPost()),
    getUsers : () => dispatch(userActions.getUsers()),
    updateLoginUserDetails : () => dispatch(userActions.updateLoginUserDetails()),
    createPost : (values,history) => dispatch(postActions.createPost(values,history)),
    updatePost : (values,history) => dispatch(postActions.updatePost(values,history)),
    deletePost : (values,history) => dispatch(postActions.deletePost(values,history)),
    updateProfile: (values,history) => dispatch(userActions.updateProfile(values,history)),
    changePassword: (values,history) => dispatch(userActions.changePassword(values,history))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);

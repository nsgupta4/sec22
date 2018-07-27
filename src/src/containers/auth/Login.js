import React, { Component } from 'react'
import {connect} from 'react-redux';
import { ToastStore} from 'react-toasts';
import {loginActions} from '../../actions';
import LoginForm from '../../components/auth/LoginForm';

class Login extends Component {
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
  } 
  login(values){
      this.props.login(values);
  } 
  render() {
    if (this.props.user) {
      if(this.props.user.length === 0){
        ToastStore.warning('Login, your login credentials are no longer valid !');
      }else{
        console.log(this.props.user);
      ToastStore.success('Login, you have logged in successfully !');
      this.props.history.push(`/dashboard?userId=${this.props.user[0].id}`);
      }
    }else if (this.props.isLoading) {
      console.log("Login page loading...");
    }else if (this.props.isError) {
      ToastStore.error('Login, Sorry! There was an error !');
    }
    return (
      <LoginForm onSubmit={this.login} />
    )
  }
}

function mapStateToProps(state) {
  let login = state.login;
  return { 
           user: login.user,
           isError: login.isError,
           isLoading: login.isLoading 
  };
}

function mapDispatchToProps(dispatch){
  return {
    login: (data) => {
      dispatch(loginActions.login(data))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
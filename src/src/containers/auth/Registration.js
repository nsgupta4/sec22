import React, { Component } from 'react'
import {connect} from 'react-redux';
import RegistrationForm from '../../components/auth/RegistrationForm';
import {registrationActions} from '../../actions';
import {ToastStore} from 'react-toasts';

class Registration extends Component {
  constructor(props){
    super(props);
    this.registration = this.registration.bind(this);
  } 
  registration(values){
    delete values['confirmpassword']; 
    this.props.register(values);
  } 
  render() {
    if (this.props.isSuccess) {
      ToastStore.success('Registration, You have successfully registered !');
      this.props.history.push("login");
    }else if (this.props.isLoading) {
      console.log("Registration page loading...");
    }else if (this.props.isError) {
      ToastStore.error('Registration, Sorry! There was an error !');
    }
    return (
      <RegistrationForm onSubmit={this.registration} />
    )
  }
}

function mapStateToProps(state) {
  return { 
           isSuccess: state.register.isSuccess,
           isError: state.register.isError,
           isLoading: state.register.isLoading 
     };
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (users) => dispatch(registrationActions.register(users))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
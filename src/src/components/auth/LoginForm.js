import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from "react-router-dom";
import {REQUIRED, EMAIL} from '../../helpers/validation';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-group row">
    <label className="col-sm-3 col-form-label">{label}</label>
    <div className="col-sm-7">  
    <input className="form-control" {...input} placeholder={label} type={type} />
      {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span className="text-warning">{warning}</span>))}
    </div>
  </div>
)

const LoginForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <div className="container" style={{width:500,paddingTop: 100}}>
    <div className="panel panel-default">
		<div className="panel-body">
    <h2>Login Form</h2>
    <form onSubmit={handleSubmit}>
    <div>
      <Field name="email" type="email"
        component={renderField} label="Email:"
        validate={[REQUIRED, EMAIL]}
      />
      <Field name="password" type="password"
        component={renderField} label="Password:"
        validate={[ REQUIRED ]}
      />
      <div>
        <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>Submit</button>
        <button className="btn btn-default btn-block" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        <Link to="/registration">
         Click here for registration
        </Link>
        </div>
      </div>
    </form>
    </div>
    </div>
    </div>
  )
}

export default reduxForm({
  form: 'loginform' // a unique identifier for this form
})(LoginForm)
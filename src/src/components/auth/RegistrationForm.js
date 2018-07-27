import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from "react-router-dom";
import {REQUIRED, MAX_LENGTH_15, MIN_LENGTH_6, NUMBER, MIN_VALUE_18, EMAIL, PASSWORD_MATCH} from '../../helpers/validation';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-group row">
    <label className="col-sm-3 col-form-label">{label}</label>
    <div className="col-sm-7">  
    <input className="form-control" {...input} placeholder={label} type={type} />
      {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span className="text-warning">{warning}</span>))}
    </div>
  </div>
)

const RegistrationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <div className="container" style={{width:500,paddingTop: 20}}>
    <div className="panel panel-default">
		<div className="panel-body">
    <h2>Registration Form</h2>
    <form onSubmit={handleSubmit}>
    <div>
      <Field name="first_name" type="text"
        component={renderField} label="First Name"
        validate={[ REQUIRED ]}
      />
      <Field name="last_name" type="text"
      component={renderField} label="Last Name"
      validate={[ REQUIRED ]}
    />
      <Field name="email" type="email"
        component={renderField} label="Email"
        validate={[REQUIRED, EMAIL]}
      />
      <Field name="age" type="number"
        component={renderField} label="Age"
        validate={[ REQUIRED, NUMBER, MIN_VALUE_18 ]}
      />
      <Field name="password" type="password"
        component={renderField} label="Password:"
        validate={[ REQUIRED, MIN_LENGTH_6, MAX_LENGTH_15 ]}
      />
      <Field name="confirmpassword" type="password"
        component={renderField} label="Confirm Password:"
        validate={[ REQUIRED, PASSWORD_MATCH ]}
      />
      <div>
      <button className="btn btn-primary btn-block"  type="submit" disabled={submitting}>Submit</button>
      <button className="btn btn-default btn-block"  type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        <Link to="/login">
         Click here for login
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
  form: 'registrationform' // a unique identifier for this form
})(RegistrationForm)
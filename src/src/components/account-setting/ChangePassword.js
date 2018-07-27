import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import {REQUIRED, MAX_LENGTH_15, MIN_LENGTH_6, PASSWORD_MATCH} from '../../helpers/validation';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-group row">
    <label className="col-sm-3 col-form-label">{label}</label>
    <div className="col-sm-4">  
    <input className="form-control" {...input} placeholder={label} type={type} />
      {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span className="text-warning">{warning}</span>))}
    </div>
  </div>
)

const ChangePasswordForm = (props) => {
    const { handleSubmit, submitting } = props
    return (
      <div className="col-sm-8 text-left"> 
      <h2 className="text-center">Change Password</h2>
      <br/>
      <div className="container">
      <form onSubmit={handleSubmit}>
      <div>
      <Field name="password" type="password"
          component={renderField} label="Password:"
          validate={[ REQUIRED, MIN_LENGTH_6, MAX_LENGTH_15 ]}
        />
        <Field name="confirmpassword" type="password"
          component={renderField} label="Confirm Password:"
          validate={[ REQUIRED, PASSWORD_MATCH ]}
        />
        <div className="form-group">        
        <div className="col-sm-offset-3 col-sm-10">
          <button className="btn btn-primary" type="submit" disabled={submitting}>Submit</button>
        </div>
        </div>
        </div>
      </form>
      </div>
      </div>
    )
  }

  export default compose(
    connect((state, props) => ({
      initialValues: props.initData
    })),
    reduxForm({
      form: 'change-password-form'
    })
  )(ChangePasswordForm)

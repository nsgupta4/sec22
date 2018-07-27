import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import {REQUIRED, EMAIL, NUMBER, MIN_VALUE_18} from '../../helpers/validation';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-group row">
    <label className="col-sm-3 col-form-label">{label}</label>
    <div className="col-sm-4">  
    <input className="form-control" {...input} placeholder={label} type={type} />
      {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span className="text-warning">{warning}</span>))}
    </div>
  </div>
)

const Profile= (props) => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
      <div className="col-sm-8 text-left"> 
      <h2 className="text-center">Profile Details</h2>
      <br/>
      <div className="container">
      <form onSubmit={handleSubmit}>
      <div>
        <Field name="first_name" type="text"
          component={renderField} label="First Name:"
          validate={[ REQUIRED ]}
        />
        <Field name="last_name" type="text"
        component={renderField} label="Last Name:"
        validate={[ REQUIRED ]}
      />
        <Field name="email" type="email"
          component={renderField} label="Email:"
          validate={[REQUIRED, EMAIL]}
        />
        <Field name="age" type="number"
          component={renderField} label="Age:"
          validate={[ REQUIRED, NUMBER, MIN_VALUE_18 ]}
        />
        <div className="form-group">        
        <div className="col-sm-offset-3 col-sm-10">
          <button  className="btn btn-primary" type="submit" disabled={submitting}>Submit</button>
          <button  className="btn btn-default" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
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
      form: 'editprofileform'
    })
  )(Profile)
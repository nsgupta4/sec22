import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import {REQUIRED} from '../../helpers/validation';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-group row">
    <label className="col-sm-3 col-form-label">{label}</label>
    <div className="col-sm-4">  
    <input readOnly className="form-control" {...input} placeholder={label} type={type} />
      {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span className="text-warning">{warning}</span>))}
    </div>
  </div>
)

const ViewPostForm = (props) => {
    if(!props.initData.id){
      props.history.push(`/dashboard?userId=${props.loginUserId}`);
    }
  const { handleSubmit, submitting } = props
  return (
    <div className="col-sm-8 text-left"> 
    <h2 className="text-center">View Post</h2>
    <div className="container">
    <form onSubmit={handleSubmit} >
    <div>
      <Field name="title" type="text"
        component={renderField} label="Post" readOnly
        validate={[REQUIRED]}
      />
      <Field name="description" type="text"
        component={renderField} label="Description"
        validate={[ REQUIRED ]}
      />
      <div className="form-group">        
      <div className="col-sm-offset-3 col-sm-10">
        <button className="btn btn-primary" type="submit" disabled={submitting}>Close</button>
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
      form: 'viewpostform'
    })
  )(ViewPostForm)
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {REQUIRED} from '../../helpers/validation';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-group row">
    <label className="col-sm-3 col-form-label">{label}</label>
    <div className="col-sm-4">  
    <input className="form-control" {...input} placeholder={label} type={type} />
      {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span className="text-warning">{warning}</span>))}
    </div>
  </div>
)

const NewPostForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <div className="col-sm-8 text-left"> 
    <h2 className="text-center">New Post</h2>
    <div className="container">
    <form onSubmit={handleSubmit}>
    <div>
      <Field name="title" type="text"
        component={renderField} label="Post"
        validate={[REQUIRED]}
      />
      <Field name="description" type="text"
        component={renderField} label="Description"
        validate={[ REQUIRED ]}
      />
      <div className="form-group">        
      <div className="col-sm-offset-3 col-sm-10">
        <button className="btn btn-primary" type="submit" disabled={submitting}>Submit</button>
        <button className="btn btn-default" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
      </div>
      </div>
    </form>
    </div>
    </div>
  )
}

export default reduxForm({
  form: 'newpostform' // a unique identifier for this form
})(NewPostForm)
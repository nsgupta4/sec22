import React from 'react';
import { Link } from 'react-router-dom';
import defaultUserImage from '../../images/default-user-image.jpeg';

const LeftSiderBar = (props) => {
    return (
            <div className="col-sm-2 sidenav">
            <div className="well">
            <img src={defaultUserImage}  alt="Profile" />
              <h5>{props.loginUser.first_name} {props.loginUser.last_name}</h5>
              <p>Welcome !!</p>
             </div>
             
            <p><a onClick={() => props.getPosts(props.loginUser.id)} >My Posts</a></p>
            <p><Link to={`/profile`} >Profile</Link></p>
            <p><Link to={`/change-password`} >Change Password</Link></p>
            </div>
    );
};

export default LeftSiderBar;
import React from 'react';

const RightSideBar = (props) => {
  const users = props.users;
  let listUsers = '';
  
   if(users.length){
   listUsers = users.map((user,index) =>
  <div key={index}>
    <a onClick={() => props.getPosts(user.id)}>{user.first_name}  {user.last_name}</a>
    <hr/>
  </div>
  );
} 

    return (
    <div className="col-sm-2 sidenav">
      <div className="well">
        <h5>Users</h5>
        </div>
        <div style={{height: 400,overflow: 'scroll'}}>
        {listUsers}
        </div>
    </div>
    );
};

export default RightSideBar;
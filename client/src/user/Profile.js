import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
//import { getUserById } from "./helper/userapicalls";


const Profile = () => {

 const{
  user
 } =isAutheticated();

 const userRightSide = () => {
  return (
    <div className="card mb-4">
      <h4 className="card-header">User Information</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <span className="badge badge-primary mr-2">Name:</span> {user.name}
        </li>
        <li className="list-group-item">
          <span className="badge badge-primary mr-2">Email:</span> {user.email}
        </li>
        {/* <li className="list-group-item">
          <span className="badge badge-info">User Area</span>
        </li> */}
      </ul>
    </div>
  );
};
 
  return (
    <Base
      title="Welcome to Profile"
      description="Manage all of your Information here"
      className="container bg-secondary p-4"
    >
      <div className="container text-center">
        <div className="">{userRightSide()}</div>
        <Link className="btn btn-dark" to={`/user/manageblogs/${user._id}`}>
          <span className="">Manage Blogs</span>
        </Link>
      </div>

    </Base>
  );
};

export default Profile;

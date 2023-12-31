import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
//import { getUserById } from "./helper/userapicalls";
import { getUserBlog } from "./helper/userapicalls";
import Card from "../core/Card";


const Profile = () => {

  const [blogs, setBlogs] = useState([]);

  const { user, token } = isAutheticated();

  const preload = userId => {
    getUserBlog(userId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  useEffect(() => {
    preload(user._id);
  }, []);

  return (
    <Base
      title="Welcome to Profile"
      description="Manage all of your Information here"
      className="container p-4"
    >
      <div className="container text-left">
        <div className="">
        <div className="card ">
          <h4 className="card-header">Your Info</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <span className="badge badge-primary mr-2">Name:</span> {user.name} <br/><span className="badge badge-primary mr-2">Email:</span> {user.email}
            </li>
            <li className="list-group-item">
              <h4>Your Blogs</h4>
              <div className="container">
                <div className="row text-center">
                  {blogs.map((blog, index) => {
                    return (
                      <div key={index} className="col-md-4 p-2">
                        <Card blog={blog} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <h4>Operations</h4>
              <Link className="btn btn-dark" to={`/user/manageblogs/${user._id}`}>
                <span className="">Manage Blogs</span>
              </Link>
            </li>
          </ul>
        </div>
        </div>
      </div>

    </Base>
  );
};

export default Profile;

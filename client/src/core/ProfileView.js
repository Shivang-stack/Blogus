import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getUserBlog } from "../user/helper/userapicalls";
import { getUserInfoById } from "./helper/coreapicalls";
import Card from "../core/Card";


const ProfileView = ({match}) => {

  const [blogs, setBlogs] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const { user, token } = isAutheticated();
  
  const preload = userId => {
    getUserBlog(userId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
    getUserInfoById(userId,token).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setUserInfo(data);
        }
      });
  };

  useEffect(() => {
    preload(match.params.userId);
  }, []);
  return (
    <Base
      title="Profile"
      description="BlogUS - Feel Free"
      className="container p-4"
    >
      <div className="container text-left">
        <div className="">
        <div className="card ">
          <h4 className="card-header">Info</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <span className="badge badge-primary mr-2">Name:</span> {userInfo.name} <br/><span className="badge badge-primary mr-2">Email:</span> {userInfo.email}
            </li>
            <li className="list-group-item">
              <h4>{userInfo.name}'s' Blogs</h4>
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
          </ul>
        </div>
        </div>
      </div>

    </Base>
  );
};

export default ProfileView;

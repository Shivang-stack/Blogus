import React, { useState, useEffect } from "react";

import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getUserBlog, deleteBlog } from "./helper/userapicalls";

const ManageBlogs = ({match}) => {
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
    preload(match.params.userId);
  }, []);

  const deleteThisBlog = blogId => {
    deleteBlog(blogId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload(user._id);
      }
    });
  };

  return (
    <Base title="Welcome !" description="Manage blogs here">
      <h2 className="mb-4">All blogs:</h2>
      <Link className="btn btn-dark" to={`/user/profile`}>
        <span className="">Profile</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-dark my-3">Total blogs</h2>
          {blogs.map((blog, index) => {
            return (
              <div key={index} className="row jumbotron bg-dark text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-light text-left">{blog.title}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/user/blog/update/${blog._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisBlog(blog._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageBlogs;

import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getBlog,
  updateBlog
} from "./helper/userapicalls";
import { isAutheticated } from "../auth/helper/index";

const UpdateBlog = ({ match }) => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    title:"",
    body:"",
    photo: "",
    loading: false,
    error: "",
    createdBlog: "",
    getaRedirect: false,
    formData: ""
  });

  const {
    title,
    body,
    loading,
    error,
    createdBlog,
    getaRedirect,
    formData
  } = values;

  const preload = blogId => {
    getBlog(blogId).then(data => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: data.title,
          body: data.body,
          formData: new FormData()
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.blogId);
  }, []);

  //TODO: work on it
  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateBlog(match.params.blogId, user._id, token, formData).then(
      data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            title:"",
            body:"",
            photo: "",
            loading: false,
            createdBlog: data.title
          });
        }
      }
    );
  };

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdBlog ? "" : "none" }}
    >
      <h4>{createdBlog} updated successfully</h4>
    </div>
  );

  const createBlogForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-primary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("title")}
          name="photo"
          className="form-control"
          placeholder="Title"
          value={title}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("body")}
          name="photo"
          className="form-control"
          placeholder="Body"
          value={body}
        />
      </div>
      
      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-primary mb-3"
      >
        Update Blog
      </button>
    </form>
  );

  return (
    <Base
      title="Update a blog here!"
      description="Welcome to blog Update section"
      className="container bg-secondary p-4"
    >
      <Link to="/user/profile" className="btn btn-md btn-dark mb-3">
        Profile
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {createBlogForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateBlog;

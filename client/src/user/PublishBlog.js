import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import {  createBlog } from "./helper/userapicalls";
import { isAutheticated } from "../auth/helper/index";

const PublishBlog = () => {
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
    formData
  } = values;

  const preload = () => {
    setValues({ ...values,  formData: new FormData() });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    preload();
    console.log(formData)
    setValues({ ...values, error: "", loading: true });
    createBlog(user._id, token, formData).then(data => {
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
    });
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
      <h4>{createdBlog} created successfully</h4>
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
        Create Blog
      </button>
    </form>
  );

  return (
    <Base
      title="Publish Your Blog here!"
      description="Welcome to blogging section"
      className="container bg-secondary p-4"
    >
      {/* <Link to="/" className="btn btn-md btn-dark mb-3">
        Home
      </Link> */}
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {createBlogForm()}
        </div>
      </div>
    </Base>
  );
};

export default PublishBlog;

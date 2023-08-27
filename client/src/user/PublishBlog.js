import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { createBlog } from "./helper/userapicalls";
import { isAutheticated } from "../auth/helper/index";

const PublishBlog = () => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    title: "",
    body: "",
    photo: "",
    loading: false,
    error: "",
    createdBlog: "",
    getaRedirect: false,
    formData: new FormData(), // Initialize formData here
  });

  const { title, body, loading, error, createdBlog, formData } = values;

  useEffect(() => {
    preload();
  }, []);

  const preload = () => {
    setValues({ ...values, formData: new FormData() });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    setValues({ ...values, error: "", loading: true });
    createBlog(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          body: "",
          photo: "",
          loading: false,
          createdBlog: data.title,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
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
            accept="image/*"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("title")}
          name="title" 
          className="form-control"
          placeholder="Title"
          value={title}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("body")}
          name="body" 
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
      description="Welcome to the blogging section"
      className="container bg-secondary p-4"
    >
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

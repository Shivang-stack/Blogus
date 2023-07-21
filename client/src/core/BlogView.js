import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import BVImageHelper from "./helper/BVImagehelper";

import {  getBlogById } from "./helper/coreapicalls";

const BlogView =({match}) =>{
  const [values, setValues] = useState({
    id:"",
    title: "",
    body:"",
    photo:"",
    author:"",
  });
  const [imageblog, setImageblog] = useState([]);
  
  const [error, setError] = useState(false);
  
  const {title,body,author,id} =values;
  
  const loadBlog = blogId => {
    getBlogById(blogId).then(data => {
      setImageblog(data);
      if (data.error) {
        setError(data.error);
      } else {
        setValues({
          ...values,
          id:data.id,
          title: data.title,
          body: data.body,
          author: data.author
        });
      }
    });
  };


  
  useEffect(() => {
    loadBlog(match.params.blogId);
  }, []);
  
    
  // );
  return (
    
    <Base title="BlogUS" description="">
      <div className="row ">
      <BVImageHelper blog={imageblog} />
      <div className="container">
          <div className="text-white text-left">
          <h1 className="display-4 text-dark text-center">{title}</h1>
          <p>{body}</p>
          <h6>{author}</h6>
          </div>
      </div>
      </div>
      
    </Base>
  );
}

export default BlogView
import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import BVImageHelper from "./helper/BVImagehelper";
import { API } from "../backend";
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
  
  const imageurl =`${API}/blog/photo/${match.params.blogId}`

  return (
    
    <Base title='BlogUs' description="feel free">
      <div class="card mb-3 rounded">
        <div className="text-center bg-dark">
          <img class="card-img-top h-25 w-25" src={imageurl} alt="Card image cap"/>
        </div>
        <div class="card-body">
          <h3 class="card-title">{title}</h3>
          <p class="card-text">{body}</p>
          <p class="card-text"><small class="text-muted">{author}</small></p>
        </div>
      </div>

    </Base>
  );
}

export default BlogView
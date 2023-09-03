import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import BVImageHelper from "./helper/BVImagehelper";
import { API } from "../backend";
import {  getBlogById } from "./helper/coreapicalls";
import { Link } from "react-router-dom";

const BlogView =({match}) =>{
  const [values, setValues] = useState({
    id:"",
    title: "",
    body:"",
    photo:"",
    author:"",
    authorId:""
  });
  const [imageblog, setImageblog] = useState([]);
  
  const [error, setError] = useState(false);
  const [buttonState, setButtonState] = useState("start"); 
  const {title,body,author,authorId,id} =values;
  
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
          author: data.author,
          authorId: data.user
        });
      }
    });
  };


  
  useEffect(() => {
    loadBlog(match.params.blogId);
  }, []);
  
  const imageurl =`${API}/blog/photo/${match.params.blogId}`

  let synth = null; // Initialize the synth variable
  let utterance = null; // Initialize the utterance variable

  const handleReadText = () => {
    if ('speechSynthesis' in window) {
      if (!synth) {
        synth = window.speechSynthesis;
      }

      if (buttonState === "start") {
        // Start reading
        utterance = new SpeechSynthesisUtterance(body);
        synth.speak(utterance);
        setButtonState("stop");
      } else if (buttonState === "stop") {
        // Pause reading
        synth.pause();
        setButtonState("restart");
      } else if (buttonState === "restart") {
        // Resume reading
        synth.resume();
        setButtonState("stop");
      }
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };


  return (
    
    <Base title='BlogUs' description="feel free">
      <div className="card mb-3 rounded">
        <div className="text-center bg-dark">
          <img className="card-img-top h-25 w-25" src={imageurl} alt="Card image cap"/>
        </div>
        <div className="card-body">
          <div className="text-left p-2">
            <button
              onClick={handleReadText}
              className={`btn ${
                buttonState === "start"
                  ? "btn-primary"
                  : buttonState === "stop"
                  ? "btn-danger"
                  : "btn-success"
              } rounded-lg`}
            >
              {buttonState === "start"
                ? "Start Reading"
                : buttonState === "stop"
                ? "Stop"
                : "Restart"}
            </button>
          </div>
          <h3 className="card-title p-1">{title}</h3>
          <p className="card-text p-1">{body}</p>
          <Link  to={`/profile/${authorId}`}>
            <h5 className="card-text p-1"><small className="text-muted">{author}</small></h5>
          </Link>
        </div>
      </div>

    </Base>
  );
}

export default BlogView
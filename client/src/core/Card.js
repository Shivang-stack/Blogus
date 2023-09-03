import React from "react";
import ImageHelper from "./helper/ImageHelper";
import { Link } from "react-router-dom";
import { API } from "../backend";

const Card = ({
  blog,
  
}) => {
  
  const blogvTitle = blog ? blog.title : "A photo from pexels";
  const blogvDescrption = blog ? blog.body : "Default description";
  const blogvAuthor = blog.author? blog.author : "Anonymous";
  const MAX_LENGTH = 30;
  const imageurl = blog
    ? `${API}/blog/photo/${blog._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;

  return (
    <div className="card text-white bg-white text-left shadow h-100 ">
        <img
          className="card-img-top"
          src={imageurl}
          alt="photo"
          height={250}
        />
      <div className="card-body">
        <h5 className="card-title text-dark">{`${blogvTitle.substring(0, MAX_LENGTH)}...`}</h5>
        <p className="card-text text-dark text-wrap">
        {`${blogvDescrption.substring(0, MAX_LENGTH)}...`}<a href="#"></a>
        </p>
        <Link  to={`/profile/${blog.user}`}>
            <p className="card-text text-dark"><small className="text-muted">Author: {blogvAuthor}</small></p>
        </Link>
        <div className="row">
          <div className="col-12">
          <Link
              className="btn btn-dark rounded"
              to={`/blogv/${blog._id}`}
            >
            <span className="">Read More</span>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

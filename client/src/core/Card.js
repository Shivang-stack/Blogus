import React from "react";
import ImageHelper from "./helper/ImageHelper";
import { Link } from "react-router-dom";

const Card = ({
  blog,
  
}) => {
  
  const blogvTitle = blog ? blog.title : "A photo from pexels";
  const blogvDescrption = blog ? blog.body : "Default description";
  const blogvAuthor = blog.author? blog.author : "Anonymous";
  const MAX_LENGTH = 15;
  return (
    <div className="card text-white bg-secondary shadow ">
      <div className="card-header lead bg-dark">{`${blogvTitle.substring(0, MAX_LENGTH)}...`}</div>
      <div className="card-body">
        <ImageHelper blog={blog} />
        <p className="lead rounded bg-dark font-weight-normal text-wrap">
        {`${blogvDescrption.substring(0, MAX_LENGTH)}...`}<a href="#"></a>
        </p>
        <p className="btn btn-dark rounded  btn-sm ">Author: {blogvAuthor}</p>
        <div className="row">
          <div className="col-12">
          <Link
              className="btn btn-dark"
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

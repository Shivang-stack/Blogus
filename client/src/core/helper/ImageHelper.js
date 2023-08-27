import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ blog }) => {
  const imageurl = blog
    ? `${API}/blog/photo/${blog._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
    <div className="rounded shadow">
      <img
        src={imageurl}
        alt="photo"
        height={50}
        width={50}
        className="blog-img"
      />
    </div>
  );
};

export default ImageHelper;


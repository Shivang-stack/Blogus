import React from "react";
import { API } from "../../backend";

const BVImageHelper = ({ blog}) => {
    const imageurl =`${API}/blog/photo/${blog._id}`
    return (
      <div className="rounded shadow">
        <img
          src={imageurl}
          alt=""
          className="card-img-top h-50 w-50"
        />
      </div>
    );
  };
  export default BVImageHelper;
  
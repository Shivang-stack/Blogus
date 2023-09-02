import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "bg-white text-black p-4",
  children
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className=" text-dark text-center w-f">
        <h2 className="display-4 font-weight-bold">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer  bg-white mt-auto py-3">
      <div className="container-fluid bg-white text-dark text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>
        <button className="btn btn-dark btn-lg">Contact Us</button>
      </div>
      <div className="container">
        <span className="text-muted">
          The <span className="text-black">Blogus</span> Feel Free
        </span>
      </div>
    </footer>
  </div>
);

export default Base;

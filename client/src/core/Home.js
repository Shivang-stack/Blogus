import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getBlogs } from "./helper/coreapicalls";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(false);

  const loadAllBlog = () => {
    getBlogs().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  useEffect(() => {
    loadAllBlog();
  }, []);

  return (
    <Base title="BlogUs" description="Welcome to BlogUs">
      <div className="container">
        <div className="row text-center">
          {blogs.map((blog, index) => {
            return (
              <div key={index} className="col-md-4 p-2">
                <Card blog={blog} />
              </div>
            );
          })}
        </div>
      </div>

    </Base>
  );
}

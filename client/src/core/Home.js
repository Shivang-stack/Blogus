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
      <div className="row text-center">
        <div className="row">
          {blogs.map((blog, index) => {
            return (
              <div key={index} className="col-lg-6">
                <Card blog={blog} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}

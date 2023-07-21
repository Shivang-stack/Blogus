import { API } from "../../backend";

export const getBlogs = () => {
  return fetch(`${API}/blogs`, { method: "GET" })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getBlogById = blogId => {
  return fetch(`${API}/blog/${blogId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getAuthor = userId => {
  return fetch(`${API}/user/${userId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
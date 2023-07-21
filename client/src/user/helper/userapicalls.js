import { API } from "../../backend";

//get a user

export const getUserById = userId => {
    return fetch(`${API}/user/${userId}`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  

  export const createBlog = (userId, token, blog) => {
    return fetch(`${API}/blog/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: blog
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  

  export const getBlogs = () => {
    return fetch(`${API}/blogs`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  
  //delete a blog
  
  export const deleteBlog = (blogId, userId, token) => {
    return fetch(`${API}/blog/${blogId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  
  //get a blog
  
  export const getBlog = blogId => {
    return fetch(`${API}/blog/${blogId}`, {
      method: "GET"
      
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  
  export const getUserBlog = userId => {
    return fetch(`${API}/bloglist/user/${userId}`, {
      method: "GET",
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

  //update a blog
  
  export const updateBlog = (blogId, userId, token, blog) => {
    return fetch(`${API}/blog/${blogId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: blog
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  
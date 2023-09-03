import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import BlogView from "./core/BlogView"
import Profile from "./user/Profile";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import PublishBlog from "./user/PublishBlog";
import ManageBlogs from "./user/ManageBlogs";
import UpdateBlog from "./user/UpdateBlog";
import ProfileView from "./core/ProfileView";


const Routes = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <PrivateRoute path="/user/profile" exact component={Profile} />
          <PrivateRoute path="/user/publishblog" exact component={PublishBlog} />
          <PrivateRoute path="/user/manageblogs/:userId" exact component={ManageBlogs} />
          <PrivateRoute path="/user/blog/update/:blogId" exact component={UpdateBlog} />
          
          <Route path="/blogv/:blogId" exact component={BlogView} />
          <Route path="/profile/:userId" exact component={ProfileView} />
          
        </Switch>
      </BrowserRouter>
    );
  };
  
  export default Routes;
  
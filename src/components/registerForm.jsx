import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { register } from "../services/userService";
import auth from "../services/authService";

class Register extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
    },
    errors: {},
  };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}

          {this.renderButton("Register")}
        </form>
      </div>
    );
  }

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  async doSubmit() {
    try {
      const response = await register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]); //the input value is jwt that we get when we register the user
      window.location = "/"; //re-renders the entire app and triggers component did mount in app.js
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors }; //Creates the copy of that data

        //const errors2 = this.state.errors; //Actually creates a same reference to that data
        //example
        /* const me={
          name:"ali",
          familyName:"eagle"
        }

        me2=me  //me2 points exactly to the me and effects on that
        me2={...me} //creates copy of that object (clone) and does not effect the original object */

        errors.email = error.response.data;

        this.setState({ errors });
        // console.log(this.state.errors);
      }
    }
  }
}

export default Register;

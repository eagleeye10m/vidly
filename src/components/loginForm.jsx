import React from "react";
import Joi, { errors } from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}{" "}
          {/*we rely on the default value of the */}
          {this.renderInput("password", "Password", "password")}
          {/*but here we set the type to password */}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }

  /*   email = React.createRef(); //in react, we dont use document object. instead, we give a reference to the element that we need to

    componentDidMount() {
    this.email.current.focus();
  } */

  doSubmit = async () => {
    try {
      await auth.login(this.state.data);
      const { state } = this.props.location; //to redirect the user to the same place he was before logging in
      window.location = state ? state.from.pathname : "/"; //this will cause a full reload of the application and redirects to the main page (/) because we want app.js re-render entirely so that component did mount works again
    } catch (error) {
      if (error.response && error.response.status === 400) {
        errors = { ...this.state.errors };
        errors.email = error.response.data;
        this.setState({ errors });
      }
    }
  };

  schema = {
    email: Joi.string().required().min(5).label("Email"),
    password: Joi.string().required().label("Password"),
  };
}
export default LoginForm;

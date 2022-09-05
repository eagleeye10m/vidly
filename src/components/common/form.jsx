import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    //this method evalutes the whole data object

    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    }); //validates this.state.data according to the schema

    if (!result.error)
      return null; // cause we used this.validate function in disabled attribut
    else {
      const errors = {};
      for (let item of result.error.details)
        errors[item.path[0]] = item.message; // we could have used maps method ; item.path[0] equals username
      return errors;
    }
  };

  validateProperty = (input) => {
    // this method evalutes inputs and feilds
    const { name, value } = input;
    const obj = { [name]: value }; //these are computed properties, if we dont use [], name will apear as a simple string, but to use joy, we need to pass as an object with dynamic property names, thats what is computed properties do; it is like obj[name]=value

    /* or
        const obj = {};
        obj[name] = value; */

    const schema = { [name]: this.schema[name] };
    const result = Joi.validate(obj, schema); //validates the obj according to the schema
    if (!result.error) return null;

    return result.error.details[0].message; //return the error message
  };

  handleSubmit = (event) => {
    event.preventDefault(); //prevent from submitting a form to the server which causes a full page reload

    let errors = this.validate();
    //errors = errors === false ? {} : errors; //if error equals false, return an empty object, otherwise return the error itself
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = (event) => {
    const { currentTarget } = event;
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(currentTarget);
    if (errorMessage) {
      errors[currentTarget.name] = errorMessage; //if we type something and then delete it, error message will be shown
    } else delete errors[currentTarget.name]; // and then if we type something else, the error message and its objects property will be deleted.

    const data = { ...this.state.data };
    data[currentTarget.name] = currentTarget.value; // => data[currentTarget.name]=== data[username] or data[password]
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button
        disabled={this.validate()} //null equals to false
        type="submit"
        className="btn btn-warning"
      >
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    return (
      <Input
        type={type}
        value={this.state.data[name]}
        name={name}
        changed={this.handleChange}
        label={label}
        errors={this.state.errors[name]}
      />
    );
  }
}

export default Form;

import React from "react";

const Input = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      {/*input types have there own state */}
      <input
        onChange={props.changed}
        placeholder={props.label}
        value={props.value}
        name={props.name}
        type={props.type}
        className="form-control"
        id="input"
      />
      {props.errors && <div className="alert alert-danger">{props.errors}</div>}{" "}
      {/*if error is truthy, then this expression will be retured otherwise if its falsy, its going to be ignored */}
    </div>
  );
};

export default Input;

import React, { Component } from "react";

class Like extends Component {
  render() {
    let classes = "fa fa-heart";
    //this.props.like ? (classes += "-o") : (classes += "");
    //or
    if (!this.props.liked) {
      classes += "-o";
    }
    return (
      <i
        onClick={this.props.onToggle}
        style={{ cursor: "pointer" }}
        className={classes}
        aria-hidden="true"
      ></i>
    );
  }
}

//or we can use stateless functional component

/* const Like = (props) => {
  let classes = "fa fa-heart";
  //this.props.like ? (classes += "-o") : (classes += "");
  //or
  if (!props.liked) {
    classes += "-o";
  }
  return (
    <i
      onClick={props.onToggle}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    ></i>
  );
}; */

export default Like;

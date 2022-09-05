import React, { Component } from "react";

class SearchBox extends Component {
  render() {
    const { change, value } = this.props;

    return (
      <div className="input-group mb-3">
        <input
          onChange={(e) => change(e.currentTarget.value)}
          value={value}
          type="text"
          className="form-control"
          placeholder="Search"
        />
      </div>
    );
  }
}

export default SearchBox;

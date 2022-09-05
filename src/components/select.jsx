import React, { Component } from "react";

class Select extends Component {
  render() {
    const { name, label, options, error, ...rest } = this.props;

    //  React, instead of using this selected attribute, uses a value attribute on the root select tag.
    //This is more convenient in a controlled component because you only need to update it in one place

    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select name={name} id={name} {...rest} className="form-control">
          <option value="" />
          {options.map((genres) => (
            <option
              value={genres._id}
              // selected={this.renderGenreSelect(genres)}
              key={genres._id}
            >
              {genres.name}
            </option>
          ))}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
  // renderGenreSelect = (item) => {
  //   const { value } = this.props;
  //   if (value === item._id) return true;
  // };
}

export default Select;

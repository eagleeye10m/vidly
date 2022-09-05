import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((items) => (
          <tr key={items._id}>
            {columns.map((column) => (
              <td key={items._id + (column.path || column.key)}>
                {this.renderCell(items, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  renderCell = (item, column) => {
    if (column.content) {
      return column.content(item); //item in here are movies
    } else return _.get(item, column.path); // its equals to item[column.path] and because we cant show genre cause its an object
  };
}

export default TableBody;

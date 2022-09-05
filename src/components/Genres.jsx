import React from "react";

const Genre = (props) => {
  const { items, textProperty, valueProperty, selectedItem, onItemsSelect } =
    props;
  return (
    <ul
      key={items[valueProperty]}
      className="list-group"
      style={{
        display: "inline-block",
      }}
    >
      {items.map((genres) => (
        <li
          onClick={() => {
            onItemsSelect(genres);
          }}
          key={genres[valueProperty]}
          className={
            genres === selectedItem
              ? "list-group-item active"
              : "list-group-item"
          }
          style={{ cursor: "pointer" }}
        >
          {genres[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default Genre;

Genre.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

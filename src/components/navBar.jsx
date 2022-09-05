import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Vidly
      </Link>
      <button className="navbar-toggler" type="button">
        <span className="navbar-toggler-icon" />
      </button>
      <div>
        <ul className="navbar-nav">
          {/*The NavLink is used when you want to highlight a link as active. 
          So, on every routing to a page, the link is highlighted according to the activeClassName */}

          <NavLink className="nav-item nav-link" to="/movies">
            Movies
          </NavLink>

          <NavLink className="nav-item nav-link" to="/customers">
            Customers
          </NavLink>

          <NavLink className="nav-item nav-link" to="/rentals">
            Rentals
          </NavLink>

          {!props.user && ( //if a user does not exist, then show login and register options
            <React.Fragment>
              {" "}
              {/*we use fragment cause each jsx element must have one parent */}
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}

          {props.user && ( //if a user does exist, then show its name or logout option
            <React.Fragment>
              {/*we use fragment cause each jsx element must have one parent */}
              <NavLink className="nav-item nav-link" to="/profile">
                {props.user.name}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/loguot">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

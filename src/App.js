import "./App.css";
import Movies from "./components/movies";
import { Route, Switch, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import React, { Component } from "react";
import MovieForm from "./components/movieForm";
import registerForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container-fluid">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/loguot" component={Logout} />
            {/*to protect route; this is a self made component */}
            <ProtectedRoute path="/movies/:id" Component={MovieForm} />
            {/*we include ...props becuase these props includes history,match,location and etc: */}
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/register" component={registerForm} />
            <Route path="/notFound" component={NotFound} />
            <Redirect from="/" exact to="/movies" />{" "}
            {/*we tried another invalid url and it redirected to the movies, thats why we used exact  */}
            <Redirect to="/notFound" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;

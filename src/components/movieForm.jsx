import React from "react";
import Form from "./common/form";
import { getGenres } from "../services/genreServices";
import Joi from "joi-browser";
import { saveMovie } from "../services/movieServices";
import { getMovie } from "../services/movieServices";
import Select from "./select";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("numberInStock", "Number in stock", "number")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  async populateGenres() {
    const { data } = await getGenres();
    this.setState({ genres: data });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId); //async fuunctions always return promise so we used await
      this.setState({ data: this.mapToViewModel(movie) }); //its possible what we wanna show on the page, is a little bit different from the structure of that data
      //thats why we defined mapToViewModel method
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.push("/notfound");
    }
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in stock"),
    dailyRentalRate: Joi.number().required().min(0).max(100).label("Rate"),
  };

  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  mapToViewModel(movie) {
    return {
      //returns an object with key value pairs
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  renderSelect(name, label, option) {
    const { data, errors } = this.state;
    return (
      <Select
        onChange={this.handleChange}
        value={data[name]}
        name={name}
        label={label}
        error={errors[name]}
        options={option}
      />
    );
  }
}

export default MovieForm;

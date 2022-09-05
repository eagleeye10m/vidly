import React, { Component } from "react";
import { getMovies } from "../services/movieServices";
import Pagination from "./common/pagination";
import { paginate } from "../Utils/Paginate";
import { getGenres } from "../services/genreServices";
import Genre from "./Genres";
import MoviesTable from "./movieTable";
import _ from "lodash";
import { deleteMovie } from "../services/movieServices";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchbox";
import { toast } from "react-toastify";

export default class movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
    selectedGenre: null,
    searchQuery: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const Genres = [{ id: "", name: "All Genres" }, ...data];
    const movies = await getMovies();
    this.setState({ movies: movies.data, genres: Genres });
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;
    const { user } = this.props;

    const { totalCount, Movies } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col col-2">
            <Genre
              items={this.state.genres}
              onItemsSelect={this.handleGenreSelect}
              selectedItem={this.state.selectedGenre}
            />
          </div>

          <div className=" col col">
            {/* if a user does exist,(someone who logged in) then, new movie button should be displayed */}
            {user && (
              <Link to="/movies/new">
                <button
                  style={{ marginBottom: "8px" }}
                  className="btn btn-info"
                >
                  New movie
                </button>
              </Link>
            )}
            <p>showing {totalCount} movies in the database</p>
            <SearchBox
              value={this.state.searchQuery}
              change={this.handleSearch}
            />
            <MoviesTable
              movies={Movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: originalMovies });

    try {
      await deleteMovie(movie._id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("This movie has already been deleted!");
        this.setState({ movies: originalMovies });
      }
    }
  };

  handleLike = (movie) => {
    const Movies = this.state.movies; //if we use { ...this.state.movies }, we get one object with N properties, but if we use this.state.movies, we get an array with N objects
    const index = Movies.indexOf(movie);
    Movies[index].liked = !Movies[index].liked;
    this.setState({ movies: Movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allMovies;

    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase()),
      );
    else if (selectedGenre && selectedGenre._id)
      // All genres option does'nt have any id so all movies will be shown
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(
      filtered,
      [sortColumn.path.toLowerCase()],
      [sortColumn.order],
    );

    const Movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, Movies };
  };

  handleSearch = (value) => {
    this.setState({ searchQuery: value, selectedGenre: null, currentPage: 1 });
  };
}

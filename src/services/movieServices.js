import http from "./httpService";

export function getMovies() {
  return http.get(apiEndPoint);
}
const apiEndPoint = "/movies";

//I wrote this myself
/* export async function getMovie(movieId) {
  const hot = await http.get("http://localhost:3900/api/movies"); //if we don't use await, axios will only returns promise, but await checks if the promise fulfilled and then returns an object
  const chosenMovie = hot.data.find((m) => m._id === movieId);
  return chosenMovie;
} */
//async functions always return promises

export function getMovie(movieId) {
  return http.get(`${apiEndPoint}/${movieId}`);
}

export function deleteMovie(movieId) {
  return http.delete(`${apiEndPoint}/${movieId}`);
}

export function saveMovie(movie) {
  if (movie._id) {
    //In this case, movie does exist and we're editing it
    const body = { ...movie }; //if we want movie object not to change,we should use curly braces
    //const body2 = movie;    there is a difference between these two
    delete body._id;

    return http.put(`${apiEndPoint}/${movie._id}`, body);
  }
  return http.post(apiEndPoint, movie);
}

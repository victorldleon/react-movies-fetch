import React, { Component } from "react";
import "./index.css";

class MovieList extends Component {
  state = {
    inputValue: "",
    movies: [],
  };

  componentDidMount() {}

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleSearch = () => {
    const headers = { "Content-Type": "application/json" };
    fetch(
      "https:jsonmock.hackerrank.com/api/movies?Year=" + this.state.inputValue,
      {
        headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ movies: data.data });
      });
  };

  render() {
    const movieList = this.state.movies.map((movie) => {
      return (
        <li className="slide-up-fade-in py-10" key={movie.Title}>
          {movie.Title}
        </li>
      );
    });
    const noResults = (
      <div className="mt-50 slide-up-fade-in" data-testid="no-result">
        No results
      </div>
    );

    return (
      <div className="layout-column align-items-center mt-50">
        <section className="layout-row align-items-center justify-content-center">
          <input
            type="number"
            className="large"
            placeholder="Enter Year eg 2015"
            data-testid="app-input"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
          <button
            className=""
            data-testid="submit-button"
            onClick={this.handleSearch}
          >
            Search
          </button>
        </section>

        <ul className="mt-50 styled" data-testid="movieList">
          {movieList}
        </ul>
        {this.state.movies.length > 0 ? null : noResults}
      </div>
    );
  }
}

export default MovieList;

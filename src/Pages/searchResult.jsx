// src/SearchResults.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const { filteredMovies } = location.state || { filteredMovies: [] }; 

  return (
    <div className="container mt-4">
    <h1 style={{color:'#fff',fontWeight:'bold',fontSize:'30px'}}>Search Results</h1>
    <div className="row">
      {filteredMovies.length > 0 ? (
        filteredMovies.map(movie => (
            <div className="col-md-4 mb-4" key={movie._id}>
            <div
              className="card"
              style={{ width: "360px", borderRadius: "20px" }}
            >
              <Link to={`/movies/${movie._id}`}>
                <img
                  src={movie.poster}
                  className="card-img-top"
                  alt={movie.name}
                  style={{ height: "400px", objectFit: "cover" }}
                />
              </Link>
              <div
                className="card-body text-center"
                style={{
                  height: "150px",
                  borderRadius: "20px",
                  position: "relative",
                }}
              >
                <h5 className="card-title mx-1">
                  {movie.name}
                  <i className="bi bi-star-fill ms-2"></i>
                </h5>
                <Link
                 to={'/favourites'}
                  className="nav-link icon-link"
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    fontSize: "70px",
                    color: "#ff4d4d",
                  }}
                >
                  <i
                    className="bi bi-heart-fill"
                    style={{ fontSize: "50px" }}
                  ></i>
                </Link>

                <p className="card-text m-auto">Genre: {movie.genre}</p>
                <p className="card-text m-auto" style={{ color: "#8B0000" }}>
                  Popularity: {movie.popularity}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  </div>

  );
};

export default SearchResults;

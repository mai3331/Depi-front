import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Genres = () => {
  const { title } = useParams();
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      const response = await fetch(
        `http://localhost:5000/api/movies/genre/${title}`
      );
      const data = await response.json();
      setFilteredMovies(data);
    };
    fetchMovieData();
  }, [title]);
  return (
    <>
      <div className="container mt-5">
        <h1
          className="text-center mb-4"
          style={{ color: "#8B0000", fontFamily: "Raleway" }}
        >
          Best {title} Movies{" "}
        </h1>
        <div className="row">
          {filteredMovies.map((movie) => (
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
                    style={{  height: "400px",
                        objectFit: "cover",
                        borderRadius: "20px"}}
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
          ))}
        </div>
      </div>
    </>
  );
};
export default Genres;

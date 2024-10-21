import React from "react";
import { useEffect, useState } from "react";
import img from "../Assets/106363.jpg";
import img4 from "../Assets/47aa9940-896f-4d2b-b019-86c78e1df493_1200x600.jpg";
import img2 from "../Assets/ENxPOi1XUAAxHDe.jpeg";
import img3 from "../Assets/images-w1400.jpg";
import { Link } from "react-router-dom";
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [Randommovies, setRandomMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/movies/top/popular"
        );
        const data = await response.json();
        setMovies(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movies");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/movies/random/all"
        );
        const data = await response.json();
        setRandomMovies(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movies");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="container-fluid mt-auto mx-auto">
        <div
          id="carouselExampleInterval"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="5000">
              <img
                src={img}
                className="d-block w-100"
                style={{ height: "600px", objectFit: "cover", width: "1280" }}
                alt="First slide"
              />
            </div>
            <div className="carousel-item" data-bs-interval="5000">
              <img
                src={img2}
                className="d-block w-100"
                style={{ height: "600px", objectFit: "cover", width: "1280" }}
                alt="second slide"
              />
            </div>
            <div className="carousel-item" data-bs-interval="5000">
              <img
                src={img3}
                className="d-block w-100"
                style={{ height: "600px", objectFit: "cover", width: "1280" }}
                alt="second slide"
              />
            </div>
            <div className="carousel-item" data-bs-interval="5000">
              <img
                src={img4}
                className="d-block w-100"
                style={{ height: "600px", objectFit: "cover", width: "1280" }}
                alt="third slide"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* <div className="container mt-5">
            <h1 className="text-center mb-4" style={{color:"#8B0000",fontFamily: 'Raleway'}}>TRENDING MOVIES</h1>
            <div className="row">
                {movies.map((movie) => (
                    <div className="col-md-4 mb-4" key={movie._id}>
                        <div className="card" style={{ width: '360px',borderRadius:'20px' }}>
                            <img 
                                src={movie.poster} 
                                className="card-img-top" 
                                alt={movie.name} 
                                style={{ height: '400px', objectFit: 'cover' }} 
                            />
                            <div className="card-body text-center"style={{ height: '150px',borderRadius:'20px' }}  >
                                <h5 className="card-title mx-1">{movie.name}<i className="bi bi-star-fill ms-2"></i></h5>
                                <p className="card-text">Genre: {movie.genre}</p>
                                <p className="card-text" style={{color:'#8B0000'}}>Popularity: {movie.popularity}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div> */}
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <h2
          className=" text-center mb-3"
          style={{ color: "#8B0000", fontSize: "43px" }}
        >
          TRENDING MOVIES
        </h2>
        <div className="carousel-inner container">
          {movies &&
            movies.length > 0 &&
            movies
              .reduce((acc, movie, index) => {
                if (index % 3 === 0) {
                  acc.push([]);
                }
                acc[acc.length - 1].push(movie);
                return acc;
              }, [])
              .map((group, i) => (
                <div
                  className={`carousel-item ${i === 0 ? "active" : ""}`}
                  key={i}
                >
                  <div className="row row-cols-1 row-cols-md-3 g-4">
                    {group.map((movie) => (
                      <div key={movie._id} className="col mb-3">
                        <div
                          className="card shadow mx-3 text-center fixed-height-card"
                          style={{ width: "360px", borderRadius: "20px" }}
                        >
                          <Link to={`/movies/${movie._id}`}>
                            <img
                              src={movie.poster}
                              className="card-img-top"
                              alt={movie.name}
                              style={{
                                height: "400px",
                                objectFit: "cover",
                                borderRadius: "20px",
                              }}
                            />
                          </Link>
                          <div
                            className="card-body m-auto"
                            style={{ height: "150px", borderRadius: "20px" }}
                          >
                            <h5 className="card-title">{movie.name}</h5>
                            <p className="card-text m-auto">
                              {movie.popularity}{" "}
                              <i className="bi bi-star-fill ms-2"></i>
                            </p>
                            <p className="card-text m-auto">{movie.genre}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
        </div>

       \
        <button
          className="carousel-control-prev prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon prev1"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon next1"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* <div className="container mt-4">
      <h1>Embedded Content</h1>
      <div className="embed-responsive embed-responsive-16by9">
      <iframe width="1300" height="315" src="https://www.youtube.com/embed/n0OFH4xpPr4?si=OWNatTXoUQJ7IZPO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </div> */}
      <div className="container">
        <h2
          className="m-auto text-center"
          style={{ color: "#fff", fontSize: "40px", fontWeight: "bold" }}
        >
          STILL DONT KNOW WHAT TO WATCH
        </h2>
        <p
          className="m-auto text-center mb-3"
          style={{ color: "#fff", fontSize: "20px", fontWeight: "bold" }}
        >
          Here is a random recomendation
        </p>
        <div className="row">
          {Randommovies.map((movie) => (
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
                  style={{ height: "400px",
                    objectFit: "cover",
                    borderRadius: "20px",}}
                />
                 </Link>
                <div
                  className="card-body text-center 'm-auto"
                  style={{ height: "150px", borderRadius: "20px" }}
                >
                  <h5 className="card-title mx-1 'm-auto">
                    {movie.name}
                    <i className="bi bi-star-fill ms-2"></i>
                  </h5>
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

export default Home;

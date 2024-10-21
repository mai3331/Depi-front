import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/genres");
        const data = await response.json();
        setGenres(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch Genres");
        setLoading(false);
      }
    };

    fetchGenres();
  }, []); 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/movies`);
        if (response.ok) {
          const movieData = await response.json();
          setMovies(movieData);
        } else {
          console.error("Failed to fetch movie details");
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovies();
  }, []); 

  
  const handleSearch = (e) => {
    e.preventDefault();

  
    const filtered = movies.filter(movie =>
      movie.name && movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

   
    navigate('/search-results', { state: { filteredMovies: filtered } });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <a className="navbar-brand" href="/home">
          MovieMatch
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Top Genres
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              {genres.map((genre) => (
                  <Link className="dropdown-item" to={`/genre/${genre.title}`} key={genre._id}>
                    {genre.title}
                  </Link>
                ))}
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/AboutUs">
                About us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ContactUs">
                Contact us
              </Link>
            </li>
          </ul>

          <form className="d-flex me-3" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>

          <div className="d-flex align-items-center">
          <Link to="/favourites" className="nav-link icon-link">
              <i className="bi bi-heart-fill"></i>
            </Link>
            <Link to="/login" className="nav-link icon-link">
              <i className="bi bi-person-fill"></i>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

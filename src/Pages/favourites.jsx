import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Favourites = () => {
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [message, setMessage] = useState("");


  useEffect(() => {
    const fetchFavourites = async () => {
        const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please log in to add a review.");
      return;
    }
      try {
        const response = await fetch('http://localhost:5000/api/users/favorites', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch favourite movies');
        }

        const data = await response.json();
        setFavouriteMovies(data);
      } catch (error) {
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchFavourites();
  }, []);

  if (loading) return <p style={{color:'#fff',fontSize:'30px'}}>No favourite movies found</p>; 
  if (error) return <p style={{ color: 'red' }}>{error}</p>; 

  return (
   
    <div className="container mb-5"style={{marginBottom:'400px'}}>
  <h1 style={{color:'#fff',fontSize:'40px',fontWeight:'bold'}}>Your Favourite Movies</h1>
  <div className="row">
    {favouriteMovies.length > 0 ? (
      favouriteMovies.map((movie) => (
        <div key={movie._id} className="col-12 mb-4"> 
          <div className="card d-flex flex-row align-items-center">
          <Link to={`/movies/${movie._id}`}>
            <img 
              src={movie.poster} 
              className="card-img-left"
              alt={movie.title} 
              style={{ height: '200px', width: 'auto', objectFit: 'cover' }}
            />
            </Link>
            <div className="card-body">
              <h5 className="card-title" style={{color:'black',fontSize:'30px'}}>{movie.name}</h5>
              <p className="card-text" style={{fontSize:'20px',color:"#8B0000"}}>Popularity: {movie.popularity}</p>
              <p className="card-text" style={{fontSize:'20px'}}>Rating: {movie.rating} <i className="bi bi-star-fill ms-2"></i></p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p style={{color:'#fff',fontSize:'20px',marginBottom:'400px'}}>No favourite movies found.</p> 
    )}
  </div>
</div>

  
  );
};

export default Favourites;

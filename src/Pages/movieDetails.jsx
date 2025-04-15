import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./movieDetails.css"; // Import your CSS file here
import userEvent from "@testing-library/user-event";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [likedMovies, setLikedMovies] = useState([]);
  const [error, setError] = useState(null); 
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://depi-back-production.up.railway.app/api/movies/${id}`);
        if (response.ok) {
          const movieData = await response.json();
          setMovie(movieData);
          setReviews(movieData.reviews || []);
        
        } else {
          console.error("Failed to fetch movie details");
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);
  const handleAddToFavorites = (id) => {
    console.log('Adding movie to favorites:', id);
    addToFavourites(id);
  };
  const handleAddReview = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please log in to add a review.");
      return;
    }

    const response = await fetch(
      `https://depi-back-production.up.railway.app/api/movies/${id}/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, comment }),
      }
    );

    if (response.ok) {
      const newReview = await response.json();
      setReviews((prev) => [...prev, newReview]);
      setRating(0);
      setComment("");
      setMessage("Review added successfully!");
    } else {
      const errorData = await response.json();
      setMessage(errorData.message || "Failed to add review");
    }
  };
  const addToFavourites = async (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
        setMessage("Please log in to add a review.");
        return;
    }

    try {
        const response = await fetch('https://depi-back-production.up.railway.app/users/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ movieId: id }) 
        });

        if (!response.ok) {
            throw new Error((await response.json()).message || 'Error adding movie to favorites');
        }

        const data = await response.json();
        console.log('Response:', response);
        console.log('Response Data:', data);
        setLikedMovies(data); 
        setError(null); 
        alert('Movie added to favorites!');
    } catch (error) {
        setError(error.message);
    }
};



  return (
    <div className="container mt-5">
     { 
        movie && <div
        className="movie-card mb-4"
        style={{ borderRadius: "20px" , display: 'flex'}}
        key={movie._id}
      >
       
        <img
          src={movie.poster}
          alt={movie.name}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "contain",
            borderRadius: "20px 20px 0 0", 
          }}
        />

        <div className="card-body m-auto" style={{position: 'relative'}}>
          <h5 className="card-title mb-1 me-3" style={{ fontSize: "60px" , fontWeight:'bold'}}>
            {movie.name}
          </h5>
          <Link to={'/favourites'} className="nav-link icon-link m-auto " style={{
      position: 'absolute',
      top: '0',
      right: '0',
      fontSize: '70px',
      color: '#ff4d4d', 
      marginLeft:'30px'
    }} onClick={(e)=>addToFavourites(e,movie._id)}>
      <i className="bi bi-heart-fill " style={{ fontSize: '45px',}}></i>
    </Link>
          <p className="card-text " style={{ fontSize: "30px" }}>
            Description: {movie.description}
          </p>
          <p className="card-text mt-3" style={{ fontSize: "20px" }}>
            Popularity: {movie.popularity}
          </p>
          <p className="card-text mb-5" style={{ fontSize: "20px" }}>
            Rating: {movie.rating}
          </p>
        </div>
      </div>
     }
       
      <div className="container" style={{backgroundColor:'#'}}>
        <h4
          style={{
            marginTop: "20px",
            color: "#fff",
            fontSize: "40px",
            fontWeight: "bold",
          }}
        >
          REVIEWS
        </h4>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="review mb-3 mt-5 container" style={{backgroundColor:'#fff'}}>
              <p style={{ color: "black" }}>
                <strong style={{ color: "black" }}>{review.name}</strong> -{" "}
                {review.rating} Stars <i className="bi bi-star-fill ms-2"></i>
              </p>
              <p style={{ color: "black" ,fontSize:'20px'}}>{review.comment}</p>
            </div>
          ))
        ) : (
          <p style={{ color: "#fff" }}>
            No reviews yet. Be the first to add one!
          </p>
        )}

        <form onSubmit={handleAddReview} className="mt-4">
          <h5 style={{ color: "#fff" }}>Add a Review</h5>

          <div className="form-group">
            <label style={{ color: "#fff" }}>Rating</label>
            <div className="star-rating">
              {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                  <span
                    key={index}
                    className={
                      currentRating <= (hover || rating) ? "on" : "off"
                    }
                    onClick={() => setRating(currentRating)}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(0)}
                    style={{
                      cursor: "pointer",
                      fontSize: "2rem",
                      color:
                        currentRating <= (hover || rating)
                          ? "#ffc107"
                          : "#e4e5e9",
                    }}
                  >
                    &#9733;
                  </span>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label style={{ color: "#fff" }}>Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="form-control"
              placeholder="Write your review here"
              required
            />
          </div>
          <button type="submit" className="btn" style={{backgroundColor:'#8B0000',color:"#fff"}}>
            Submit Review
          </button>
        </form>

        {message && <p className="mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default MovieDetails;

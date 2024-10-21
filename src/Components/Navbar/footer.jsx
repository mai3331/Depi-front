import React from "react";

const Footer=()=>{


    return(
        <>
        
        <footer
          className="text-light py-4 mt-5"
          style={{ backgroundColor: "#8B0000", width: "100%"}}
        >
          <div className="container-fluid">
            <div className="row">
    
              <div className="col-md-4 mb-3">
                <h4 className="text-uppercase">MovieMatch</h4>
                <p>
                  Discover your next favorite movie with personalized
                  recommendations!
                </p>
                <p>&copy; 2024 MovieMatch. All rights reserved.</p>
              </div>

        
              <div className="col-md-4 mb-3">
                <h5 className="text-uppercase">Quick Links</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="/" className="text-light text-decoration-none">
                      Top Movies
                    </a>
                  </li>
                  <li>
                    <a href="/" className="text-light text-decoration-none">
                      Latest Reviews
                    </a>
                  </li>
                  <li>
                    <a href="/" className="text-light text-decoration-none">
                      Genres
                    </a>
                  </li>
                  <li>
                    <a href="/" className="text-light text-decoration-none">
                      Support
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-md-4 mb-3">
                <h5 className="text-uppercase">Get in Touch</h5>
                <p>
                  Email us:{" "}
                  <a href="mailto:support@moviehub.com" className="text-light">
                    support@moviematch.com
                  </a>
                </p>
                <div className="d-flex gap-3">
                  <a href="/" className="text-light">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="/" className="text-light">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="/" className="text-light">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="/" className="text-light">
                    <i className="bi bi-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
        </>
    )
}
export default Footer
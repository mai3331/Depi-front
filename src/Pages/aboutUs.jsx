import React from 'react';
import './AboutUs.css'; 

const AboutUs = () => {
  return (
    <div className="about-container mt-5 mb-4">
      <header className="about-header">
        <h1>About MovieMatch</h1>
        <p className='pa'>Your go-to place for personalized movie recommendations</p>
      </header>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p className='pa'>
            Our mission is simple: to help you discover your next favorite movie effortlessly. Whether you’re in the mood for an action movie, a drama, or a documentary, we provide tailored recommendations based on your preferences.
          </p>
        </section>

        <section className="about-section">
          <h2>How It Works</h2>
          <ul>
            <li><strong>Personalized Suggestions:</strong> We offer recommendations just for you.</li>
            <li><strong>Easy to Use:</strong> Sign up, and get instant recommendations!</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Why Choose MovieMatch?</h2>
          <p className='pa'>
            With so many options available, it's hard to decide what to watch next. MovieMatch helps you find movies you’ll love by focusing on:
          </p>
          <ul>
            <li><strong>Accurate Recommendations:</strong> Only see movies that fit your taste.</li>
            <li><strong>Diverse Genres:</strong> We cover a wide variety of genres and styles.</li>
          </ul>
        </section>


      </div>
    </div>
  );
}

export default AboutUs;

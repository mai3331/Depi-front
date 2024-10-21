import React from "react";


const ContactUs = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh'}}>
      <div className="p-4" style={{ backgroundColor: 'white', width: '350px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h3 className="text-center mb-4" style={{ color: '#8B0000' }}>Contact Us</h3>
        
        <p className="text-center mb-3" style={{ color: '#8B0000' }}>We'd love to hear from you!</p>


        <div className="d-flex justify-content-center mb-4">
          <a href="https://facebook.com" className="text-dark mx-2" aria-label="Facebook">
            <i className="bi bi-facebook" style={{ fontSize: '1.5rem' }}></i>
          </a>
          <a href="https://twitter.com" className="text-dark mx-2" aria-label="Twitter">
            <i className="bi bi-twitter" style={{ fontSize: '1.5rem' }}></i>
          </a>
          <a href="https://instagram.com" className="text-dark mx-2" aria-label="Instagram">
            <i className="bi bi-instagram" style={{ fontSize: '1.5rem' }}></i>
          </a>
          <a href="mailto:support@moviematch.com" className="text-dark mx-2" aria-label="Email">
            <i className="bi bi-envelope-fill" style={{ fontSize: '1.5rem' }}></i>
          </a>
        </div>

      
        <div className="text-center mb-3" style={{ color: '#8B0000' }}>
          <p><i className="bi bi-telephone-fill me-2"></i>+123 456 7890</p>
          <p><i className="bi bi-envelope-fill me-2"></i>support@moviematch.com</p>
        </div>

        <p className="text-center" style={{ fontSize: '0.9rem', color: '#8B0000' }}>Follow us for the latest movie recommendations!</p>
      </div>
    </div>
  );
};

export default ContactUs;

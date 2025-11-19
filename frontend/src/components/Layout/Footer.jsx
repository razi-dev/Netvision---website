import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0">
              © 2024 Net-Vision. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex justify-content-md-end justify-content-center">
              <a href="#" className="text-light me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
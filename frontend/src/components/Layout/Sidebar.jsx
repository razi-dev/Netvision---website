import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: 'fas fa-home', label: 'Home' },
    { path: '/dashboard', icon: 'fas fa-chart-bar', label: 'Dashboard' },
    { path: '/compass', icon: 'fas fa-compass', label: 'Compass' },
    { path: '/saved-spots', icon: 'fas fa-bookmark', label: 'Saved Spots' }
  ];

  return (
    <div className="bg-light border-end h-100">
      <div className="p-3">
        <h6 className="text-muted text-uppercase fw-bold mb-3">Navigation</h6>
        <ul className="nav nav-pills flex-column">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item mb-1">
              <Link
                to={item.path}
                className={`nav-link d-flex align-items-center ${
                  location.pathname === item.path ? 'active' : 'text-dark'
                }`}
              >
                <i className={`${item.icon} me-2`}></i>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-3 border-top">
        <h6 className="text-muted text-uppercase fw-bold mb-3">Quick Stats</h6>
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <small className="text-muted">Signal Quality</small>
            <small className="fw-bold">Good</small>
          </div>
          <div className="progress" style={{height: '6px'}}>
            <div className="progress-bar bg-success" style={{width: '75%'}}></div>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <small className="text-muted">Speed</small>
            <small className="fw-bold">25 Mbps</small>
          </div>
          <div className="progress" style={{height: '6px'}}>
            <div className="progress-bar bg-primary" style={{width: '60%'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
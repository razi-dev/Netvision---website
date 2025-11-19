import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API_URL = "http://172.19.172.179:5000";

const Home = () => {
  const { user } = useAuth();
  const [connectivityData, setConnectivityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastSpot, setLastSpot] = useState(null);

  useEffect(() => {
    fetchLastSpot();
  }, []);

  const fetchLastSpot = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/connectivity/last-spot/${user.id}`);
      setLastSpot(response.data);
    } catch (error) {
      console.error('Error fetching last spot:', error);
    }
  };

  const measureConnectivity = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL} /api/connectivity/measure`);
      setConnectivityData(response.data);
    } catch (error) {
      console.error('Error measuring connectivity:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3 mb-0">Welcome back, {user?.username}!</h1>
            <button 
              className="btn btn-primary"
              onClick={measureConnectivity}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Measuring...
                </>
              ) : (
                <>
                  <i className="fas fa-wifi me-2"></i>
                  Measure Connectivity
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="fas fa-chart-line me-2"></i>
                Connectivity Overview
              </h5>
            </div>
            <div className="card-body">
              {connectivityData ? (
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="text-center p-3 bg-primary bg-opacity-10 rounded">
                      <i className="fas fa-signal fa-2x text-primary mb-2"></i>
                      <h4 className="text-primary">{connectivityData.signalStrength}%</h4>
                      <p className="mb-0 text-muted">Signal Strength</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="text-center p-3 bg-success bg-opacity-10 rounded">
                      <i className="fas fa-download fa-2x text-success mb-2"></i>
                      <h4 className="text-success">{connectivityData.downloadSpeed} Mbps</h4>
                      <p className="mb-0 text-muted">Download Speed</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="text-center p-3 bg-info bg-opacity-10 rounded">
                      <i className="fas fa-upload fa-2x text-info mb-2"></i>
                      <h4 className="text-info">{connectivityData.uploadSpeed} Mbps</h4>
                      <p className="mb-0 text-muted">Upload Speed</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-5">
                  <i className="fas fa-wifi fa-3x text-muted mb-3"></i>
                  <h5 className="text-muted">No connectivity data available</h5>
                  <p className="text-muted">Click "Measure Connectivity" to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="fas fa-map-marker-alt me-2"></i>
                Last Saved Spot
              </h5>
            </div>
            <div className="card-body">
              {lastSpot ? (
                <div>
                  <h6 className="fw-bold">{lastSpot.name}</h6>
                  <p className="text-muted mb-2">{lastSpot.location}</p>
                  <div className="d-flex justify-content-between">
                    <span>Signal: {lastSpot.signalStrength}%</span>
                    <span>Speed: {lastSpot.speed} Mbps</span>
                  </div>
                  <small className="text-muted">
                    Saved on {new Date(lastSpot.createdAt).toLocaleDateString()}
                  </small>
                </div>
              ) : (
                <div className="text-center py-3">
                  <i className="fas fa-map-marker-alt fa-2x text-muted mb-2"></i>
                  <p className="text-muted mb-0">No saved spots yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="fas fa-info-circle me-2"></i>
                Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <a href="/dashboard" className="btn btn-outline-primary w-100">
                    <i className="fas fa-chart-bar me-2"></i>
                    View Dashboard
                  </a>
                </div>
                <div className="col-md-3">
                  <a href="/compass" className="btn btn-outline-success w-100">
                    <i className="fas fa-compass me-2"></i>
                    Open Compass
                  </a>
                </div>
                <div className="col-md-3">
                  <a href="/saved-spots" className="btn btn-outline-info w-100">
                    <i className="fas fa-bookmark me-2"></i>
                    Saved Spots
                  </a>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-outline-warning w-100" onClick={measureConnectivity}>
                    <i className="fas fa-sync me-2"></i>
                    Refresh Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
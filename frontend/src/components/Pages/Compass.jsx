import React, { useState, useEffect } from 'react';
import axios from 'axios';


const API_URL = "http://172.19.172.179:5000";


const Compass = () => {
  const [location, setLocation] = useState(null);
  const [heading, setHeading] = useState(0);
  const [connectivity, setConnectivity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getCurrentLocation();

    // Request permission for iOS 13+ device orientation
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(response => {
          if (response === 'granted') window.addEventListener('deviceorientation', handleOrientation);
        })
        .catch(() => setError('Device orientation permission denied.'));
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        }),
        err => setError('Unable to get location: ' + err.message)
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleOrientation = (event) => {
    if (event.alpha !== null) setHeading(Math.round(event.alpha));
  };

  const measureConnectivity = async () => {
    if (!location) {
      setError('Location not available.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/api/connectivity/measure`,
        {
          latitude: location.latitude,
          longitude: location.longitude,
          rsrq: -10,   // Replace with actual measured values if available
          sinr: 20,
          cqi: 15
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setConnectivity(response.data.data); // Backend wraps data in `data`
    } catch (err) {
      setError('Error measuring connectivity: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const getDirectionName = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4">Compass & Location</h1>

      {error && <div className="alert alert-warning">{error}</div>}

      <div className="row g-4">
        {/* Compass */}
        <div className="col-lg-6">
          <div className="card h-100 text-center">
            <div className="card-header">Digital Compass</div>
            <div className="card-body">
              <div
                className="rounded-circle border border-3 border-primary d-inline-block mb-4"
                style={{
                  width: '200px',
                  height: '200px',
                  transform: `rotate(${-heading}deg)`,
                  transition: 'transform 0.3s ease'
                }}
              >
                <div className="bg-danger rounded-pill" style={{ width: '4px', height: '80px', margin: '0 auto', transformOrigin: 'bottom center' }}></div>
                <small className="text-danger fw-bold">N</small>
              </div>
              <div className="row text-center">
                <div className="col-6">
                  <h4 className="text-primary">{heading}°</h4>
                  <p className="text-muted mb-0">Heading</p>
                </div>
                <div className="col-6">
                  <h4 className="text-success">{getDirectionName(heading)}</h4>
                  <p className="text-muted mb-0">Direction</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-header">Location Details</div>
            <div className="card-body">
              {location ? (
                <>
                  <p>Latitude: {location.latitude.toFixed(6)}</p>
                  <p>Longitude: {location.longitude.toFixed(6)}</p>
                  <p>Accuracy: ±{Math.round(location.accuracy)} m</p>

                  <button className="btn btn-primary w-100 mb-3" onClick={measureConnectivity} disabled={loading}>
                    {loading ? 'Measuring...' : 'Measure Connectivity'}
                  </button>

                  <button className="btn btn-outline-secondary w-100" onClick={getCurrentLocation}>
                    Refresh Location
                  </button>
                </>
              ) : (
                <p>Getting your location...</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Connectivity Results */}
      {connectivity && (
        <div className="row mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header">Connectivity Results</div>
              <div className="card-body d-flex justify-content-around">
                <div>
                  <h4>{connectivity.rsrq}</h4>
                  <p>RSRQ</p>
                </div>
                <div>
                  <h4>{connectivity.sinr}</h4>
                  <p>SINR</p>
                </div>
                <div>
                  <h4>{connectivity.cqi}</h4>
                  <p>CQI</p>
                </div>
                <div>
                  <h4>{connectivity.qualityScore}</h4>
                  <p>Quality Score</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compass;

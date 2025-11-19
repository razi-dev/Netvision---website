import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';


const API_URL = "http://172.19.172.179:5000";
const Dashboard = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [bestZone, setBestZone] = useState(null);
  const [metrics, setMetrics] = useState({
    avgSignal: 0,
    avgSpeed: 0,
    totalMeasurements: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Fetch connectivity history
        const historyRes = await axios.get(
          `${API_URL}/api/connectivity/history/${user._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const historyData = historyRes.data.history || [];
        setHistory(historyData);

        // Fetch best zone
        const bestZoneRes = await axios.post(
          `${API_URL}/api/connectivity/best-zone`,
          { latitude: 12.9716, longitude: 77.5946 }, // Replace with user location if available
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setBestZone(bestZoneRes.data.hasData ? bestZoneRes.data : null);

        // Calculate metrics
        if (historyData.length > 0) {
          const avgSignal =
            historyData.reduce((sum, item) => sum + (item.rsrq || 0), 0) /
            historyData.length;
          const avgSpeed =
            historyData.reduce((sum, item) => sum + (item.downloadSpeed || 0), 0) /
            historyData.length;

          setMetrics({
            avgSignal: Math.round(avgSignal),
            avgSpeed: Math.round(avgSpeed * 10) / 10,
            totalMeasurements: historyData.length
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1 className="h3 mb-4">Dashboard</h1>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <i className="fas fa-signal fa-2x text-primary mb-3"></i>
              <h3 className="text-primary">{metrics.avgSignal}%</h3>
              <p className="text-muted mb-0">Average Signal Strength</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <i className="fas fa-tachometer-alt fa-2x text-success mb-3"></i>
              <h3 className="text-success">{metrics.avgSpeed} Mbps</h3>
              <p className="text-muted mb-0">Average Speed</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <i className="fas fa-chart-line fa-2x text-info mb-3"></i>
              <h3 className="text-info">{metrics.totalMeasurements}</h3>
              <p className="text-muted mb-0">Total Measurements</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Best Zone */}
        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="fas fa-trophy me-2"></i>
                Best Connectivity Zone
              </h5>
            </div>
            <div className="card-body">
              {bestZone ? (
                <div>
                  <h6 className="fw-bold text-success">
                    {bestZone.location?.latitude}, {bestZone.location?.longitude}
                  </h6>
                  <div className="mb-2">
                    <small className="text-muted">Quality Score</small>
                    <div className="progress mb-2">
                      <div
                        className="progress-bar bg-success"
                        style={{ width: `${bestZone.qualityScore || 0}%` }}
                      >
                        {bestZone.qualityScore || 0}%
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Bearing: {bestZone.bearing}°</span>
                    <span>Distance: {bestZone.distance} m</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-3">
                  <i className="fas fa-search fa-2x text-muted mb-2"></i>
                  <p className="text-muted mb-0">No data available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Connectivity History */}
        <div className="col-lg-8">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="fas fa-history me-2"></i>
                Connectivity History
              </h5>
            </div>
            <div className="card-body">
              {history.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>RSRQ</th>
                        <th>SINR</th>
                        <th>CQI</th>
                        <th>Quality Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.slice(0, 10).map((item, index) => (
                        <tr key={index}>
                          <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                          <td>{item.rsrq}</td>
                          <td>{item.sinr}</td>
                          <td>{item.cqi}</td>
                          <td>{item.qualityScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5">
                  <i className="fas fa-chart-line fa-3x text-muted mb-3"></i>
                  <h5 className="text-muted">No connectivity history</h5>
                  <p className="text-muted">Start measuring connectivity to see your history</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
const API_URL = "http://172.19.172.179:5000";

const SavedSpots = () => {
  const { user } = useAuth();
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newSpot, setNewSpot] = useState({
    name: '',
    location: '',
    notes: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSavedSpots();
  }, []);

  const fetchSavedSpots = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/connectivity/saved-spots`);
      setSpots(response.data);
    } catch (error) {
      console.error('Error fetching saved spots:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSpot = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Get current location
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const spotData = {
            ...newSpot,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            userId: user.id
          };
          
          await axios.post(`${API_URL} /api/connectivity/save-spot`, spotData);
          
          setNewSpot({ name: '', location: '', notes: '' });
          setShowModal(false);
          fetchSavedSpots();
        } catch (error) {
          console.error('Error saving spot:', error);
        } finally {
          setSaving(false);
        }
      });
    } catch (error) {
      console.error('Error getting location:', error);
      setSaving(false);
    }
  };

  const deleteSpot = async (spotId) => {
    if (window.confirm('Are you sure you want to delete this spot?')) {
      try {
        await axios.delete(`${API_URL}/api/connectivity/saved-spots/${spotId}`);
        fetchSavedSpots();
      } catch (error) {
        console.error('Error deleting spot:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height: '400px'}}>
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
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3 mb-0">Saved Spots</h1>
            <button 
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              <i className="fas fa-plus me-2"></i>
              Add New Spot
            </button>
          </div>
        </div>
      </div>
      
      {spots.length > 0 ? (
        <div className="row g-4">
          {spots.map((spot) => (
            <div key={spot.id} className="col-lg-4 col-md-6">
              <div className="card h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h6 className="card-title mb-0 fw-bold">{spot.name}</h6>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteSpot(spot.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
                <div className="card-body">
                  <p className="text-muted mb-2">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    {spot.location}
                  </p>
                  
                  {spot.notes && (
                    <p className="text-muted mb-3">
                      <i className="fas fa-sticky-note me-2"></i>
                      {spot.notes}
                    </p>
                  )}
                  
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <small className="text-muted">Signal</small>
                      <div className="progress" style={{height: '8px'}}>
                        <div 
                          className={`progress-bar ${
                            spot.signalStrength > 70 ? 'bg-success' : 
                            spot.signalStrength > 40 ? 'bg-warning' : 'bg-danger'
                          }`}
                          style={{width: `${spot.signalStrength || 0}%`}}
                        ></div>
                      </div>
                      <small>{spot.signalStrength || 0}%</small>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Speed</small>
                      <p className="mb-0 fw-bold">{spot.downloadSpeed || 0} Mbps</p>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      {new Date(spot.createdAt).toLocaleDateString()}
                    </small>
                    <button className="btn btn-sm btn-outline-primary">
                      <i className="fas fa-directions me-1"></i>
                      Navigate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <i className="fas fa-bookmark fa-3x text-muted mb-3"></i>
          <h5 className="text-muted">No saved spots yet</h5>
          <p className="text-muted mb-4">Start saving your favorite connectivity spots</p>
          <button 
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <i className="fas fa-plus me-2"></i>
            Add Your First Spot
          </button>
        </div>
      )}
      
      {/* Add Spot Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Spot</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSaveSpot}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="spotName" className="form-label">Spot Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="spotName"
                      value={newSpot.name}
                      onChange={(e) => setNewSpot({...newSpot, name: e.target.value})}
                      required
                      placeholder="e.g., Coffee Shop WiFi"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="spotLocation" className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      id="spotLocation"
                      value={newSpot.location}
                      onChange={(e) => setNewSpot({...newSpot, location: e.target.value})}
                      required
                      placeholder="e.g., Downtown Starbucks"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="spotNotes" className="form-label">Notes (Optional)</label>
                    <textarea
                      className="form-control"
                      id="spotNotes"
                      rows="3"
                      value={newSpot.notes}
                      onChange={(e) => setNewSpot({...newSpot, notes: e.target.value})}
                      placeholder="Any additional notes about this spot..."
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Saving...
                      </>
                    ) : (
                      'Save Spot'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedSpots;
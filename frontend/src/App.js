import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Home from "./components/Pages/Home";
import Dashboard from "./components/Pages/Dashboard";
import Compass from "./components/Pages/Compass";
import SavedSpots from "./components/Pages/SavedSpots";
import Hero from "./components/Pages/Hero";
import AppLayout from "./components/Layout/AppLayout";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// Public route wrapper
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/home" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Hero />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Protected routes with layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="compass" element={<Compass />} />
            <Route path="saved-spots" element={<SavedSpots />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

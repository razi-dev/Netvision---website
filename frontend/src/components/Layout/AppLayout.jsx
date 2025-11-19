import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const AppLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container-fluid flex-grow-1">
        <div className="row h-100">
          <div className="col-md-3 col-lg-2 p-0">
            <Sidebar />
          </div>
          <div className="col-md-9 col-lg-10 p-4">
            <Outlet /> {/* Nested routes render here */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;

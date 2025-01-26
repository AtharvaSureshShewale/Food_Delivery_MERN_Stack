import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="text-center">
    <footer className="d-flex flex-column align-items-center py-3 my-4 border-top">
      <div className="d-flex align-items-center justify-content-center">
        <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"></Link>
        <span className="text-muted">© 2025 Mama's Kitchen, Inc</span>
      </div>
      <ul className="nav justify-content-center list-unstyled d-flex"></ul>
    </footer>
    </div>
  );
}

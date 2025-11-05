import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  // TODO: Backend Integration - Check user authentication status
  // API Endpoint: GET /api/auth/status
  // Response: { isAuthenticated: boolean, user: { id, name, major } }
  // Example:
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const response = await fetch('/api/auth/status');
  //     const data = await response.json();
  //     setIsAuthenticated(data.isAuthenticated);
  //   };
  //   checkAuth();
  // }, []);
  const isAuthenticated = false;

  const handleStartLearning = () => {
    // TODO: Backend Integration - If authenticated, fetch user's saved progress
    // and redirect to appropriate page (upload or result)
    navigate("/upload");
  };

  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/signin">Sign In</Link>
      </nav>

      {/* Logo Section */}
      <div className="logo-section">
        <img src="/logo.png" alt="AI Study Assistant" className="logo-img" />
      </div>

      {/* Hero Section */}
      <h2 className="subtitle">Welcome to</h2>
      <h1 className="title">Kean-Credit-Compass</h1>

      {/* Start Section */}
      <div className="start-section">
        <button className="start-btn" onClick={handleStartLearning}>
          Start Checking
        </button>
        <div className="topic-tag">Made by ...</div>
      </div>
    </div>
  );
}

export default LandingPage;







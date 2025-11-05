import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/DegreeProgress.css';

function DegreeProgress() {
  const location = useLocation();
  const navigate = useNavigate();
  const { courses, major } = location.state || {};

  // TODO: Backend Integration - Fetch student data from API instead of using location.state
  // API Endpoint: GET /api/student/progress/:studentId
  // Response: { 
  //   studentId: string, 
  //   major: string, 
  //   courses: array,
  //   totalRequiredCredits: number,
  //   remainingCourses: array 
  // }
  // Example:
  // const [studentData, setStudentData] = useState(null);
  // useEffect(() => {
  //   const fetchStudentData = async () => {
  //     const response = await fetch(`/api/student/progress/${studentId}`);
  //     const data = await response.json();
  //     setStudentData(data);
  //   };
  //   fetchStudentData();
  // }, [studentId]);

  useEffect(() => {
    if (!courses || !major) {
      navigate('/upload');
    }
  }, [courses, major, navigate]);

  if (!courses || !major) {
    return null;
  }

  const totalCreditsCompleted = courses.reduce((sum, course) => {
    return sum + parseFloat(course['Credits'] || 0);
  }, 0);

  // TODO: Backend Integration - Get totalRequiredCredits from API based on major
  // Different majors may have different credit requirements
  const totalRequiredCredits = 120;
  const creditsRemaining = Math.max(0, totalRequiredCredits - totalCreditsCompleted);
  const completionRate = Math.min(100, Math.round((totalCreditsCompleted / totalRequiredCredits) * 100));

  const handleReupload = () => {
    navigate('/upload');
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="progress-container">
      <nav className="progress-navbar">
        <Link to="/">Home</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/signin">Sign In</Link>
      </nav>

      <div className="progress-content">
        <div className="progress-header">
          <div className="progress-steps">
            <span className="step completed">Upload CSV</span>
            <span className="step-divider"></span>
            <span className="step completed">Analyze</span>
            <span className="step-divider"></span>
            <span className="step active">Result</span>
          </div>
          <h1 className="progress-title">Your Degree Progress</h1>
          <p className="progress-subtitle">Based on your uploaded course history (CSV file)</p>
          <p className="progress-major">Major: <strong>{major}</strong></p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3 className="stat-label">Total Credits Completed</h3>
            <p className="stat-value">{totalCreditsCompleted}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-label">Credits Remaining</h3>
            <p className="stat-value">{creditsRemaining}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-label">Completion Rate</h3>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${completionRate}%` }}></div>
            </div>
            <p className="stat-value">{completionRate}% Completed</p>
          </div>
        </div>

        <div className="details-grid">
          <div className="completed-section">
            <h2 className="section-title">Completed Courses</h2>
            <div className="chart-container">
              <div className="circular-progress">
                <svg viewBox="0 0 200 200" className="circular-chart">
                  <circle
                    className="circle-bg"
                    cx="100"
                    cy="100"
                    r="80"
                  ></circle>
                  <circle
                    className="circle-progress"
                    cx="100"
                    cy="100"
                    r="80"
                    style={{
                      strokeDasharray: `${(completionRate / 100) * 502.65} 502.65`
                    }}
                  ></circle>
                </svg>
                <div className="chart-label">
                  <div className="chart-percent">{completionRate}%</div>
                  <div className="chart-text">Completed</div>
                </div>
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color completed-color"></span>
                  <span className="legend-label">Completed</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color remaining-color"></span>
                  <span className="legend-label">Not Completed</span>
                </div>
              </div>
            </div>

            <div className="courses-table-wrapper">
              <h3 className="table-title">Course Name | Credits | Semester</h3>
              <div className="courses-table">
                {courses.map((course, index) => (
                  <div key={index} className="course-row">
                    <div className="course-info">
                      <span className="course-code">{course['Course Code']}</span>
                      <span className="course-name">{course['Course Name']}</span>
                    </div>
                    <div className="course-details">
                      <span className="course-credits">{course['Credits']}</span>
                      <span className="course-semester">{course['Semester']}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn btn-secondary" onClick={handleReupload}>
            Re-upload CSV
          </button>
          <button className="btn btn-primary" onClick={handleBackToDashboard}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default DegreeProgress;


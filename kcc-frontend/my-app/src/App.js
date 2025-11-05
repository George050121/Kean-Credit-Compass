import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import  SignIn  from './Pages/SignIn';
import  SignUp  from './Pages/SignUp';
import CourseUpload from './Pages/CourseUpload';
import DegreeProgress from './Pages/DegreeProgress';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/upload" element={<CourseUpload />} />
        <Route path="/result" element={<DegreeProgress />} />
      </Routes>
    </Router>
  );
}

export default App;










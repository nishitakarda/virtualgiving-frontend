import { Route, Routes } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import InternshipOpportunities from './pages/InternshipPages/InternshipOpportunities';
import AppliedInternships from './pages/InternshipPages/AppliedInternships';
import StudentProfile from './pages/InternshipPages/StudentProfile';
import InternshipManager from './pages/InternshipPages/InternshipManager';
import AlumniDashboard from './pages/AlumniDashboard';
import OrgDashboard from './pages/OrgDashboard';

import MainLayout from './components/MainLayout';
import StudentLayout from './components/StudentDashboard/StudentLayout';
import AlumniLayout from './components/AlumniDashboard/AlumniLayout';
import OrgLayout from './components/OrgDashboard/OrgLayout';

function App() {
  return (
    <Routes>
      {/* Main Routes */}
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Route>

      {/* Student Routes */}
      <Route element={<StudentLayout />}>
        <Route path='/student-dashboard' element={<StudentDashboard />} />
        <Route path='/internship-opportunities' element={<InternshipOpportunities />} />
        <Route path='/applied-internships' element={<AppliedInternships />} />
        <Route path='/profile' element={<StudentProfile />} />
      </Route>

      {/* Alumni Routes */}
      <Route element={<AlumniLayout />}>
        <Route path='/alumni-dashboard' element={<AlumniDashboard />} />
        <Route path='/internship-manager' element={<InternshipManager />} />
      </Route>

      {/* Organization Routes */}
      <Route element={<OrgLayout />}>
        <Route path='/org-dashboard' element={<OrgDashboard />} />
        <Route path='/internship-manager' element={<InternshipManager />} />
      </Route>
    </Routes>
  );
}

export default App;

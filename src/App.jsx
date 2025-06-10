import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
import InternshipOpportunities from './pages/InternshipPages/InternshipOpportunities';
import AppliedInternships from './pages/InternshipPages/AppliedInternships';
import Profile from './pages/Profile';
import InternshipManager from './pages/InternshipPages/InternshipManager';
import AlumniDashboard from './components/AlumniDashboard/AlumniDashboard';
import OrgDashboard from './pages/OrgDashboard';

import MainLayout from './layout/MainLayout';
import StudentLayout from './components/StudentDashboard/StudentLayout';
import AlumniLayout from './layout/AlumniLayout';
import OrgLayout from './layout/OrgLayout';
import MentorshipOpportunities from './pages/MentorshipPages/MentorshipOpportunities';
import { ToastContainer } from 'react-toastify';
import MentorshipRequests from './pages/MentorshipPages/MentorshipRequests';
import PostInternships from './components/Internship/hosts/PostInternships';
import ViewApplications from './components/Internship/hosts/ViewApplications'
import PostMentorship from './components/Mentorship/hosts/PostMentorship';
import { setNavigate } from '../src/utils/navigationHelper'
import { useEffect } from 'react';
import MentorshipManager from './pages/MentorshipPages/MentorshipManager';

function App() {

  const navigate = useNavigate();
  
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <>
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
          <Route path='/mentorship-opportunities' element={<MentorshipOpportunities />} />
          <Route path='/request-mentorships' element={<MentorshipRequests />} />
          <Route path='/applied-internships' element={<AppliedInternships />} />
          <Route path='/student-profile' element={<Profile />} />
        </Route>

        {/* Alumni Routes */}
        <Route element={<AlumniLayout />}>
          <Route path='/alumni-dashboard' element={<AlumniDashboard />} />
          <Route path='/internship-manager' element={<InternshipManager />} />
           <Route path='/mentorship-manager' element={<MentorshipManager />} />
          <Route path='/internship-application/:id' element={<ViewApplications />} />
          <Route path='/post-internship' element={<PostInternships />} />
          <Route path='/post-mentorship' element={<PostMentorship />} />
          <Route path='/mentorship-requests' element={<MentorshipRequests />} />
          <Route path='/alumni-profile' element={<Profile />} />
        </Route>

        {/* Organization Routes */}
        <Route element={<OrgLayout />}>
          <Route path='/org-dashboard' element={<OrgDashboard />} />
          <Route path='/internship-manager' element={<InternshipManager />} />
          <Route path='/org-profile' element={<Profile />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

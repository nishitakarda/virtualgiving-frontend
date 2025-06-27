import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';

import { setNavigate } from './utils/navigationHelper';

// Auth & Home
import HomePage from './pages/HomePage';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import AdminLogin from './pages/auth/AdminLogin';

// Layouts
import MainLayout from './layout/MainLayout';
import StudentLayout from './layout/StudentLayout';
import AlumniLayout from './layout/AlumniLayout';
import AdminLayout from './layout/AdminLayout';

// Dashboards
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
import AlumniDashboard from './components/AlumniDashboard/AlumniDashboard';

// Profile & Common Pages
import Profile from './pages/Profile';
import AllUsers from './pages/AllUsers';
import ViewUserProfile from './pages/ViewUserProfile'

// Internship Pages
import InternshipOpportunities from './pages/InternshipPages/InternshipOpportunities';
import AppliedInternships from './pages/InternshipPages/AppliedInternships';
import InternshipManager from './pages/InternshipPages/InternshipManager';
import PostInternships from './components/Internship/hosts/PostInternships';
import ViewApplications from './components/Internship/hosts/ViewApplications';

// Mentorship Pages
import MentorshipOpportunities from './pages/MentorshipPages/MentorshipOpportunities';
import MentorshipRequests from './pages/MentorshipPages/MentorshipRequests';
import MentorshipManager from './pages/MentorshipPages/MentorshipManager';
import PostMentorship from './components/Mentorship/hosts/PostMentorship';
import RequestMentorship from './components/Mentorship/hosts/RequestMentorship';

// Donation Pages
import CreateDonationRequest from './pages/donations/CreateDonationRequest';
import ManageDonations from './pages/admin/ManageDonations';
import DonationRequests from './pages/donations/DonationRequests';

// Admin Pages
import ManageUsers from './pages/admin/ManageUsers';
import Reports from './pages/admin/Reports'

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <>
      <Routes>

        {/* Main Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<ManageUsers />} />
          <Route path="donations" element={<ManageDonations />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Student Routes */}
        <Route element={<StudentLayout />}>
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/internship-opportunities" element={<InternshipOpportunities />} />
          <Route path="/mentorship-opportunities" element={<MentorshipOpportunities />} />
          <Route path="/request-mentorships" element={<RequestMentorship />} />
          <Route path="/applied-internships" element={<AppliedInternships />} />
          <Route path="/student-profile" element={<Profile />} />
          <Route path="/students/all-users" element={<AllUsers />} />
          <Route path="/students/request-donation" element={<CreateDonationRequest />} />
          <Route path="/students/view-profile/:id" element={<ViewUserProfile />} />
        </Route>

        {/* Alumni Routes */}
        <Route element={<AlumniLayout />}>
          <Route path="/alumni-dashboard" element={<AlumniDashboard />} />
          <Route path="/internship-manager" element={<InternshipManager />} />
          <Route path="/mentorship-manager" element={<MentorshipManager />} />
          <Route path="/internship-application/:id" element={<ViewApplications />} />
          <Route path="/post-internship" element={<PostInternships />} />
          <Route path="/post-mentorship" element={<PostMentorship />} />
          <Route path="/mentorship-requests" element={<MentorshipRequests />} />
          <Route path="/alumni-profile" element={<Profile />} />
          <Route path="/alumni/all-users" element={<AllUsers />} />
          <Route path="/donation-requests" element={<DonationRequests />} />
          <Route path="/alumni/view-profile/:id" element={<ViewUserProfile />} />
        </Route>

      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;

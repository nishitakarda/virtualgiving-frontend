import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import Login from './pages/Login'
import StudentDashboard from './pages/StudentDashboard'
import InternshipOpportunities from './pages/InternshipPages/InternshipOpportunities';
import AppliedInternships from './pages/InternshipPages/AppliedInternships'
import StudentProfile from './pages/InternshipPages/StudentProfile'
import InternshipManager from './pages/InternshipPages/InternshipManager';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/student-dashboard' element={<StudentDashboard />} />
        <Route path='/internship-opportunities' element={<InternshipOpportunities />} />
        <Route path='/applied-internships' element={<AppliedInternships />} />
        <Route path='/student-profile' element={<StudentProfile />} />
        <Route path='/internship-manager' element={<InternshipManager />} />
      </Route>
    </Routes>
  )
}

export default App

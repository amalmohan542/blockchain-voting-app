import { BrowserRouter as Router, Routes, Route } from "react-router"

import HomePage from "@/pages/HomePage"
import AdminLogin from "@/pages/admin/AdminLogin"
import NewElection from "@/pages/admin/NewElection"
import AdminDashboard from "@/pages/admin/AdminDashboard"

function App() {
  return (

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/elections/new" element={<NewElection />} /> 
        </Routes>
      </Router>

  )
}

export default App

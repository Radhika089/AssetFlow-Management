import { Routes, Route } from "react-router-dom";

//import Login from "./pages/auth/Login";
//import Signup from "./pages/auth/Signup";

import DashboardPage from "./pages/Dashboard/dashboardPage";


function App() {

  return (

    <Routes>

      {/* Authentication Routes */}
      {/* <Route path="/" element={<Signup />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/login" element={<Login />} /> */}


      {/* Dashboard Route */}
      <Route path="/dashboard" element={<DashboardPage />} />

    </Routes>

  );

}


export default App;
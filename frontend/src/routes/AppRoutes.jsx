import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Departments from "../pages/organisationSetup/Departments";
import AssetsPage from "../pages/Assets/AssetsPage";

// import Login from "../pages/auth/Login";
// import Signup from "../pages/auth/Signup";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        
        <Route path="dashboard" element={<Dashboard />} />

        {/* Organization Setup — Departments tab is the default inside the page itself */}
        <Route path="organization-setup" element={<Departments />} />

        <Route path="assets" element={<AssetsPage />} />

        {/* add the rest of the sidebar's routes as their pages get built */}
        {/* <Route path="allocation-transfer" element={<AllocationTransferPage />} /> */}
        {/* <Route path="resource-booking" element={<ResourceBookingPage />} /> */}
        {/* <Route path="maintenance" element={<MaintenancePage />} /> */}
        {/* <Route path="audit" element={<AuditPage />} /> */}
        {/* <Route path="reports" element={<ReportsPage />} /> */}
        {/* <Route path="notifications" element={<NotificationsPage />} /> */}

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>

        {/* Authentication Routes */}
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
    </Routes>
  );
}
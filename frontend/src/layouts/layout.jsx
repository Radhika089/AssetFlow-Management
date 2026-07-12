import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

// Shared shell for every authenticated screen: sidebar on the left,
// routed page content in the rounded panel on the right. Whatever
// route matches renders inside <Outlet /> — Dashboard, Organization
// Setup, Assets, etc. all reuse this same frame.

export default function Layout() {
  return (
    <div className="min-h-screen w-full bg-[#110d11] p-6">
      <div className="w-full max-w-[1400px] mx-auto flex gap-4 items-start">
        <Sidebar orgName="AssetFlow" />
        <div className="flex-1 min-w-0 bg-[#18121a] rounded-3xl p-7 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Dashboard from "./Dashboard";

export default function DashboardPage() {
  const [activeKey, setActiveKey] = useState("dashboard");

  return (
    <div className="min-h-screen w-full bg-[#110d11] p-6">
      <div className="w-full max-w-[1400px] mx-auto flex gap-4 items-start">
        <Sidebar activeKey={activeKey} onNavigate={setActiveKey} orgName="AssetFlow" />
        <div className="flex-1 min-w-0 bg-[#18121a] rounded-3xl p-7 overflow-y-auto">
          <Dashboard userName="Aakriti" />
        </div>
      </div>
    </div>
  );
}
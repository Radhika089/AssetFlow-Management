import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Boxes,
  ArrowLeftRight,
  CalendarClock,
  Wrench,
  ClipboardCheck,
  BarChart3,
  Bell,
  ChevronsLeft,
} from "lucide-react";

// Primary nav — maps 1:1 to AssetFlow's core screens
const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { key: "organization", label: "Organization Setup", icon: Building2, path: "/organization-setup" },
  { key: "assets", label: "Assets", icon: Boxes, path: "/assets" },
  { key: "allocation", label: "Allocation & Transfer", icon: ArrowLeftRight, path: "/allocation-transfer" },
  { key: "bookings", label: "Resource Booking", icon: CalendarClock, path: "/resource-booking" },
  { key: "maintenance", label: "Maintenance", icon: Wrench, path: "/maintenance" },
  { key: "audits", label: "Audit", icon: ClipboardCheck, path: "/audit" },
  { key: "reports", label: "Reports", icon: BarChart3, path: "/reports" },
  { key: "notification", label: "Notification", icon: Bell, path: "/notifications", badge: 4 },
];

export default function Sidebar({ orgName = "AssetFlow" }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();     // <-- was missing: this actually changes the URL
  const location = useLocation();     // <-- was missing: this tells us which tab is active

  return (
    <aside
      className={`min-h-screen flex flex-col justify-between shrink-0
                bg-[#18121a] border border-[#7d6578]/15 rounded-3xl p-4
                transition-all duration-300 overflow-y-auto
                ${collapsed ? "w-[97px]" : "w-[260px]"}`}
    >
      {/* Top: collapse toggle */}
      <div>
        <div className="flex items-center justify-between px-1 mb-8">
          <button
            onClick={() => setCollapsed((c) => !c)}
            aria-label="Toggle sidebar"
            className="text-[#a490a2] hover:text-[#d9c7d5] transition-colors p-1 shrink-0"
          >
            <ChevronsLeft
              size={16}
              className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Primary nav */}
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ key, label, icon: Icon, path, badge }) => {
            // active = URL currently starts with this item's path
            // (so /organization-setup/anything still highlights "Organization Setup")
            const active = location.pathname.startsWith(path);
            return (
              <button
                key={key}
                onClick={() => navigate(path)}
                title={collapsed ? label : undefined}
                className={`group relative flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[13.5px]
                  transition-all duration-200 ${collapsed ? "justify-center" : ""} ${
                  active
                    ? "text-[#110d11] font-medium"
                    : "text-[#a490a2] hover:text-[#d9c7d5] hover:bg-[#51424e]/40 font-normal"
                }`}
                style={active ? { background: "linear-gradient(135deg,#d9c7d5,#ac7ba5)" } : undefined}
              >
                <Icon size={17} className="shrink-0" strokeWidth={1.8} />
                {!collapsed && <span className="truncate">{label}</span>}
                {!collapsed && badge && (
                  <span
                    className={`ml-auto text-[10.5px] font-medium rounded-full min-w-[18px] h-[18px] px-1
                    flex items-center justify-center ${
                      active ? "bg-[#110d11]/15 text-[#110d11]" : "bg-[#ac7ba5]/20 text-[#d9c7d5]"
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
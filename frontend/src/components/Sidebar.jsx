import { useState } from "react";
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
  Settings,
  LifeBuoy,
  ChevronsLeft,
} from "lucide-react";

// Primary nav — maps 1:1 to AssetFlow's core screens
const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "organization", label: "Organization Setup", icon: Building2 },
  { key: "assets", label: "Assets", icon: Boxes },
  { key: "allocation", label: "Allocation & Transfer", icon: ArrowLeftRight },
  { key: "bookings", label: "Resource Booking", icon: CalendarClock },
  { key: "maintenance", label: "Maintenance", icon: Wrench },
  { key: "audits", label: "Audit", icon: ClipboardCheck },
  { key: "reports", label: "Reports", icon: BarChart3 },
  { key: "notification", label: "Notification", icon: Bell, badge: 4 },
];

// const FOOTER_ITEMS = [
//   { key: "settings", label: "Settings", icon: Settings },
//   { key: "support", label: "Support", icon: LifeBuoy },
// ];

export default function Sidebar({
  activeKey = "dashboard",
  onNavigate = () => {},
  orgName = "AssetFlow",
  userName = "Aakriti Arya",
  userRole = "Asset Manager",
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className= {`min-h-screen flex flex-col justify-between shrink-0
                bg-[#0b0910] border border-white/5 rounded-3xl p-4
                transition-all duration-300 overflow-y-auto
                ${collapsed ? "w-[97px]" : "w-[260px]"}`}

    >
      {/* Top: brand + collapse toggle */}
      <div>
        <div className="flex items-center justify-between px-1 mb-8">
          <button
            onClick={() => setCollapsed((c) => !c)}
            aria-label="Toggle sidebar"
            className="text-white/40 hover:text-white/80 transition-colors p-1 shrink-0"
          >
            <ChevronsLeft
              size={16}
              className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Primary nav */}
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ key, label, icon: Icon, badge }) => {
            const active = key === activeKey;
            return (
              <button
                key={key}
                onClick={() => onNavigate(key)}
                title={collapsed ? label : undefined}
                className={`group relative flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[13.5px]
                  transition-all duration-200 ${collapsed ? "justify-center" : ""} ${
                  active
                    ? "text-[#1a1022] font-medium"
                    : "text-white/45 hover:text-white/85 hover:bg-white/5 font-normal"
                }`}
                style={
                  active
                    ? { background: "linear-gradient(135deg,#e9b8f0,#9b7bea)" }
                    : undefined
                }
              >
                <Icon size={17} className="shrink-0" strokeWidth={1.8} />
                {!collapsed && <span className="truncate">{label}</span>}
                {!collapsed && badge && (
                  <span
                    className={`ml-auto text-[10.5px] font-medium rounded-full min-w-[18px] h-[18px] px-1
                    flex items-center justify-center ${
                      active
                        ? "bg-[#1a1022]/15 text-[#1a1022]"
                        : "bg-[#e9b8f0]/15 text-[#e9b8f0]"
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

      {/* Bottom: footer nav + user card */}
      {/* <div>
        <div className="flex flex-col gap-1 mb-4 pt-3 border-t border-white/5">
          {FOOTER_ITEMS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[13.5px] text-white/45
                hover:text-white/85 hover:bg-white/5 transition-colors ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <Icon size={17} strokeWidth={1.8} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
            </button>
          ))}
        </div>

        <div
          className={`flex items-center gap-2.5 rounded-2xl bg-white/[0.04] p-2.5 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div
            className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[11px] font-medium text-[#1a1022]"
            style={{ background: "linear-gradient(135deg,#f0b9e8,#9b7bea)" }}
          >
            {userName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-white text-[12.5px] font-medium truncate">{userName}</p>
              <p className="text-white/40 text-[11px] truncate">{userRole}</p>
            </div>
          )}
        </div>
      </div> */}
    </aside>
  );
}
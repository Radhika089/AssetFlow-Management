import {
  Boxes,
  Users2,
  Wrench,
  CalendarClock,
  ArrowLeftRight,
  Clock3,
  AlertTriangle,
  Plus,
  CalendarPlus,
  ClipboardList,
  Package,
  DoorOpen,
  CheckCircle2,
} from "lucide-react";

// Each KPI carries its own accent gradient — keeps the grid from
// reading as one flat block, while everything still sits inside
// the same mauve/plum/sage palette.
const KPIS = [
  {
    label: "Assets available",
    value: 128,
    icon: Boxes,
    gradient: "linear-gradient(135deg,#8fb09e,#4f6d5f)",
    iconColor: "#0d1a13",
  },
  {
    label: "Assets allocated",
    value: 76,
    icon: Users2,
    gradient: "linear-gradient(135deg,#d9c7d5,#ac7ba5)",
    iconColor: "#110d11",
  },
  {
    label: "Maintenance today",
    value: 4,
    icon: Wrench,
    gradient: "linear-gradient(135deg,#d9a370,#a8632e)",
    iconColor: "#1a1208",
  },
  {
    label: "Active bookings",
    value: 9,
    icon: CalendarClock,
    gradient: "linear-gradient(135deg,#a490a2,#7d6578)",
    iconColor: "#110d11",
  },
  {
    label: "Pending transfers",
    value: 3,
    icon: ArrowLeftRight,
    gradient: "linear-gradient(135deg,#d9c7d5,#ac7ba5)",
    iconColor: "#110d11",
  },
  {
    label: "Upcoming returns",
    value: 12,
    icon: Clock3,
    gradient: "linear-gradient(135deg,#8fb09e,#4f6d5f)",
    iconColor: "#0d1a13",
  },
];

const QUICK_ACTIONS = [
  { label: "Register asset", icon: Plus, primary: true },
  { label: "Book resource", icon: CalendarPlus },
  { label: "Raise request", icon: ClipboardList },
];

const ACTIVITY = [
  {
    icon: Package,
    text: "Laptop AF-0114 allocated to Aakriti Arya",
    meta: "IT Department · 2 min ago",
  },
  {
    icon: DoorOpen,
    text: "Room B2 booking confirmed",
    meta: "2:00 PM – 3:00 PM · 18 min ago",
  },
  {
    icon: CheckCircle2,
    text: "Projector AF-0062 maintenance resolved",
    meta: "Marked Available · 1 hr ago",
  },
];

function KpiCard({ label, value, icon: Icon, gradient, iconColor }) {
  return (
    <div
      className="relative overflow-hidden rounded-[18px] p-4 border border-[#ac7ba5]/10
        bg-gradient-to-br from-[#2f212c] to-[#1c1620] hover:border-[#ac7ba5]/25
        transition-colors group"
    >
      {/* soft glow blob, tinted per-card */}
      <div
        className="absolute -top-5 -right-5 w-20 h-20 rounded-full opacity-25 blur-xl
          group-hover:opacity-40 transition-opacity"
        style={{ background: gradient }}
      />
      <div
        className="relative w-9 h-9 rounded-[11px] flex items-center justify-center mb-3.5"
        style={{ background: gradient }}
      >
        <Icon size={17} style={{ color: iconColor }} strokeWidth={2} />
      </div>
      <p className="relative text-[#f2eef0] text-[26px] font-semibold leading-none tracking-tight">
        {value}
      </p>
      <p className="relative text-[#a490a2] text-[12px] mt-1.5">{label}</p>
    </div>
  );
}

export default function Dashboard({ userName = "Aakriti" }) {
  return (
    <main className="flex-1 min-w-0 text-[#d9c7d5]">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-[#f2eef0] text-2xl font-semibold tracking-tight">
            Welcome, <span className="text-[#e9b8f0]">{userName}</span>
          </h1>
          <p className="text-[#a490a2] text-[13px] mt-1">Here's today's asset & resource overview</p>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {KPIS.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Overdue alert */}
      <div
        className="rounded-2xl px-5 py-3.5 mb-4 flex items-center gap-3 border"
        style={{
          background: "linear-gradient(90deg,rgba(168,99,46,0.16),rgba(47,33,44,0))",
          borderColor: "rgba(217,163,112,0.25)",
        }}
      >
        <AlertTriangle size={16} className="text-[#e0ab7a] shrink-0" strokeWidth={1.8} />
        <p className="text-[#e6c4a3] text-[13px]">
          <span className="font-semibold text-[#f0d5b8]">3 assets</span> overdue for return — flagged for follow-up
        </p>
        <button className="ml-auto text-[12px] text-[#e0ab7a] hover:text-[#f0c398] font-medium whitespace-nowrap">
          Review →
        </button>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {QUICK_ACTIONS.map(({ label, icon: Icon, primary }) => (
          <button
            key={label}
            className={`rounded-2xl py-3 flex items-center justify-center gap-2 text-[13px] font-medium
              transition-all active:scale-[0.98] border ${
              primary
                ? "text-[#110d11] border-transparent shadow-[0_4px_20px_-4px_rgba(172,123,165,0.5)]"
                : "text-[#c9bac6] bg-[#2f212c] border-[#7d6578]/25 hover:border-[#ac7ba5]/40 hover:bg-[#3a2b37]"
            }`}
            style={primary ? { background: "linear-gradient(135deg,#d9c7d5,#ac7ba5)" } : undefined}
          >
            <Icon size={15} strokeWidth={2} />
            {label}
          </button>
        ))}
      </div>

      {/* Recent activity */}
      <div className="bg-gradient-to-br from-[#2f212c] to-[#1c1620] border border-[#ac7ba5]/10 rounded-2xl p-5">
        <p className="text-[#f2eef0] text-[15px] font-semibold mb-4">Recent activity</p>
        <div className="flex flex-col gap-1">
          {ACTIVITY.map(({ icon: Icon, text, meta }, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-2.5 border-b border-[#7d6578]/15 last:border-0"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg,#3a2b37,#51424e)" }}
              >
                <Icon size={14} className="text-[#c9bac6]" strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <p className="text-[#e8dde5] text-[13px] truncate">{text}</p>
                <p className="text-[#a490a2] text-[11.5px] mt-0.5">{meta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
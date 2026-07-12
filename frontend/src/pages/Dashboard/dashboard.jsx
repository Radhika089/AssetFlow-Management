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

const KPIS = [
  { label: "Assets available", icon: Boxes },
  { label: "Assets allocated", icon: Users2 },
  { label: "Maintenance today", icon: Wrench },
  { label: "Active bookings", icon: CalendarClock },
  { label: "Pending transfers", icon: ArrowLeftRight },
  { label: "Upcoming returns", icon: Clock3 },
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

function KpiCard({ label, value, icon: Icon }) {
  return (
    <div className="bg-white/[0.04] hover:bg-white/[0.06] transition-colors rounded-2xl p-4 flex flex-col gap-3">
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center"
        style={{ background: "linear-gradient(135deg,#e9b8f033,#9b7bea33)" }}
      >
        <Icon size={16} className="text-[#e9b8f0]" strokeWidth={1.8} />
      </div>
      <div>
        <p className="text-white text-2xl font-medium leading-none">{value}</p>
        <p className="text-white/40 text-[12px] mt-1.5">{label}</p>
      </div>
    </div>
  );
}

export default function Dashboard({ userName = "Aakriti" }) {
  return (
    <main className="flex-1 min-w-0 text-[#f2eef7]">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-white text-2xl font-medium tracking-tight">
            Welcome, <span className="text-[#e9b8f0]">{userName}</span>
          </h1>
          <p className="text-white/40 text-[13px] mt-1">Here's today's asset & resource overview</p>
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
          background: "linear-gradient(90deg,rgba(226,75,74,0.14),rgba(11,9,16,0))",
          borderColor: "rgba(226,75,74,0.25)",
        }}
      >
        <AlertTriangle size={16} className="text-[#f0938e] shrink-0" strokeWidth={1.8} />
        <p className="text-[#f0b0ac] text-[13px]">
          <span className="font-medium">3 assets</span> overdue for return — flagged for follow-up
        </p>
        <button className="ml-auto text-[12px] text-[#f0938e] hover:text-[#f5aca7] font-medium whitespace-nowrap">
          Review →
        </button>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {QUICK_ACTIONS.map(({ label, icon: Icon, primary }) => (
          <button
            key={label}
            className={`rounded-2xl py-3 flex items-center justify-center gap-2 text-[13px] font-medium transition-transform active:scale-[0.98] ${
              primary ? "text-[#1a1022]" : "text-white/70 bg-white/[0.04] hover:bg-white/[0.07]"
            }`}
            style={primary ? { background: "linear-gradient(135deg,#e9b8f0,#9b7bea)" } : undefined}
          >
            <Icon size={15} strokeWidth={2} />
            {label}
          </button>
        ))}
      </div>

      {/* Recent activity */}
      <div className="bg-white/[0.03] rounded-2xl p-5">
        <p className="text-white text-[15px] font-medium mb-4">Recent activity</p>
        <div className="flex flex-col gap-1">
          {ACTIVITY.map(({ icon: Icon, text, meta }, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0"
            >
              <div className="w-8 h-8 rounded-xl bg-white/[0.05] flex items-center justify-center shrink-0">
                <Icon size={14} className="text-white/50" strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <p className="text-white/85 text-[13px] truncate">{text}</p>
                <p className="text-white/35 text-[11.5px] mt-0.5">{meta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
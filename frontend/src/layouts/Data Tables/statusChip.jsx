import { Chip } from "@mui/material";

const STATUS_MAP = {
  Available: {
    bg: "#DCFCE7",
    color: "#15803D",
  },
  Allocated: {
    bg: "#DBEAFE",
    color: "#1D4ED8",
  },
  Maintenance: {
    bg: "#FEF3C7",
    color: "#B45309",
  },
  Pending: {
    bg: "#FEF3C7",
    color: "#92400E",
  },
  Active: {
    bg: "#DCFCE7",
    color: "#15803D",
  },
  Inactive: {
    bg: "#F3F4F6",
    color: "#6B7280",
  },
  Returned: {
    bg: "#E0E7FF",
    color: "#4338CA",
  },
  Damaged: {
    bg: "#FEE2E2",
    color: "#DC2626",
  },
  Lost: {
    bg: "#FEE2E2",
    color: "#B91C1C",
  },
};

const StatusChip = ({ status }) => {
  const style = STATUS_MAP[status] || {
    bg: "#E5E7EB",
    color: "#374151",
  };

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        backgroundColor: style.bg,
        color: style.color,
        fontWeight: 600,
        borderRadius: "8px",
        minWidth: 90,
        justifyContent: "center",
        "& .MuiChip-label": {
          px: 1.5,
        },
      }}
    />
  );
};

export default StatusChip;
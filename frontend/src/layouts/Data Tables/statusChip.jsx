import { Chip } from "@mui/material";

// Same statuses, but translucent-on-dark instead of solid light pastels —
// the original hardcoded light-mode hex values (#DCFCE7 etc.) would sit as
// bright blobs on our dark panels, so these use rgba over the AssetFlow palette.
const STATUS_MAP = {
  Available: { bg: "rgba(79,109,95,0.18)", color: "#9fc4ac", border: "rgba(79,109,95,0.4)" },
  Active: { bg: "rgba(79,109,95,0.18)", color: "#9fc4ac", border: "rgba(79,109,95,0.4)" },
  Allocated: { bg: "rgba(172,123,165,0.18)", color: "#d9c7d5", border: "rgba(172,123,165,0.4)" },
  Maintenance: { bg: "rgba(168,99,46,0.18)", color: "#e0ab7a", border: "rgba(168,99,46,0.4)" },
  Pending: { bg: "rgba(168,99,46,0.18)", color: "#e0ab7a", border: "rgba(168,99,46,0.4)" },
  Inactive: { bg: "rgba(125,101,120,0.18)", color: "#a490a2", border: "rgba(125,101,120,0.4)" },
  Returned: { bg: "rgba(172,123,165,0.18)", color: "#d9c7d5", border: "rgba(172,123,165,0.4)" },
  Damaged: { bg: "rgba(180,95,90,0.18)", color: "#e0a29d", border: "rgba(180,95,90,0.4)" },
  Lost: { bg: "rgba(180,95,90,0.22)", color: "#e0a29d", border: "rgba(180,95,90,0.45)" },
};

const StatusChip = ({ status }) => {
  const style = STATUS_MAP[status] || {
    bg: "rgba(125,101,120,0.15)",
    color: "#a490a2",
    border: "rgba(125,101,120,0.35)",
  };

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        backgroundColor: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
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
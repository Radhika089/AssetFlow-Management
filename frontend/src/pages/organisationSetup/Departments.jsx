import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Plus } from "lucide-react";
import DataTable from "../../layouts/Data Tables/dataTable";
import StatusChip from "../../layouts/Data Tables/statusChip";

// Matches the wireframe: pill-shaped tab buttons in a row, not underlined MUI tabs
const TABS = ["Departments", "Categories", "Employee"];

// TODO: point this at wherever your axios instance / base URL actually lives
const API_BASE = "/api";

const DEPARTMENT_COLUMNS = [
  { key: "department", header: "Department" },
  { key: "head", header: "Head" },
  { key: "parentDept", header: "Parent Dept" },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusChip status={row.status} />,
  },
];

// Backend doc -> table row. Keeps the mismatch between Mongo field
// names/casing (name, head.name, ACTIVE) and what the table expects
// (department, head, Active) in exactly one place.
function mapDepartmentToRow(dept) {
  return {
    id: dept._id,
    department: dept.name,
    head: dept.head?.name || "—",
    parentDept: dept.parentDepartment || "—",
    status: dept.status === "ACTIVE" ? "Active" : "Inactive",
  };
}

export default function Departments() {
  const [activeTab, setActiveTab] = useState("Departments");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activeTab !== "Departments") return;

    let cancelled = false;

    async function fetchDepartments() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/departments`, {
          credentials: "include", // drop this if you're not using cookie-based auth
        });
        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(json.message || "Failed to load departments");
        }

        if (!cancelled) {
          setDepartments(json.departments.map(mapDepartmentToRow));
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDepartments();
    return () => {
      cancelled = true;
    };
  }, [activeTab]);

  return (
    <Box sx={{ color: "#d9c7d5" }}>
      {/* Header */}
      <Typography sx={{ color: "#f2eef0", fontSize: 24, fontWeight: 600, mb: 0.5 }}>
        Organization Setup
      </Typography>
      <Typography sx={{ color: "#a490a2", fontSize: 13, mb: 3 }}>
        Admin only — departments, asset categories, and the employee directory
      </Typography>

      {/* Tab row + Add button */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 3, flexWrap: "wrap" }}>
        {TABS.map((tab) => {
          const active = tab === activeTab;
          return (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              disableRipple
              sx={{
                textTransform: "none",
                fontWeight: 600,
                fontSize: 13.5,
                borderRadius: "12px",
                px: 2.25,
                py: 1,
                color: active ? "#110d11" : "#a490a2",
                background: active
                  ? "linear-gradient(135deg,#d9c7d5,#ac7ba5)"
                  : "rgba(172,123,165,0.06)",
                border: active ? "1px solid transparent" : "1px solid rgba(125,101,120,0.25)",
                "&:hover": {
                  background: active
                    ? "linear-gradient(135deg,#d9c7d5,#ac7ba5)"
                    : "rgba(172,123,165,0.12)",
                },
              }}
            >
              {tab}
            </Button>
          );
        })}

        <Button
          startIcon={<Plus size={15} />}
          disableRipple
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: 13.5,
            borderRadius: "12px",
            px: 2.25,
            py: 1,
            ml: "auto",
            color: "#110d11",
            background: "linear-gradient(135deg,#d9c7d5,#ac7ba5)",
            boxShadow: "0 4px 20px -4px rgba(172,123,165,0.5)",
            "&:hover": { background: "linear-gradient(135deg,#e2d3df,#b489ac)" },
          }}
        >
          Add {activeTab === "Departments" ? "Department" : activeTab === "Categories" ? "Category" : "Employee"}
        </Button>
      </Box>

      {/* Tab content */}
      {activeTab === "Departments" && (
        <>
          {error && (
            <Typography sx={{ color: "#e0a29d", fontSize: 13, mb: 2 }}>
              {error}
            </Typography>
          )}
          <DataTable
            data={departments}
            columns={DEPARTMENT_COLUMNS}
            loading={loading}
            emptyMessage="No departments yet"
          />
          <Typography sx={{ color: "#a490a2", fontSize: 12.5, mt: 2 }}>
            Editing a department here also drives the picklist in Asset Registration & Allocation screens.
          </Typography>
        </>
      )}

      {activeTab === "Categories" && (
        <Box
          sx={{
            borderRadius: "18px",
            border: "1px dashed rgba(125,101,120,0.35)",
            py: 8,
            textAlign: "center",
            color: "#a490a2",
            fontSize: 13.5,
          }}
        >
          Asset Category Management — TODO
        </Box>
      )}

      {activeTab === "Employee" && (
        <Box
          sx={{
            borderRadius: "18px",
            border: "1px dashed rgba(125,101,120,0.35)",
            py: 8,
            textAlign: "center",
            color: "#a490a2",
            fontSize: 13.5,
          }}
        >
          Employee Directory — TODO
        </Box>
      )}
    </Box>
  );
}
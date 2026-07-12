import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Plus, Search, ChevronDown } from "lucide-react";
import DataTable from "../../layouts/Data Tables/dataTable";
import StatusChip from "../../layouts/Data Tables/statusChip";

const FILTERS = ["Category", "Status", "Department"];

const ASSET_COLUMNS = [
  { key: "tag", header: "Tag" },
  { key: "name", header: "Name" },
  { key: "category", header: "Category" },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusChip status={row.status} />,
  },
  { key: "location", header: "Location" },
];

const MOCK_ASSETS = [
  {
    id: 1,
    tag: "AF-0012",
    name: "Dell Laptop",
    category: "Electronics",
    status: "Allocated",
    location: "Bengaluru",
  },
  {
    id: 2,
    tag: "AF-0062",
    name: "Projector",
    category: "Electronics",
    status: "Maintenance",
    location: "HQ Floor 2",
  },
  {
    id: 3,
    tag: "AF-0201",
    name: "Office Chair",
    category: "Furniture",
    status: "Available",
    location: "Warehouse",
  },
  {
    id: 4,
    tag: "AF-0045",
    name: "MacBook Pro",
    category: "Electronics",
    status: "Allocated",
    location: "Engineering",
  },
  {
    id: 5,
    tag: "AF-0091",
    name: "Standing Desk",
    category: "Furniture",
    status: "Available",
    location: "HQ Floor 1",
  },
];

const pillSx = {
  textTransform: "none",
  fontWeight: 600,
  fontSize: 13,
  borderRadius: "12px",
  px: 2,
  py: 1,
  color: "#a490a2",
  backgroundColor: "rgba(172,123,165,0.06)",
  border: "1px solid rgba(125,101,120,0.25)",
  "&:hover": {
    backgroundColor: "rgba(172,123,165,0.12)",
  },
};

export default function AssetsPage() {
  const [search, setSearch] = useState("");

  const filteredAssets = MOCK_ASSETS.filter((asset) =>
    [asset.tag, asset.name, asset.category, asset.location, asset.status]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Box sx={{ color: "#d9c7d5" }}>
      <Typography
        sx={{
          color: "#f2eef0",
          fontSize: 24,
          fontWeight: 600,
          mb: 0.5,
        }}
      >
        Asset Registration & Directory
      </Typography>

      <Typography
        sx={{
          color: "#a490a2",
          fontSize: 13,
          mb: 3,
        }}
      >
        Register assets and search/track them centrally
      </Typography>

      <Box sx={{ display: "flex", gap: 1.25, mb: 1.5 }}>
        <TextField
          fullWidth
          placeholder="Search by tag, serial, or QR code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={16} color="#a490a2" />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 52,
              borderRadius: "14px",
              backgroundColor: "#211925",

              "& fieldset": {
                borderColor: "rgba(172,123,165,0.22)",
              },

              "&:hover fieldset": {
                borderColor: "rgba(172,123,165,0.45)",
              },

              "&.Mui-focused fieldset": {
                borderColor: "#ac7ba5",
                borderWidth: "1.5px",
              },
            },

            "& input": {
              color: "#f2eef0",
              fontSize: 14,
            },

            "& input::placeholder": {
              color: "#8f7a8d",
              opacity: 1,
            },
          }}
        />

        <Button
          startIcon={<Plus size={15} />}
          disableRipple
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: 13.5,
            borderRadius: "12px",
            px: 2.5,
            whiteSpace: "nowrap",
            color: "#110d11",
            background:
              "linear-gradient(135deg,#d9c7d5,#ac7ba5)",
            boxShadow:
              "0 4px 20px -4px rgba(172,123,165,0.5)",
            "&:hover": {
              background:
                "linear-gradient(135deg,#e2d3df,#b489ac)",
            },
          }}
        >
          Register Asset
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
        {FILTERS.map((filter) => (
          <Button
            key={filter}
            endIcon={<ChevronDown size={14} />}
            disableRipple
            sx={pillSx}
          >
            {filter}
          </Button>
        ))}
      </Box>

      <DataTable
        data={filteredAssets}
        columns={ASSET_COLUMNS}
        emptyMessage="No assets found"
      />
    </Box>
  );
}
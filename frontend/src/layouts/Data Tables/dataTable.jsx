import DataTablePagination from "./dataTablePagination";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const COLORS = {
  paperBg: "#1c151b",
  border: "rgba(125,101,120,0.2)",
  headText: "#a490a2",
  bodyText: "#d9c7d5",
  overlayBg: "rgba(28,21,27,0.72)",
};

const DataTable = ({
  data,
  columns,
  loading = false,
  fetching = false,
  emptyMessage = "No data found",
  pagination,
  onPageChange,
  onPageSizeChange,
  onRowClick,
}) => {
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: "#ac7ba5" }} />
      </Box>
    );
  }
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "18px",
        border: `1px solid ${COLORS.border}`,
        overflow: "hidden",
        backgroundColor: COLORS.paperBg,
      }}
    >
      <Box sx={{ position: "relative" }}>
        {fetching && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              backgroundColor: COLORS.overlayBg,
              backdropFilter: "blur(2px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress size={32} sx={{ color: "#ac7ba5" }} />
          </Box>
        )}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    align={column.align || "left"}
                    sx={{
                      fontWeight: 700,
                      width: column.width,
                      whiteSpace: "nowrap",
                      color: COLORS.headText,
                      borderBottom: `1px solid ${COLORS.border}`,
                      backgroundColor: "rgba(172,123,165,0.04)",
                    }}
                  >
                    {column.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    align="center"
                    sx={{ py: 10, borderBottom: "none" }}
                  >
                    <Typography sx={{ color: COLORS.headText }}>{emptyMessage}</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, index) => (
                  <TableRow
                    key={index}
                    hover
                    onClick={() => onRowClick?.(row)}
                    sx={{
                      cursor: onRowClick ? "pointer" : "default",
                      "&:hover": { backgroundColor: "rgba(172,123,165,0.06)" },
                    }}
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.key}
                        align={column.align || "left"}
                        sx={{
                          color: COLORS.bodyText,
                          borderBottom: `1px solid ${COLORS.border}`,
                        }}
                      >
                        {column.render ? column.render(row) : row[column.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {pagination && (
        <DataTablePagination
          page={pagination.page}
          pageSize={pagination.pageSize}
          total={pagination.total}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </Paper>
  );
};

export default DataTable;
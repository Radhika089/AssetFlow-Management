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
} from "@mui/material"

const DataTable = ({
    data,
    columns,
    loading=false,
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
        <CircularProgress />
      </Box>
    );
  }
  return(
    <Paper
        elevation={0}
        sx={{
          borderRadius: "18px",
          border: `1px solid ${theme.palette.divider}`,
          overflow: "hidden",
          backgroundColor: theme.palette.background.paper,
        }}
    >
        <Box sx={{ position: "relative" }}>
        {fetching && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              backgroundColor: alpha(theme.palette.background.paper, 0.72),
              backdropFilter: "blur(2px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress size={32} />
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
                    sx={{ py: 10 }}
                  >
                    <Typography variant="body1">
                      {emptyMessage}
                    </Typography>
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
                    }}
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.key}
                        align={column.align || "left"}
                      >
                        {column.render
                          ? column.render(row)
                          : row[column.key]}
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
  )
}
export default DataTable;
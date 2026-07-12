import { 
    Box,
    Typography,
    Button,
    FormControl,
    MenuItem,
    Pagination,
    Select
} from "@mui/material";

const DataTablePagination = ({
    page,
    pageSize,
    total,
    totalPages,
    onPageChange,
    onPageSizeChange,
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
                mt: 3,
                px: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flexWrap: "wrap",
                }}
            >
                <Typography variant="body2">
                    Showing <strong>{(page - 1) * pageSize + 1}</strong> -
                    <strong>{Math.min(page * pageSize, total)}</strong> of{" "}
                    <strong>{total}</strong>
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <Typography variant="body2">Rows per page:</Typography>
                    <FormControl size="small">
                        <Select
                            value={pageSize}
                            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
                            sx={{
                                minWidth: 80,
                                borderRadius: "10px",
                            }}
                        >
                          <MenuItem value={10}>10</MenuItem>
                          <MenuItem value={25}>25</MenuItem>
                          <MenuItem value={50}>50</MenuItem>
                          <MenuItem value={100}>100</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
            >
                <Button
                    variant="outlined"
                    disabled={page === 1}
                    onClick={() => onPageChange?.(page - 1)}
                    sx={{
                      textTransform: "none",
                      borderRadius: "10px",
                    }}
                >
                    Previous
                </Button>

                <Pagination
                    page={page}
                    count={totalPages}
                    onChange={(_, newPage) => onPageChange?.(newPage)}
                    shape="rounded"
                    hidePrevButton
                    hideNextButton
                    siblingCount={1}
                    boundaryCount={1}
                    sx={{
                        "& .MuiPaginationItem-root": {
                            borderRadius: "10px",
                            fontWeight: 600,
                        },
                    }}
                />
                <Button
                  variant="outlined"
                  disabled={page === totalPages}
                  onClick={() => onPageChange?.(page + 1)}
                  sx={{
                    textTransform: "none",
                    borderRadius: "10px",
                  }}
                >
                  Next
                </Button>
            </Box>
        </Box>
    );
}

export default DataTablePagination;
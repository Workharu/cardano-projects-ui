import { Box, Pagination } from '@mui/material';

interface ListPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ListPagination({ currentPage, totalPages, onPageChange }: ListPaginationProps) {
  if (totalPages <= 1) return null;

  const handleChange = (_: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <Box display="flex" justifyContent="center" mt={4} p={3} borderRadius={2} bgcolor="background.paper" boxShadow={1}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
        sx={{ '& .MuiPaginationItem-root': { borderRadius: 1, fontWeight: 600 } }}
      />
    </Box>
  );
}

import { useState } from 'react';

/** MUI **/
import Grid from '@mui/material/Grid2';
import { Typography, Box, Button, Menu, MenuItem, Pagination, Stack } from '@mui/material';
import { ArrowDown, ArrowUp } from 'iconsax-react';

/** Components **/
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import ListIdeasCard from 'components/cards/ideas/ListIdeasCard';

/** Configuration **/
import { APP_DEFAULT_PATH, GRID_COMMON_SPACING } from 'config';

/** Skeleton **/
import SkeletonListIdeasCard from 'components/skeletons/SkeletonListIdeasCard';

/** APIs **/
import { useIdeasData } from 'api/ideas';

export default function ListIdeasPage() {
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<'id' | 'title' | 'created_at'>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { ideasData, isLoading, error, totalIdeas, total_pages, mutate } = useIdeasData({
    page,
    limit: 10,
    order_by: sortField,
    order_dir: sortDirection
  });

  const handleSortMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => setAnchorEl(null);

  const handleSortChange = (field: typeof sortField) => {
    setSortField(field);
    setSortDirection((prev) => (sortField === field ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'));
    setPage(1);
    handleSortMenuClose();
  };

  const breadcrumbLinks = [{ title: 'Home', to: APP_DEFAULT_PATH }, { title: 'Ideas' }];

  if (isLoading || (!ideasData && !error)) {
    return (
      <>
        <Breadcrumbs custom heading="Ideas" links={breadcrumbLinks} />
        <Grid container spacing={GRID_COMMON_SPACING}>
          {[...Array(2)].map((_, idx) => (
            <Grid key={idx} size={{ xs: 12 }}>
              <SkeletonListIdeasCard />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Breadcrumbs custom heading="Ideas" links={breadcrumbLinks} />
        <Box textAlign="center" mt={4}>
          <Typography color="error" variant="h6" gutterBottom>
            Failed to load ideas.
          </Typography>
          <Typography variant="body2" gutterBottom>
            {error?.message || 'Something went wrong. Please try again later.'}
          </Typography>
          <Button variant="contained" onClick={() => mutate()}>
            Retry
          </Button>
        </Box>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs custom heading="Ideas" links={breadcrumbLinks} />

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle1">
          Total Ideas: <strong>{totalIdeas}</strong>
        </Typography>

        <Box>
          <Button variant="outlined" onClick={handleSortMenuClick} endIcon={sortDirection === 'asc' ? <ArrowUp /> : <ArrowDown />}>
            Sort by: {sortField.replace('_', ' ')}
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleSortMenuClose}>
            {['id', 'title', 'created_at'].map((field) => (
              <MenuItem key={field} onClick={() => handleSortChange(field as typeof sortField)}>
                {field.replace('_', ' ').toUpperCase()} {sortField === field && (sortDirection === 'asc' ? '↑' : '↓')}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>

      <Grid container spacing={GRID_COMMON_SPACING}>
        <Grid size={{ xs: 12 }}>
          <Stack spacing={GRID_COMMON_SPACING}>
            {ideasData.length > 0 ? (
              ideasData.map((idea) => <ListIdeasCard key={idea.id} idea={idea} />)
            ) : (
              <Typography>No ideas found.</Typography>
            )}
          </Stack>
        </Grid>
      </Grid>

      {total_pages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination count={total_pages} page={page} onChange={(_, newPage) => setPage(newPage)} color="primary" />
        </Box>
      )}
    </>
  );
}

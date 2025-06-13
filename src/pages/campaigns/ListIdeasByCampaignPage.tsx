import { useState } from 'react';
import { useParams } from 'react-router-dom';

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
import { useCampaignIdeas } from 'api/campaign';

export default function ListIdeasByCampaignPage() {
  const { campaignId } = useParams();
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<'id' | 'title' | 'created_at'>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { fundData, campaignsData, ideasData, isLoading, totalIdeas, total_pages } = useCampaignIdeas({
    campaignId,
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

  const breadcrumbLinks =
    fundData && campaignsData
      ? [
          { title: 'Home', to: APP_DEFAULT_PATH },
          { title: 'Funds', to: '/funds' },
          { title: fundData.name, to: `/funds/${fundData.id}` },
          { title: campaignsData.name, to: `/campaigns/${campaignsData.id}` },
          { title: 'Ideas' }
        ]
      : [];

  if (isLoading || !fundData || !campaignsData) {
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
              <Typography>No ideas found for this campaign.</Typography>
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

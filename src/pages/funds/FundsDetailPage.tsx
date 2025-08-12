import { useState } from 'react';
import { useParams } from 'react-router';

/** Icons **/
import { ArrowDown, ArrowUp } from 'iconsax-react';

/** MUI **/
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

/** Components **/
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import ListCamaignsPerFundCard from 'components/cards/funds/ListCamaignsPerFundCard';

/** Skeletons **/
import SkeletonMetricsCard from 'components/skeletons/SkeletonMetricsCard';

/** Config ***/
import { APP_DEFAULT_PATH, GRID_COMMON_SPACING } from 'config';

/** APIs **/
import { useCampaignsPerFundData } from 'api/funds';

export default function FundsDetailPage() {
  const { fundId } = useParams();

  // State for sorting
  const [sortField, setSortField] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Fetching campaigns data for the specific fund
  const { fundData, campaignsData, isLoading, totalCampaigns, totalProjects } = useCampaignsPerFundData(fundId, sortField, sortDirection);

  // Breadcrumbs configuration
  const breadcrumbLinks = [
    { title: 'Home', to: APP_DEFAULT_PATH },
    { title: 'Funds', to: '/funds' },
    { title: `${fundData?.name || 'Fund Details'}` }
  ];

  const handleSortMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (field: string) => {
    if (sortField === field) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    handleSortMenuClose();
  };

  if (isLoading) {
    return (
      <>
        <Breadcrumbs custom heading={fundData?.name} links={breadcrumbLinks} />

        <Grid container spacing={GRID_COMMON_SPACING}>
          {[...Array(3)].map((_, idx) => (
            <Grid key={idx} size={{ xs: 12, sm: 8, md: 4 }}>
              <SkeletonMetricsCard />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs custom heading={fundData?.name} links={breadcrumbLinks} />

      {/* Header with total count and sort controls */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}
      >
        <Typography variant="subtitle1">
          Total Campaigns: <strong>{totalCampaigns}</strong>
          <br />
          Total Projects: <strong>{totalProjects}</strong>
        </Typography>

        <div>
          <Button variant="outlined" onClick={handleSortMenuClick} endIcon={sortDirection === 'asc' ? <ArrowUp /> : <ArrowDown />}>
            Sort by: {sortField.replace('_', ' ')}
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleSortMenuClose}>
            <MenuItem onClick={() => handleSortChange('id')}>Id {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}</MenuItem>
            <MenuItem onClick={() => handleSortChange('name')}>
              Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
            </MenuItem>
          </Menu>
        </div>
      </Box>

      {/* Individual Fund Cards */}
      <Grid container spacing={GRID_COMMON_SPACING}>
        {campaignsData.map((data, index) => (
          <Grid key={index} size={{ xs: 12, sm: 8, md: 4 }}>
            <ListCamaignsPerFundCard name={data.name} total={data.total} link={data.link} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

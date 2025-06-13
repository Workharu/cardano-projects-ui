/** MUI **/
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useState } from 'react';
import { ArrowDown, ArrowUp } from 'iconsax-react';

/** Components **/
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import ListFundsCard from 'components/cards/funds/ListFundsCard';

import SkeletonListFundsCard from 'components/skeletons/SkeletonListFundsCard';

import { APP_DEFAULT_PATH, GRID_COMMON_SPACING } from 'config';
import { useFundsData } from 'api/funds';

// ==============================|| FUNDS LIST PAGE ||============================== //

export default function ListFundsPage() {
  const breadcrumbLinks = [{ title: 'Home', to: APP_DEFAULT_PATH }, { title: 'Funds' }];

  // State for sorting
  const [sortField, setSortField] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { fundsData, homeLoading, totalFunds, totalIdeas } = useFundsData(sortField, sortDirection);

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

  if (homeLoading) {
    return (
      <>
        <Breadcrumbs custom heading="Funds" links={breadcrumbLinks} />

        <Grid container spacing={GRID_COMMON_SPACING}>
          {[...Array(3)].map((_, idx) => (
            <Grid key={idx} size={{ xs: 12, sm: 8, md: 4 }}>
              <SkeletonListFundsCard />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs custom heading="Funds" links={breadcrumbLinks} />

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
          Total Funds: <strong>{totalFunds}</strong>
          <br />
          Total Ideas: <strong>{totalIdeas}</strong>
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
        {fundsData.map((data, index) => (
          <Grid key={index} size={{ xs: 12, sm: 8, md: 4 }}>
            <ListFundsCard name={data.name} updated_at={data.updated_at} total={data.total} link={data.link} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

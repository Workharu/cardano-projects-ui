import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/** MUI **/
import {
  Grid,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  Chip,
  InputAdornment,
  TextField,
  CircularProgress
} from '@mui/material';
import { ArrowDown, ArrowUp, SearchNormal1, Filter, Sort } from 'iconsax-react';

/** Components **/
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import ListProjectsCard from 'components/cards/projects/ListProjectsCard';

/** Configuration **/
import { APP_DEFAULT_PATH, GRID_COMMON_SPACING } from 'config';

/** Skeleton **/
import SkeletonListProjectsCard from 'components/skeletons/SkeletonListProjectsCard';

/** APIs **/
import { useProjectsData } from 'api/projects';

// Sort options with display labels
const SORT_OPTIONS = [
  { value: 'id', label: 'ID' },
  { value: 'title', label: 'Title' },
  { value: 'created_at', label: 'Date Created' },
  { value: 'updated_at', label: 'Last Updated' },
  { value: 'requested_fund', label: 'Funding Amount' }
];

// Status filter options
const STATUS_FILTERS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'Active', label: 'Active' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Pending', label: 'Pending' }
];

type SortField = 'id' | 'title' | 'created_at' | 'updated_at' | 'requested_fund';
type SortDir = 'asc' | 'desc';

export default function ListProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Helpers to read params with fallbacks
  const getNumber = (key: string, def: number) => {
    const v = Number(searchParams.get(key));
    return Number.isFinite(v) && v > 0 ? v : def;
  };
  const getString = (key: string, def: string) => searchParams.get(key) ?? def;

  const page = getNumber('page', 1);
  const limit = getNumber('limit', 10);
  const order_by = (getString('order_by', 'id') as SortField) ?? 'id';
  const order_dir = (getString('order_dir', 'desc') as SortDir) ?? 'desc';
  const search = getString('search', '');
  const status = getString('status', 'all');

  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);

  // Local UI state
  const [searchQuery, setSearchQuery] = useState(search);
  const [statusFilter, setStatusFilter] = useState(status);
  const [sortField, setSortField] = useState<SortField>(order_by);
  const [sortDirection, setSortDirection] = useState<SortDir>(order_dir);

  const updateQuery = useCallback(
    (patch: Record<string, any>, replace = true) => {
      const next = new URLSearchParams(searchParams);

      let resetPage = false;
      const fieldsThatResetPage = ['search', 'status', 'order_by', 'order_dir'];

      for (const [k, v] of Object.entries(patch)) {
        if (fieldsThatResetPage.includes(k)) {
          const current = next.get(k);
          if (String(v ?? '') !== (current ?? '')) {
            resetPage = true;
          }
        }

        if (v === undefined || v === '' || v === 'all') {
          next.delete(k);
        } else {
          next.set(k, String(v));
        }
      }

      if (resetPage) {
        next.set('page', '1');
      }

      setSearchParams(next, { replace });
    },
    [searchParams, setSearchParams]
  );

  // Debounced query sync
  useEffect(() => {
    const t = setTimeout(() => {
      updateQuery({
        search: searchQuery,
        status: statusFilter,
        order_by: sortField,
        order_dir: sortDirection
      });
    }, 500);

    return () => clearTimeout(t);
  }, [searchQuery, statusFilter, sortField, sortDirection, updateQuery]);

  const { projectsData, isLoading, error, totalProjects, total_pages, mutate } = useProjectsData({
    page,
    limit,
    order_by: sortField,
    order_dir: sortDirection,
    search: searchQuery || undefined,
    status: statusFilter === 'all' ? undefined : statusFilter
  });

  // Handlers for sort menu
  const handleSortMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget);
  };
  const handleSortMenuClose = () => setSortAnchorEl(null);
  const handleSortChange = (field: SortField) => {
    setSortField(field);
    setSortDirection((prev) => (sortField === field ? (prev === 'asc' ? 'desc' : 'asc') : 'desc'));
    handleSortMenuClose();
  };

  // Handlers for filter menu
  const handleFilterMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };
  const handleFilterMenuClose = () => setFilterAnchorEl(null);
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    handleFilterMenuClose();
  };

  // Search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Pagination
  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    updateQuery({ page: newPage }, true);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setSortField('id');
    setSortDirection('desc');
  };

  const breadcrumbLinks = [{ title: 'Home', to: APP_DEFAULT_PATH }, { title: 'Projects' }];

  if (isLoading || (!projectsData && !error)) {
    return (
      <>
        <Breadcrumbs custom heading="Projects" links={breadcrumbLinks} />
        <Grid container spacing={GRID_COMMON_SPACING}>
          {[...Array(4)].map((_, idx) => (
            <Grid key={idx} item xs={12}>
              <SkeletonListProjectsCard />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Breadcrumbs custom heading="Projects" links={breadcrumbLinks} />
        <Box
          textAlign="center"
          mt={4}
          sx={{
            p: 4,
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: 1
          }}
        >
          <Typography color="error" variant="h6" gutterBottom>
            Failed to load projects
          </Typography>
          <Typography variant="body2" gutterBottom mb={3}>
            {error?.message || 'Something went wrong. Please try again later.'}
          </Typography>
          <Button variant="contained" onClick={() => mutate()} startIcon={<CircularProgress size={20} color="inherit" />}>
            Retry
          </Button>
        </Box>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs custom heading="Projects" links={breadcrumbLinks} />

      {/* Search and Filter Bar */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          mb: 3,
          p: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: 1
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchNormal1 size="20px" />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 2,
              width: { xs: '100%', sm: 300 }
            }
          }}
        />

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={handleFilterMenuClick} startIcon={<Filter size="20px" />} sx={{ minWidth: 150 }}>
            {statusFilter === 'all' ? 'Filter' : `Status: ${statusFilter}`}
          </Button>
          <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={handleFilterMenuClose}>
            {STATUS_FILTERS.map((filter) => (
              <MenuItem key={filter.value} onClick={() => handleStatusFilterChange(filter.value)} selected={statusFilter === filter.value}>
                {filter.label}
              </MenuItem>
            ))}
          </Menu>

          <Button
            variant="outlined"
            onClick={handleSortMenuClick}
            startIcon={<Sort size="20px" />}
            endIcon={sortDirection === 'asc' ? <ArrowUp size="18px" /> : <ArrowDown size="18px" />}
            sx={{ minWidth: 180 }}
          >
            {SORT_OPTIONS.find((opt) => opt.value === sortField)?.label}
          </Button>
          <Menu anchorEl={sortAnchorEl} open={Boolean(sortAnchorEl)} onClose={handleSortMenuClose}>
            {SORT_OPTIONS.map((option) => (
              <MenuItem
                key={option.value}
                onClick={() => handleSortChange(option.value as SortField)}
                selected={sortField === option.value}
              >
                {option.label} {sortField === option.value && (sortDirection === 'asc' ? '↑' : '↓')}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </Box>

      {/* Results Summary */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="subtitle1" color="text.secondary">
          Showing <strong>{projectsData.length}</strong> of <strong>{totalProjects}</strong> projects
        </Typography>
        <Chip
          label={`Sorted by: ${SORT_OPTIONS.find((opt) => opt.value === sortField)?.label} ${sortDirection === 'asc' ? '↑' : '↓'}`}
          color="primary"
          variant="outlined"
        />
      </Box>

      {/* Projects List */}
      <Grid container spacing={GRID_COMMON_SPACING}>
        <Grid item xs={12}>
          <Stack spacing={GRID_COMMON_SPACING}>
            {projectsData.length > 0 ? (
              projectsData.map((project) => (
                <ListProjectsCard key={project.id} project={project} fund={project.fund} campaign={project.campaign} />
              ))
            ) : (
              <Box textAlign="center" p={4} borderRadius={2} bgcolor="background.paper" boxShadow={1}>
                <Typography variant="h6" gutterBottom>
                  No projects found
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {searchQuery ? 'Try adjusting your search query' : 'There are currently no projects matching your filters'}
                </Typography>
                <Button variant="outlined" onClick={handleClearFilters}>
                  Clear filters
                </Button>
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>

      {/* Pagination */}
      {total_pages > 1 && (
        <Box display="flex" justifyContent="center" mt={4} p={3} borderRadius={2} bgcolor="background.paper" boxShadow={1}>
          <Pagination
            count={total_pages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: 1,
                fontWeight: 600
              }
            }}
          />
        </Box>
      )}
    </>
  );
}

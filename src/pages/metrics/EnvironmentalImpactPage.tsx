/** MUI **/
import { Grid, Stack, Box, Typography, Button, CircularProgress } from '@mui/material';

/** Components **/
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import ListProjectsCard from 'components/cards/projects/ListProjectsCard';

/** Skeletons **/
import SkeletonListProjectsCard from 'components/skeletons/SkeletonListProjectsCard';

/** Page Components **/
import ListControls from 'components/shared/ListControls';
import ResultsSummary from 'components/shared/ResultsSummary';
import ListPagination from 'components/shared/ListPagination';

/** Hooks **/
import { useListFilters } from 'hooks/useListFilters';
import { FundingStatus } from 'api/projects';
import { useEnvironmentalImpactMetrics } from 'api/metrics';
import { useFundsData } from 'api/funds';

/** Config **/
import { APP_DEFAULT_PATH, GRID_COMMON_SPACING } from 'config';

/** Constants **/
const SORT_OPTIONS = [
  { value: 'id', label: 'ID' },
  { value: 'title', label: 'Title' }
];

const FUNDING_STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'Funded', label: 'Funded' },
  { value: 'NotFunded', label: 'Not Funded' }
];

// ==============================|| ENVIRONMENTAL IMPACT PAGE ||============================== //

export default function EnvironmentalImpactPage() {
  const filters = useListFilters({
    defaultSort: 'id',
    defaultSortDir: 'desc',
    sortOptions: SORT_OPTIONS,
    statusOptions: FUNDING_STATUS_OPTIONS
  });

  const { fundsData, fundsLoading } = useFundsData();

  const { projectsData, isLoading, error, totalProjects, total_pages, mutate } = useEnvironmentalImpactMetrics({
    page: filters.page,
    limit: filters.limit,
    order_by: filters.order_by,
    order_dir: filters.order_dir,
    search: filters.search || undefined,
    funding_status: filters.status !== 'all' ? (filters.status as FundingStatus) : undefined,
    fund_ids: filters.ids.length > 0 ? filters.ids : undefined
  });

  const breadcrumbLinks = [{ title: 'Home', to: APP_DEFAULT_PATH }, { title: 'Projects' }];

  // Get selected fund names for display
  const selectedFundNames = fundsData.filter((fund) => filters.ids.includes(fund.id)).map((fund) => fund.name);

  const handleSearch = (value: string) => {
    filters.updateQuery({ search: value });
  };

  const handleSortChange = (field: string, direction: 'asc' | 'desc') => {
    filters.updateQuery({ order_by: field, order_dir: direction });
  };

  const handleApplyFilters = () => {
    filters.updateQuery({
      status: filters.tempFilters.status,
      ids: filters.tempFilters.ids
    });
  };

  const handleClearFilters = () => {
    const newFilters = {
      search: '',
      order_by: 'id',
      order_dir: 'desc',
      status: 'all',
      ids: []
    };

    filters.setTempFilters({ status: 'all', ids: [] });
    filters.updateQuery(newFilters);
  };

  // Loading state
  if (isLoading || (!projectsData && !error)) {
    return (
      <>
        <Breadcrumbs custom heading="Environmental Impact Projects" links={breadcrumbLinks} />
        <Grid container spacing={GRID_COMMON_SPACING}>
          {[...Array(2)].map((_, idx) => (
            <Grid key={idx} size={{ xs: 12 }}>
              <SkeletonListProjectsCard />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Breadcrumbs custom heading="Environmental Impact Projects" links={breadcrumbLinks} />
        <Box textAlign="center" mt={4} sx={{ p: 4, borderRadius: 2, bgcolor: 'background.paper', boxShadow: 1 }}>
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
      <Breadcrumbs custom heading="Environmental Impact Projects" links={breadcrumbLinks} />

      <ListControls
        searchValue={filters.search}
        onSearch={handleSearch}
        onSearchClear={() => filters.updateQuery({ search: '' })}
        searchPlaceholder="Search projects..."
        sortOptions={SORT_OPTIONS}
        currentSort={filters.order_by}
        currentSortDir={filters.order_dir}
        onSortChange={handleSortChange}
        filterProps={{
          activeFiltersCount: filters.activeFiltersCount,
          hasUnappliedChanges: filters.hasUnappliedChanges,
          statusOptions: FUNDING_STATUS_OPTIONS,
          selectedStatus: filters.tempFilters.status,
          onStatusChange: (status) => filters.setTempFilters((prev) => ({ ...prev, status })),
          itemsLabel: 'Funds',
          items: fundsData,
          itemsLoading: fundsLoading,
          selectedItemIds: filters.tempFilters.ids,
          onItemChange: (id, checked) =>
            filters.setTempFilters((prev) => ({
              ...prev,
              ids: checked ? [...prev.ids, id] : prev.ids.filter((i) => i !== id)
            })),
          onApply: handleApplyFilters,
          onReset: filters.resetTempFilters,
          onClearAll: handleClearFilters
        }}
      />

      <ResultsSummary
        itemsShown={projectsData.length}
        totalItems={totalProjects}
        itemType="projects"
        searchTerm={filters.search || undefined}
        sortChip={{
          key: 'sort',
          label: `Sorted by: ${SORT_OPTIONS.find((opt) => opt.value === filters.order_by)?.label} ${filters.order_dir === 'asc' ? '↑' : '↓'}`,
          color: 'primary'
        }}
        filterChips={[
          ...(filters.status !== 'all'
            ? [
                {
                  key: 'status',
                  label: `Status: ${FUNDING_STATUS_OPTIONS.find((opt) => opt.value === filters.status)?.label}`,
                  color: 'secondary' as const,
                  onDelete: () => filters.updateQuery({ status: 'all' })
                }
              ]
            : []),
          ...(filters.ids.length > 0
            ? [
                {
                  key: 'funds',
                  label: `${filters.ids.length > 1 ? 'Funds' : 'Fund'}: ${selectedFundNames.join(', ')}`,
                  color: 'info' as const,
                  onDelete: () => filters.updateQuery({ ids: [] })
                }
              ]
            : [])
        ]}
      />

      <Grid container spacing={GRID_COMMON_SPACING}>
        <Grid size={{ xs: 12 }}>
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
                  {filters.search || filters.status !== 'all' || filters.ids.length > 0
                    ? `No results found with current filters`
                    : 'There are currently no projects'}
                </Typography>
                <Button variant="outlined" onClick={handleClearFilters}>
                  Clear filters
                </Button>
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>

      <ListPagination currentPage={filters.page} totalPages={total_pages} onPageChange={(page) => filters.updateQuery({ page })} />
    </>
  );
}

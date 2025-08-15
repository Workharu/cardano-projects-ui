/** MUI **/
import Grid from '@mui/material/Grid';
import { Box, Divider, Typography } from '@mui/material';

/** Icons **/
import { Award, Tree, Activity, Chart1, People } from 'iconsax-react';

/** Components **/
import MetricsCard from 'components/cards/home/MetricsCard';
import SkeletonMetricsCard from 'components/skeletons/SkeletonMetricsCard';
import MetricsSection from 'components/cards/home/MetricsSection';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

/** Configuration **/
import { APP_DEFAULT_PATH, GRID_COMMON_SPACING } from 'config';

/** APIs **/
import { useDashboardData } from 'api/dashboard';
import {
  useUniquenessMetrics,
  useSocialImpactMetrics,
  useEnvironmentalImpactMetrics,
  useSdgMetrics
  // useActivityMetrics,
} from 'api/metrics';

// ==============================|| HOME PAGE ||============================== //

export default function HomePage() {
  const breadcrumbLinks = [{ title: 'Home', to: APP_DEFAULT_PATH }, { title: 'Overview' }];

  // Dashboard summary data
  const { dashboardData, dashboardLoading } = useDashboardData();

  // Metrics data
  const {
    projectsData: uniquenessProjects,
    isLoading: uniquenessLoading,
    error: uniquenessError,
    totalProjects: uniquenessTotal
  } = useUniquenessMetrics();

  const {
    projectsData: socialImpactProjects,
    isLoading: socialLoading,
    error: socialError,
    totalProjects: socialTotal
  } = useSocialImpactMetrics();

  const {
    projectsData: environmentalImpactProjects,
    isLoading: environmentalImpactLoading,
    error: environmentalImpactError,
    totalProjects: environmentalImpactTotal
  } = useEnvironmentalImpactMetrics();

  const { projectsData: sdgProjects, isLoading: sdgLoading, error: sdgError, totalProjects: sdgTotal } = useSdgMetrics();

  // const {
  //   projectsData: activityProjects,
  //   isLoading: activityLoading,
  //   error: activityError,
  //   totalProjects: activityTotal
  // } = useActivityMetrics();

  return (
    <>
      <Breadcrumbs custom heading="Overview" links={breadcrumbLinks} />

      {/* Summary Cards */}
      <Grid container spacing={GRID_COMMON_SPACING} mb={4}>
        {dashboardLoading ? (
          [...Array(3)].map((_, idx) => (
            <Grid key={idx} size={{ xs: 12, sm: 8, md: 4 }}>
              <SkeletonMetricsCard />
            </Grid>
          ))
        ) : (
          <>
            {/* First: "Total Projects" card */}
            {dashboardData
              .filter((card) => card.title === 'Total Projects' || card.title === 'Total Funds' || card.title === 'Total Campaigns')
              .map((card, index) => (
                <Grid key={`total-${index}`} size={{ xs: 12, sm: 8, md: 4 }}>
                  <MetricsCard
                    primary={card.title}
                    secondary={card.value}
                    content={card.date}
                    iconPrimary={card.iconPrimary}
                    color={card.color}
                    bgcolor={card.bgcolor}
                    link={card.link}
                    avatarSize="lg"
                    circular
                  />
                </Grid>
              ))}

            {/* Divider */}
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography variant="h2" sx={{ fontWeight: 700 }}>
                Metrics
              </Typography>
            </Grid>
            {/* Other cards */}
            {dashboardData
              .filter((card) => card.title !== 'Total Projects' && card.title !== 'Total Funds' && card.title !== 'Total Campaigns')
              .map((card, index) => (
                <Grid key={`other-${index}`} size={{ xs: 12, sm: 8, md: 4 }}>
                  <MetricsCard
                    primary={card.title}
                    secondary={card.value}
                    content={card.date}
                    iconPrimary={card.iconPrimary}
                    color={card.color}
                    bgcolor={card.bgcolor}
                    link={card.link}
                    avatarSize="lg"
                    circular
                  />
                </Grid>
              ))}
          </>
        )}
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Metrics Sections */}
      <Box sx={{ mt: 2 }}>
        {/* Uniqueness Section */}
        <MetricsSection
          title="Top Highly Unique Projects"
          projects={uniquenessProjects}
          isLoading={uniquenessLoading}
          error={uniquenessError}
          metricType="uniqueness"
          totalItems={uniquenessTotal}
          icon={<Award size="24px" style={{ color: '#ff9800' }} />}
        />

        <Divider sx={{ my: 2 }} />

        {/* Social Impact Section */}
        <MetricsSection
          title="Top Social Impact Projects"
          projects={socialImpactProjects}
          isLoading={socialLoading}
          error={socialError}
          metricType="social_impact"
          totalItems={socialTotal}
          icon={<People size="24px" style={{ color: '#2196f3' }} />}
        />

        <Divider sx={{ my: 2 }} />

        {/* Environmental Impact Section */}
        <MetricsSection
          title="Top Environmental Impact Projects"
          projects={environmentalImpactProjects}
          isLoading={environmentalImpactLoading}
          error={environmentalImpactError}
          metricType="environmental_impact"
          totalItems={environmentalImpactTotal}
          icon={<Tree size="24px" style={{ color: '#4caf50' }} />}
        />

        <Divider sx={{ my: 2 }} />

        {/* SDG Section */}
        <MetricsSection
          title="Top Sustainable Development Goals (SDG) Projects"
          projects={sdgProjects}
          isLoading={sdgLoading}
          error={sdgError}
          metricType="sdg"
          totalItems={sdgTotal}
          icon={<Chart1 size="24px" style={{ color: '#9c27b0' }} />}
        />

        {/* <Divider sx={{ my: 2 }} /> */}

        {/* Activity Section */}
        {/* <MetricsSection
          title="Top Active Projects"
          projects={activityProjects}
          isLoading={activityLoading}
          error={activityError}
          metricType="activity"
          totalItems={activityTotal}
          icon={<Activity size="24px" style={{ color: '#ff5722' }} />}
        /> */}
      </Box>
    </>
  );
}

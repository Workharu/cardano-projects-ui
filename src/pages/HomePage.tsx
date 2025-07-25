/** MUI **/
import Grid from '@mui/material/Grid2';
import { Box, Divider } from '@mui/material';

/** Icons **/
import { Award, Tree, DollarCircle, TickCircle } from 'iconsax-react';

/** Components **/
import MetricsCard from 'components/cards/home/MetricsCard';
import SkeletonMetricsCard from 'components/skeletons/SkeletonMetricsCard';
import MetricsSection from 'components/cards/home/MetricsSection';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

/** Configuration **/
import { APP_DEFAULT_PATH, GRID_COMMON_SPACING } from 'config';

/** APIs **/
import { useHomeData } from 'api/home';
import { useUniquenessMetrics, useSocialImpactMetrics } from 'api/metrics';

// ==============================|| HOME PAGE ||============================== //

export default function HomePage() {
  const breadcrumbLinks = [{ title: 'Home', to: APP_DEFAULT_PATH }, { title: 'Overview' }];

  // Home summary data
  const { homeData, homeLoading } = useHomeData();

  // Metrics data
  const { uniquenessProjects, isLoading: uniquenessLoading, error: uniquenessError, totalItems: uniquenessTotal } = useUniquenessMetrics();
  const { socialImpactProjects, isLoading: socialLoading, error: socialError, totalItems: socialTotal } = useSocialImpactMetrics();

  return (
    <>
      <Breadcrumbs custom heading="Overview" links={breadcrumbLinks} />

      {/* Summary Cards */}
      <Grid container spacing={GRID_COMMON_SPACING} mb={4}>
        {homeLoading
          ? [...Array(3)].map((_, idx) => (
              <Grid key={idx} size={{ xs: 12, sm: 8, md: 4 }}>
                <SkeletonMetricsCard />
              </Grid>
            ))
          : homeData.map((card, index) => (
              <Grid key={index} size={{ xs: 12, sm: 8, md: 4 }}>
                <MetricsCard
                  primary={card.title}
                  secondary={card.value}
                  content={card.date}
                  iconPrimary={card.iconPrimary}
                  color={card.color}
                  bgcolor={card.bgcolor}
                  link={card.link}
                  avatarSize="md"
                  circular
                />
              </Grid>
            ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Metrics Sections */}
      <Box sx={{ mt: 4 }}>
        {/* Uniqueness Section */}
        <MetricsSection
          title="Top Uniqueness Projects"
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
          title="Top Social & Environmental Impact Projects"
          projects={socialImpactProjects}
          isLoading={socialLoading}
          error={socialError}
          metricType="social_and_environmental_impact"
          totalItems={socialTotal}
          icon={<Tree size="24px" style={{ color: '#2196f3' }} />}
        />

        {/* <Divider sx={{ my: 2 }} /> */}

        {/* Budget Section */}
        {/* <MetricsSection
          title="Top Budget-Friendly Projects"
          projects={budgetProjects}
          isLoading={budgetLoading}
          error={budgetError}
          metricType="budget"
          totalItems={budgetTotal}
          icon={<DollarCircle size="24px" style={{ color: '#4caf50' }} />}
          /> */}

        {/* <Divider sx={{ my: 2 }} /> */}

        {/* Completeness Section */}
        {/* <MetricsSection
          title="Most Complete Projects"
          projects={completenessProjects}
          isLoading={completenessLoading}
          error={completenessError}
          metricType="completeness"
          totalItems={completenessTotal}
          icon={<TickCircle size="24px" style={{ color: '#f44336' }} />}
          /> */}
      </Box>
    </>
  );
}

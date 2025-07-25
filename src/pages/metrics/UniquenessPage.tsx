/** MUI **/
import { Box } from '@mui/material';

/** Icons **/
import { Award } from 'iconsax-react';

/** Components **/
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import MetricsSection from 'components/cards/home/MetricsSection';

/** Configuration **/
import { APP_DEFAULT_PATH } from 'config';

/** APIs **/
import { useUniquenessMetrics } from 'api/metrics';

// ==============================|| UNIQUENESS PAGE ||============================== //

export default function UniquenessPage() {
  const breadcrumbLinks = [{ title: 'Home', to: APP_DEFAULT_PATH }, { title: 'Uniqueness' }];

  const { uniquenessProjects, isLoading, error, totalItems } = useUniquenessMetrics();

  return (
    <>
      <Breadcrumbs custom heading="Uniqueness Rankings" links={breadcrumbLinks} />

      <Box sx={{ mt: 2 }}>
        <MetricsSection
          title="Top Uniqueness Projects"
          projects={uniquenessProjects}
          isLoading={isLoading}
          error={error}
          metricType="uniqueness"
          totalItems={totalItems}
          icon={<Award size="24px" color="orange" />}
        />
      </Box>
    </>
  );
}

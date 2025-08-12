import { Link, useParams } from 'react-router';

/** MUI **/
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ArrowRight2 } from 'iconsax-react';
import Button from '@mui/material/Button';

/** Components **/
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import SkeletonMetricsCard from 'components/skeletons/SkeletonMetricsCard';
import CampaignCard from 'components/cards/campaigns/CampaignCard';

import { APP_DEFAULT_PATH, GRID_COMMON_SPACING } from 'config';
import { useCampaign } from 'api/campaign';

export default function CampaignDetailPage() {
  const { campaignId } = useParams();

  // Fetching campaigns data for the specific fund
  const { fundData, campaignsData, isLoading, totalProjects } = useCampaign(campaignId);

  let breadcrumbLinks: { title: string; to?: string }[] = [];

  if (fundData && campaignsData) {
    breadcrumbLinks = [
      { title: 'Home', to: APP_DEFAULT_PATH },
      { title: 'Funds', to: '/funds' },
      { title: fundData.name, to: `/funds/${fundData.id}` },
      { title: campaignsData.name }
    ];
  }

  if (isLoading || !fundData || !campaignsData) {
    return (
      <>
        <Breadcrumbs custom heading={campaignsData?.name} links={breadcrumbLinks} />
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
      <Breadcrumbs custom heading={campaignsData.name} links={breadcrumbLinks} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}
      >
        <Typography variant="subtitle1">
          Total Projects: <strong>{totalProjects}</strong>
        </Typography>

        <Button component={Link} to={`/campaigns/${campaignId}/projects`} endIcon={<ArrowRight2 />} variant="contained" color="primary">
          View All Projects
        </Button>
      </Box>

      <CampaignCard campaignsData={campaignsData} />
    </>
  );
}

/** MUI **/
import Grid from '@mui/material/Grid2';

/** Components **/
import MetricsCard from 'components/cards/home/MetricsCard';

import SkeletonMetricsCard from 'components/skeletons/SkeletonMetricsCard';

import { useHomeData } from 'api/home';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

import { APP_DEFAULT_PATH, GRID_COMMON_SPACING } from 'config';

// ==============================|| HOME PAGE ||============================== //

export default function HomePage() {
  const breadcrumbLinks = [{ title: 'Home', to: APP_DEFAULT_PATH }, { title: 'Overview' }];

  const { homeData, homeLoading } = useHomeData();

  if (homeLoading) {
    return (
      <>
        <Breadcrumbs custom heading="Overview" links={breadcrumbLinks} />
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
      <Breadcrumbs custom heading="Overview" links={breadcrumbLinks} />
      <Grid container spacing={GRID_COMMON_SPACING}>
        {homeData.map((card, index) => (
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
    </>
  );
}

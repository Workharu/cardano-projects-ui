import { lazy } from 'react';

/** Components **/
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import PagesLayout from 'layout/Pages';

// pages routing
const ErrorPage = Loadable(lazy(() => import('pages/maintenance/error/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/error/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction/under-construction')));
const MaintenanceUnderConstruction2 = Loadable(lazy(() => import('pages/maintenance/under-construction/under-construction2')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon/coming-soon')));
const MaintenanceComingSoon2 = Loadable(lazy(() => import('pages/maintenance/coming-soon/coming-soon-timer')));

// Home and other pages
const HomePage = Loadable(lazy(() => import('pages/HomePage')));
const ContactUsPage = Loadable(lazy(() => import('pages/ContactUsPage')));

// Funds page
const ListFundsPage = Loadable(lazy(() => import('pages/funds/ListFundsPage')));
const FundsDetailPage = Loadable(lazy(() => import('pages/funds/FundsDetailPage')));

// Campaigns page
const ListCampaignsPage = Loadable(lazy(() => import('pages/campaigns/ListCampaignsPage')));
const CampaignDetailPage = Loadable(lazy(() => import('pages/campaigns/CampaignDetailPage')));
const ListIdeasByCampaignPage = Loadable(lazy(() => import('pages/campaigns/ListIdeasByCampaignPage')));

// Ideas page
const ListIdeasPage = Loadable(lazy(() => import('pages/ideas/ListIdeasPage')));
const IdeaDetailPage = Loadable(lazy(() => import('pages/ideas/IdeaDetailPage')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    // Dashboard routes
    {
      path: '',
      // element: <SimpleLayout layout={SimpleLayoutType.SIMPLE} />,
      element: <DashboardLayout />,
      children: [
        {
          path: '',
          element: <HomePage />
        },

        // Funds routes
        {
          path: 'funds',
          element: <ListFundsPage />
        },
        {
          path: 'funds/:fundId',
          element: <FundsDetailPage />
        },

        // Campaigns routes
        {
          path: 'campaigns',
          element: <ListCampaignsPage />
        },
        {
          path: 'campaigns/:campaignId',
          element: <CampaignDetailPage />
        },
        {
          path: 'campaigns/:campaignId/ideas',
          element: <ListIdeasByCampaignPage />
        },

        // Ideas routes
        {
          path: 'ideas',
          element: <ListIdeasPage />
        },
        {
          path: 'ideas/:ideaId',
          element: <IdeaDetailPage />
        },

        // Contact Us page
        {
          path: 'contact-us',
          element: <ContactUsPage />
        },
        {
          path: '*',
          element: <ErrorPage />
        }
      ]
    },

    // Maintenance pages
    {
      path: '/maintenance',
      element: <PagesLayout />,
      children: [
        {
          path: '404',
          element: <ErrorPage />
        },
        {
          path: '500',
          element: <MaintenanceError500 />
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />
        },
        {
          path: 'under-construction2',
          element: <MaintenanceUnderConstruction2 />
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />
        },
        {
          path: 'coming-soon-2',
          element: <MaintenanceComingSoon2 />
        }
      ]
    }
  ]
};

export default MainRoutes;

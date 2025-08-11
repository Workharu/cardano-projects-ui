import { useParams } from 'react-router';
import DOMPurify from 'dompurify';

/** Icons **/
import { MoneySend, TickCircle } from 'iconsax-react';

/** MUI **/
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';

/** Components **/
import Breadcrumbs from 'components/@extended/Breadcrumbs';

/** Skeletons **/
import SkeletonProjectCard from 'components/skeletons/SkeletonListProjectsCard';

/** Cards **/
import ProjectMetricsCard from 'components/cards/projects/ProjectMetricsCard';
import ProjectTeamCard from 'components/cards/projects/ProjectTeamCard';
import ProjectDetailsCard from 'components/cards/projects/ProjectDetailsCard';
import ProjectLinksCard from 'components/cards/projects/ProjectLinksCard';
import ProjectMilestones from 'components/cards/projects/ProjectMilestones';

/** Configuration **/
import { APP_DEFAULT_PATH, GRID_COMMON_SPACING } from 'config';

/** APIs **/
import { useProjectData } from 'api/projects';

/** MainCard **/
import MainCard from 'components/MainCard';

/** Types **/
import { ProjectData } from 'types/projects';

const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  fontSize: '1.25rem'
}));

const sanitizeHTML = (html: string | null) => {
  if (!html) return { __html: '' };

  return {
    __html: DOMPurify.sanitize(html, {
      ADD_ATTR: ['target', 'allow', 'allowfullscreen', 'style'],
      ADD_TAGS: ['iframe', 'img'],
      FORBID_ATTR: ['onerror', 'onload'],
      FORBID_TAGS: ['script', 'style'],
      ALLOW_DATA_ATTR: false,
      USE_PROFILES: { html: true, svg: true }
    })
  };
};

const extractVideoUrl = (description: string | null): string | null => {
  if (!description) return null;
  const videoRegex = /<a[^>]*class="ql-video"[^>]*href="([^"]*)"[^>]*>/;
  const match = description.match(videoRegex);
  return match ? match[1] : null;
};

export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return 'Not specified';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return 'Not specified';
  }
};

const ProjectHeader = ({
  project,
  fundingData,
  votingData,
  isMobile
}: {
  project: ProjectData;
  fundingData: any;
  votingData: any;
  isMobile: boolean;
}) => (
  <MainCard border={false} sx={{ p: isMobile ? 2 : 3, mb: 3 }}>
    <Stack direction="row" spacing={2} alignItems="center" mb={3}>
      {project.submitters?.[0]?.avatarUrl ? (
        <Avatar src={project.submitters[0].avatarUrl} alt={project.submitters[0].name} sx={{ width: 56, height: 56 }} />
      ) : (
        <Avatar sx={{ width: 56, height: 56 }}>{project.submitters?.[0]?.name?.charAt(0) || 'P'}</Avatar>
      )}
      <Box>
        <Typography variant="h6">{project.submitters?.[0]?.name || 'Anonymous'}</Typography>
        {project.submitters?.[0]?.username && (
          <Typography variant="body2" color="text.secondary">
            @{project.submitters[0].username}
          </Typography>
        )}
      </Box>
    </Stack>

    <Typography
      variant="h4"
      gutterBottom
      sx={{
        fontSize: isMobile ? '1.5rem' : '2.125rem',
        lineHeight: 1.2
      }}
    >
      {project.title}
    </Typography>

    <Stack direction={isMobile ? 'column' : 'row'} spacing={1} sx={{ mb: 3, gap: 1 }} flexWrap="wrap">
      <Chip icon={<TickCircle size="16px" />} label={project.horizon_group || 'Project'} color="primary" variant="outlined" />
      {project.country && (
        <Chip label={`${project.country}${project.continent ? `, ${project.continent}` : ''}`} color="secondary" variant="outlined" />
      )}
      <Chip
        icon={<MoneySend size="16px" />}
        label={fundingData ? `${fundingData?.requested?.amount} ₳` : 'Funding not specified'}
        color="success"
        variant="outlined"
      />
      {votingData && (
        <Chip
          label={`${votingData?.status}`}
          color={votingData?.status == 'Funded' ? 'success' : 'error'}
          variant="outlined"
          sx={{ textTransform: 'capitalize' }}
        />
      )}
      {votingData?.status === 'NotFunded' && votingData?.reason_for_not_funded_status && (
        <Chip label={`${votingData?.reason_for_not_funded_status}`} color="error" variant="outlined" sx={{ textTransform: 'capitalize' }} />
      )}
    </Stack>
  </MainCard>
);

const ProjectDescription = ({ project, isMobile }: { project: ProjectData; isMobile: boolean }) => (
  <Box sx={{ mb: 4 }}>
    <SectionHeader variant="h5">Problem Statement</SectionHeader>
    <Box
      dangerouslySetInnerHTML={sanitizeHTML(project.description)}
      sx={{
        lineHeight: 1.6,
        fontSize: isMobile ? '0.9rem' : '1rem',
        '& img': {
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
          margin: '10px 0',
          borderRadius: '8px'
        },
        '& p': {
          marginBottom: '1rem'
        },
        '& ul, & ol': {
          paddingLeft: '1.5rem',
          marginBottom: '1rem'
        },
        '& li': {
          marginBottom: '0.5rem'
        }
      }}
    />
  </Box>
);

const ProjectVideo = ({ videoUrl }: { videoUrl: string | null }) => {
  if (!videoUrl) return null;

  return (
    <Box sx={{ mb: 4 }}>
      <SectionHeader variant="h5">Video Presentation</SectionHeader>
      <Box
        sx={{
          aspectRatio: '16/9',
          width: '100%',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src={videoUrl.replace('watch?v=', 'embed/')}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ border: 'none' }}
        />
      </Box>
    </Box>
  );
};

const ProjectFullDetail = ({ project, isMobile }: { project: ProjectData; isMobile: boolean }) => {
  if (!project.full_detail) return null;

  return (
    <Box sx={{ mb: 4 }}>
      <SectionHeader variant="h5">Project Details</SectionHeader>
      <Box
        dangerouslySetInnerHTML={sanitizeHTML(project.full_detail)}
        sx={{
          lineHeight: 1.6,
          fontSize: isMobile ? '0.9rem' : '1rem',
          '& img': {
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
            margin: '10px 0',
            borderRadius: '8px'
          },
          '& h3, & h4': {
            margin: '1.5rem 0 0.5rem 0',
            color: 'primary.main'
          },
          '& p': {
            marginBottom: '1rem'
          },
          '& ul, & ol': {
            paddingLeft: '1.5rem',
            marginBottom: '1rem'
          },
          '& li': {
            marginBottom: '0.5rem'
          }
        }}
      />
    </Box>
  );
};

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const { campaignData, fundData, metricsData, votingData, projectData, fundingData, isLoading, error } = useProjectData(projectId);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isLoading) {
    return (
      <>
        <Breadcrumbs custom heading="Loading..." links={[]} />
        <Grid container spacing={GRID_COMMON_SPACING}>
          <Grid size={{ xs: 12, sm: 8 }}>
            <SkeletonProjectCard />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Skeleton variant="rectangular" height={300} />
          </Grid>
        </Grid>
      </>
    );
  }

  if (error || !projectData) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" color="error">
          {error?.message || 'Project not found'}
        </Typography>
      </Box>
    );
  }

  const videoUrl = extractVideoUrl(projectData.description);

  // Breadcrumbs configuration
  const breadcrumbLinks = [
    { title: 'Home', to: APP_DEFAULT_PATH },
    { title: 'Funds', to: '/funds' },
    { title: fundData?.name || 'Fund Details', to: `/funds/${fundData?.id}` },
    { title: campaignData?.name || 'Campaign Details', to: `/campaigns/${campaignData?.id}` },
    { title: 'Projects', to: `/campaigns/${campaignData?.id}/projects` },
    { title: projectData.title || 'Project Details' }
  ];

  return (
    <>
      <Breadcrumbs
        custom
        heading={isMobile ? projectData.title.substring(0, 20) + (projectData.title.length > 20 ? '...' : '') : projectData.title}
        links={breadcrumbLinks}
      />

      <Grid container spacing={isMobile ? 2 : 3} sx={{ mt: 2 }}>
        {/* Main Content */}
        <Grid size={{ xs: 12, sm: 8 }}>
          <ProjectHeader project={projectData} fundingData={fundingData} votingData={votingData} isMobile={isMobile} />

          <MainCard border={false} sx={{ p: isMobile ? 2 : 3, mb: 3 }}>
            <ProjectDescription project={projectData} isMobile={isMobile} />
            <ProjectVideo videoUrl={videoUrl} />
            <ProjectFullDetail project={projectData} isMobile={isMobile} />

            {projectData.full_detail?.includes('[PROJECT MILESTONES]') && <ProjectMilestones content={projectData.full_detail} />}
          </MainCard>
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <ProjectMetricsCard metrics={metricsData} isMobile={isMobile} />

          <ProjectDetailsCard project={projectData} campaign={campaignData} fund={fundData} isMobile={isMobile} />

          {projectData.submitters && projectData.submitters.length > 0 && (
            <ProjectTeamCard teamMembers={projectData.submitters} isMobile={isMobile} />
          )}

          <ProjectLinksCard project={projectData} isMobile={isMobile} />
        </Grid>
      </Grid>
    </>
  );
}

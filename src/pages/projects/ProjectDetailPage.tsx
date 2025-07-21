import { useParams } from 'react-router';
import DOMPurify from 'dompurify';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

/** Icons **/
import { Like1, MessageText1, Link21, Calendar1, MoneySend, TickCircle } from 'iconsax-react';

/** MUI **/
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';

/** Components **/
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import SkeletonProjectCard from 'components/skeletons/SkeletonListProjectsCard';

import { APP_DEFAULT_PATH, GRID_COMMON_SPACING } from 'config';
import { useProjectData } from 'api/projects';
import MainCard from 'components/MainCard';

const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  fontWeight: 'bold'
}));

const parseJSONField = (field: any): any[] => {
  try {
    if (typeof field === 'string') {
      const parsed = JSON.parse(field);
      // Handle double-encoded JSON
      if (typeof parsed === 'string') {
        return JSON.parse(parsed);
      }
      return parsed;
    }
    return field || [];
  } catch (e) {
    console.warn('Failed to parse JSON field:', e);
    return [];
  }
};

const decodeImageLinks = (html: string) => {
  return html.replace(/<img[^>]*src="\/a\/attachments\/embedded-file-url\?url=([^"&]+)[^"]*"[^>]*>/g, (match, encodedUrl) => {
    try {
      const decodedUrl = atob(decodeURIComponent(encodedUrl));
      return `<img src="${decodedUrl}" style="max-width: 100%; height: auto;" />`;
    } catch (e: any) {
      console.error('Image decode failed:', e);
      return match;
    }
  });
};

const embedVideoLinks = (html: string) => {
  return html.replace(/<a[^>]*href="(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([^\s&"]+))"[^>]*>.*?<\/a>/g, (_, url, videoId) => {
    return `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
  });
};

const sanitizeHTML = (html: string) => {
  const withDecodedImages = decodeImageLinks(html);
  const withEmbeddedVideos = embedVideoLinks(withDecodedImages);
  return {
    __html: DOMPurify.sanitize(withEmbeddedVideos, {
      ADD_ATTR: ['target', 'allow', 'allowfullscreen', 'style'],
      ADD_TAGS: ['iframe', 'img'],
      FORBID_ATTR: ['onerror', 'onload'],
      FORBID_TAGS: ['script', 'style'],
      ALLOW_DATA_ATTR: false,
      USE_PROFILES: { html: true, svg: true }
    })
  };
};

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const { fundData, campaignData, projectData, metricsData, isLoading } = useProjectData(projectId);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Parse JSON fields
  const fieldsections = parseJSONField(projectData?.fieldsections);

  // Breadcrumbs configuration
  const breadcrumbLinks = [
    { title: 'Home', to: APP_DEFAULT_PATH },
    { title: 'Funds', to: '/funds' },
    { title: fundData?.name || 'Fund Details', to: `/funds/${fundData?.id}` },
    { title: campaignData?.name || 'Campaign Details', to: `/campaigns/${campaignData?.id}` },
    { title: 'Projects', to: `/campaigns/${campaignData?.id}/projects` },
    { title: `${projectData?.title}` || 'Project Details' }
  ];

  /** Loading state **/
  if (isLoading) {
    return (
      <>
        <Breadcrumbs custom heading={'Loading...'} links={breadcrumbLinks} />
        <Grid container spacing={GRID_COMMON_SPACING}>
          <Grid size={{ xs: 12, sm: 8, md: 4 }}>
            <SkeletonProjectCard />
          </Grid>
        </Grid>
      </>
    );
  }

  if (!projectData) {
    return <Typography variant="h6">Project not found</Typography>;
  }

  // Helper function to find field value
  const getFieldValue = (fieldName: string) => {
    const section = fieldsections.find((section) => section.projectFieldValues?.some((field: any) => field.fieldName === fieldName));
    if (section) {
      const field = section.projectFieldValues.find((f: any) => f.fieldName === fieldName);
      return field?.value || 'Not provided';
    }
    return 'Not provided';
  };

  // Extract video URL from description
  const extractVideoUrl = (description: string | null): string | null => {
    const videoRegex = /<a[^>]*class="ql-video"[^>]*href="([^"]*)"[^>]*>/;
    const match = description?.match(videoRegex);
    return match ? match[1] : null;
  };

  const videoUrl = extractVideoUrl(projectData.description);

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
          <MainCard border={false} sx={{ p: isMobile ? 2 : 3, mb: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center" mb={3}>
              <Avatar src={projectData.submitters[0].avatarUrl} alt={projectData.submitters[0].name} sx={{ width: 56, height: 56 }} />
              <Box>
                <Typography variant="h6">{projectData.submitters[0].name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  @{projectData.submitters[0].username}
                </Typography>
              </Box>
            </Stack>

            <Typography variant="h4" gutterBottom sx={{ fontSize: isMobile ? '1.5rem' : '2.125rem' }}>
              {projectData.title}
            </Typography>

            <Stack direction={isMobile ? 'column' : 'row'} spacing={1} sx={{ mb: 3, gap: 1 }}>
              <Chip icon={<TickCircle size="16px" />} label={`${fundData.name}`} color="primary" variant="outlined" />
              {projectData.project_duration ? (
                <Chip icon={<Calendar1 size="16px" />} label={`${projectData.project_duration} months`} color="secondary" />
              ) : (
                <Chip icon={<Calendar1 size="16px" />} label="Duration not specified" color="secondary" />
              )}
              <Chip
                icon={<MoneySend size="16px" />}
                label={projectData.requested_fund != null ? `${projectData.requested_fund.toLocaleString()} ₳` : 'Not provided'}
                color="success"
              />
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 4 }}>
              <SectionHeader variant="h5">Problem Statement</SectionHeader>
              <Box
                dangerouslySetInnerHTML={sanitizeHTML(projectData.description)}
                sx={{
                  lineHeight: 1.6,
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  '& img': {
                    maxWidth: '100%',
                    height: 'auto',
                    display: 'block',
                    margin: '10px 0'
                  }
                }}
              />
            </Box>

            {videoUrl && (
              <Box sx={{ mb: 4 }}>
                <SectionHeader variant="h5">Video Presentation</SectionHeader>
                <Box sx={{ aspectRatio: '16/9', width: '100%' }}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={videoUrl.replace('watch?v=', 'embed/')}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Box>
              </Box>
            )}

            <Box
              sx={{
                mb: 4,
                lineHeight: 1.6,
                fontSize: isMobile ? '0.9rem' : '1rem',
                '& img': {
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'block',
                  margin: '10px 0'
                }
              }}
            >
              <SectionHeader variant="h5">Full Detail</SectionHeader>
              <Box
                dangerouslySetInnerHTML={sanitizeHTML(projectData.full_detail || '')}
                sx={{
                  lineHeight: 1.6,
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  '& img': {
                    maxWidth: '100%',
                    height: 'auto',
                    display: 'block',
                    margin: '10px 0'
                  }
                }}
              />
            </Box>
          </MainCard>
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <MainCard border={false} sx={{ p: isMobile ? 2 : 3, mb: 3 }}>
            <SectionHeader variant="h5">Metrics Stats</SectionHeader>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1" color="text.secondary">
                  <MessageText1 size="18px" style={{ verticalAlign: 'middle', marginRight: 8 }} />
                  Uniqueness Score
                </Typography>
                <Typography variant="body1">{metricsData?.uniqueness?.value}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1" color="text.secondary">
                  <Like1 size="18px" style={{ verticalAlign: 'middle', marginRight: 8 }} />
                  Social and Environmental Impact
                </Typography>
                <Typography variant="body1">{metricsData?.social_and_environmental_impact?.has_impact}</Typography>
              </Stack>
            </Stack>
          </MainCard>

          <MainCard border={false} sx={{ p: isMobile ? 2 : 3, mb: 3 }}>
            <SectionHeader variant="h5">Key Details</SectionHeader>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1" color="text.secondary">
                  Status
                </Typography>
                <Chip label="Active" color="success" size="small" />
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1" color="text.secondary">
                  Created
                </Typography>
                <Typography variant="body1">{new Date(projectData?.created_at || '').toLocaleDateString()}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1" color="text.secondary">
                  Fund
                </Typography>
                <Typography variant="body1">{fundData?.name || 'Unknown Fund'}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1" color="text.secondary">
                  Campaign
                </Typography>
                <Typography variant="body1">{campaignData?.name || 'Unknown Campaign'}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1" color="text.secondary">
                  Open Source
                </Typography>
                <Typography variant="body1">{projectData.opensource ? 'Yes' : 'No'}</Typography>
              </Stack>
            </Stack>
          </MainCard>

          {projectData.submitters.length > 1 && (
            <MainCard border={false} sx={{ p: isMobile ? 2 : 3, mb: 3 }}>
              <SectionHeader variant="h5">Team Members</SectionHeader>
              <Stack spacing={2}>
                {projectData.submitters.slice(1).map((member, index) => (
                  <Stack key={index + 1} direction="row" spacing={2} alignItems="center">
                    <Avatar src={member.avatarUrl} alt={member.name} />
                    <Box>
                      <Typography variant="body1">{member.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        @{member.username}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </MainCard>
          )}

          <MainCard border={false} sx={{ p: isMobile ? 2 : 3 }}>
            <SectionHeader variant="h5">Links</SectionHeader>
            <Stack spacing={1}>
              {getFieldValue('CF_305') !== 'Not provided' && (
                <Button
                  variant="outlined"
                  startIcon={<Link21 size="18px" />}
                  href={getFieldValue('CF_305')}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth={isMobile}
                >
                  Website/Repository
                </Button>
              )}
              {getFieldValue('CF_311').includes('github.com') && (
                <Button
                  variant="outlined"
                  startIcon={<Link21 size="18px" />}
                  href={getFieldValue('CF_311').match(/https?:\/\/[^\s]+/)[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth={isMobile}
                >
                  GitHub Repository
                </Button>
              )}
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}

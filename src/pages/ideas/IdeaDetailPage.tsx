import { useParams } from 'react-router';
import DOMPurify from 'dompurify';

/** Icons **/
import { Like1, MessageText1, Profile, Link21, Calendar1, MoneySend, People, TickCircle } from 'iconsax-react';

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
import SkeletonIdeaCard from 'components/skeletons/SkeletonIdeaCard';

import { APP_DEFAULT_PATH, GRID_COMMON_SPACING } from 'config';
import { useIdeaData } from 'api/ideas';
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
      ADD_ATTR: ['target', 'allow', 'allowfullscreen'],
      ADD_TAGS: ['iframe']
    })
  };
};

export default function IdeaDetailPage() {
  const { ideaId } = useParams();
  const { fundData, campaignData, ideaData, isLoading } = useIdeaData(ideaId);

  // Parse JSON fields
  const coSubmitters = ideaData ? parseJSONField(ideaData.co_submitters) : [];
  const fieldsections = parseJSONField(ideaData?.fieldsections);

  // Breadcrumbs configuration
  const breadcrumbLinks = [
    { title: 'Home', to: APP_DEFAULT_PATH },
    { title: 'Funds', to: '/funds' },
    { title: fundData?.name || 'Fund Details', to: `/funds/${fundData?.id}` },
    { title: campaignData?.name || 'Campaign Details', to: `/campaigns/${campaignData?.id}` },
    { title: 'Ideas', to: `/campaigns/${campaignData?.id}/ideas` },
    { title: `${ideaData?.title}` || 'Idea Details' }
  ];

  /** Loading state **/
  if (isLoading) {
    return (
      <>
        <Breadcrumbs custom heading={'Loading...'} links={breadcrumbLinks} />
        <Grid container spacing={GRID_COMMON_SPACING}>
          <Grid size={{ xs: 12, sm: 8, md: 4 }}>
            <SkeletonIdeaCard />
          </Grid>
        </Grid>
      </>
    );
  }

  if (!ideaData) {
    return <Typography variant="h6">Idea not found</Typography>;
  }

  // Helper function to find field value
  const getFieldValue = (fieldName: string) => {
    const section = fieldsections.find((section) => section.ideaFieldValues?.some((field: any) => field.fieldName === fieldName));
    if (section) {
      const field = section.ideaFieldValues.find((f: any) => f.fieldName === fieldName);
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

  const videoUrl = extractVideoUrl(ideaData.description);

  return (
    <>
      <Breadcrumbs custom heading={ideaData.title} links={breadcrumbLinks} />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Main Content */}
        <Grid size={{ xs: 12, sm: 8, md: 8 }}>
          <MainCard border={false} sx={{ p: 3, mb: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center" mb={3}>
              <Avatar src={ideaData.submitter_avatar} alt={ideaData.submitter_name} sx={{ width: 56, height: 56 }} />
              <Box>
                <Typography variant="h6">{ideaData.submitter_name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  @{ideaData.submitter_username}
                </Typography>
              </Box>
            </Stack>

            <Typography variant="h4" gutterBottom>
              {ideaData.title}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
              <Chip icon={<TickCircle size="16px" />} label={`${fundData.name}`} color="primary" variant="outlined" />
              {ideaData.project_duration ? (
                <Chip icon={<Calendar1 size="16px" />} label={`${ideaData.project_duration} months`} color="secondary" />
              ) : (
                <Chip icon={<Calendar1 size="16px" />} label="Duration not specified" color="secondary" />
              )}
              <Chip
                icon={<MoneySend size="16px" />}
                label={ideaData.requested_fund != null ? `${ideaData.requested_fund.toLocaleString()} ₳` : 'Not provided'}
                color="success"
              />
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 4 }}>
              <SectionHeader variant="h5">Problem Statement</SectionHeader>
              <div dangerouslySetInnerHTML={sanitizeHTML(ideaData.description)} style={{ lineHeight: 1.6 }} />
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

            {fieldsections.map((section) => (
              <Box key={section.id} sx={{ mb: 4 }}>
                <SectionHeader variant="h5">{section.title}</SectionHeader>
                {section.ideaFieldValues?.map((field: any, idx: number) => (
                  <Box key={idx} sx={{ mb: 2 }}>
                    {field.fieldDisplayType === 'TEXTAREA' || field.fieldDisplayType === 'TEXTINPUT' || field.renderFormat === 3 ? (
                      <div dangerouslySetInnerHTML={sanitizeHTML(field.value || 'Not provided')} style={{ lineHeight: 1.6 }} />
                    ) : field.fieldDisplayType === 'HYPERLINK' ? (
                      <Button
                        variant="outlined"
                        startIcon={<Link21 size="18px" />}
                        href={field.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ mt: 1 }}
                      >
                        {field.name || field.value || 'View Link'}
                      </Button>
                    ) : field.fieldDisplayType === 'INTEGER' || field.fieldDisplayType === 'CHOICE' ? (
                      <Typography>{field.value || 'Not provided'}</Typography>
                    ) : (
                      <Typography>{field.value || 'Not provided'}</Typography>
                    )}
                  </Box>
                ))}
              </Box>
            ))}
          </MainCard>
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
          <MainCard border={false} sx={{ p: 3, mb: 3 }}>
            <SectionHeader variant="h4">Idea Stats</SectionHeader>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1" color="text.secondary">
                  <MessageText1 size="18px" style={{ verticalAlign: 'middle', marginRight: 8 }} />
                  Comments
                </Typography>
                <Typography variant="body1">{ideaData.comment_count}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1" color="text.secondary">
                  <Like1 size="18px" style={{ verticalAlign: 'middle', marginRight: 8 }} />
                  Kudos
                </Typography>
                <Typography variant="body1">{ideaData.kudo_count}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1" color="text.secondary">
                  <People size="18px" style={{ verticalAlign: 'middle', marginRight: 8 }} />
                  Followers
                </Typography>
                <Typography variant="body1">{ideaData?.followers_count ?? 0}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1" color="text.secondary">
                  <Profile size="18px" style={{ verticalAlign: 'middle', marginRight: 8 }} />
                  Views
                </Typography>
                <Typography variant="body1">{ideaData.idea_view_count}</Typography>
              </Stack>
            </Stack>
          </MainCard>

          <MainCard border={false} sx={{ p: 3, mb: 3 }}>
            <SectionHeader variant="h4">Key Details</SectionHeader>
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
                <Typography variant="body1">{new Date(ideaData?.created_at || '').toLocaleDateString()}</Typography>
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
                <Typography variant="body1">{ideaData.opensource ? 'Yes' : 'No'}</Typography>
              </Stack>
            </Stack>
          </MainCard>

          {coSubmitters.length > 0 && (
            <MainCard border={false} sx={{ p: 3, mb: 3 }}>
              <SectionHeader variant="h4">Team Members</SectionHeader>
              <Stack spacing={2}>
                {coSubmitters.map((member, index) => (
                  <Stack key={index} direction="row" spacing={2} alignItems="center">
                    <Avatar src={member.avatar} alt={member.name} />
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

          <MainCard border={false} sx={{ p: 3 }}>
            <SectionHeader variant="h4">Links</SectionHeader>
            <Stack spacing={1}>
              {getFieldValue('CF_305') !== 'Not provided' && (
                <Button
                  variant="outlined"
                  startIcon={<Link21 size="18px" />}
                  href={getFieldValue('CF_305')}
                  target="_blank"
                  rel="noopener noreferrer"
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

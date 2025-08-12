import { useNavigate } from 'react-router';
import { Button, Stack, Typography, Box, Chip, Avatar as MuiAvatar, Divider, Tooltip } from '@mui/material';

/** Icons **/
import { Eye, Calendar1, MoneySend, User, Link21 } from 'iconsax-react';

/** Components **/
import MainCard from 'components/MainCard';
import DOMPurify from 'dompurify';

/**
 * Function to sanitize and truncate HTML content
 * @param html - The HTML string to process
 * @param maxLength - Maximum length of the returned string
 * @returns A sanitized and truncated string
 */
function sanitizeAndTruncate(html: string | undefined, maxLength: number = 200): string {
  if (!html) return '';

  // Sanitize HTML first
  const sanitized = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [], // Remove all HTML tags
    ALLOWED_ATTR: []
  });

  // Truncate and add ellipsis if needed
  return sanitized.length > maxLength ? `${sanitized.slice(0, maxLength)}...` : sanitized;
}

/**
 * Format date string to readable format
 */
const formatDate = (dateString?: string): string => {
  if (!dateString) return 'Date not specified';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return 'Invalid date';
  }
};

/**
 * Extract the first paragraph from HTML content
 */
const getFirstParagraph = (html: string | undefined): string => {
  if (!html) return '';
  const match = html.match(/<p[^>]*>([^<]*)<\/p>/i);
  return match ? sanitizeAndTruncate(match[1], 200) : sanitizeAndTruncate(html, 200);
};

/**
 * ListProjectsCard component to display project details in a card format
 */
export default function ListProjectsCard({ project, fund, campaign, showFullDescription = false }: any) {
  const navigate = useNavigate();
  const { id, title, description, created_at, updated_at, submitters, requested_fund, project_status, horizon_group, country, continent } =
    project;

  const submitter = submitters?.[0];
  const formattedDate = formatDate(created_at ?? undefined);
  const updatedDate = formatDate(updated_at ?? undefined);
  const displayDescription = showFullDescription
    ? sanitizeAndTruncate(description ?? undefined, 500)
    : getFirstParagraph(description ?? undefined);

  return (
    <MainCard
      sx={{
        borderLeft: 4,
        borderLeftColor: 'primary.main',
        p: 2.5,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3
        }
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
        {/* Left Section - Avatar and Metadata */}
        <Stack alignItems="flex-start" spacing={1.5} minWidth={120}>
          {submitter?.avatarUrl ? (
            <MuiAvatar src={submitter.avatarUrl} alt={submitter.name} sx={{ width: 56, height: 56 }} />
          ) : (
            <MuiAvatar sx={{ width: 56, height: 56 }}>{submitter?.name?.charAt(0) || title.charAt(0).toUpperCase()}</MuiAvatar>
          )}

          <Stack spacing={0.5} width="100%">
            <Typography variant="caption" color="text.secondary" noWrap>
              Project #{id}
            </Typography>

            {project_status && (
              <Chip
                size="small"
                label={project_status}
                color={project_status === 'Active' ? 'success' : project_status === 'Completed' ? 'primary' : 'default'}
                variant="outlined"
                sx={{ borderRadius: 1 }}
              />
            )}
          </Stack>
        </Stack>

        {/* Right Section - Main Content */}
        <Stack flex={1} spacing={1.5}>
          {/* Title and Metadata */}
          <Stack spacing={0.5}>
            <Typography variant="h3" sx={{ lineHeight: 1.2 }}>
              {title}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
              {submitter && (
                <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                  <User size="14px" style={{ marginRight: 4 }} />
                  {submitter.name || 'Anonymous'}
                </Typography>
              )}

              <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                <Calendar1 size="14px" style={{ marginRight: 4 }} />
                {/* {formattedDate} */}
                {updated_at && ` Updated ${updatedDate}`}
              </Typography>

              {(country || continent) && (
                <Typography variant="body2" color="text.secondary">
                  {[country, continent].filter(Boolean).join(', ')}
                </Typography>
              )}
            </Stack>
          </Stack>

          {/* Fund and Campaign Chips */}
          {(fund || campaign) && (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {fund && (
                <Tooltip title={`Fund ${fund.name}`}>
                  <Chip size="small" label={`Fund: ${fund.name}`} color="primary" variant="outlined" sx={{ borderRadius: 1 }} />
                </Tooltip>
              )}
              {campaign && (
                <Tooltip title={`Campaign ${campaign.name}`}>
                  <Chip size="small" label={`Campaign: ${campaign.name}`} color="secondary" variant="outlined" sx={{ borderRadius: 1 }} />
                </Tooltip>
              )}
              {horizon_group && <Chip size="small" label={horizon_group} sx={{ borderRadius: 1 }} />}
            </Stack>
          )}

          <Divider sx={{ my: 1 }} />

          {/* Description */}
          <Box
            sx={{
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
              minHeight: 80
            }}
          >
            <Typography
              variant="body2"
              sx={{
                whiteSpace: 'pre-wrap',
                lineHeight: 1.6
              }}
            >
              {displayDescription}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
            <Button
              startIcon={<Eye size="18px" />}
              variant="outlined"
              color="primary"
              onClick={() => navigate(`/projects/${id}`)}
              sx={{
                alignSelf: 'flex-start',
                minWidth: 150
              }}
            >
              View Details
            </Button>

            {project.website && (
              <Button
                startIcon={<Link21 size="18px" />}
                variant="text"
                color="primary"
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  alignSelf: 'flex-start',
                  minWidth: 150
                }}
              >
                Visit Website
              </Button>
            )}
          </Stack>
        </Stack>
      </Stack>
    </MainCard>
  );
}

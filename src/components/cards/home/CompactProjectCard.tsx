import { useNavigate } from 'react-router';
import { Box, Typography, Chip, Avatar, Stack, IconButton, Tooltip, Paper } from '@mui/material';

/** Icons **/
import { Eye, Award, Tree, TrendUp, TickCircle, Activity, People } from 'iconsax-react';

/** Components **/
import DOMPurify from 'dompurify';

/** Types **/
import { Metrics } from 'types/metrics';

interface Props {
  project: Metrics;
  metricType: keyof Metrics;
}

const METRICS_TYPES: Record<string, string> = {
  uniqueness: 'Uniqueness',
  social_impact: 'Social Impact',
  environmental_impact: 'Environmental Impact',
  sdg: 'SDG',
  activity: 'Activity',
  completeness: 'Completeness'
};

/**
 * Function to sanitize and truncate HTML content
 */
function sanitizeAndTruncate(html: string | undefined, maxLength: number = 80): string {
  if (!html) return '';

  const sanitized = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });

  return sanitized.length > maxLength ? `${sanitized.slice(0, maxLength)}...` : sanitized;
}

/**
 * Get metric icon based on type
 */
const getMetricIcon = (type: string) => {
  switch (type) {
    case 'uniqueness':
      return <Award size="16px" />;
    case 'social_impact':
      return <People size="16px" />;
    case 'environmental_impact':
      return <Tree size="16px" />;
    case 'sdg':
      return <TrendUp size="16px" />;
    case 'activity':
      return <Activity size="16px" />;
    case 'completeness':
      return <TickCircle size="16px" />;
    default:
      return <TrendUp size="16px" />;
  }
};

/**
 * Get metric color based on type
 */
const getMetricColor = (type: string) => {
  switch (type) {
    case 'uniqueness':
      return 'warning.main';
    case 'social_impact':
      return 'info.main';
    case 'environmental_impact':
      return 'success.main';
    case 'sdg':
      return 'primary.main';
    case 'activity':
      return 'secondary.main';
      return 'success.main';
    case 'completeness':
      return 'error.main';
    default:
      return 'info.main';
  }
};

/**
 * Get rank badge color based on position
 */
const getRankColor = (rank: number) => {
  if (rank === 1) return 'gold';
  if (rank === 2) return 'silver';
  if (rank === 3) return '#cd7f32'; // bronze
  return 'grey.600';
};

/**
 * CompactProjectCard component for displaying projects in metrics view
 */
export default function CompactProjectCard({ project, metricType, rank }: Props) {
  const navigate = useNavigate();

  const { id, title, description, submitters } = project;
  const submitter = submitters?.[0];
  const displayDescription = sanitizeAndTruncate(description);

  // Get metric value based on type
  const getMetricValue = () => {
    // Handle social and environmental impact specially
    if (metricType === 'social_impact' || metricType === 'environmental_impact') {
      const hasImpact = project[metricType]?.has_impact;

      if (hasImpact === undefined || hasImpact === null) {
        return 'N/A';
      }

      // Handle both string and boolean values
      return hasImpact === true ? 'Yes' : 'No';
    }

    // Handle other metrics (percentage-based)
    const metric = project[metricType];
    if (!metric || typeof metric !== 'object') return 'N/A';

    console.log(metric);

    const value = (metric as any).score;
    if (value === undefined || value === null) return 'N/A';

    return `${(value * 100).toFixed(1)}%`;
  };

  const handleViewDetails = () => {
    navigate(`/projects/${id}`);
  };

  // Get color based on metric type and value
  const getMetricDisplayColor = () => {
    if (metricType === 'social_impact' || metricType === 'environmental_impact') {
      const hasImpact = project[metricType]?.has_impact;
      if (hasImpact == true) return 'success.main';
      if (hasImpact == false) return 'error.main';
      return 'grey.500';
    }
    return getMetricColor(metricType as string);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
          '& .view-button': {
            opacity: 1
          }
        }
      }}
      onClick={handleViewDetails}
    >
      {/* Rank Badge */}
      <Box
        sx={{
          position: 'absolute',
          top: -8,
          left: -8,
          width: 32,
          height: 32,
          borderRadius: '50%',
          backgroundColor: getRankColor(rank),
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '0.875rem',
          boxShadow: 2,
          zIndex: 1
        }}
      >
        #{rank}
      </Box>

      {/* Header */}
      <Stack direction="row" spacing={1.5} alignItems="flex-start" mb={1.5}>
        {/* Avatar */}
        {submitter?.avatarUrl ? (
          <Avatar src={submitter.avatarUrl} alt={submitter.name} sx={{ width: 40, height: 40 }} />
        ) : (
          <Avatar sx={{ width: 40, height: 40, fontSize: '1rem' }}>
            {submitter?.name?.charAt(0) || title?.charAt(0)?.toUpperCase() || '?'}
          </Avatar>
        )}

        {/* Content */}
        <Box flex={1} minWidth={0}>
          <Typography
            variant="h6"
            sx={{
              fontSize: '1rem',
              fontWeight: 600,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 0.5
            }}
          >
            {title}
          </Typography>

          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            by {submitter?.name || 'Anonymous'} • Project #{id}
          </Typography>
        </Box>

        {/* View Button */}
        <IconButton
          className="view-button"
          size="small"
          sx={{
            opacity: 0,
            transition: 'opacity 0.3s ease',
            color: 'primary.main'
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails();
          }}
        >
          <Eye size="18px" />
        </IconButton>
      </Stack>

      {/* Description */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 1.5,
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: 1.4
        }}
      >
        {displayDescription}
      </Typography>

      {/* Metric Display */}
      <Box
        sx={{
          mt: 'auto',
          p: 1,
          borderRadius: 2,
          bgcolor: 'background.default',
          border: 1,
          borderColor: getMetricDisplayColor(),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box sx={{ color: getMetricDisplayColor() }}>{getMetricIcon(metricType as string)}</Box>
          <Typography variant="caption" color="text.secondary" textTransform="capitalize">
            {METRICS_TYPES[metricType as string] || metricType}
          </Typography>
        </Stack>

        <Tooltip title={`${(metricType as string).replace(/_/g, ' ')} value: ${getMetricValue()}`}>
          <Chip
            size="small"
            label={getMetricValue()}
            sx={{
              backgroundColor: getMetricDisplayColor(),
              color: 'white',
              fontWeight: 600,
              fontSize: '0.75rem',
              '& .MuiChip-label': {
                px: 1
              }
            }}
          />
        </Tooltip>
      </Box>
    </Paper>
  );
}

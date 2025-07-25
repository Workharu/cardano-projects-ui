import { useNavigate } from 'react-router';
import { Box, Typography, Chip, Avatar, Stack, IconButton, Tooltip, Paper } from '@mui/material';

/** Icons **/
import { Eye, Award, TrendUp, DollarCircle, TickCircle } from 'iconsax-react';

/** Components **/
import DOMPurify from 'dompurify';

/** Types **/
import { MetricsProject } from 'api/metrics';

interface Props {
  project: MetricsProject;
  metricType: 'uniqueness' | 'social_and_environmental_impact' | 'budget' | 'completeness';
  rank: number;
}

const METRICS_TYPES: Record<string, string> = {
  uniqueness: 'Uniqueness',
  social_and_environmental_impact: 'Impact',
  budget: 'Budget',
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
    case 'social_and_environmental_impact':
      return <TrendUp size="16px" />;
    case 'budget':
      return <DollarCircle size="16px" />;
    case 'completeness':
      return <TickCircle size="16px" />;
    default:
      return <TrendUp size="16px" />; // Default to social impact icon
  }
};

/**
 * Get metric color based on type
 */
const getMetricColor = (type: string) => {
  switch (type) {
    case 'uniqueness':
      return 'warning.main';
    case 'social_and_environmental_impact':
      return 'info.main';
    case 'budget':
      return 'success.main';
    case 'completeness':
      return 'error.main';
    default:
      return 'info.main'; // Default to social impact color
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

  const { id, title, description, submitters, social_and_environmental_impact } = project;
  const submitter = submitters?.[0];
  const displayDescription = sanitizeAndTruncate(description);

  // Get metric value based on type
  const getMetricValue = () => {
    if (metricType === 'social_and_environmental_impact') {
      // For social impact, use the has_impact boolean
      const hasImpact = social_and_environmental_impact?.has_impact;

      if (hasImpact === undefined || hasImpact === null) {
        return 'N/A';
      }

      return hasImpact == 'True' ? 'Yes' : 'No';
    } else {
      // For other metrics, use the original logic
      const metric = project[metricType];
      if (!metric) return 'N/A';

      if (metricType === 'budget') {
        return `${metric.value?.toLocaleString() || 0} ₳`;
      }

      return `${((metric.value || 0) * 100).toFixed(1)}%`;
    }
  };

  const handleViewDetails = () => {
    navigate(`/projects/${id}`);
  };

  // Get color based on metric type and value
  const getMetricDisplayColor = () => {
    if (metricType === 'social_and_environmental_impact') {
      const hasImpact = social_and_environmental_impact?.has_impact;
      if (hasImpact == 'True') return 'success.main';
      if (hasImpact == 'False') return 'error.main';
      return 'grey.500';
    } else {
      return getMetricColor(metricType);
    }
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
          <Avatar sx={{ width: 40, height: 40, fontSize: '1rem' }}>{submitter?.name?.charAt(0) || title.charAt(0).toUpperCase()}</Avatar>
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
          <Box sx={{ color: getMetricDisplayColor() }}>{getMetricIcon(metricType)}</Box>
          <Typography variant="caption" color="text.secondary" textTransform="capitalize">
            {METRICS_TYPES[metricType]}
          </Typography>
        </Stack>

        <Tooltip title={`${metricType.replace('_', ' ')} value: ${getMetricValue()}`}>
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

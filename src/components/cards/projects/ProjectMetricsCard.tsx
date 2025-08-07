import { Link } from 'react-router';

/** MUI Imports **/
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

/** Components **/
import MainCard from 'components/MainCard';

/** Icons **/
import { MessageText1, Like1, Dislike } from 'iconsax-react';

/** Types **/
import { MetricsData } from 'types/projects';

const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  fontSize: '1.25rem'
}));

const SimilarProjectsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[200]}`
}));

const SDGIcon = styled('img')(({ theme }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '4px',
  objectFit: 'contain'
}));

const SDGContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[200]}`
}));

// SDG Icon mapping - maps SDG descriptions to their corresponding icon numbers and info
const getSDGInfo = (sdgDescription: string | undefined) => {
  const sdgLower = sdgDescription?.toLowerCase();

  // Map common SDG names/keywords to their numbers
  const sdgMapping = {
    'no poverty': { number: 1, name: 'No Poverty' },
    poverty: { number: 1, name: 'No Poverty' },
    'zero hunger': { number: 2, name: 'Zero Hunger' },
    hunger: { number: 2, name: 'Zero Hunger' },
    'good health and well-being': { number: 3, name: 'Good Health and Well-being' },
    health: { number: 3, name: 'Good Health and Well-being' },
    'quality education': { number: 4, name: 'Quality Education' },
    education: { number: 4, name: 'Quality Education' },
    'gender equality': { number: 5, name: 'Gender Equality' },
    gender: { number: 5, name: 'Gender Equality' },
    'clean water and sanitation': { number: 6, name: 'Clean Water and Sanitation' },
    water: { number: 6, name: 'Clean Water and Sanitation' },
    'affordable and clean energy': { number: 7, name: 'Affordable and Clean Energy' },
    energy: { number: 7, name: 'Affordable and Clean Energy' },
    'decent work and economic growth': { number: 8, name: 'Decent Work and Economic Growth' },
    'economic growth': { number: 8, name: 'Decent Work and Economic Growth' },
    'industry, innovation and infrastructure': { number: 9, name: 'Industry, Innovation and Infrastructure' },
    innovation: { number: 9, name: 'Industry, Innovation and Infrastructure' },
    'reduced inequalities': { number: 10, name: 'Reduced Inequalities' },
    inequalities: { number: 10, name: 'Reduced Inequalities' },
    'sustainable cities and communities': { number: 11, name: 'Sustainable Cities and Communities' },
    cities: { number: 11, name: 'Sustainable Cities and Communities' },
    'responsible consumption and production': { number: 12, name: 'Responsible Consumption and Production' },
    consumption: { number: 12, name: 'Responsible Consumption and Production' },
    'climate action': { number: 13, name: 'Climate Action' },
    climate: { number: 13, name: 'Climate Action' },
    'life below water': { number: 14, name: 'Life Below Water' },
    marine: { number: 14, name: 'Life Below Water' },
    'life on land': { number: 15, name: 'Life on Land' },
    terrestrial: { number: 15, name: 'Life on Land' },
    'peace, justice and strong institutions': { number: 16, name: 'Peace, Justice and Strong Institutions' },
    justice: { number: 16, name: 'Peace, Justice and Strong Institutions' },
    'partnerships for the goals': { number: 17, name: 'Partnerships for the Goals' },
    partnerships: { number: 17, name: 'Partnerships for the Goals' }
  };

  // Find matching SDG
  for (const [key, value] of Object.entries(sdgMapping)) {
    if (sdgLower?.includes(key)) {
      return value;
    }
  }

  // If no match found, return null
  return null;
};

export default function ProjectMetricsCard({ metrics, isMobile }: { metrics: MetricsData; isMobile: boolean }) {
  if (!metrics) return null;

  const formatScoreAsPercentage = (score: number | undefined) => {
    if (score === undefined || score === null) return 'N/A';
    return `${(score * 100).toFixed(1)}%`;
  };

  return (
    <MainCard border={false} sx={{ p: isMobile ? 2 : 3, mb: 3 }}>
      <SectionHeader variant="h5">Metrics Stats</SectionHeader>
      <Stack spacing={2}>
        {metrics.uniqueness && (
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body1">
                <MessageText1 size="18px" color="#1976d2" style={{ verticalAlign: 'middle', marginRight: 8 }} />
                Uniqueness Score
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {formatScoreAsPercentage(metrics.uniqueness.score)}
              </Typography>
            </Stack>

            {metrics.uniqueness.top_similar_projects && metrics.uniqueness.top_similar_projects.length > 0 && (
              <SimilarProjectsContainer>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 'medium' }}>
                  Similar Projects:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 0.7 }}>
                  {metrics.uniqueness.top_similar_projects.map((project) => (
                    <Link key={project.id} to={`/projects/${project.id}`} style={{ textDecoration: 'none', overflow: 'hidden' }}>
                      <Chip
                        key={project.id}
                        label={project.title}
                        variant="outlined"
                        size="medium"
                        sx={{
                          fontSize: '0.75rem',
                          height: 'auto',
                          py: 0.5,
                          '& .MuiChip-label': {
                            px: 1,
                            py: 0.25,
                            lineHeight: 1.2
                          }
                        }}
                      />
                    </Link>
                  ))}
                </Stack>
              </SimilarProjectsContainer>
            )}
          </Stack>
        )}

        <Divider sx={{ my: 2 }} />

        {metrics.social_impact && (
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body1" color="text.secondary">
              {metrics.social_impact.has_impact ? (
                <Like1 size="18px" color="#4caf50" style={{ verticalAlign: 'middle', marginRight: 8 }} />
              ) : (
                <Dislike size="18px" variant="Bold" color="#f44336" style={{ verticalAlign: 'middle', marginRight: 8 }} />
              )}
              Social Impact
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {metrics.social_impact?.has_impact == true ? 'Yes' : 'No'}
            </Typography>
          </Stack>
        )}

        <Divider sx={{ my: 2 }} />

        {metrics.environmental_impact && (
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body1" color="text.secondary">
              {metrics.environmental_impact?.has_impact == true ? (
                <Like1 size="18px" color="#4caf50" style={{ verticalAlign: 'middle', marginRight: 8 }} />
              ) : (
                <Dislike size="18px" variant="Bold" color="#f44336" style={{ verticalAlign: 'middle', marginRight: 8 }} />
              )}
              Environmental Impact
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {metrics.environmental_impact?.has_impact == true ? 'Yes' : 'No'}
            </Typography>
          </Stack>
        )}

        <Divider sx={{ my: 2 }} />

        {metrics.sdg && (
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body1" color="text.secondary">
              SDG Category
            </Typography>
            {(() => {
              const sdgInfo = getSDGInfo(metrics.sdg.sdg_description);
              if (sdgInfo) {
                return (
                  <SDGContainer>
                    <SDGIcon
                      src={`https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-${String(sdgInfo.number).padStart(2, '0')}.jpg`}
                      alt={`SDG ${sdgInfo.number}: ${sdgInfo.name}`}
                      onError={(e) => {
                        // Fallback to alternative CDN if main source fails
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('globalgoals.org')) {
                          target.src = `https://www.globalgoals.org/content/dam/globalgoals/www/resources/goal-${sdgInfo.number}.svg`;
                        }
                      }}
                    />
                    <Typography variant="body2" fontWeight="medium" color="text.primary">
                      {sdgInfo.name}
                    </Typography>
                  </SDGContainer>
                );
              } else {
                // Fallback display when SDG is not recognized
                return (
                  <Typography variant="body1" fontWeight="medium">
                    {metrics.sdg.sdg_description}
                  </Typography>
                );
              }
            })()}
          </Stack>
        )}
      </Stack>
    </MainCard>
  );
}

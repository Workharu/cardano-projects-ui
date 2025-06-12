/** MUI **/
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

/** Components **/
import MainCard from 'components/MainCard';

// HTML sanitization
import DOMPurify from 'dompurify';

interface Props {
  name: string;
  subtitle?: string;
  featuredImageUrl?: string;
  featuredImageAltText?: string;
  summary?: string;
  description?: string;
}

export default function CampaignCard({ campaignsData }: { campaignsData: Props }) {
  const { name, subtitle, featuredImageUrl, featuredImageAltText, summary, description } = campaignsData;

  return (
    <MainCard sx={{ backgroundColor: 'transparent', boxShadow: 'none', p: 0 }}>
      <Stack spacing={0}>
        {/* Subtitle */}
        {subtitle && (
          <Typography variant="subtitle1" color="text.secondary">
            {subtitle}
          </Typography>
        )}

        {/* Image */}
        {featuredImageUrl && (
          <Box
            component="img"
            src={featuredImageUrl}
            alt={featuredImageAltText || name}
            sx={{
              width: '100%',
              maxHeight: { xs: 200, md: 300 },
              objectFit: 'cover',
              borderRadius: 1
            }}
          />
        )}

        {/* Summary HTML */}
        {summary && <Typography variant="body1" sx={{ mb: 1 }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(summary) }} />}

        {/* Description HTML */}
        {description && (
          <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }} />
        )}
      </Stack>
    </MainCard>
  );
}

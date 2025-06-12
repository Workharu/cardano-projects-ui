import { useNavigate } from 'react-router';
import { Button, Stack, Typography, Box, Chip } from '@mui/material';
import { Eye, Heart } from 'iconsax-react';

import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';

import { IdeasCardData } from 'types/ideas';

interface Props {
  idea: IdeasCardData;
}

function removeImagesAndTruncate(html: string | undefined): string {
  if (!html) return '';
  const withoutImages = html.replace(/<img[^>]*>/gi, '');
  const plainText = withoutImages.replace(/<[^>]+>/g, '');
  return plainText.length > 300 ? `${plainText.slice(0, 300)}...` : plainText;
}

export default function ListIdeasCard({ idea }: Props) {
  const navigate = useNavigate();
  const { id, title = 'No Title', idea_number, description, created_at, campaign, fund, kudo_count = 0, submitter_name = 'Unknown' } = idea;

  const formattedDate = created_at ? new Date(created_at).toLocaleDateString() : 'Unknown date';

  return (
    <MainCard sx={{ borderLeft: 4, borderLeftColor: 'primary.main', p: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
        {/* Left Section */}
        <Stack alignItems="center" spacing={1} minWidth={80}>
          <Avatar sx={{ height: 40, width: 40 }}>{title.charAt(0).toUpperCase()}</Avatar>
          <Typography variant="caption" color="text.secondary">
            Idea #{idea_number}
          </Typography>
          <Typography variant="body2" color="error.main" display="flex" alignItems="center" gap={0.5}>
            <Heart size={16} variant="Bold" /> {kudo_count}
          </Typography>
        </Stack>

        {/* Right Section */}
        <Stack flex={1} spacing={1}>
          <Typography variant="h3">{title}</Typography>

          <Typography variant="body2" color="text.secondary">
            Submitted by{' '}
            <Typography component="span" sx={{ fontStyle: 'italic' }}>
              {submitter_name}
            </Typography>{' '}
            · {formattedDate}
          </Typography>

          {fund && campaign && (
            <>
              {/* <Typography variant="body2" color="text.secondary"> */}
              {/* Fund: <strong>{fund.name}</strong> · Campaign: <strong>{campaign.name}</strong> */}
              {/* </Typography> */}
              {/* Chips for fund and campaign */}
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip size="small" label={fund?.name || 'No fund'} color="primary" variant="outlined" sx={{ borderRadius: 0.7 }} />
                <Chip
                  size="small"
                  label={campaign?.name || 'No campaign'}
                  color="secondary"
                  variant="outlined"
                  sx={{ borderRadius: 0.7 }}
                />
              </Stack>
            </>
          )}

          <Box
            sx={{
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography
              variant="body2"
              sx={{ whiteSpace: 'pre-wrap' }}
              dangerouslySetInnerHTML={{
                __html: removeImagesAndTruncate(description)
              }}
            />
          </Box>

          <Button
            startIcon={<Eye />}
            variant="outlined"
            color="primary"
            onClick={() => navigate(`/ideas/${id}`)}
            sx={{ alignSelf: 'flex-start' }}
          >
            View Idea
          </Button>
        </Stack>
      </Stack>
    </MainCard>
  );
}

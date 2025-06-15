import { useNavigate } from 'react-router';
import { Button, Stack, Typography, Box } from '@mui/material';
import { Eye, Heart } from 'iconsax-react';

import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import { IdeasCardData } from 'types/ideas';

interface Props {
  idea: IdeasCardData;
}

export default function IdeaCard({ idea }: Props) {
  const navigate = useNavigate();
  const { id, title = 'No Title', idea_number, description, created_at, campaign, fund, kudo_count = 0, submitter_name = 'Unknown' } = idea;

  const formattedDate = created_at ? new Date(created_at).toLocaleDateString() : 'Unknown date';

  return (
    <MainCard sx={{ borderLeft: 4, borderLeftColor: 'primary.main', p: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
        {/* Left */}
        <Stack alignItems="center" spacing={1} minWidth={80}>
          <Avatar sx={{ height: 40, width: 40 }}>{title.charAt(0).toUpperCase()}</Avatar>
          <Typography variant="caption" color="text.secondary">
            Idea #{idea_number}
          </Typography>
          <Typography variant="body2" color="error.main" display="flex" alignItems="center" gap={0.5}>
            <Heart size={16} variant="Bold" /> {kudo_count}
          </Typography>
        </Stack>
      </Stack>
    </MainCard>
  );
}

import { useNavigate } from 'react-router';
import { Button, Stack, Typography, Box } from '@mui/material';
import { Eye, Heart } from 'iconsax-react';

import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';

interface Idea {}

interface Props {
  idea: Idea;
}

export default function IdeaCard({ idea }: Props) {
  const navigate = useNavigate();

  return (
    <MainCard sx={{ borderLeft: 4, borderLeftColor: 'primary.main', p: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
        {/* Left */}
        <Stack alignItems="center" spacing={1} minWidth={80}>
          <Avatar sx={{ height: 40, width: 40 }}>{idea.title?.charAt(0).toUpperCase()}</Avatar>
          <Typography variant="caption" color="text.secondary">
            Idea #{idea.idea_number}
          </Typography>
          <Typography variant="body2" color="error.main" display="flex" alignItems="center" gap={0.5}>
            <Heart size={16} variant="Bold" /> {idea.kudo_count}
          </Typography>
        </Stack>
      </Stack>
    </MainCard>
  );
}

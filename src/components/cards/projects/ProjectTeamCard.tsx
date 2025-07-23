import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';

const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  fontSize: '1.25rem'
}));

export default function ProjectTeamCard({
  teamMembers,
  isMobile
}: {
  teamMembers: Array<{
    _id?: string;
    name?: string;
    username?: string;
    avatarUrl?: string;
  }>;
  isMobile: boolean;
}) {
  if (!teamMembers || teamMembers.length === 0) return null;

  return (
    <MainCard border={false} sx={{ p: isMobile ? 2 : 3, mb: 3 }}>
      <SectionHeader variant="h5">{teamMembers.length > 1 ? 'Team Members' : 'Submitter'}</SectionHeader>
      <Stack spacing={2}>
        {teamMembers.map((member, index) => (
          <Stack key={index} direction="row" spacing={2} alignItems="center">
            {member.avatarUrl ? <Avatar src={member.avatarUrl} alt={member.name} /> : <Avatar>{member.name?.charAt(0) || 'U'}</Avatar>}
            <Box>
              <Typography variant="body1">{member.name || 'Anonymous'}</Typography>
              {member.username && (
                <Typography variant="body2" color="text.secondary">
                  @{member.username}
                </Typography>
              )}
            </Box>
          </Stack>
        ))}
      </Stack>
    </MainCard>
  );
}

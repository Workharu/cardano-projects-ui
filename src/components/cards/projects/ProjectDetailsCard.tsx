import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import MainCard from 'components/MainCard';
import { formatDate } from '../../../pages/projects/ProjectDetailPage';

const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  fontSize: '1.25rem'
}));

export default function ProjectDetailsCard({
  project,
  campaign,
  fund,
  isMobile
}: {
  project: any;
  campaign: any;
  fund: any;
  isMobile: boolean;
}) {
  return (
    <MainCard border={false} sx={{ p: isMobile ? 2 : 3, mb: 3 }}>
      <SectionHeader variant="h5">Key Details</SectionHeader>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1" color="text.secondary">
            Status
          </Typography>
          <Chip
            label={project.project_status || 'Unknown'}
            color={project.project_status === 'Active' ? 'success' : 'default'}
            size="small"
          />
        </Stack>

        {project.created_at && (
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1" color="text.secondary">
              Created
            </Typography>
            <Typography variant="body1">{formatDate(project.created_at)}</Typography>
          </Stack>
        )}

        {project.updated_at && (
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1" color="text.secondary">
              Last Updated
            </Typography>
            <Typography variant="body1">{formatDate(project.updated_at)}</Typography>
          </Stack>
        )}

        {fund?.name && (
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1" color="text.secondary">
              Fund
            </Typography>
            <Typography variant="body1">{fund.name}</Typography>
          </Stack>
        )}

        {campaign?.name && (
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1" color="text.secondary">
              Campaign
            </Typography>
            <Typography variant="body1">{campaign.name}</Typography>
          </Stack>
        )}

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1" color="text.secondary">
            Open Source
          </Typography>
          <Typography variant="body1">{project.opensource ? 'Yes' : 'No'}</Typography>
        </Stack>

        {project.horizon_group && (
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1" color="text.secondary">
              Horizon Group
            </Typography>
            <Typography variant="body1">{project.horizon_group}</Typography>
          </Stack>
        )}
      </Stack>
    </MainCard>
  );
}

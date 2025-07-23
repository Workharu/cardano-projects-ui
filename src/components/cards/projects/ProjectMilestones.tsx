import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  fontSize: '1.25rem'
}));

const MilestoneHeader = styled(Typography)(({ theme }) => ({
  margin: '1.5rem 0 0.5rem 0',
  color: theme.palette.primary.main,
  fontWeight: '600'
}));

export default function ProjectMilestones({ content }: { content: string }) {
  if (!content) return null;

  // Extract milestones section
  const milestonesStart = content.indexOf('[PROJECT MILESTONES]');
  if (milestonesStart === -1) return null;

  // Simple parsing - in a real app you'd want more robust parsing
  const milestonesText = content.substring(milestonesStart);
  const milestones = milestonesText
    .split('<strong>')
    .filter((section) => section.includes('Milestone'))
    .map((section) => {
      const titleEnd = section.indexOf('</strong>');
      const title = section.substring(0, titleEnd).trim();
      const content = section.substring(titleEnd + 9).trim();
      return { title, content };
    });

  if (milestones.length === 0) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <SectionHeader variant="h5">Project Milestones</SectionHeader>
      <Divider sx={{ mb: 2 }} />

      {milestones.map((milestone, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <MilestoneHeader variant="h6">{milestone.title}</MilestoneHeader>
          <Box
            dangerouslySetInnerHTML={{ __html: milestone.content }}
            sx={{
              '& p': {
                marginBottom: '0.5rem'
              },
              '& ul': {
                paddingLeft: '1.5rem',
                marginBottom: '1rem'
              }
            }}
          />
        </Box>
      ))}
    </Box>
  );
}

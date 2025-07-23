import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MainCard from 'components/MainCard';
import { Link21 } from 'iconsax-react';

const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  fontSize: '1.25rem'
}));

const extractLinksFromHTML = (html: string | null): string[] => {
  if (!html) return [];

  const linkRegex = /<a[^>]*href="([^"]*)"[^>]*>/g;
  const matches = [];
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    matches.push(match[1]);
  }

  return matches.filter((link) => link.startsWith('http') && !link.includes('cardano.ideascale.com') && !link.includes('youtube.com'));
};

export default function ProjectLinksCard({ project, isMobile }: { project: any; isMobile: boolean }) {
  const links = extractLinksFromHTML(project.full_detail);
  const hasWebsite = project.website && project.website.startsWith('http');

  if (!hasWebsite && links.length === 0) return null;

  return (
    <MainCard border={false} sx={{ p: isMobile ? 2 : 3 }}>
      <SectionHeader variant="h5">Links</SectionHeader>
      <Stack spacing={1}>
        {hasWebsite && (
          <Button
            variant="outlined"
            startIcon={<Link21 size="18px" />}
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth={isMobile}
            sx={{ justifyContent: 'flex-start' }}
          >
            Website
          </Button>
        )}

        {links.map((link, index) => (
          <Button
            key={index}
            variant="outlined"
            startIcon={<Link21 size="18px" />}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth={isMobile}
            sx={{ justifyContent: 'flex-start' }}
          >
            {new URL(link).hostname.replace('www.', '')}
          </Button>
        ))}
      </Stack>
    </MainCard>
  );
}

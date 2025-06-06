// material-ui
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// assets
import Background from 'assets/third-party/Background';

// ==============================|| CONTACT US - HEADER ||============================== //

export default function ContactHeader() {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', pt: 9, pb: 2 }}>
      <Background />
      <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
        <Box sx={{ width: { xs: '100%', sm: 360, lg: 436 }, px: 2, py: 6, mx: 'auto' }}>
          <Stack sx={{ gap: 1 }}>
            <Typography align="center" variant="h2">
              Talk to our Expert
            </Typography>
            <Typography align="center" sx={{ color: 'text.secondary' }}>
              Have questions or need guidance? Our team is here to help you find the right solution and make informed decisions.
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

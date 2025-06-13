import { Link } from 'react-router-dom';

/** MUI **/
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/** Components **/
import { APP_DEFAULT_PATH } from 'config';

// ==============================|| ERROR 404 ||============================== //

export default function Error404() {
  return (
    <Grid
      container
      direction="column"
      spacing={4}
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: '80vh', px: 2, textAlign: 'center' }}
    >
      <Grid>
        <Typography variant="h5" color="primary" fontWeight={600}>
          404
        </Typography>
      </Grid>
      <Grid>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', sm: '4rem' },
            fontWeight: 600,
            color: 'text.primary'
          }}
        >
          Page not found
        </Typography>
      </Grid>
      <Grid>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem' },
            color: 'text.secondary',
            maxWidth: 600
          }}
        >
          Sorry, we couldn’t find the page you’re looking for.
        </Typography>
      </Grid>
      <Grid>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button component={Link} to={APP_DEFAULT_PATH} variant="contained" color="primary" sx={{ px: 3, py: 1.5, fontWeight: 600 }}>
            Go back home
          </Button>
          <Button component={Link} to="/support" variant="text" sx={{ fontWeight: 600 }}>
            Contact support &rarr;
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

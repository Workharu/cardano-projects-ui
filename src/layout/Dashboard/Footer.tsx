/** MUI **/
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { motion } from 'framer-motion';

/** Components **/
import Logo from 'components/logo';

// link - custom style
const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:hover, &:active': {
    color: theme.palette.primary.main
  }
}));

type showProps = {
  isFull?: boolean;
};

// ==============================|| LANDING - FOOTER PAGE ||============================== //

export default function Footer({ isFull }: showProps) {
  return (
    <Box sx={{ pt: isFull ? 5 : 10, pb: 10, mt: 10, bgcolor: 'secondary.200', borderColor: 'divider' }}>
      <Container>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <motion.div
              initial={{ opacity: 0, translateY: 550 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 30
              }}
            >
              <Grid container spacing={2}>
                <Grid size={12}>
                  <Logo to="/" />
                </Grid>
                <Grid size={12}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 400, maxWidth: 320 }}>
                    Cardano Projects is a platform that showcases various projects built on the Cardano blockchain, providing insights into
                    their impact and contributions to the ecosystem.
                  </Typography>
                </Grid>
              </Grid>
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={{ xs: 5, md: 2 }}>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Stack sx={{ gap: 3 }}>
                  <Typography variant="h5">Company</Typography>
                  <Stack sx={{ gap: { xs: 1.5, md: 2.5 } }}>
                    <FooterLink href="https://www.workharu.com" underline="none">
                      Profile
                    </FooterLink>
                    <FooterLink href="https://www.workharu.com" underline="none">
                      Portfolio
                    </FooterLink>
                    <FooterLink href="https://www.workharu.com" underline="none">
                      Follow Us
                    </FooterLink>
                    <FooterLink href="https://www.workharu.com" underline="none">
                      Website
                    </FooterLink>
                  </Stack>
                </Stack>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Stack sx={{ gap: 3 }}>
                  <Typography variant="h5">Help & Support</Typography>
                  <Stack sx={{ gap: { xs: 1.5, md: 2.5 } }}>
                    <FooterLink href="https://docs.cardanoprojects.com" underline="none">
                      Docs
                    </FooterLink>
                    <FooterLink href="https://docs.cardanoprojects.com/how.html" underline="none">
                      RoadMap
                    </FooterLink>
                    <FooterLink href="/contact-us" underline="none">
                      Support
                    </FooterLink>
                    <FooterLink href="/contact-us" underline="none">
                      Email Us
                    </FooterLink>
                  </Stack>
                </Stack>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Stack sx={{ gap: 3 }}>
                  <Typography variant="h5">Useful Resources</Typography>
                  <Stack sx={{ gap: { xs: 1.5, md: 2.5 } }}>
                    <FooterLink href="/support-policy" underline="none">
                      Support Policy
                    </FooterLink>
                    <FooterLink href="/licenses-term" underline="none">
                      Licenses Term
                    </FooterLink>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

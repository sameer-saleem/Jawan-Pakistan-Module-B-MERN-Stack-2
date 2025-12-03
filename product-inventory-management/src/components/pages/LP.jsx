import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Stack,
  Card,
  Chip,
  Link,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Inventory2Outlined,
  AddCircleOutline,
  EditOutlined,
  DeleteOutline,
  VisibilityOutlined,
  Speed,
  CloudDone,
  Security,
  Devices,
  TrendingUp,
  SupportAgent,
  AutoAwesome,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

export default function LandingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <AddCircleOutline sx={{ fontSize: 48 }} />,
      title: 'Add Products in Seconds',
      desc: 'Simple form to add name, price, quantity, category, and photo.',
    },
    {
      icon: <EditOutlined sx={{ fontSize: 48 }} />,
      title: 'Instant Updates',
      desc: 'Edit prices, stock levels, or descriptions anytime with one click.',
    },
    {
      icon: <VisibilityOutlined sx={{ fontSize: 48 }} />,
      title: 'Clear Overview',
      desc: 'See all your products in a beautiful, searchable table.',
    },
    {
      icon: <Inventory2Outlined sx={{ fontSize: 48 }} />,
      title: 'Real-Time Stock Tracking',
      desc: 'Always know what’s in stock, low stock, or sold out.',
    },
    {
      icon: <DeleteOutline sx={{ fontSize: 48 }} />,
      title: 'Safe & Easy Deletion',
      desc: 'Remove products safely with confirmation dialog.',
    },
    {
      icon: <Speed sx={{ fontSize: 48 }} />,
      title: 'Lightning Fast',
      desc: 'Smooth experience even with thousands of products.',
    },
  ];

  return (
    <>
      <Box
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'white',
          pt: { xs: 12, md: 18 },
          pb: { xs: 14, md: 22 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(37, 99, 235, 0.7)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip
                label="Free & Open Source"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  fontWeight: 600,
                  mb: 3,
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.2rem', md: '2.8rem' },
                  fontWeight: 600,
                  lineHeight: 1.1,
                  mb: 3,
                }}
              >
                Product Inventory
                <br />
                Management System
              </Typography>
              <Typography
                variant="h5"
                sx={{ opacity: 0.95, mb: 5, fontWeight: 400, fontSize: {xs: '1rem',  sm: '1.1rem', md: '1.3rem' } }}
              >
                Smarter Inventory. Stronger Business.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} mt={4}>
                <Button
                  component={RouterLink}
                  to="/sign-up"
                  variant="contained"
                  size="large"
                  sx={{
                    px: 5,
              py: 1.5,
                    borderRadius: '16px',
                   fontSize: {xs: '1rem',  sm: '1.1rem' },
                    fontWeight: 700,
                    bgcolor: 'white',
                    color: '#2563eb',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    '&:hover': {
                      bgcolor: '#f8f9ff',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.25)',
                    },
                    transition: 'all 0.3s',
                  }}
                >
                  Get Started Free
                </Button>
                <Button
                  component={RouterLink}
                  to="/sign-in"
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 5,
              py: 1.5,
                    borderRadius: '16px',
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: {xs: '1rem',  sm: '1.1rem' },
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: 'white' },
                  }}
                >
                  Sign In
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container sx={{ py: { xs: 10, md: 14 } }}>
        <Typography variant="h3" align="center" fontWeight={600} gutterBottom sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
          Simple. Powerful. Built for You.
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 8, maxWidth: '700px', mx: 'auto', fontSize: '1.1rem' }}>
          Everything you need to manage your inventory — without the complexity.
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: '20px',
                  bgcolor: '#f8faff',
                  border: '1px solid #e0e7ff',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: '0 20px 40px rgba(37,99,235,0.15)',
                    bgcolor: 'white',
                  },
                }}
              >
                <Box sx={{ color: '#2563eb', mb: 3 }}>{feature.icon}</Box>
                <Typography variant="h5" fontWeight={700} gutterBottom sx={{ fontSize: '1.2rem' }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: '1rem' }}>
                  {feature.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: '#f0f7ff', py: 8 }}>
        <Container>
          <Grid container spacing={4} sx={{ justifyContent: { xs: 'flex-start', sm: 'center' } }}>
            {[
              { icon: <CloudDone sx={{ fontSize: 40 }} />, text: 'Access Anywhere – Web & Mobile' },
              { icon: <Security sx={{ fontSize: 40 }} />, text: 'Secure Firebase Authentication' },
              { icon: <Devices sx={{ fontSize: 40 }} />, text: 'Perfect on All Devices' },
              { icon: <SupportAgent sx={{ fontSize: 40 }} />, text: 'Free Forever for Small Teams' },
              { icon: <TrendingUp sx={{ fontSize: 40 }} />, text: 'Grow Without Limits' },
              { icon: <AutoAwesome sx={{ fontSize: 40 }} />, text: 'Clean & Modern Design' },
            ].map((item, i) => (
              <Grid size={{ xs: "12", sm: "6", md:"4" }} key={i}>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Box sx={{ color: '#2563eb' }}>{item.icon}</Box>
                  <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.1rem' }}>
                    {item.text}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ bgcolor: '#1e40af', color: 'white', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" fontWeight={800} gutterBottom sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
            Start Managing Your Inventory Today
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 6, fontSize: '1.1rem' }}>
            No credit card required • Free forever for personal use
          </Typography>
          <Button
            component={RouterLink}
            to="/sign-up"
            variant="contained"
            size="large"
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: '16px',
              fontSize: {xs: '1rem',  sm: '1.2rem' },
              fontWeight: 700,
              bgcolor: 'white',
              color: '#1e40af',
              '&:hover': {
                bgcolor: '#f0f7ff',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s',
            }}
          >
            Create Free Account
          </Button>
        </Container>
      </Box>

      <Box sx={{ bgcolor: '#0f172a', color: '#94a3b8', py: 2 }}>
        <Container>
          <Typography align="center" variant="body1">
            © 2025 Product Inventory Management System • Made by{' '}
            <Link
              href="https://www.linkedin.com/in/sameer-%F0%9F%8E%AF-558304283/"
              target="_blank"
              sx={{
                color: '#2563eb',
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Sameer Saleem
            </Link>
          </Typography>
        </Container>
      </Box>
    </>
  );
}

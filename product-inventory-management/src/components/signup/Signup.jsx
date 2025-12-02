import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase';

// Main container — full height with split background
const PageContainer = styled(Stack)(({ theme }) => ({
  height: '100dvh',
  width: '100%',
  overflow: 'hidden',
  backgroundColor: '#f0f4f8',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

// Left blue panel (branding)
const BrandPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  background: 'linear-gradient(135deg, #0052CC 0%, #003B99 100%)',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(8),
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    borderRadius: '16px 16px 0 0',
    minHeight: '35vh',
    padding: theme.spacing(6),
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '150px',
    background: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 1440 320%27%3E%3Cpath fill=%27rgba(255,255,255,0.1)%27 fill-opacity=%270.3%27 d=%27M0,192L48,197.3C96,203,192,213,288,213.3C384,213,480,203,576,181.3C672,160,768,128,864,128C960,128,1056,160,1152,181.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z%27%3E%3C/path%3E%3C/svg%3E") bottom no-repeat',
    backgroundSize: 'cover',
  },
}));

// Right form panel
const FormPanel = styled(MuiCard)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(8),
  backgroundColor: 'white',
  borderRadius: '16px',
  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
  [theme.breakpoints.down('md')]: {
    borderRadius: '0 0 16px 16px',
    padding: theme.spacing(6),
    minHeight: '65vh',
  },
}));

// Custom styled TextField (like the image)
const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#f8fbff',
    '& fieldset': {
      borderColor: '#e0e7ff',
    },
    '&:hover fieldset': {
      borderColor: '#0052CC',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0052CC',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#64748b',
  },
  '& .MuiInputBase-input': {
    padding: '14px 16px',
  },
});

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(userCred.user, { displayName: formData.fullname });

      alert('Account created successfully!');
      navigate('/sign-in');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <>
      <CssBaseline />
      <PageContainer direction={{ xs: 'column', md: 'row' }}>
        {/* Left Brand Panel */}
        <BrandPanel>
          <Typography
            variant="h3"
            component="h1"
            fontWeight={700}
            gutterBottom
            sx={{ fontSize: { xs: '2.5rem', md: '3.5rem', textAlign: 'center' } }}
          >
            Product Inventory Management System
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              textAlign: 'center',
              maxWidth: '420px',
              fontWeight: 400,
            }}
          >
            Smarter Inventory. Stronger Business.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/website"
            sx={{
              mt: 6,
              borderRadius: '30px',
              px: 5,
              backgroundColor: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.3)',
              },
            }}
          >
            Go to Website
          </Button>
        </BrandPanel>

        {/* Right Form Panel */}
        <FormPanel elevation={0}>
          <Box sx={{ width: '100%', maxWidth: 420 }}>
            <Typography component="h1" variant="h4" fontWeight={600} gutterBottom>
              Hello Again!
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              Welcome back
            </Typography>

            <Box component="form" onSubmit={handleSignUp} noValidate>
              <Stack spacing={3}>
                <StyledTextField
                  required
                  fullWidth
                  name="fullname"
                  label="Full name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullname}
                  onChange={handleChange}
                />
                <StyledTextField
                  required
                  fullWidth
                  name="email"
                  label="Email address"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                <StyledTextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 2,
                    py: 1.8,
                    borderRadius: '12px',
                    backgroundColor: '#0052CC',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: '#003b99',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Sign Up
                </Button>
              </Stack>

              <Typography variant="body2" align="center" sx={{ mt: 4, color: 'text.secondary' }}>
                Already have an account?{' '}
                <Link
                  to="/sign-in"
                  style={{
                    color: '#0052CC',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </FormPanel>
      </PageContainer>
    </>
  );
}
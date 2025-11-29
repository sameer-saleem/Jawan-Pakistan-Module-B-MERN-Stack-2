import { signOut } from 'firebase/auth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import {auth} from '../firebase';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/sign-in");
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <Box>
      <AppBar position="static" sx={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Welcome <strong className='ms-1'>{ auth.currentUser?.displayName }</strong>
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { auth } from '../firebase/firebase';
import './header.css';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1, width: 'calc(100% - 240px)', ml: 'auto' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Product Inventory Managment
          </Typography>
          <Button color="inherit">
            Welcome <strong className='ms-1'>{ auth.currentUser?.displayName }</strong>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

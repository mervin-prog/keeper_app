import React from 'react';
import HighlightIcon from '@mui/icons-material/Highlight';
import Profile from '../components/Profile';
import { useAuthStore } from '../store/authStore';

function Header() {

    const{isAuthenticated} = useAuthStore();

    return (
      <div className='header'>
      <h1>Keeper <HighlightIcon /></h1>
      { isAuthenticated && <Profile />}
      </div>
    );
};

export default Header;

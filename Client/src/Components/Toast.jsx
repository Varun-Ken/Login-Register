import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';

export default function Toast({open, setOpen, message}) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  if (!message) return null;

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ top: '20px' }}
    >
      <div
        style={{
          backgroundColor: '#323232',
          color: 'white',
          padding: '14px 20px',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: '200px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}
      >
        {message}
      </div>
    </Snackbar>
  );
}

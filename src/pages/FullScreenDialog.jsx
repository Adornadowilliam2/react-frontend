import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';


const FullScreenDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={openDialog}>
        Open Full-Screen Dialog
      </Button>

      <Dialog
        open={isOpen}
        onClose={closeDialog}
        fullScreen
        PaperProps={{
          style: {
            width: '100vw',  // Fixed width for the dialog content
            margin: 'auto',  // Center the dialog
            height: '100%',
            borderRadius:"10px"   // Optional: adjust height if needed
          },
        }}
      >
        <DialogTitle>Full-Screen Dialog with Fixed Width</DialogTitle>
        <DialogContent>
          <p>This dialog has a full-screen overlay, but the content inside is 800px wide.</p>
          <p>Click "Close" or click outside to close the dialog.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary" variant='contained'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FullScreenDialog;

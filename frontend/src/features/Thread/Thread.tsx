import React from 'react';
import ThreadForm from '../../components/ThreadForm/ThreadForm';
import { Box } from '@mui/material';

const Thread = () => {

  return (
    <Box
      component="div"
      padding={2}
      border={1}
      margin="auto"
      sx={{ maxWidth: 600 }}
    >
      <ThreadForm />
    </Box>
  );
};

export default Thread;
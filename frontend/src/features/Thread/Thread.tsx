import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useAppDispatch } from '../../app/hook';
import { fetchALl } from './threadThunk';
import ThreadBody from '../../components/ThreadBody/ThreadBody';
import ThreadForm from '../../components/ThreadForm/ThreadForm';
import './ThreadScrollbar.css';

const Thread = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchALl());
  }, [dispatch]);

  return (
    <Box
      component="div"
      padding={2}
      margin="auto"
      sx={{ maxWidth: 600 }}
      color="#ccc"
    >
      <Box
        component="div"
        borderTop={2}
        borderBottom={2}
        borderRadius={3}
        marginBottom={2}
        id="thread"
      >
        <ThreadBody />
      </Box>

      <ThreadForm />
    </Box>
  );
};

export default Thread;
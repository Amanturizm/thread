import React, { useEffect } from 'react';
import ThreadForm from '../../components/ThreadForm/ThreadForm';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchALl } from './threadThunk';
import ThreadMessage from '../../components/ThreadMessage/ThreadMessage';
import ThreadAlert from '../../components/UI/ThreadAlert/ThreadAlert';
import './ThreadScrollbar.css';
import ThreadBody from '../../components/ThreadBody/ThreadBody';

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
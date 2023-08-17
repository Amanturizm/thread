import React, { useEffect } from 'react';
import ThreadForm from '../../components/ThreadForm/ThreadForm';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchALl } from './threadThunk';
import ThreadMessage from '../../components/ThreadMessage/ThreadMessage';

const Thread = () => {
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector(state => state.thread);

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
      <Box component="div"
           display="flex"
           flexDirection="column"
           gap={1}
           marginBottom={2}
           border={1}
           padding={2}
           sx={{ maxHeight: 300, overflowY: 'auto' }}
      >
        {messages.map(message => <ThreadMessage message={message} key={message.id} />)}
      </Box>
      <ThreadForm />
    </Box>
  );
};

export default Thread;
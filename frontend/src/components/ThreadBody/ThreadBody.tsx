import React from 'react';
import ThreadMessage from '../ThreadMessage/ThreadMessage';
import { Box } from '@mui/material';
import { useAppSelector } from '../../app/hook';
import Preloader from '../UI/Preloader/Preloader';

const ThreadBody = () => {
  const { messages, messagesLoading } = useAppSelector(state => state.thread);

  return (
    <Box component="div"
         display="flex"
         flexDirection="column"
         gap={1}
         padding={2}
         marginRight={.1}
         sx={{
           position: 'relative',
           height: 300,
           overflowY: 'auto'
        }}
    >
      {
        messagesLoading ? <Preloader /> :
        messages.map(message => <ThreadMessage message={message} key={message.id} />)
      }
    </Box>
  );
};

export default ThreadBody;
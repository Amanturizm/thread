import React from 'react';
import { Box, Typography } from '@mui/material';
import { apiUrl } from '../../constants';
import { IMessage } from '../../types';
import { COLORS } from '../../constants';

interface Props {
  message: IMessage;
}

const ThreadMessage: React.FC<Props> = ({ message }) => {
  let messageImage = message.image ? apiUrl + message.image : null;

  const randomColor = (colors: string[]): string => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Box component="div"
         display="flex"
         gap={1}
    >
      {
        message.author ?
          <Typography color={randomColor(COLORS)} fontWeight="bold">
            {message.author}:
          </Typography> :
          <Typography fontWeight="bold">
            Anonymous:
          </Typography>
      }

      <Typography>
        {message.message}
      </Typography>
      {
        messageImage ?
          <img src={messageImage} alt="img" style={{ maxWidth: 100 }} />
          : null
      }
    </Box>
  );
};

export default ThreadMessage;
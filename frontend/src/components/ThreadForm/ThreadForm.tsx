import React, { useState } from 'react';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FileInput from '../UI/FileInput/FileInput';
import { IMessageMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchALl, postOne } from '../../features/Thread/threadThunk';
import ThreadAlert from '../UI/ThreadAlert/ThreadAlert';

const initialState: IMessageMutation = {
  author: '',
  message: '',
  image: null,
};

const ThreadForm = () => {
  const dispatch = useAppDispatch();
  const { messagePostLoading } = useAppSelector(state => state.thread);

  const [state, setState] = useState<IMessageMutation>(initialState);
  const [isAlert, setIsAlert] = useState<boolean>(false);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    setState(prevState => ({ ...prevState, [name]: files ? files[0] : value }));
  };

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.message.length) {
      if (!isAlert) {
        setIsAlert(true);

        setTimeout(() => setIsAlert(false), 5000);
      }
      return;
    }

    await dispatch(postOne(state));
    setState({ ...initialState, author: state.author });
    await dispatch(fetchALl());
  };

  return (
    <Box component="form"
         display="flex"
         gap={2}
         onSubmit={sendData}
    >
      <TextField
        name="author"
        label="Author"
        value={state.author}
        onChange={changeValue}
      />
      <TextField
        name="message"
        label="Message"
        value={state.message}
        onChange={changeValue}
      />

      <FileInput onChange={changeValue} image={state.image} name="image" label="Browse" />

      <Button
        variant="outlined"
        sx={{ height: 50, cursor: messagePostLoading ? 'not-allowed' : 'pointer' }}
        type="submit"
        disabled={messagePostLoading}
      >
        {
          messagePostLoading ?
            <Box sx={{ display: 'flex' }}>
              <CircularProgress size={30} />
            </Box> :
            <SendIcon />
        }
      </Button>

      {isAlert && <ThreadAlert />}
    </Box>
  );
};

export default ThreadForm;
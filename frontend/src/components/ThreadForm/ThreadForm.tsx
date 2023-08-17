import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FileInput from '../UI/FileInput/FileInput';
import { IMessageMutation } from '../../types';
import { useAppDispatch } from '../../app/hook';
import { postOne } from '../../features/Thread/threadThunk';

const initialState: IMessageMutation = {
  author: '',
  message: '',
  image: null,
};

const ThreadForm = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<IMessageMutation>(initialState);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    setState(prevState => ({ ...prevState, [name]: files ? files[0] : value }));
  };

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(postOne(state));
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
      <FileInput onChange={changeValue} name="image" label="Browse" />

      <Button
        variant="outlined"
        sx={{ height: 50 }}
        type="submit"
      >
        <SendIcon />
      </Button>
    </Box>
  );
};

export default ThreadForm;
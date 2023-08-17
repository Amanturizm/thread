import React, { useState } from 'react';
import { Box, Button, CircularProgress, styled, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchALl, postOne } from '../../features/Thread/threadThunk';
import FileInput from '../UI/FileInput/FileInput';
import ThreadAlert from '../UI/ThreadAlert/ThreadAlert';
import { IMessageMutation } from '../../types';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#A0AAB4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
  },
  input: {
    color: '#E0E3E7'
  },
  label: {
    color: '#E0E3E7'
  }
});

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
      <CssTextField
        name="author"
        label="Author"
        value={state.author}
        onChange={changeValue}
      />
      <CssTextField
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
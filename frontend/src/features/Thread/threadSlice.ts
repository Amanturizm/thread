import { IMessage } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchALl, postOne } from './threadThunk';

interface State {
  messages: IMessage[];
  messagesLoading: boolean;
  messagePostLoading: boolean;
}

const initialState: State = {
  messages: [],
  messagesLoading: false,
  messagePostLoading: false,
};

const threadSlice = createSlice({
  name: 'thread',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchALl.pending, state => {
      state.messagesLoading = true;
    });
    builder.addCase(fetchALl.fulfilled, (state, { payload }) => {
      state.messages = payload;
      state.messagesLoading = false;
    });
    builder.addCase(fetchALl.rejected, (state, { payload }) => {
      state.messagesLoading = false;
    });

    builder.addCase(postOne.pending, state => {
      state.messagePostLoading = true;
    });
    builder.addCase(postOne.fulfilled, state => {
      state.messagePostLoading = false;
    });
    builder.addCase(postOne.rejected, state => {
      state.messagePostLoading = false;
    });
  },
});

export const threadReducer = threadSlice.reducer;
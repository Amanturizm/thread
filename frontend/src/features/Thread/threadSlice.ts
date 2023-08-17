import { IMessage } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchALl, postOne } from './threadThunk';

interface State {
  messages: IMessage[];
}

const initialState: State = {
  messages: [],
};

const threadSlice = createSlice({
  name: 'thread',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchALl.fulfilled, (state, { payload }) => {
      state.messages = payload;
    });
  },
});

export const threadReducer = threadSlice.reducer;
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { IMessage, IMessageMutation } from '../../types';

export const fetchALl = createAsyncThunk<IMessage[]>(
  'thread/fetchAll',
  async () => {
    const { data } = await axiosApi.get<IMessage[]>('/messages');
    if (!data) return [];
    return data;
  }
);
export const postOne = createAsyncThunk<void, IMessageMutation>(
  'thread/postOne',
  async (message) => {
    const formData = new FormData();

    const keys = Object.keys(message) as (keyof IMessageMutation)[];
    keys.forEach(key => {
      const value = message[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });
    await axiosApi.post('/messages', formData);
  }
);
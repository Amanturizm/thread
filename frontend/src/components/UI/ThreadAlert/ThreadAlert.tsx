import React from 'react';
import { Alert } from '@mui/material';
import './ThreadAlert.css';

const ThreadAlert = () => {
  return (
      <Alert
        className="Thread-Alert"
        variant="filled"
        severity="error"
      >
        Сообщение не может быть пустым!
      </Alert>

  );
};

export default ThreadAlert;
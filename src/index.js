import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AuthContextWrapper } from './contexts/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      light: '#616161',
      main: '#424242',
      dark: '#212121'
    }
  }
})

ReactDOM.render(
  <AuthContextWrapper>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </AuthContextWrapper>,
  document.getElementById('root')
);


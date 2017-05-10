import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const CircularProgressBar = () => (
  <MuiThemeProvider>
      <CircularProgress size={80} thickness={5} />
  </MuiThemeProvider>
);

export default CircularProgressBar;
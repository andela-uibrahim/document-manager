import ReactDom from 'react-dom';
import React from 'react';
import App from './components/App.component'
import Navbar from './components/Nav.component'

ReactDom.render(<Navbar/>, document.getElementById('navbar'));
ReactDom.render(<App/>, document.getElementById('react-app'));

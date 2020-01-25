import React from 'react';
import Home from './components/HomePage/HomePage'
import SignUp from './components/Auth/SignUp/SignUp'
import './App.css';

import { BrowserRouter } from 'react-router-dom';

export default class App extends React.Component{
  render() {
      return( 
          <SignUp/>
      );
  }
}
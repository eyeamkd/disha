import React from 'react';
import Home from './components/HomePage/HomePage'
import SignUp from './components/Auth/SignUp/SignUp'
import './App.css';



export default class App extends React.Component{
  render() {
      return( 
          <SignUp/>
      );
  }
}
import React, { Component } from 'react';
import Layout from './components/Layout';
import HomePage from './components/HomePage'; 
import Navigation from './Navigation';

export class App extends Component {
  render() {
    return (
      <Layout>  
          <Navigation/>
      </Layout>
    )
  }
}   

export default App

import React, { Component } from 'react';
import Layout from './components/Layout';
import Navigation from './navigation'; 
import {sampleFunction} from './firebase/firebase.utils'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export class App extends Component { 
  
  render() { 
  sampleFunction();
    return (
      <Layout>  
          <Navigation/>
      </Layout>
    )
  }
}   

export default App

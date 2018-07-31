import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Nav from './components/nav'
import Bannerca from './components/bannercomp/banner'
import Body from './components/Grid/body'


class App extends Component {
  render() {
    return (
     <div>
     <Nav/>
     <Bannerca/>
     
  
      <Body/>
  

     </div>
    );
  }
}

export default App;

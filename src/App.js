// Importing the React Library, and the Component class
import React, { Component } from 'react'; 
import './App.scss';

// Import my Homepage Component 
import Homepage from './Components/Homepage/Homepage'; 
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';


// Creating a Component called App
class App extends Component {

// dc5439cea49b4eccacadd3be7ef42b11 

// Need a render method on a class based Component in order to render JSX
render() {

  return (
    // JSX
    <div className="App">
      <Header />
      <Homepage />

      <Footer />
    </div>
  );
}

}

// Exporting the App Component, so that it can be used somewhere else
export default App;

import React, { Component } from 'react';
import DesiredTemp from './DesiredTemp';


class Thermostat extends Component {
  constructor() {
    super();
    this.state = {
  
    }
  }
  
  componentDidMount() {
  
  }
  
  render() {
    return (
    <div className="thermostateContainer"> 
      <h2>Indoor Temperature:</h2>
      { this.props.indoorTemperature } <span>&#8451;</span>
      { this.props.outdoorTemperature }
      <DesiredTemp 
        hiddenProp={ this.props.hiddenProp } 
        onDesiredInput={ this.props.onDesiredInput } 
        mode={ this.props.mode }
      />
    </div>
    )
  } 
  
}

export default Thermostat;
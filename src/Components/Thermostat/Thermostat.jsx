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
    <div> 
      { this.props.indoorTemperature }
      { this.props.outdoorTemperature }
      <DesiredTemp hiddenProp/>
    </div>
    )
  } 
  
}

export default Thermostat;
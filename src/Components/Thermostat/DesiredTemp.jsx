import React, { Component } from 'react'; 
import './DesiredTemp.scss'

class DesiredTemp extends Component {
  constructor() {
    super();
    this.state = {
     
    };
  }


  render() {
    return (
      <div  className = { this.props.hiddenProp ? 'inputTempHidden' : 'inputTempShow' } >
        <label htmlFor="desiredTempInputField"></label>
        <input type="text" id="desiredTempInputField"/>
      </div>
    )
  }
}

export default DesiredTemp;
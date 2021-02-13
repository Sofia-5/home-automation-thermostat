
import React, { Component } from 'react';
import axios from "axios";
import Thermostat from '../Thermostat/Thermostat'; 


// A. Need to make media Queries to make it responsive on mobile
// B. Not sure 
// C. Save memory - save on cashe
// VIEW 1
// D. Home owner can see their current tempature in the room. This switches between heating and cooling in real time once tempature in the room changes. *
// E. Button to turn off the thermostat *
// F. Button to switch thermostat to Heating mode *
// G. Button to switch thermostat to Cooling mode *
// H. An up and down button for user to set desired tempature. AND Button to set the thermostat to auto mode. *
// VIEW 2
// I. When set to Auto Mode, user can see if the thermostat is set to heating or cooling and in relation to their desired set tempature. *
// Restrictions: Thermostat cannot be set to cooling if the tempature outside is below 0 degrees celcius *
// Checks: If thermostat is on automode and the current tempature in the room is above the desired temp set by user AND the current outisde tempature outside is below 0 degrees celcius, THEN thermostat goes to stand-by mode INSTEAD of cooling. 
// Current tempature = average tempature (get three inputs and get average)

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      indoorTemperature: null,
      outdoorTemperature: null,
      hiddenProp: true,
    };
  }

  componentDidMount() {
    axios({
      url: 'http://api-staging.paritygo.com/sensors/api/sensors/',
      method: "GET",
      datatype: "json",
      params: {

      },
    }).then((response) => {
        //console.log(response);
          // need a function that is going to grab the indoor temp and outdoor temp 
          // loop through the array of data 
          // if statement to check if the name equals 'temperature 1' and 'outdoor 1' 
          // update state 
      const data = response.data;
      //console.log(data);
      
      data.forEach(element => {
        if (element.name === "Temperature 1") {
          this.setState ( {
            indoorTemperature: element.latest_value
          })
        } else if (element.name === "Outdoor 1") {
          this.setState ({
            outdoorTemperature: element.latest_value
          })
        }
      // console.log(element);
      });
    });
  }

  onTempChange = (mode) => {
    this.setState({
  
    })
   
    axios({
      url: 'http://api-staging.paritygo.com/sensors/api/thermostat/dc5439cea49b4eccacadd3be7ef42b11',
      method: "GET",
      datatype: "json",
      params: {
        state: mode
      },
    }).then((response) =>{
          console.log(response);
          
      const data = response.data;
      console.log(data);

    });
  }


  
  onDesiredInput = (mode) => {
    console.log(this.state.hiddenProp);

    this.setState({
      hiddenProp : this.state.hiddenProp= false
    })
    
  }


  render() {
    return (
      <div className="homepageContainer">
          <div className="powerOff">
            <button className="offButton" onClick= {(e)=>this.onTempChange('off')}>Off</button>
            <button className="onButton" onClick= {(e)=>this.onTempChange('On')}>On</button>
          </div>
        <div className="thermostatContainer"> 
          <div className="tempatureDisplay">
            {/* need two states, one for outdoor and one for indoor temp  */}
            <h2>Indoor Temperature:</h2><Thermostat hiddenProp={this.state.hiddenProp}   indoorTemperature = { this.state.indoorTemperature }/> 
          </div>
          <div className="buttons">
            <button className="heatButton" onClick= {(e)=>this.onDesiredInput('heat')}>Heating Mode</button>
            <button className="coolButton" onClick= {(e)=>this.onDesiredInput('cool')}>Cooling Mode</button>
            <button className="autoHeatButton" onClick= {(e)=>this.onTempChange('auto_heat')}>Auto Heat</button>
            <button className="autoCoolButton" onClick= {(e)=>this.onTempChange('auto_cool')}>Auto Cool</button>
            <button className="autoStandbyButton" onClick= {(e)=>this.onTempChange('Auto_standby')}>Stand By</button>
          </div>
        </div>

      </div>
    )
  } 

}
export default Homepage;
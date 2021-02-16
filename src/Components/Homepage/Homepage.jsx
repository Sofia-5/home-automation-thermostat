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
const parityGoAPI = 'http://api-staging.paritygo.com/sensors/api/';
// const partityAPIRegister = `${parityGoAPI}thermostat/register/`

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      indoorTemperature: null,
      outdoorTemperature: null,
      hiddenProp: true,
      currentMode: " ",
      currentID: " ",
    };
  }

  
  componentDidMount() {
    // API call for returning the hash of the UUID assigned to the thermostat
    // axios({
    //   url: partityAPIRegister,
    //   method: "GET",
    //   datatype: "json"
    // }).then((response) => {
    //   const UUIDdata = response.data;
  
    // })
  
    // API call for getting the data (indoor & outdoor temperature) from the sensor 
    axios({
      url: `${parityGoAPI}sensors/`,
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
            indoorTemperature: Math.round(element.latest_value).toFixed(1) 
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
    this.setState ({
      currentMode: mode
    });
  
    // API call to set desired mode and append the user UUID 
    axios({
      url: 'http://api-staging.paritygo.com/sensors/api/thermostat/dc5439cea49b4eccacadd3be7ef42b11/',
      method: "PATCH",
      datatype: "json",
      data: {
        state: mode
      },
    }).then((response) =>{
          console.log(response);
          
      const data = response.data;
      console.log(data);
      console.log(this.state.currentMode)
    });
  }
  
  onDesiredInput = () => {
    this.setState({
      hiddenProp: this.state.hiddenProp= !this.state.hiddenProp,
      
    })
  }


  //Checks: If thermostat is on automode and the current tempature in the room is above the desired temp set by user AND the current outisde tempature outside is below 0 degrees celcius, THEN thermostat goes to stand-by mode INSTEAD of cooling.
  
  // standbyMode(){
  //   console.log(this.state.mode)
  //   if(this.state.outdoorTemperature > 0 && this.state.mode == 'auto_heat'){
  //     this.onDesiredInput('auto_standby')
  //     this.onTempChange('auto_standby')
  //     }
  // }

  coolMode = () => {
    if(this.state.outdoorTemperature > 0){
      this.onDesiredInput();
      this.onTempChange('cool')
    }
  }

  render() {
    return (
      <div className="homepageContainer">
        <div className="power">
          <button 
            className="offButton" 
            onClick= {()=>this.onTempChange('off')}
            >
            Off
          </button>
          <button 
            className="onButton" 
            onClick= {()=>this.onTempChange('on')}
            >
            On
          </button>
        </div>
        <div className="thermostatContainer"> 
          <div className="temperatureDisplay">
            <Thermostat 
              hiddenProp={ this.state.hiddenProp }   
              onDesiredInput={ this.onDesiredInput } 
              indoorTemperature={ this.state.indoorTemperature } 
              mode={ this.state.currentMode }
            /> 
          </div>
          <div className="buttons">
            <button 
              className="heatButton"  
              onClick= {()=>this.onDesiredInput('heat')}
              >
              <i class="fas fa-fire" id="heatIcon"></i>
              Heat Mode
            </button>
            <button 
              className="coolButton" 
              onClick= {()=>this.coolMode()}
              >
              <i class="fas fa-snowflake" id="heatIcon"></i>
              Cool Mode
            </button>
          
            <button 
              className="autoHeatButton" 
              onClick= {()=>this.onTempChange('auto_heat')}
              mode={this.state.currentMode}
              >
              Auto Heat
            </button>
            <button 
              className="autoCoolButton" 
              onClick= {()=>this.onTempChange('auto_cool')}
              mode={this.state.currentMode}
              >
              Auto Cool
            </button>
            <button 
              className="autoStandbyButton" 
              onClick= {()=>this.onTempChange('auto_standby')}
              mode={this.state.currentMode}
              >
              Stand By
            </button>
          </div>
        </div>

      </div>
    )
  } 

}
export default Homepage;
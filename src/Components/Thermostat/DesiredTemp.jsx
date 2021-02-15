import React, { Component } from 'react'; 
import './DesiredTemp.scss';
import axios from "axios";

class DesiredTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desiredTemp: '',
      hiddenProps: true
    };
  }

  captureTemp = (e) => {
    this.setState({ desiredTemp: e.target.value}) 
  }

  triggerApiCall =(e)=>{
    this.props.onDesiredInput(e);
    this.setState({
      hiddenProps : this.state.hiddenProps= !this.state.hiddenProps
    })

    axios({
      url: 'http://api-staging.paritygo.com/sensors/api/thermostat/dc5439cea49b4eccacadd3be7ef42b11/',
      method: "PATCH",
      datatype: "json",
      data: {
        state: this.props.mode
      },
    }).then((response) =>{
          console.log(response);
          
      const data = response.data;
      console.log(data);
    });
  }

  render() {
    return (
      <div className="container">
        <div  className = { this.props.hiddenProp ? 'inputTempHidden' : 'inputTempShow' } >
          <label htmlFor="desiredTempInputField"></label>
          <input 
            type="text" 
            id="desiredTempInputField" 
            onChange={(e)=> this.captureTemp(e)}
          />
          <button 
            className="submit" 
            onClick= {(e)=> this.triggerApiCall(e)}
            >
            Submit
          </button>
        </div>
        <div>
          <label  
            className= { this.state.hiddenProps ? 'inputTempHidden' : 'inputTempShow' } 
            htmlFor="setTemp"> Desired temperature is set to: { this.state.desiredTemp }
          </label>
        </div>
      </div>
    )
  }
  
}

export default DesiredTemp;
import React, { Component } from 'react'; 
import './DesiredTemp.scss';
import axios from "axios";

class DesiredTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desiredTemp: null,
      hiddenProps: true,
      inputError: " ",
    };
  }

  captureTemp = (e) => {
    this.setState ({desiredTemp: e.target.value});
  };

  validate = () => {
      if (this.state.desiredTemp === null || this.state.desiredTemp === undefined || this.state.desiredTemp === " ") {
        
        this.setState({
        inputError : "Enter your desired temperature value", 
      })
      return false
    }
  }


    // const {value} = e.target;
    // let errors = this.state.errors;
    // switch (value) { case value = value.length > 1 ? 'Enter your desired temperature value' : this.setState(desiredTemp: e.target.value)};
    // this.setState(error(value))

    // error handling for accepting only integers 
  

  triggerApiCall =(e)=>{
    this.props.onDesiredInput(e);
    const isValid = this.validate();

    if (isValid) { 
      // I want to run the call 
      axios({
        url: 'http://api-staging.paritygo.com/sensors/api/thermostat/dc5439cea49b4eccacadd3be7ef42b11/',
        method: "PATCH",
        datatype: "json",
        data: {
          state: this.props.mode,
          newTemp: this.state.desiredTemp
        },
      }).then((response) =>{
        console.log(response);
          
        const data = response.data;
        console.log(data);

        this.setState({
          hiddenProps : this.state.hiddenProps= !this.state.hiddenProps
        })
      });
    } else {
      // I do not want to run the call
      return false;
    }
    

  }

  render() {
    return (
      <div className="container">
        <div>
          <label  
            className= { this.state.hiddenProps ? 'inputTempHidden' : 'inputTempShow' } 
            htmlFor="setTemp"> Desired temperature is set to: { this.state.desiredTemp }
          </label>
        </div>
        <form className = { this.props.hiddenProp ? 'inputTempHidden' : 'inputTempShow' } >
          <label htmlFor="desiredTempInputField"></label>
          <input 
            type="number" 
            maxlength="2" 
            minlength="1" 
            required
            id="desiredTempInputField" 
            onChange={(e)=> this.captureTemp(e)}
          />
          <button 
            className="submit" 
            onClick= {(e)=> this.triggerApiCall(e)}
            >
            Submit
          </button>
        </form>
        <div className="inputError">{this.state.inputError}</div> 
      </div>
    )
  }
  
}

export default DesiredTemp;
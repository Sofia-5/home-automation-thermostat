import React, { Component } from 'react'; 
import './DesiredTemp.scss';
import axios from "axios";

class DesiredTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desiredTemp: '',
      hiddenProps: true,
      inputError: 'Enter your desired temperature value'
    };
  }

  captureTemp = (e) => {
    // e.preventDefault();
    // if (!value) {
    //   return <div>{this.setState.error}</div>;
    // } 
    // return 
    this.setState ({desiredTemp: e.target.value});
  };

  validate = () => {
    let inputError = 'Enter your desired temperature value';
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
      console.log(this.state)
    }
    this.setState({
      hiddenProps : this.state.hiddenProps= !this.state.hiddenProps
    })

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
    });
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
          <div className="inputError">{this.state.inputError}</div> 
          <button 
            className="submit" 
            onClick= {(e)=> this.triggerApiCall(e)}
            >
            Submit
          </button>
        </form>
      </div>
    )
  }
  
}

export default DesiredTemp;
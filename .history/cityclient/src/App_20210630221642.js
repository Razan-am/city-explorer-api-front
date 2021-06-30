import React, { Component } from 'react';
import AlertMessage from './components/AlertMessage';
import Weather from './components/Weather';
import Image from 'react-bootstrap/Image';
import axios from 'axios';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city_name: '',
      latitude: '',
      longitude: '',
      error: '',
      show: false,
      weatherData:[]
    }
  }
  handlerData = (e) => {
    this.setState({
      city_name: e.target.value,
    })
  }
  handlerSubmit = async (e) => {
    e.preventDefault()

    try {
      let axiosResponed = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.0a80fd547a3c1e8574e39921b81514c5&q=${this.state.city_name}&format=json`);

      let axiosLocalApi= await axios.get(`http://localhost:8000/weather?key=pk.0a80fd547a3c1e8574e39921b81514c5lon=${this.state.longitude}&lat=${this.state.latitude}&searchQuery=${this.state.city_name}`)

      this.setState({
        city_name: axiosResponed.data[0].display_name,
        latitude: axiosResponed.data[0].lat,
        longitude: axiosResponed.data[0].lon,
        alert:false,
        show: true,
        weatherData:axiosLocalApi.data
      })
      console.log(axiosLocalApi.data)
      console.log(axiosResponed.data)
    }catch (error){
      this.setState({
        error:"please provide a valid city name",
        alert:true,
        show:false,
      })
    }
    
  }
  render() {
    return (
      <>
      <AlertMessage 
      alert={this.state.alert}
      error={this.state.error}/>
        <form onSubmit={this.handlerSubmit} style={{ marginLeft: '100px', paddingTop: '20px', marginButton: '20px', display: 'block', width: '50px' }}>
          <input type='text' placeholder='City Name' onChange={(e) => { this.handlerData(e) }} />
          <button >Explorer!</button>
        </form>
        <div>
        {this.state.show &&
          <span>
            <h5>{this.state.display_name}</h5>
            <Image alt='map' src={`https://maps.locationiq.com/v3/staticmap?key=pk.0a80fd547a3c1e8574e39921b81514c5&center=${this.state.latitude},${this.state.longitude}&zoom=1-8`} fluid style={{ margin: '100px', width: '1000px' }} />
          </span>
        }
        </div>
        {
          this.state.weatherData.map(weatherData=>{
            return <Weather desc={weatherData.description} date={weatherData.date}/>
          })
        }
      </>
    )
  }
}

export default App;
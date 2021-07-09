import React, { Component } from 'react';
import AlertMessage from './components/AlertMessage';
import Weather from './components/Weather';
import Image from 'react-bootstrap/Image';
import axios from 'axios';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_name: '',
      lat: '',
      lon: '',
      error: '',
      show: false,
      weatherData: [],
      moviesData:[]
    }
  }
  handlerData = (e) => {
    e.preventDefault()
    this.setState({
      display_name: e.target.value,
      newCity:e.target.value
    })
    console.log('string',e.target.value);
  }
  handlerSubmit = async (e) => {
    e.preventDefault()
    // let axiosResponed = 
    await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.0a80fd547a3c1e8574e39921b81514c5&q=${this.state.display_name}&format=json`).then(request=>{

      this.setState({
        display_name: request.data[0].display_name,
        lat: request.data[0].lat,
        lon: request.data[0].lon,
        alert: false,
        show: true,
      })
    }).then(async()=>{
      const axiosLocalApi = await axios.get(`http://localhost:8000/weather/?key=1ce9a45e3f574b64af6379c6c4a8b0cc&lat=${this.state.lat}&lon=${this.state.lon}`)
        this.setState({
          weatherData: axiosLocalApi.data
        })
      console.log(axiosLocalApi.data);
    }).then(async()=>{
      console.log('display',this.state.display_name);
      let city_name = this.state.display_name.split(',')[0]
      console.log('city',city_name);
      const moviesApi = await axios.get(`http://localhost:8000/movies/?query=${this.state.newCity}`)
      this.setState({
        moviesData:moviesApi.data
      })
      console.log(moviesApi.data);
    })
    .catch((error) => {
      
      this.setState({
        error: "please provide a valid city name",
        alert: true,
        show: false,
      })
    })
  }
  render() {
    return (
      <div style={{ backgroundColor:'beige'}}>
        <h1 style={{ textAlign:'center'}}>Please enter a city name </h1>
        <AlertMessage
          alert={this.state.alert}
          error={this.state.error} />
        <form onSubmit={this.handlerSubmit} style={{ marginLeft: '550px'}}>
          <input type='text' placeholder='City Name' onChange={(e) => { this.handlerData(e) }} />
          <button >Explorer!</button>
        </form>
          {this.state.show &&
            <div>
              <h4 style={{ textAlign:'center'}}>City Name={this.state.display_name}</h4>
              <h4 style={{ textAlign:'center'}}>Longitude={this.state.lon}</h4>
              <h4 style={{ textAlign:'center'}}>Lattitude={this.state.lat}</h4>
              <Image alt='map' src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=1-8`} fluid style={{ margin: '150px', width: '1000px' }} />
            </div>
          }
        {
          // console.log(this.state.weatherData)&&
          this.state.weatherData.map((item)=>{
            console.log('helllo');
            return <Weather desc={item.description} date={item.date}  />
          })
      }
      {
        // console.log(this.state.moviesData)&&
        this.state.moviesData.map((item)=>{
          return(
            <div>
                <p style={{fontFamily:'cursive'},}>{item.title}</p>
                <p>{item.total_votes}</p>
                <img alt={item.title} src={item.poster}/>
            </div>
          )
        })
      }
      </div>
    )
  }
}

export default App;

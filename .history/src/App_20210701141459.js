import React, { Component } from 'react';
import AlertMessage from './components/AlertMessage';
import Weather from './components/Weather';
import Movies from './components/Movies';
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
    this.setState({
      display_name: e.target.value,
    })
  }
  handlerSubmit = async (e) => {
    e.preventDefault()
    let axiosResponed = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.display_name}&format=json`).then(request=>{

      this.setState({
        display_name: request.data.display_name,
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
      // console.log(axiosLocalApi.data);
    }).then(async(city)=>{
      const moviesApi = await axios.get(`http://localhost:8000/movies/?query=paris`)

      this.setState({
        moviesData:moviesApi.data
      })
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
      <>
        <AlertMessage
          alert={this.state.alert}
          error={this.state.error} />
        <form onSubmit={this.handlerSubmit} style={{ marginLeft: '100px', paddingTop: '20px', marginButton: '20px', display: 'block', width: '50px' }}>
          <input type='text' placeholder='City Name' onChange={(e) => { this.handlerData(e) }} />
          <button >Explorer!</button>
        </form>
          {this.state.show &&
            <div>
              <h5>City Name={this.state.display_name}</h5>
              <h5>Longitude={this.state.lon}</h5>
              <h5>Lattitude={this.state.lat}</h5>
              <Image alt='map' src={`https://maps.locationiq.com/v3/staticmap?key=pk.0a80fd547a3c1e8574e39921b81514c5&center=${this.state.lat},${this.state.lon}&zoom=1-8`} fluid style={{ margin: '100px', width: '1000px' }} />
            </div>
          }
        {
          // console.log(this.state.weatherData)&&
          this.state.weatherData.map((item)=>{
            console.log('helllo');
            return <Weather desc={item.description} date={item.date} />
          })
      }
      {
        console.log(this.state.moviesData)&&
        this.state.moviesData.map((item)=>{
          return(
            <div>
                <p>{item.title}</p>
                <p>{item.total_votes}</p>
                <img alt={item.title} src={item.poster}/>
            </div>
            // <Movies 
            // title={item.title} votes={item.total_votes} poster={item.poster}/>
          )
        })
      }
      </>
    )
  }
}

export default App;

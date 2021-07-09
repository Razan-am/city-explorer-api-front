import React, { Component } from 'react'

class Weather extends Component {
    render() {
        console.log(this.props);
        return (
            <>
                <h5 style={{ marginLeft: '50px' }} >{this.props.desc}</h5>
                <h6 style={{ marginLeft: '50px' }} >{this.props.date}</h6>
            </>
        )
    }
}

export default Weather
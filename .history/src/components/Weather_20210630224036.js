import React, { Component } from 'react'

class Weather extends Component {
    render() {
        console.log(this.props);
        return (
            <>
                <h6>{this.props.desc}</h6>
                <h6>{this.props.date}</h6>
            </>
        )
    }
}

export default Weather
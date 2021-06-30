import React, { Component } from 'react'

class Weather extends Component {
    render() {
        return (
            <>
                <h1>{this.props.desc}</h1>
                <h1>{this.props.date}</h1>
            </>
        )
    }
}

export default Weather
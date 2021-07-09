import React, { Component } from 'react'

class Weather extends Component {
    render() {
        console.log(this.props);
        return (
            <>
                <h6 style={{ marginLeft: '150px' }} >{this.props.desc}</h6>
                <h6 style={{ marginLeft: '150px' }} >{this.props.date}</h6>
            </>
        )
    }
}

export default Weather
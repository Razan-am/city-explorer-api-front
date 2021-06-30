import React, { Component } from 'react';

class Movies extends Component {
    render() {
        return (
            <div>
                                <h6>{this.props.desc}</h6>
                <h6>{this.props.date}</h6>
            </div>
        )
    }
}

export default Movies;

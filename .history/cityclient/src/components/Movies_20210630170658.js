import React, { Component } from 'react';

class Movies extends Component {
    render() {
        return (
            <div>
                <p>{this.props.title}</p>
                <p>{this.props.total_votes}</p>
                <img alt='img' src={this.props.img} />
            </div>
        )
    }
}

export default Movies;

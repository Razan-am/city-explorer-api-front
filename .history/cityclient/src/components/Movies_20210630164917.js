import React, { Component } from 'react';

class Movies extends Component {
    render() {
        return (
            <div>
                <p>{this.props.title}</p>
                <p>{this.props.total_votes}</p>
                <img alt={this.props.title} src={this.props.poster} />
            </div>
        )
    }
}

export default Movies;

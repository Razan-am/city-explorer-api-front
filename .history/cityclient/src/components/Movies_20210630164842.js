import React, { Component } from 'react';

class Movies extends Component {
    render() {
        return (
            <div>
                <p>{this.props.title}</p>
                <p>{item.total_votes}</p>
                <img alt={item.title} src={item.poster} />
            </div>
        )
    }
}

export default Movies;

import React, { Component } from 'react';

class Movies extends Component {
    render() {
        return (
            <div>
                <p>The Movie Name:{item.title}</p>
            <p>Movie Votes:{item.total_votes}</p>
            <img alt={item.title} src={item.poster}/>
            </div>
        )
    }
}

export default Movies;

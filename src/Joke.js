import React, { Component } from 'react'
import './Joke.css';

class Joke extends Component {
    getColorAndEmoji() {
        const votes = this.props.joke.votes;
        if (votes >= 15) {
            return {
                color: "#4CAF50",
                emoji: 'em em-rolling_on_the_floor_laughing'
            };
        } else if (votes >= 12) {
            return {
                color: "#8BC34A",
                emoji: 'em em-laughing',
            };
        } else if (votes >= 9) {
            return {
                color: "#CDDC39",
                emoji: 'em em-smiley',
            };
        } else if (votes >= 6) {
            return {
                color: "#FFC107",
                emoji: 'em em-slightly_smiling_face'
            };
        } else if (votes >= 3) {
            return {
                color: "#FFC107",
                emoji: 'em em-neutral_face'
            };
        } else if (votes >= 0) {
            return {
                color: "#FF9800",
                emoji: 'em em-confused'
            }
        } else {
            return {
                color: "#f44336",
                emoji: 'em em-angry'
            };
        }
    }
    render() {
        const { color, emoji } = this.getColorAndEmoji();
        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <i onClick={() => this.props.handleVote(this.props.joke.id, 1)} className='fas fa-arrow-up'></i>
                    <span className="Joke-votes" style={{ borderColor: color }}>{this.props.joke.votes}</span>
                    <i onClick={() => this.props.handleVote(this.props.joke.id, -1)} className='fas fa-arrow-down'></i>
                </div>
                <div className="Joke-text">
                    {this.props.joke.text}
                </div>
                <div className="Joke-smiley">
                    <i className={emoji}></i>
                </div>
            </div>
        )
    }
}

export default Joke;
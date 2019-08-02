import React, { Component } from 'react'
import axios from 'axios';
import uuid from 'uuid/v4';
import './Jokeslist.css';
import Joke from './Joke';

class Jokeslist extends Component {
    static defaultProps = {
        jokesNum: 10
    }
    constructor(props) {
        super(props);
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'), //if there are any jokes in local storage parse them into their original form from json else parse '[]' --> []
            loading: false
        }
        this.seenJokes = new Set(this.state.jokes.map(j => j.text));
        this.handleVote = this.handleVote.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        if (this.state.jokes.length === 0) {
            this.getJokes();
        }
    }
    async getJokes() {
        try {
            const jokes = [];
            while (jokes.length < this.props.jokesNum) {
                const res = await axios.get('https://icanhazdadjoke.com/', {
                    headers: {
                        Accept: 'application/json',
                    }
                });
                const joke = res.data.joke;
                if (!this.seenJokes.has(joke)) {
                    jokes.push({ id: uuid(), text: joke, votes: 0 });
                } else {
                    console.log('Duplicate Joke: ' + joke);
                }
            }
            this.setState({
                jokes: jokes,
                loading: false
            })
            window.localStorage.setItem('jokes', JSON.stringify(jokes)); //Json.stringify because localstorage take up only strings
        } catch (e) {
            alert(e);
            this.setState({ loading: false })
        }
    }
    handleVote(id, delta) {
        this.setState(st => ({
            jokes: st.jokes.map(j => j.id === id ? { ...j, votes: j.votes + delta } : j)
        }),
            () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
        )
    }
    handleClick() {
        this.setState({ loading: true }, this.getJokes); // run getJokes after state is set
    }
    render() {
        const jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
        if (this.state.loading) {
            return (
                <div className="Jokelist-loader">
                    <i className="far fa-4x fa-laugh fa-spin"></i>
                    <h1>Loading...</h1>
                </div>
            )
        }
        return (
            <div className="Jokelist">
                <div className="Jokelist-sidebar">
                    <h1 className="Jokelist-title"><span>Dad's</span> Jokes</h1>
                    <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
                    <button onClick={this.handleClick} className="Jokelist-getmore">New Jokes</button>
                </div>
                <div className="Jokelist-jokes">
                    {jokes.map(j => {
                        return <Joke key={j.id} joke={j} handleVote={this.handleVote} />
                    })}
                </div>
            </div>
        )
    }
}

export default Jokeslist;
import React from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
    const {votes, anecdotes} = props
    let largestKey = null
    if(votes !== undefined && Array.isArray(votes) && votes.length > 0) {
        largestKey = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b)
    }
    if(!largestKey) {
        return (
            <div>
            <h1>no statistics</h1>
            </div>
        )
    } else {
        return (
            <div>
            <h1>anectode with most votes:</h1>
            <p>{anecdotes[largestKey]}
            <br/>
            has {votes[largestKey]} votes
            </p>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: []
        }
    }
    
    render() {
        const randSelected = (anecdotes) => () => {
            var max = Object.keys(anecdotes).length - 1;
            this.setState({ selected: Math.floor(Math.random() * max) })
        }
        const vote = (selected, votes) => () => {
            const votesCopy = [...votes]
            if(votesCopy[selected] === undefined) {
                votesCopy[selected] = 1
            } else {
                votesCopy[selected] = votesCopy[selected]  + 1
            }
            this.setState({ votes: votesCopy })
        }
        return (
            <div>
            {this.props.anecdotes[this.state.selected]}
            <p>has {this.state.votes[this.state.selected]} votes</p>
            <p><button onClick={vote(this.state.selected, this.state.votes)}>vote</button>
            <button onClick={randSelected(this.props.anecdotes)}>next anectode</button></p>
            <Statistics votes={this.state.votes} anecdotes={this.props.anecdotes}/>
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
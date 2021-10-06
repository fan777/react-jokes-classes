import React from "react";
import axios from "axios";
import JokeClass from "./JokeClass";
import "./JokeList.css";

class JokeListClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { jokes: [] }
    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.vote = this.vote.bind(this);
  }

  componentDidMount() {
    if (this.state.jokes.length < this.props.numJokesToGet)
      this.getJokes()
  }
  componentDidUpdate() {
    if (this.state.jokes.length < this.props.numJokesToGet)
      this.getJokes()
  }

  async getJokes() {
    try {
      let jokes = this.state.jokes;
      let seenJokes = new Set();

      while (jokes.length < this.props.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let { status, ...joke } = res.data;

        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);
          jokes.push({ ...joke, votes: 0 });
        } else {
          console.error("duplicate found!");
        }
      }

      this.setState({ jokes });
    } catch (e) {
      console.log(e);
    }
  }

  /* empty joke list and then call getJokes */

  generateNewJokes() {
    this.setState({ jokes: [] });
  }

  /* change vote for this id by delta (+1 or -1) */

  vote(id, delta) {
    this.setState(st => ({
      jokes: st.jokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    }));
  }

  render() {
    const { jokes } = this.state;

    if (jokes.length) {
      let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

      return (
        <div className="JokeList">
          <button className="JokeList-getmore" onClick={this.generateNewJokes}>
            Get New Jokes
          </button>

          {sortedJokes.map(j => (
            <JokeClass text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
          ))}
        </div>
      );
    }

    return null;
  }
}

JokeListClass.defaultProps = {
  numJokesToGet: 10
}

export default JokeListClass;

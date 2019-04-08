import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentNote: '',
      username: '',
      notes: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  componentDidMount() {
    const notesRef = firebase.database().ref('notes');
    notesRef.on('value', snapshot => {
      let notes = snapshot.val();
      let newState = [];
      for (let note in notes) {
        newState.push({
          id: note,
          title: notes[note].title,
          user: notes[note].user
        });
      }
      this.setState({
        notes: newState
      });
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const notesRef = firebase.database().ref('notes');
    const note = {
      title: this.state.currentNote,
      user: this.state.username
    };
    notesRef.push(note);
    this.setState({
      currentNote: '',
      username: ''
    });
  }

  removeNote(noteId) {
    const noteRef = firebase.database().ref(`/notes/${noteId}`);
    noteRef.remove();
  }

  render() {
    return (
      <div className="app">
        <header>
          <div className="wrapper">
            <h1>Pointless Notes</h1>
          </div>
        </header>
        <div className="container">
          <section className="add-note">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="username"
                onChange={this.handleChange}
                value={this.state.username}
                placeholder="What's your name?"
              />
              <input
                type="text"
                name="currentNote"
                placeholder="What pointless thing do you want to remember?"
                onChange={this.handleChange}
                value={this.state.currentNote}
              />
              <button>Add a note (even though it is pointless)</button>
            </form>
          </section>
          <section className="display-note">
            <div className="wrapper">
              <ul>
                {this.state.notes.map(note => {
                  return (
                    <li key={note.id}>
                      <h3>{note.title}</h3>
                      <p>Author: {note.user}</p>
                      <button onClick={() => this.removeNote(note.id)}>Remove Note</button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;

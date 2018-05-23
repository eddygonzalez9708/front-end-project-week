import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CreateNote.css';
import Navigation from '../Navigation/Navigation';

class CreateNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: ''
        }
    }

    handleOnChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <div className="cont">
                <Navigation />
                <div className="createcardcontainer">
                    <h4>Create New Note:</h4>
                    <input type='text' name='title' placeholder='Note Title' value={this.state.title} onChange={this.handleOnChange} />
                    <textarea name="text" rows="15" cols="50" maxLength="1000" placeholder="Note Content" value={this.state.text} onChange={this.handleOnChange}></textarea>
<<<<<<< HEAD
                    <Link to="/"><button onClick={() => this.props.addNote({ id: this.props.notes[this.props.notes.length-1].id+1, title: this.state.title, text: this.state.text })}>Save</button></Link> 
=======
                    <Link to="/"><button onClick={() => this.props.addNote({ title: this.state.title, text: this.state.text })}>Save</button></Link> 
>>>>>>> 84d351c9bc02fd1f746ec4a92576c40646625eb2
                </div>
            </div>
        )
    }
}

export default CreateNote; 
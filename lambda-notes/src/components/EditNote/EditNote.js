import React, { Component } from "react";
import axios from "axios";
import Navigation from "../Navigation/Navigation";
import EditNoteCard from "./EditNoteCard";
import { updateNote } from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./EditNote.css";

class EditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: null,
            id: null
        };
    }

    componentWillMount() {
        this.fetchNote(this.props.match.params.id);
        this.setState({ id: this.props.match.params.id })
    }

    ComponentWillReceiveProps(newProps) {
        if (this.props.match.params.id !== newProps.match.params.id) {
            this.fetchNote(newProps.match.params.id);
            this.setState({ id: this.props.match.params.id });
        }
    }

    fetchNote = (id) => {
        axios.get(`http://localhost:5000/api/notes/${id}`)
            .then(response => this.setState({ note: response.data }))
            .catch(error => console.log(error))
    }

    modifyNote = (id, obj) => {
        this.props.updateNote(id, obj);
    }

    render() {
        if (!this.state.note) {
            return <div>>Loading note information...</div>
        }
        return (
            <div className="editNoteContainer">
                <Navigation />
                <EditNoteCard note={this.state.note} id={this.state.id} modifyNote={this.modifyNote} />
            </div>
        )
    }
}

export default withRouter(connect(null, { updateNote })(EditNote)); 
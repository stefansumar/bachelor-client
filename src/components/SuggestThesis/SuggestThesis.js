import React, { Component } from 'react'
import { Header } from '../Header/Header'
import axios from 'axios'
import { NotificationManager } from 'react-notifications';

import "./SuggestThesis.css"


export class SuggestThesis extends Component {

    constructor(props) {
        super(props);

        this.state = {
            professors: [],
            title: '',
            content: '',
            subjectId: '',
            studentId: '',
            professorId: '',
            professor: ''
        }
    }

    componentDidMount() {
        var token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get("http://localhost:8080/users/professors")
            .then(response => {
                this.setState({
                    professors: response.data
                })
            })
            .catch((error) => console.log(error));
        axios.get("http://localhost:8080/auth/one")
            .then(response => {
                this.setState({
                    studentId: response.data.id
                })
            })
    }

    handleProfessorSelect = event => {
        if (!event.target.value) {
            this.setState({
                professor: '',
                professorId: '',
                subjectId: ''
            })
            return
        }
        this.setState({
            professor: event.target.value
        }, () => {
            var subject = ''
            var parsed = this.state.professor.split("-")
            subject = parsed[1].substring(1)

            this.state.professors.forEach(p => {
                if (p.title.normalize() === subject.normalize()) {
                    this.setState({
                        subjectId: p.subjectId,
                        professorId: p.id
                    })
                }
            });
        })
    }

    handleTitle = event => {
        this.setState({
            title: event.target.value
        })
    }

    handleContent = event => {
        this.setState({
            content: event.target.value
        })
    }

    SendRequest = event => {
        event.preventDefault();
        if (!this.state.title && !this.state.content) {
            NotificationManager.warning('Molimo Vas, popunite sva polja.', 'Upozorenje!')
            return
        }

        if (!this.state.title) {
            NotificationManager.warning('Molimo Vas, unesite naziv teme.', 'Upozorenje!')
            return
        }

        if (!this.state.content) {
            NotificationManager.warning('Molimo Vas, unesite kratak opis teme.', 'Upozorenje!')
            return
        }

        axios.post('http://localhost:8080/thesis', {
            title: this.state.title,
            content: this.state.content,
            subjectId: this.state.subjectId,
            studentId: this.state.studentId,
            professorId: this.state.professorId
        })
            .then(response =>
                this.props.history.push('/profile')

            )
            .catch(error =>
                NotificationManager.error('Podaci su neispravni.', 'Greška!')
            )
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container div">
                    <form onSubmit={this.SendRequest}>
                        <div>
                            <h3 className="display-6">Predloži temu</h3>
                        </div>
                        <hr></hr>
                        <div className="form-group">
                            <label for="exampleFormControlSelect1">Odaberite profesora</label>
                            <select className="form-control" id="professorAndSubject" onChange={this.handleProfessorSelect} defaultValue={'chooseProf'}>
                                <option key="empty" value="chooseProf" disabled>Odaberite profesora</option>
                                {
                                    this.state.professors.map((professor) => {
                                        return <option key={professor.title}>{professor.lastName} {professor.firstName} - {professor.title}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label for="exampleFormControlInput1">Naziv teme</label>
                            <input
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="Unesite naziv teme"
                                value={this.state.title}
                                onChange={this.handleTitle} />
                        </div>

                        <div className="form-group">
                            <label for="exampleFormControlTextarea1">Kratak opis teme</label>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                placeholder="Unesite kratak opis teme"
                                value={this.state.content}
                                onChange={this.handleContent}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Pošalji predlog</button>
                        </div>
                    </form>
                </div>
            </div >

        )
    }
}

export default SuggestThesis;
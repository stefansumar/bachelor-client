import React, { Component } from 'react'
import { Header } from '../Header/Header'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'
import { NotificationManager } from 'react-notifications';

import './ShowThesis.css'

export class ShowThesis extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            professorId: '',
            role: '',
            thesis: [],
            profDetailModalIsOpen: false,
            correctionModalIsOpen: false,
            rejectModalIsOpen: false,
            profDetailModal: {
                thesis: '',
                content: '',
                studentsName: '',
                studentsLastName: '',
                subject: '',
                statis: '',
                rejectReason: '',
                correction: ''
            },
            correction: '',
            rejectReason: ''
        }

        this.openProfDetailsModal = this.openProfDetailsModal.bind(this)
        this.closeProfDetailsModal = this.closeProfDetailsModal.bind(this)
        this.openCorrectionModal = this.openCorrectionModal.bind(this)
        this.closeCorrectionModal = this.closeCorrectionModal.bind(this)
        this.openRejectModal = this.openRejectModal.bind(this)
        this.closeRejectModal = this.closeRejectModal.bind(this)

    }

    componentDidMount() {
        var token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get("http://localhost:8080/auth/one")
            .then(response => {
                console.log(response.data)
                this.setState({
                    professorId: response.data.id,
                    role: response.data.authorities[0].name,
                }, () => {
                    axios.get("http://localhost:8080/thesis/all/" + this.state.professorId)
                        .then(response => {
                            console.log(response.data)
                            this.setState({
                                thesis: response.data
                            })
                        })
                })


            })
            .catch((error) => console.log(error))
    }

    openProfDetailsModal(thesis) {
        console.log(thesis)
        this.setState({
            profDetailModalIsOpen: true,
            profDetailModal: {
                thesis: thesis.title,
                content: thesis.content,
                studentsName: thesis.studentsName,
                studentsLastName: thesis.studentsLastName,
                status: thesis.status,
                rejectReason: thesis.rejectReason,
                correction: thesis.correction,
                subject: thesis.subject
            }
        })
    }

    closeProfDetailsModal() {
        this.setState({
            profDetailModalIsOpen: false,
            profDetailModal: {
                thesis: '',
                content: '',
                studentsName: '',
                studentsLastName: '',
                subject: '',
                status: '',
                rejectReason: '',
                correction: ''
            }
        })
    }

    acceptThesis = id => {
        console.log("id: " + id)
        axios.put("http://localhost:8080/thesis/" + id + "/accept")
            .then(response => {
                window.location.reload()
                NotificationManager.success('Tema je uspešno prihvaćena.', '')
            })
    }

    openCorrectionModal = id => {
        this.setState({
            correctionModalIsOpen: true,
            id: id
        })
    }

    handleCorrectionChange = e => {
        this.setState({
            correction: e.target.value

        })
    }

    closeCorrectionModal() {
        this.setState({
            correctionModalIsOpen: false,
            correction: ''
        })
    }

    saveCorrection = e => {
        e.preventDefault()
        if (!this.state.correction) {
            NotificationManager.error('Morate uneti korekciju.', '')
            return
        }
        let correction = this.state.correction
        axios.put("http://localhost:8080/thesis/" + this.state.id + "/correction", { correction })
            .then(response => {
                this.setState({
                    correctionModalIsOpen: false,
                    correction: ''
                })
                window.location.reload()
                NotificationManager.success('Uspešno ste napisali korekciju.', '')
            })
    }

    openRejectModal = id => {
        this.setState({
            rejectModalIsOpen: true,
            id: id
        })
    }

    handleRejectChange = e => {
        this.setState({
            rejectReason: e.target.value

        })
    }

    closeRejectModal() {
        this.setState({
            rejectModalIsOpen: false,
            rejectReason: ''
        })
    }

    saveRejectReason = e => {
        e.preventDefault()
        if (!this.state.rejectReason) {
            NotificationManager.error('Morate uneti razlog odbijanja teme.', '')
            return
        }
        let rejectReason = this.state.rejectReason
        axios.put("http://localhost:8080/thesis/" + this.state.id + "/reject", { rejectReason })
            .then(response => {
                this.setState({
                    rejectModalIsOpen: false,
                    rejectReason: ''
                })
                window.location.reload()
                NotificationManager.success('Uspešno ste odbili temu.', '')
            })
    }

    render() {
        return (
            <div>
                <Header />
                <h3>Predlozi</h3>
                <table className="table table-striped tableSize">
                    <thead>
                        <tr>
                            <th scope="col">Tema</th>
                            <th scope="col">Student</th>
                            <th scope="col">Status</th>
                            <th scope="col">Detalji</th>
                            <th scope="col">Prihvati</th>
                            <th scope="col">Na doradu</th>
                            <th scope="col">Odbij</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.thesis.map(thesis => {
                                let tr = (<tr key={thesis.thesisId}>
                                    <td>{thesis.title}</td>
                                    <td>{thesis.studentsLastName} {thesis.studentsName}</td>
                                    <td>{thesis.status}</td>
                                    <td><button className="btn btn-info" onClick={() => this.openProfDetailsModal(thesis)}>Detalji</button></td>
                                    <td><button
                                        className="btn btn-success"
                                        disabled={thesis.status === 'REJECTED' || thesis.status === 'ACCEPTED'}
                                        onClick={() => this.acceptThesis(thesis.thesisId)}
                                    >Prihvati</button></td>
                                    <td><button
                                        className="btn btn-info"
                                        disabled={thesis.status === 'REJECTED' || thesis.status === 'ACCEPTED'}
                                        onClick={() => this.openCorrectionModal(thesis.thesisId)}>Dorada</button></td>
                                    <td><button className="btn btn-danger"
                                        disabled={thesis.status === 'REJECTED' || thesis.status === 'ACCEPTED'}
                                        onClick={() => this.openRejectModal(thesis.thesisId)}>Odbij</button></td>
                                </tr>)
                                return tr
                            })
                        }
                    </tbody>
                </table>
                <Modal show={this.state.profDetailModalIsOpen}
                    onHide={this.closeProfDetailsModal}>
                    <Modal.Header>
                        <h5>{this.state.profDetailModal.thesis}</h5>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Opis:</h5>
                        <p className="p">{this.state.profDetailModal.content}</p>
                        <h5>Predmet:</h5>
                        <p className="p">{this.state.profDetailModal.subject}</p>
                        <h5>Profesor:</h5>
                        <p className="p">{this.state.profDetailModal.studentsLastName} {this.state.profDetailModal.studentsName}</p>
                        <h5>Status:</h5>
                        <p className="p">{this.state.profDetailModal.status}</p>
                        <h5 hidden={this.state.profDetailModal.status !== 'REJECTED'}>Razlog odbijanja:</h5>
                        <p className="p" hidden={this.state.profDetailModal.status !== 'REJECTED'}>{this.state.profDetailModal.rejectReason}</p>
                        <h5 hidden={this.state.profDetailModal.status !== 'ON_CORRECTION'}>Korekcija: </h5>
                        <p className="p" hidden={this.state.profDetailModal.status !== 'ON_CORRECTION'}>{this.state.profDetailModal.correction}</p>
                    </Modal.Body>
                    <Modal.Footer><Button onClick={this.closeProfDetailsModal}>Zatvori</Button></Modal.Footer>
                </Modal>
                <Modal show={this.state.correctionModalIsOpen} onHide={this.closeCorrectionModal}>
                    <form onSubmit={this.saveCorrection}>
                        <Modal.Header>
                            <h5>Napiši korekciju</h5>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-group">
                                <label for="exampleFormControlTextarea1">Korekcija</label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    placeholder="Napišite šta treba korigovati"
                                    value={this.state.correction}
                                    onChange={this.handleCorrectionChange}
                                ></textarea>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit">Sačuvaj</Button>
                            <Button onClick={this.closeCorrectionModal}>Zatvori</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                <Modal show={this.state.rejectModalIsOpen} onHide={this.closeRejectModal}>
                    <form onSubmit={this.saveRejectReason}>
                        <Modal.Header>
                            <h5>Napiši razlog odbijanja teme</h5>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-group">
                                <label for="exampleFormControlTextarea1">Razlog odbijanja teme</label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    placeholder="Napišite razlog odbijanja teme"
                                    value={this.state.rejectReason}
                                    onChange={this.handleRejectChange}
                                ></textarea>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit">Sačuvaj</Button>
                            <Button onClick={this.closeRejectModal}>Zatvori</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div >
        )
    }
}
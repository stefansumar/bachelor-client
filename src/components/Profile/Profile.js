import React, { Component } from 'react'
import { Header } from '../Header/Header'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'
import { NotificationManager } from 'react-notifications';

import './Profile.css'

export class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            studentId: '',
            role: '',
            firstName: '',
            lastName: '',
            usenrame: '',
            email: '',
            studies: '',
            thesis: [],
            editModalIsOpen: false,
            detailModalIsOpen: false,
            detailModal: {
                thesis: '',
                content: '',
                professorsName: '',
                professorsLastName: '',
                subject: '',
                rejectReason: '',
                status: '',
                correction: ''
            },
            idEdit: '',
            thesisEdit: '',
            contentEdit: ''
        }

        this.openDetailsModal = this.openDetailsModal.bind(this)
        this.closeDetailsModal = this.closeDetailsModal.bind(this)
        this.editModal = this.editModal.bind(this)
        this.closeEditModal = this.closeEditModal.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleContentChange = this.handleContentChange.bind(this)
        this.saveChanges = this.saveChanges.bind(this)

    }

    componentDidMount() {
        var token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get("http://localhost:8080/auth/one")
            .then(response => {
                this.setState({
                    studentId: response.data.id,
                    role: response.data.authorities[0].name,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    username: response.data.username,
                    email: response.data.email,
                    studies: response.data.status
                }, () =>
                    axios.get("http://localhost:8080/thesis/" + this.state.studentId)
                        .then(response => {
                            this.setState({
                                thesis: response.data
                            })
                        }
                        )
                        .catch((error) => console.log(error)))

            })
            .catch((error) => console.log(error));
    }

    openDetailsModal(thesis) {
        this.setState({
            detailModalIsOpen: true,
            detailModal: {
                thesis: thesis.title,
                content: thesis.content,
                professorsName: thesis.professorsName,
                professorsLastName: thesis.professorsLastName,
                subject: thesis.subject,
                rejectReason: thesis.rejectReason,
                correction: thesis.correction,
                status: thesis.status
            }
        })

    }

    closeDetailsModal() {
        this.setState({
            detailModalIsOpen: false,
            detailModal: {
                thesis: '',
                content: '',
                professorsName: '',
                professorsLastName: '',
                subject: '',
                rejectReason: '',
                status: '',
                correction: ''
            }
        })
    }

    editModal(thesis) {
        this.setState({
            editModalIsOpen: true,
            idEdit: thesis.id,
            thesisEdit: thesis.title,
            contentEdit: thesis.content

        })
    }

    closeEditModal() {
        this.setState({
            editModalIsOpen: false,
            idEdit: '',
            thesisEdit: '',
            contentEdit: ''
        })
    }

    handleTitleChange = e => {
        this.setState({
            thesisEdit: e.target.value

        })
    }

    handleContentChange = e => {
        this.setState({
            contentEdit: e.target.value

        })
    }

    saveChanges = e => {
        e.preventDefault();
        if (!this.state.thesisEdit && !this.state.contentEdit) {
            NotificationManager.error('Morate uneti sva polja.', '')
            return
        }

        if (!this.state.thesisEdit) {
            NotificationManager.error('Morate uneti naziv teme.', '')
            return
        }

        if (!this.state.contentEdit) {
            NotificationManager.error('Morate uneti opis teme.', '')
            return
        }

        let thesisEdit = this.state.thesisEdit
        let contentEdit = this.state.contentEdit

        axios.put("http://localhost:8080/thesis/" + this.state.idEdit, {
            thesisEdit,
            contentEdit
        })
            .then(response => {
                this.setState({
                    editModalIsOpen: false,
                    idEdit: '',
                    thesisEdit: '',
                    contentEdit: ''
                })
                window.location.reload()
                NotificationManager.success('Izmene su uspesno sačuvane.', '')

            }
            )
            .catch((error) => console.log(error))
    }

    renderProfile() {
        if (this.state.role === "ROLE_STUDENT") {
            return (
                <div>
                    <Header />
                    <div className="divTable">
                        <h2 className="h2">{this.state.firstName} {this.state.lastName}</h2>
                        <h4 className="h4">Osnovni podaci </h4>
                        <h5 className="h5"><img src="/images/user.png" width="20" height="20" alt="" />Korisničko ime: {this.state.username}</h5>
                        <h5 className="h5"><img src="/images/email.png" width="15" height="15" alt="" className="mailMargin" />Email: {this.state.email}</h5>
                        <h5 className="h5"><img src="/images/graduation.png" width="20" height="20" alt="" />Stepen studija: {this.state.studies}</h5>
                        <h4 className="h4 Margin">Predložene teme</h4>
                        <table className="table table-striped tableSize">
                            <thead>
                                <tr>
                                    <th scope="col">Tema</th>
                                    <th scope="col">Predmet</th>
                                    <th scope="col">Profesor</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Izmeni</th>
                                    <th scope="col">Detalji</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.thesis.map(thesis => {
                                        let tr = (<tr key={thesis.id}>
                                            <td className="ellipsis">{thesis.title}</td>
                                            <td className="ellipsis">{thesis.subject}</td>
                                            <td className="ellipsis">{thesis.professorsLastName} {thesis.professorsName}</td>
                                            <td className="ellipsis">{thesis.status}</td>
                                            <td><button
                                                className="btn btn-info"
                                                disabled={thesis.status !== 'ON_CORRECTION'}
                                                onClick={() =>
                                                    this.editModal(thesis)
                                                }
                                            >Izmeni</button></td>
                                            <td><button
                                                className="btn btn-info"
                                                onClick={() =>
                                                    this.openDetailsModal(thesis)
                                                }
                                            >Detalji</button></td>
                                        </tr>)
                                        return tr
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                    <Modal show={this.state.detailModalIsOpen}
                        onHide={this.closeDetailsModal}
                        centered
                        className="modalShadow">
                        <Modal.Header>
                            <h5>{this.state.detailModal.thesis}</h5>
                        </Modal.Header>
                        <Modal.Body>
                            <h5>Opis:</h5>
                            <p className="paragraphDetailModal">{this.state.detailModal.content}</p>
                            <h5>Predmet:</h5>
                            <p className="paragraphDetailModal">{this.state.detailModal.subject}</p>
                            <h5>Profesor:</h5>
                            <p className="paragraphDetailModal">{this.state.detailModal.professorsLastName} {this.state.detailModal.professorsName}</p>
                            <h5>Status:</h5>
                            <p className="paragraphDetailModal">{this.state.detailModal.status}</p>
                            <h5 hidden={this.state.detailModal.status !== 'REJECTED'}>Razlog odbijanja:</h5>
                            <p className="paragraphDetailModal" hidden={this.state.detailModal.status !== 'REJECTED'}>{this.state.detailModal.rejectReason}</p>
                            <h5 hidden={this.state.detailModal.status !== 'ON_CORRECTION'}>Korekcija: </h5>
                            <p className="paragraphDetailModal" hidden={this.state.detailModal.status !== 'ON_CORRECTION'}>{this.state.detailModal.correction}</p>
                        </Modal.Body>
                        <Modal.Footer><Button onClick={this.closeDetailsModal}>Zatvori</Button></Modal.Footer>
                    </Modal>
                    <Modal show={this.state.editModalIsOpen} onHide={this.closeEditModal}>
                        <form onSubmit={this.saveChanges}>
                            <Modal.Header>
                                <h5>Izmeni</h5>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="form-group">
                                    <label for="exampleFormControlInput1">Naziv teme</label>
                                    <input
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                        placeholder="Unesite naziv teme"
                                        value={this.state.thesisEdit}
                                        onChange={this.handleTitleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="exampleFormControlTextarea1">Kratak opis teme</label>
                                    <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                        placeholder="Unesite kratak opis teme"
                                        value={this.state.contentEdit}
                                        onChange={this.handleContentChange}
                                    ></textarea>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="submit">Sačuvaj</Button>
                                <Button onClick={this.closeEditModal}>Zatvori</Button>
                            </Modal.Footer>
                        </form>
                    </Modal>

                </div >)
        } else {
            return (<div>
                <Header />
                <div>
                    <h2 className="h2">{this.state.firstName} {this.state.lastName}</h2>
                    <h4 className="h4">Osnovni podaci </h4>
                    <h5 className="h5"><img src="/images/user.png" width="20" height="20" alt="" />Korisničko ime: {this.state.username}</h5>
                    <h5 className="h5"><img src="/images/email.png" width="15" height="15" alt="" className="mailMargin" />Email: {this.state.email}</h5>
                </div>
            </div>)
        }
    }
    render() {
        return (
            <div>
                {
                    this.renderProfile()
                }
            </div>
        )
    }
}
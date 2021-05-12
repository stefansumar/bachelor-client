import React, { Component } from 'react'
import axios from 'axios'
import { NotificationManager } from 'react-notifications';
import { withRouter } from 'react-router-dom';

import './Login.css'

class Login extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.loginRequest = this.loginRequest.bind(this);

        this.state = {
            username: '',
            password: ''
        }
    }

    loginRequest = e => {
        e.preventDefault();

        if (!this.state.username && !this.state.password) {
            NotificationManager.warning('Morate uneti korisničko ime i lozinku.', 'Upozorenje!', 4000)
            return
        }

        if (!this.state.username) {
            NotificationManager.warning('Morate uneti korisničko ime.', 'Upozorenje', 4000)
            return
        }

        if (!this.state.password) {
            NotificationManager.warning('Morate uneti lozinku.', 'Upozorenje!', 4000)
            return
        }
        axios.post('http://localhost:8080/auth/login', this.state)
            .then(
                res => {
                    localStorage.setItem('token', res.data.jwt);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.jwt}`;
                    axios.get('http://localhost:8080/auth/one')
                        .then(res => {
                            if (res.data.authorities[0].name === "ROLE_STUDENT") {
                                this.props.history.push('/student')
                                NotificationManager.success('Uspešno ste se ulogovali.', 'Dobrodošli!', 4000);
                            }
                            if (res.data.authorities[0].name === "ROLE_PROFESSOR") {
                                this.props.history.push('/professor')
                                NotificationManager.success('Uspešno ste se ulogovali.', 'Dobrodošli!', 4000);
                            }
                        }
                        )
                }
            )
            .catch(error =>
                NotificationManager.error('Pogrešno korisničko ime ili lozinka.', 'Greška!', 4000)
            )

    }

    handleChange(e) {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <div className="container homeDiv">
                    <h1 className="display-4 h1">
                        <img src="/images/diploma.png" height="80" width="80" className="display-4" alt="" /> Predloži temu</h1>
                    <p className="p">Dobro došli na platformu koja Vam omogućuje brz i lak predlog diplomskog ili master rada.
                    Imate mogućnost da željenom profesoru predložite temu koju biste želeli da obrađujete i da
                    sa njom zaokružite vaše celokupno studiranje.
                </p>
                </div>
                <section className="ftco-section">
                    <div className="container loginDiv">
                        <div className="row justify-content-center">
                            <div className="col-md-7 col-lg-5">
                                <div className="login-wrap p-4 p-md-5">
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <span className="fa fa-user-o"></span>
                                    </div>
                                    <form onSubmit={this.loginRequest} className="login-form">
                                        <div className="form-group">
                                            <input type="text" className="form-control rounded-left inputField" placeholder="Korisničko ime" name="username" onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control rounded-left inputField" placeholder="Lozinka" name="password" onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="form-control btn btn-primary rounded submit px-3 inputField">Prijavi se</button>
                                        </div>
                                        <div className="forgotPasswordLink">
                                            <a href="/#">Zaboravljena lozinka?</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default withRouter(Login);

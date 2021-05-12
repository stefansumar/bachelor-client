import React, { Component } from 'react'
import axios from 'axios'
import { Header } from '../Header/Header'


export class Professor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: ''
        }
    }

    componentDidMount() {
        var token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get("https://localhost:8080/auth/one")
            .then(response => {
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName
                })
            })
            .catch((error) => console.log(error))
    }
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <h1 className="display-4 h1">
                        <img src="/images/diploma.png" height="80" width="80" className="display-4" alt="" /> Cao Profesoreee</h1>
                    <p className="p">Dobro došli na platformu koja Vam omogućuje brz i lak predlog diplomskog ili master rada.
                    Imate mogućnost da željenom profesoru predložite temu koju biste želeli da obrađujete i da
                    sa njom zaokružite vaše celokupno studiranje.
                    </p>
                </div>
            </div >

        )
    }
}

export default Professor;
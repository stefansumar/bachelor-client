import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


import "./Header.css"

export class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            role: ''
        }
    }

    componentDidMount() {
        var token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get("http://localhost:8080/auth/one")
            .then(response => {
                this.setState({
                    role: response.data.authorities[0].name
                })
            })
            .catch((error) => console.log(error));
    }

    renderNavbar() {
        if (this.state.role === "ROLE_STUDENT") {
            return (<div className="container-fluid">
                <a className="navbar-brand a" href="/student">
                    <img src="/images/diploma.png" width="30" height="30" className="d-inline-block align-top" alt="" /> PREDLOŽI TEMU</a>
                <li className="nav-item suggest">
                    <Link to="/thesisSuggest" className="link suggestThesis" href="/#">PREDLOŽI</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link link messages" href="/#">PORUKE</Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile" className="nav-link link profile">PROFIL</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="link logOut">ODJAVA</Link>
                </li>
            </div>)
        } else {
            return (<div className="container-fluid">
                <a className="navbar-brand a" href="/#">
                    <img src="/images/diploma.png" width="30" height="30" className="d-inline-block align-top" alt="" /> Predloži temu</a>
                <li className="nav-item">
                    <Link to="/showThesis" className="link profSuggestions" >Predlozi</Link>
                </li>
                <li className="nav-item suggest">
                    <Link to="/documents" className="link documents" href="/#">Dokumenti</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link link profMessages" href="/#">Poruke</Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile" className="nav-link link profProfile">Profil</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="link logOut">Odjavi se</Link>
                </li>
            </div>)
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                {
                    this.renderNavbar()
                }
            </nav >
        )
    }
}
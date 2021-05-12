import React, { Component } from 'react'
import axios from 'axios'
import { Header } from '../Header/Header';


export class Student extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            user: ''
        }
    }


    componentDidMount() {
        var token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get("http://localhost:8080/auth/one")
            .then(response => {
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    user: response.data.user
                })
            })
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container">

                </div>
            </div >

        )
    }
}

export default Student;
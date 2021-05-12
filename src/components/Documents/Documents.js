import React, { Component } from 'react'
import { Header } from '../Header/Header'
import axios from 'axios'

import './Documents.css'

export class Documents extends Component {


    downloadFirst = e => {
        axios({
            url: 'http://localhost:8080/download/Predlog_sastava_komisije_Bachelor.docx',
            method: 'GET',
            responseType: 'blob'
        })
            .then(response => {
                console.log(response.data)
                const url = window.URL.createObjectURL(new Blob([response.data]))

                const link = document.createElement('a')

                link.href = url

                link.setAttribute('download', 'Predlog_sastava_komisije_Bachelor.docx')

                document.body.appendChild(link)

                link.click()
            })
    }

    downloadSecond = e => {
        axios({
            url: 'http://localhost:8080/download/Izvestaj_komisije_Bachelor.docx',
            method: 'GET',
            responseType: 'blob'
        })
            .then(response => {
                console.log(response.data)
                const url = window.URL.createObjectURL(new Blob([response.data]))

                const link = document.createElement('a')

                link.href = url

                link.setAttribute('download', 'Izvestaj_komisije_Bachelor.docx')

                document.body.appendChild(link)

                link.click()
            })
    }

    downloadThird = e => {
        axios({
            url: 'http://localhost:8080/download/Zahtev_za_organizovanje_odbrane_Bachelor.docx',
            method: 'GET',
            responseType: 'blob'
        })
            .then(response => {
                console.log(response.data)
                const url = window.URL.createObjectURL(new Blob([response.data]))

                const link = document.createElement('a')

                link.href = url

                link.setAttribute('download', 'Zahtev_za_organizovanje_odbrane_Bachelor.docx')

                document.body.appendChild(link)

                link.click()
            })
    }

    downloadFourth = e => {
        axios({
            url: 'http://localhost:8080/download/Zahtev_za_organizovanje_odbrane_Master.docx',
            method: 'GET',
            responseType: 'blob'
        })
            .then(response => {
                console.log(response.data)
                const url = window.URL.createObjectURL(new Blob([response.data]))

                const link = document.createElement('a')

                link.href = url

                link.setAttribute('download', 'Zahtev_za_organizovanje_odbrane_Master.docx')

                document.body.appendChild(link)

                link.click()
            })
    }

    downloadFifth = e => {
        axios({
            url: 'http://localhost:8080/download/Izvestaj_komisije_Master.docx',
            method: 'GET',
            responseType: 'blob'
        })
            .then(response => {
                console.log(response.data)
                const url = window.URL.createObjectURL(new Blob([response.data]))

                const link = document.createElement('a')

                link.href = url

                link.setAttribute('download', 'Izvestaj_komisije_Master.docx')

                document.body.appendChild(link)

                link.click()
            })
    }

    downloadSix = e => {
        axios({
            url: 'http://localhost:8080/download/Izvod_zapisnika_naucnog_veca.docx',
            method: 'GET',
            responseType: 'blob'
        })
            .then(response => {
                console.log(response.data)
                const url = window.URL.createObjectURL(new Blob([response.data]))

                const link = document.createElement('a')

                link.href = url

                link.setAttribute('download', 'Izvod_zapisnika_naucnog_veca.docx')

                document.body.appendChild(link)

                link.click()
            })
    }

    downloadSeven = e => {
        axios({
            url: 'http://localhost:8080/download/Bachelor_Template.doc',
            method: 'GET',
            responseType: 'blob'
        })
            .then(response => {
                console.log(response.data)
                const url = window.URL.createObjectURL(new Blob([response.data]))

                const link = document.createElement('a')

                link.href = url

                link.setAttribute('download', 'Bachelor_Template.doc')

                document.body.appendChild(link)

                link.click()
            })
    }

    render() {
        return (
            <div>
                <Header />
                <h3>Dokumenti</h3>
                <table className="table table-striped tableSize tableWidth">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" className="text">Naziv dokumenta</th>
                            <th scope="col" className="textLeft">Preuzmi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> 1.</td>
                            <td className="text">
                                Predlog sastava komisije za ocenu i odbranu diplomskog (Bachelor) rada
                            </td>
                            <td >
                                <button
                                    className="btn-light btn buttonSize"
                                    onClick={this.downloadFirst}>
                                    <img
                                        src="/images/download.png"
                                        className="img"
                                        height="25"
                                        width="25"
                                        margin-top="2px"
                                        alt="" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>2.</td>
                            <td className="text">
                                Izveštaj komisije o oceni i odbrani diplomskog (Bachelor) rada
                                </td>
                            <td>
                                <button
                                    onClick={this.downloadSecond}
                                    className="btn-light btn buttonSize">
                                    <img
                                        src="/images/download.png"
                                        className="img"
                                        height="25"
                                        width="25"
                                        margin-top="2px"
                                        alt="" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>3.</td>
                            <td className="text">
                                Zahtev za organizovanje odbrane diplomskog (Bachelor) rada
                                </td>
                            <td>
                                <button
                                    className="btn-light btn buttonSize"
                                    onClick={this.downloadThird}>
                                    <img
                                        src="/images/download.png"
                                        className="img"
                                        height="25"
                                        width="25"
                                        margin-top="2px"
                                        alt="" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>4.</td>
                            <td
                                className="text">
                                Zahtev za organizovanje odbrane master rada
                                </td>
                            <td>
                                <button
                                    onClick={this.downloadFourth}
                                    className="btn-light btn buttonSize">
                                    <img
                                        src="/images/download.png"
                                        className="img"
                                        height="25"
                                        width="25"
                                        margin-top="2px"
                                        alt="" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>5.</td>
                            <td
                                className="text">
                                Izveštaj komisije o oceni i odbrani master rada
                                </td>
                            <td>
                                <button
                                    onClick={this.downloadFifth}
                                    className="btn-light btn buttonSize">
                                    <img
                                        src="/images/download.png"
                                        className="img"
                                        height="25"
                                        width="25"
                                        margin-top="2px"
                                        alt="" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>6.</td>
                            <td
                                className="text">
                                Izvod zapisnika nastavno naučnog veća departmana
                                </td>
                            <td>
                                <button
                                    onClick={this.downloadSix}
                                    className="btn-light btn buttonSize">
                                    <img
                                        src="/images/download.png"
                                        className="img"
                                        height="25"
                                        width="25"
                                        margin-top="2px"
                                        alt="" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>7.</td>
                            <td
                                className="text">
                                Template za pisanje diplomskog (Bachelor rada)
                                </td>
                            <td>
                                <button
                                    onClick={this.downloadSeven}
                                    className="btn-light btn buttonSize">
                                    <img
                                        src="/images/download.png"
                                        className="img"
                                        height="25"
                                        width="25"
                                        margin-top="2px"
                                        alt="" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        )
    }
}
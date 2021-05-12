import React, { Component } from 'react'

import './Footer.css'

export class Footer extends Component {
    render() {
        return (
            <footer className="footer_on_bottom container">
                <hr />
                <div>
                    <p className="footerParagraph">Predloži temu © 2021</p>
                </div>
            </footer>
        )
    }
}
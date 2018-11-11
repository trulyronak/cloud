import React from 'react'

class Navbar extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <nav className="top-nav">
                        <div className="container">
                            <div className="nav-wrapper">
                                <a className="brand-logo" href="/">Shah Cloud Services</a>
                            </div>
                            <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                            <ul className="right hide-on-med-and-down valign-wrapper">
                                <li><a href="/">Upload</a></li>
                                <li><a href="download">Download</a></li>
                            </ul>
                            <ul className="side-nav" id="mobile-demo">
                                <li><a href="/">Upload</a></li>
                                <li><a href="download">Download</a></li>
                            </ul>
                        </div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default Navbar
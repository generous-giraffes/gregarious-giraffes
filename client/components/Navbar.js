import React from 'react';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="header">
                <span className="header-profile">Profile</span>
                <span className="header-login">Login</span>
            </header>
        )
    }
}

export default Navbar


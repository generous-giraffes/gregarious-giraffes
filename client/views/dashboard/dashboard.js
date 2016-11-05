import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="dashboard">
              <Navbar />
              <p>Dashboard</p>
              <Footer />
            </div>
        )
    }
}

export default Dashboard

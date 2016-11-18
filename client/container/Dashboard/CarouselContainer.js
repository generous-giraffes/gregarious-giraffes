import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';


//This was named MyCarousel because it was a carousel, but now it is just a banner showing the current user's name
class MyCarousel extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div className="carousel">
                <h1>Welcome {this.props.name}!</h1>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        email: state.reducers.isAuthorized.email,
        name: state.reducers.isAuthorized.name,
        id: state.reducers.isAuthorized.id
    }
}

export default connect(mapStateToProps)(MyCarousel);

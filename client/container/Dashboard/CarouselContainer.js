import React, { Component } from 'react';
import { Button, Col, Row, Grid, FormGroup, FormControl, Thumbnail, Carousel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getRecentUsers } from '../../actions/feed';


class MyCarousel extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getRecentUsers();
    }


    render() {
        return (
            <div className="carousel">
                <Carousel>
                    {this.props.recentUsers.map((image) => (
                    <Carousel.Item>
                        <Col xs={12} md={6}>
                            <img src={image.image}/>
                        </Col>
                        <Col xs={12} md={6}>
                            <Carousel.Caption>
                                <h3>{image.name}</h3>
                                <p>{image.species}</p>
                            </Carousel.Caption>
                        </Col>
                    </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        email: state.reducers.isAuthorized.email,
        name: state.reducers.isAuthorized.name,
        id: state.reducers.isAuthorized.id,
        recentUsers: state.reducers.feedReducer.recentUsers
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getRecentUsers}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCarousel);

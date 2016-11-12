import React, { Component } from 'react';
import { Button, Col, Row, Grid, FormGroup, FormControl, Thumbnail, Carousel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { signinUser } from '../actions/auth';


class MyCarousel extends Component {

    constructor(props) {
        super(props);

        console.log('this is the user ========>>>>', this.props.user);
    }

    componentDidMount() {
        this.props.signinUser();
    }



    render() {
        return (
            <div className="carousel">
                <Carousel>
                    <Carousel.Item>
                        <img src="http://www.artwallpaperhi.com/thumbnails/detail/20121017/abstract%20striped%20texture%20digital%20art%201680x1050%20wallpaper_www.artwallpaperhi.com_4.jpg"/>
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="http://www.artwallpaperhi.com/thumbnails/detail/20121017/abstract%20striped%20texture%20digital%20art%201680x1050%20wallpaper_www.artwallpaperhi.com_4.jpg"/>
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.reducers.isAuthorized
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({signinUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCarousel);

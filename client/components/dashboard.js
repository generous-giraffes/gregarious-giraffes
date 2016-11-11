import React from 'react';
import Feed from '../container/FeedContainer';
import MyInfo from '../container/MyInfoContainer';
import MyCarousel from '../container/CarouselContainer';
import { Button, Col, Row, Grid, FormGroup, FormControl, Thumbnail, Navbar, Carousel } from 'react-bootstrap';


class Home extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.state, 'trying to get user name');
    }



    render() {
        return (
            <div className="home">
                <Grid>
                    <Row className="banner">
                        <Col xs={12}>
                            <MyCarousel />
                        </Col>
                    </Row>
                    <Row className="main-container">
                        <Col xs={12} md={6}>
                            <Feed />
                        </Col>
                        <Col xs={12} md={6}>
                            <Col xs={12}>
                                <FormGroup>
                                    <FormControl type="text" placeholder="Search for a PlayMate"/>
                                </FormGroup>
                                {' '}
                                <Button type="submit">Submit</Button>
                            </Col>
                            <Col xs={12}>
                                <MyInfo />
                            </Col>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default Home

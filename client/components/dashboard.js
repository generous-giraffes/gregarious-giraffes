import React from 'react';
import Feed from '../container/Dashboard/FeedContainer';
import MyCarousel from '../container/Dashboard/CarouselContainer';
import FriendSearch from '../container/Dashboard/FeedContainers/FriendSearchContainer';
import PetSearch from '../container/Dashboard/FeedContainers/AdoptAPetApiContainer';
import PetNewsSearch from '../container/Dashboard/FeedContainers/PetNewsApiContainer';
import Birthdays from '../container/Dashboard/FeedContainers/ThisMonthBirthdaysContainer';
import { Button, Col, Row, Grid, FormGroup, FormControl, Thumbnail, Navbar, Carousel } from 'react-bootstrap';


//This is the dashboard that pulls in all the containers for banner, feeds, etc
class Home extends React.Component {
    constructor(props) {
        super(props);
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
                            <FriendSearch />
                            <Birthdays />
                            {/*<PetSearch />
                             <PetNewsSearch />*/}
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default Home

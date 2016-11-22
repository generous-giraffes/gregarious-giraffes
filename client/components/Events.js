import React from 'react';
import EventList from '../container/Events/EventListContainer';
import CreateEvent from '../container/Events/CreateEventContainer';
import { Button, Col, Row, Grid, FormGroup, FormControl, Thumbnail, Navbar, Carousel } from 'react-bootstrap';


//This component is for the events page and pulls in the containers for EventList / CreateEvent
class Events extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="events">
                <Grid>
                    <Row className="banner">
                        <Col xs={12}>
                            <h1>Events Page</h1>
                        </Col>
                    </Row>
                    <Row className="main-container">
                        <Col xs={12} md={6}>
                            <EventList />
                        </Col>
                        <Col xs={12} md={6}>
                            <CreateEvent />
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default Events
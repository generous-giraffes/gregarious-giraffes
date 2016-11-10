import React from 'react';
import { Button, Col, Row, Grid, FormGroup, FormControl, Navbar } from 'react-bootstrap';


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
                            <h1>Welcome User</h1>
                            <p>Quotes</p>
                        </Col>
                    </Row>
                    <Row className="main-container">
                        <Col xs={12} md={6}>
                            THIS IS THE FEED
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
                                Pull in all the info here
                            </Col>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default Home

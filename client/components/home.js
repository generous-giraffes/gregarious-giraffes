import React from 'react';
import { Button, Col, Row, Grid } from 'react-bootstrap';


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
                        <Col xs={12} md={6}>This is the left stuff </Col>
                        <Col xs={12} md={6}>This is the right stuff</Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default Home

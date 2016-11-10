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
                    <Row className="show-grid">
                        <Col xs={12} md={8}><code>&lt;{'Col xs={12} md={8}'} /&gt;</code></Col>
                        <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default Home

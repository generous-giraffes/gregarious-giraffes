import React from 'react';
import { Button, Col, Row, Grid, FormGroup, FormControl, Thumbnail } from 'react-bootstrap';


class MyInfo extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="info">
                <Grid>
                    <Row>
                        <Col xs={12} md={6}>
                            <Thumbnail src="http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg" alt="242x200">
                                <h3>Thumbnail label</h3>
                                <p>Description</p>
                                <p>
                                    <Button bsStyle="primary">Button</Button>&nbsp;
                                    <Button bsStyle="default">Button</Button>
                                </p>
                            </Thumbnail>
                        </Col>
                        <Col xs={12} md={6}>
                            <Thumbnail src="http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg" alt="242x200">
                                <h3>Thumbnail label</h3>
                                <p>Description</p>
                                <p>
                                    <Button bsStyle="primary">Button</Button>&nbsp;
                                    <Button bsStyle="default">Button</Button>
                                </p>
                            </Thumbnail>
                        </Col>
                        <Col xs={12} md={6}>
                            <Thumbnail src="http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg" alt="242x200">
                                <h3>Thumbnail label</h3>
                                <p>Description</p>
                                <p>
                                    <Button bsStyle="primary">Button</Button>&nbsp;
                                    <Button bsStyle="default">Button</Button>
                                </p>
                            </Thumbnail>
                        </Col>
                        <Col xs={12} md={6}>
                            <Thumbnail src="http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg" alt="242x200">
                                <h3>Thumbnail label</h3>
                                <p>Description</p>
                                <p>
                                    <Button bsStyle="primary">Button</Button>&nbsp;
                                    <Button bsStyle="default">Button</Button>
                                </p>
                            </Thumbnail>
                        </Col>
                        <Col xs={12} md={6}>
                            <Thumbnail src="http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg" alt="242x200">
                                <h3>Thumbnail label</h3>
                                <p>Description</p>
                                <p>
                                    <Button bsStyle="primary">Button</Button>&nbsp;
                                    <Button bsStyle="default">Button</Button>
                                </p>
                            </Thumbnail>
                        </Col>
                        <Col xs={12} md={6}>
                            <Thumbnail src="http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg" alt="242x200">
                                <h3>Thumbnail label</h3>
                                <p>Description</p>
                                <p>
                                    <Button bsStyle="primary">Button</Button>&nbsp;
                                    <Button bsStyle="default">Button</Button>
                                </p>
                            </Thumbnail>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default MyInfo



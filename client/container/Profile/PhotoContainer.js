import React, {Component} from 'react';
import { Row, Col, Grid, Thumbnail, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Photos extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Grid className="photos">
                <Row>
                    <Col xs={12} md={6}>
                        <Thumbnail src="https://i.ytimg.com/vi/x9Jr9JKpsX8/maxresdefault.jpg">
                            <h3>Thumbnail label</h3>
                            <p>Description</p>
                            <p>
                                <Button bsStyle="primary">Like</Button>&nbsp;
                                <Button bsStyle="default">Comment</Button>
                            </p>
                        </Thumbnail>
                    </Col>
                    <Col xs={12} md={6}>
                        <Thumbnail src="https://i.ytimg.com/vi/x9Jr9JKpsX8/maxresdefault.jpg">
                            <h3>Thumbnail label</h3>
                            <p>Description</p>
                            <p>
                                <Button bsStyle="primary">Like</Button>&nbsp;
                                <Button bsStyle="default">Comment</Button>
                            </p>
                        </Thumbnail>
                    </Col>
                    <Col xs={12} md={6}>
                        <Thumbnail src="https://i.ytimg.com/vi/x9Jr9JKpsX8/maxresdefault.jpg">
                            <h3>Thumbnail label</h3>
                            <p>Description</p>
                            <p>
                                <Button bsStyle="primary">Like</Button>&nbsp;
                                <Button bsStyle="default">Comment</Button>
                            </p>
                        </Thumbnail>
                    </Col>
                    <Col xs={12} md={6}>
                        <Thumbnail src="https://i.ytimg.com/vi/x9Jr9JKpsX8/maxresdefault.jpg">
                            <h3>Thumbnail label</h3>
                            <p>Description</p>
                            <p>
                                <Button bsStyle="primary">Like</Button>&nbsp;
                                <Button bsStyle="default">Comment</Button>
                            </p>
                        </Thumbnail>
                    </Col>
                </Row>
            </Grid>
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

export default connect(mapStateToProps)(Photos);
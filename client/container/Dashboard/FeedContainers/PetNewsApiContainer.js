import React, { Component } from 'react';
import { Button, Col, Row, Grid, Thumbnail } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getPet, getPetNews } from '../../../actions/getPets';
import axios from 'axios';

class PetNewsSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.articles ? null : this.props.getPetNews();
    }

    // called before the render method and enables to define if a re-rendering is needed or can be skipped
    shouldComponentUpdate(nextProps, nextState) {
        // return a boolean value
        return true;
    }

    // called as soon as the the shouldComponentUpdate returned true. Any state changes via this.setState are not allowed as this method should be strictly used to prepare for an upcoming update not trigger an update itself.
    componentWillUpdate(nextProps, nextState) {
        // perform any preparations for an upcoming update
        console.log(nextProps, "props++++++state", nextState);
    }

    render() {
        //MOVE THIS INTO A LIFECYCLE METHOD --> probs componentDidRecieveProps or componentWillUpdate
        let $data = null;
        if (this.props.articles) {
            let pet = this.props.articles;
            let filtered =
                pet.filter((article) => article['snippet'] !== null && article['web_url'] !== null && article.multimedia.length >= 1 && article['headline'] !== null)
                   .slice(0, 4);
            let first = filtered[0];
            let second = filtered[1];
            let third = filtered[2];
            let fourth = filtered[3];
            $data = (
                <div className="petNews">
                    <Grid>
                        <Row>
                            <Col xs={12} md={6}>
                                <Thumbnail src={'http://www.nytimes.com/' + first.multimedia[0].url} alt="242x200">
                                    <h4>{first.headline.main}</h4>
                                    <p className="snippet">{first.snippet}</p>
                                    <p>
                                        <Button href={first.web_url} target='_blank' bsStyle="primary">More</Button>
                                    </p>
                                </Thumbnail>
                            </Col>
                            <Col xs={12} md={6}>
                                <Thumbnail src={'http://www.nytimes.com/' + second.multimedia[0].url} alt="242x200">
                                    <h4>{second.headline.main}</h4>
                                    <p className="snippet">{second.snippet}</p>
                                    <p>
                                        <Button href={second.web_url} target='_blank' bsStyle="primary">More</Button>
                                    </p>
                                </Thumbnail>
                            </Col>
                            <Col xs={12} md={6}>
                                <Thumbnail src={'http://www.nytimes.com/' + third.multimedia[0].url} alt="242x200">
                                    <h4>{third.headline.main}</h4>
                                    <p className="snippet">{third.snippet}</p>
                                    <p>
                                        <Button href={third.web_url} target='_blank' bsStyle="primary">More</Button>
                                    </p>
                                </Thumbnail>
                            </Col>
                            <Col xs={12} md={6}>
                                <Thumbnail src={'http://www.nytimes.com/' + fourth.multimedia[0].url} alt="242x200">
                                    <h4>{fourth.headline.main}</h4>
                                    <p className="snippet">{fourth.snippet}</p>
                                    <p>
                                        <Button href={fourth.web_url} target='_blank' bsStyle="primary">More
                                            </Button>
                                    </p>
                                </Thumbnail>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            );
        } else {
            $data = (<div>Check back later for pet news.</div>);
        }
        return (
            <div className="petNews">
                {$data}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        articles: state.reducers.getPets.articles
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getPet, getPetNews}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PetNewsSearch);

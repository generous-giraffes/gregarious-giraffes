import React from 'react';
import { Button, Col, Row, Grid, FormGroup, FormControl, Navbar } from 'react-bootstrap';
import UserFeed from './FeedContainers/UserFeedContainer';
import ImageFeed from './FeedContainers/DashboardImagesContainer';

class Feed extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="feed">
                <div className="demo-card">
                    <UserFeed />
                    <ImageFeed />

                    <div className="card card-inverse card-info text-center">
                        <div className="card-block">
                            <blockquote className="card-blockquote">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a
                                    ante.</p>
                                <footer>Someone famous in
                                    <cite title="Source Title">Source Title</cite>
                                </footer>
                            </blockquote>
                        </div>
                    </div>
                    <div className="card card-inverse card-warning text-center">
                        <div className="card-block">
                            <blockquote className="card-blockquote">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a
                                    ante.</p>
                                <footer>Someone famous in
                                    <cite title="Source Title">Source Title</cite>
                                </footer>
                            </blockquote>
                        </div>
                    </div>
                    <div className="card card-inverse card-danger text-center">
                        <div className="card-block">
                            <blockquote className="card-blockquote">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a
                                    ante.</p>
                                <footer>Someone famous in
                                    <cite title="Source Title">Source Title</cite>
                                </footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Feed

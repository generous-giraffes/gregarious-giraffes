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
                </div>
            </div>
        )
    }
}

export default Feed

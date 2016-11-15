import React from 'react';
import ChatBox from '../../components/Chat';
import { Col, Row, Grid } from 'react-bootstrap';



class Chat extends React.Component {
  render() {
    // console.log('+++++Chat Props',this.props); // should see user object once authenticateContainer works because of mapStateToProps
      return (
        <Grid>
          <Row className="show-grid">
            <Col xs={12}>
              <ChatBox />
            </Col>
          </Row>
        </Grid>
      );
  }
}


export default Chat
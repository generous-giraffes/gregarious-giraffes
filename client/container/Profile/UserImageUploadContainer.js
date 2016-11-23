import React from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submitUserImage } from '../../actions/image';
import { browserHistory } from 'react-router';
import { FormGroup } from 'react-bootstrap';
import { toastr } from 'react-redux-toastr';
import { Col, Row, Grid } from 'react-bootstrap';

const toastrOptions = {
  timeOut: 3000
}
//ImageUpload uses FileReader to asynchronously read the contents of an image that the user uploads
class UserImageUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data_uri: '',
      filename: '',
      filetype: '',
      caption: ''
    };
  }
  //posts file to db if there has been an image uploaded
  handleSubmit(e) {
    e.preventDefault();
    //post request to server goes to imageRoutes and the image gets added to db using userId to find the user
    //only post if there is an image in state
    if(this.state.data_uri && this.state.caption) {
      this.props.submitUserImage({
        id: this.props.id,
        data_uri: this.state.data_uri,
        filename: this.state.filename,
        filetype: this.state.filetype,
        caption: this.state.caption
      });
      toastr.info('Upload Success!', 'Your image was stored',  toastrOptions)
      this.setState({data_uri: '', filename: '', filetype: '', caption: ''});
    } else {
      toastr.warning('Upload failed', 'Please make sure your filename has no whitespace or special characters', toastrOptions)
    }
  }

  handleCaptionChange(e) {
    this.setState({caption: e.currentTarget.value});
  }

  handleImageChange(e) {
    e.preventDefault();
    let file = e.target.files[0];
    let chars = file.name.split('');
    //check if fileName contains characters that are not allowed (they mess with storage in the s3 bucket)
    if(chars.includes(' ') || chars.includes('(') || chars.includes(')')) {
      toastr.warning('Warning', 'Please make sure your filename has no whitespace or special characters', toastrOptions)
      e.target.value = null;
    } else {
      //FileReader asynchronously reads file/blob contents
      let reader = new FileReader();

      //reads contents of the file. When the read operation is done, the result attribute will contain the data as a URL representing the file's data as a base64 encoded string.
      reader.readAsDataURL(file);
      //on loadend event is triggered when the reader finishes reading, then the state will be set and a preview of the image will be rendered
      reader.onloadend = () => {
        this.setState({
          data_uri: reader.result,
          filename: file.name,
          filetype: file.type
        });
      }
    }
  }

  render() {
    //retrieve url from state, then render an image if there is a url else a div
    let { data_uri } = this.state;
    let preview = null;
    let preview2 = null;
    if(data_uri) {
      preview = (<img className="previewImage" src={data_uri} />);
    } else {
      preview2 = (<div className="previewText">Please Select an Image to Upload</div>);
    }

    return (
      <Grid className="user-image-upload">
        <Row className="show-grid">
          <Col xs={12} className="previewComponent">
            <h3>{preview2}</h3>
            <FormGroup>
              <form onSubmit={(e)=>this.handleSubmit(e)}>
                  <div className="choose_file">
                      <span>Choose File</span>
                      <input className="fileInput" type="file" onChange={(e)=>this.handleImageChange(e)}/>
                  </div>
                <h4>Write a Caption:</h4>
                <input className="captionInput" value={this.state.caption} type="text" onChange={(e)=>this.handleCaptionChange(e)}/>
                <button className="fileUpload" type="submit" onClick={(e)=>this.handleSubmit(e)}>Upload Image</button>
              </form>
              <p>Please ensure your file contains no spaces or special characters.</p>
            </FormGroup>
            <div className="imgPreview">
                {preview}
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    email: state.reducers.isAuthorized.email,
    id: state.reducers.isAuthorized.id
   }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({submitUserImage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserImageUpload);

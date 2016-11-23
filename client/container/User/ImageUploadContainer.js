import React from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submitProfileImage } from '../../actions/image';
import { browserHistory } from 'react-router';
import { Col, Row, Grid } from 'react-bootstrap';

import { toastr } from 'react-redux-toastr';

const toastrOptions = {
  timeOut: 1800
}

//ImageUpload uses FileReader to asynchronously read the contents of an image that the user uploads
class ImageUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: '',
      imagePreviewUrl: '',
      data_uri: '',
      filename: '',
      filetype: ''
    };
  }
  //posts file to db if there has been an image uploaded
  handleSubmit(e) {
    e.preventDefault();
    console.log('handle uploading action about to dispatch', this.state);
    //post request to server goes to imageRoutes and the image gets added to db using userId to find the user
    //only post if there is an image in state
    if(this.state.data_uri) {
      this.props.submitProfileImage({
        image: this.state.imagePreviewUrl,
        email: this.props.email,
        data_uri: this.state.data_uri,
        filename: this.state.filename,
        filetype: this.state.filetype
      });
      // handle the lack of props before rendering at myProfile
      toastr.info('Upload Success!', 'your image was stored',  toastrOptions)
      setTimeout(() => {browserHistory.push('/myProfile')}, 2000)
    } else {
      toastr.warning('Upload failed', 'make sure your filename has no whitespace or special characters', toastrOptions)
    }
  }

  handleImageChange(e) {
    e.preventDefault();
    let file = e.target.files[0];
    let chars = file.name.split('');
    //check if fileName contains characters that are not allowed (they mess with storage in the s3 bucket)
    if(chars.includes(' ') || chars.includes('(') || chars.includes(')')) {
      toastr.warning('Warning', 'make sure your filename has no whitespace or special characters', toastrOptions)
      e.target.value = null;
    } else {
      //FileReader asynchronously reads file/blob contents
      let reader = new FileReader();

      //reads contents of the file. When the read operation is done, the result attribute will contain the data as a URL representing the file's data as a base64 encoded string.
      reader.readAsDataURL(file);
      //on loadend event is triggered when the reader finishes reading, then the state will be set and a preview of the image will be rendered
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
          data_uri: reader.result,
          filename: file.name,
          filetype: file.type
        });
      }
    }
  }

  render() {
    //retrieve url from state, then render an image if there is a url else a div
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if(imagePreviewUrl) {
      $imagePreview = (<img className="previewImage" src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image to Upload</div>);
    }

    return (
        <Grid className="survey-form2">
          <Row className="show-grid">
            <Col xs={12} className="previewComponent">
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                    <div className="choose_file">
                      <span>Choose File</span>
                      <input className="fileInput" type="file" onChange={(e)=>this.handleImageChange(e)}/>
                    </div>
                    <button bsStyle="primary" className="fileUpload" type="submit" onClick={(e)=>this.handleSubmit(e)}>Upload Image</button>
                </form>
                <div className="imgPreview">
                  {$imagePreview}
                </div>
            </Col>
          </Row>
        </Grid>
    )
  }
}

function mapStateToProps(state) {
  return { email: state.reducers.isAuthorized.email }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({submitProfileImage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);

import React from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submitUserImage } from '../../actions/image';
import { browserHistory } from 'react-router';
import { FormGroup } from 'react-bootstrap';
import { toastr } from 'react-redux-toastr';

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
    console.log('handle uploading action about to dispatch', this.state);
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
      toastr.info('Upload Success!', 'your image was stored',  toastrOptions)
    } else {
      toastr.warning('Upload failed', 'make sure your filename has no whitespace or special characters', toastrOptions)
    }
  }

  handleCaptionChange(e) {
    console.log(e.currentTarget.value, 'handl caption change e current target');
    this.setState({caption: e.currentTarget.value});
  }

  handleImageChange(e) {
    e.preventDefault();
    //FileReader asynchronously reads file/blob contents
    let reader = new FileReader();
    let file = e.target.files[0];
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

  render() {
    //retrieve url from state, then render an image if there is a url else a div
    let { data_uri } = this.state;
    let preview = null;
    if(data_uri) {
      preview = this.state.filetype === 'video/mp4' ?
          (<iframe src={data_uri} frameBorder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen />)
        : (<img className="previewImage" src={data_uri} />)
    } else {
      preview = (<div className="previewText">Please select an Image to Upload</div>);
    }

    return (
      <div className="previewComponent">
      <FormGroup>
          <form onSubmit={(e)=>this.handleSubmit(e)}>
              <input className="fileInput" type="file" onChange={(e)=>this.handleImageChange(e)} />
              <input className="captionInput" type="text" onChange={(e)=>this.handleCaptionChange(e)} />
              <button className="fileUpload" type="submit" onClick={(e)=>this.handleSubmit(e)}>Upload Image</button>
          </form>
          <p>make sure the filename contains no spaces or special characters, thanks!</p>
      </FormGroup>
        <div className="imgPreview">
          {preview}
        </div>
      </div>
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

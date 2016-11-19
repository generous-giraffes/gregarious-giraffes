import React from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submitProfileImage } from '../../actions/image';
import { browserHistory } from 'react-router';

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
    if(this.state.imagePreviewUrl) {
      this.props.submitProfileImage({
        image: this.state.imagePreviewUrl,
        email: this.props.email,
        data_uri: this.state.data_uri,
        filename: this.state.filename,
        filetype: this.state.filetype
      });
      // handle the lack of props before rendering at myProfile
      browserHistory.push('/myProfile');
    } else {
      alert('Please upload an image, we want you to have the profile image of your choice!');
    }
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
        file: file,
        imagePreviewUrl: reader.result,
        data_uri: reader.result,
        filename: file.name,
        filetype: file.type

      });
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
      <div className="previewComponent">
        <p>please make sure your filename has now whitespace or special characters, if it does try renaming the file before uploading the image</p>
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input className="fileInput" type="file" onChange={(e)=>this.handleImageChange(e)} />
          <button className="fileUpload" type="submit" onClick={(e)=>this.handleSubmit(e)}>Upload Image</button>
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
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

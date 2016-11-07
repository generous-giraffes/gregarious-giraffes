import React from 'react';
import axios from 'axios';

//ImageUpload uses FileReader to asynchronously read the contents of an image that the user uploads
class ImageUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: '',
      imagePreviewUrl: ''
    };
  }
  //posts file to db if there has been an image uploaded
  handleSubmit(e) {
    e.preventDefault();
    console.log('handle uploading', this.state.file);
    //post request to server goes to imageRoutes and the image gets added to db using userId to find the user
    //only post if there is an image in state

    if(this.state.imagePreviewUrl) {
      axios.post('/api/image', {
        image: this.state.imagePreviewUrl,
        //hardcoding userId for testing
        userId: '1'
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
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
        imagePreviewUrl: reader.result
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

export default ImageUpload;

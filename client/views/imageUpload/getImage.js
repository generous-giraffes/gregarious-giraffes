import React from 'react';
import axios from 'axios';

class ImageDownload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: ''
    };
  }
  componentWillMount() {
    this.handleGet();
  }

  handleGet() {
    console.log('handle download', this.state.imageUrl);

    if(!this.state.imagePreviewUrl) {
      axios.get('/api/image')
      .then((response) => {
        console.log('res',response);
        this.setState({imageUrl: response.data});
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  render() {
    //retrieve url from state, then render an image if there is a url else a div
    let { imageUrl } = this.state;
    let $imagePreview = null;
    if(imageUrl) {
      $imagePreview = (<img className="previewImage" src={imageUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please wait for the image to download</div>);
    }

    return (
      <div className="image">
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}

export default ImageDownload;

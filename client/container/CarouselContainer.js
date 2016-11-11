import React from 'react';
import { Button, Col, Row, Grid, FormGroup, FormControl, Thumbnail, Carousel } from 'react-bootstrap';


class MyCarousel extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="carousel">
                <Carousel>
                    <Carousel.Item>
                        <img src="http://www.artwallpaperhi.com/thumbnails/detail/20121017/abstract%20striped%20texture%20digital%20art%201680x1050%20wallpaper_www.artwallpaperhi.com_4.jpg"/>
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="http://www.artwallpaperhi.com/thumbnails/detail/20121017/abstract%20striped%20texture%20digital%20art%201680x1050%20wallpaper_www.artwallpaperhi.com_4.jpg"/>
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}

export default MyCarousel

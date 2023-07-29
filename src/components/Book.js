import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { getContent } from "../actions/book";
import { Link, useParams } from "react-router-dom";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import Spinner from './Spinner';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MagicSliderDots from 'react-magic-slider-dots';
import 'react-magic-slider-dots/dist/magic-dots.css';
// import { Container } from "@mui/material";


const Footer = ({ bookContent, getContent, loading }) => {
  const bookId = useParams().id;
  const search = useParams().search;
  // const item = useParams().item;
  const linkTo = search ? `/search/${search}` : "/";
  // console.log(linkTo);
  useEffect(() => {
    getContent(bookId);
    window.scrollTo(0, 0);
  }, [getContent, bookId]);

  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 0,
    asNavFor: true,
    appendDots: dots => {
      return <MagicSliderDots dots={dots} numDotsToShow={8} dotWidth={30} />;
    }
  };

  return (
    // <Container >
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Slider {...settings}>
            {bookContent.map((content, index) => {
              return (
                <div>
                  <img src={content} alt=""></img>
                </div>
              );
            })}
          </Slider>
          {/* <Slider {...settings}>
            {bookContent.map((content, index) => {
              return (
                <div>
                  <img src={content} alt=""></img>
                </div>
              );
            })}
          </Slider> */}
        </>
      )}
      <div className="go-back">
        <Link to={linkTo}>
          <ArrowBackIosRoundedIcon style={{ color: 'blue', fontSize: 45 }} />
        </Link>
      </div>
    {/* </Container> */}
    </div>
  );
};

Footer.propTypes = {
  bookContent: PropTypes.array,
  loading: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  bookContent: state.book.bookContent,
  loading: state.book.loading,
});

export default connect(mapStateToProps, { getContent })(Footer);

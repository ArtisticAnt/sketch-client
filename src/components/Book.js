/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getContent } from "../actions/book";
import { Link, useParams } from "react-router-dom";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import Spinner from './Spinner';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-magic-slider-dots/dist/magic-dots.css';
import { Container } from "@mui/material";


const Footer = ({ bookContent, getContent, loading }) => {
  const bookId = useParams().id;
  const search = useParams().search;
  const linkTo = search ? `/search/${search}` : "/";
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  useEffect(() => {
    getContent(bookId);
    // window.scrollTo(0, 0);
  }, [getContent, bookId]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed >
        {/* <div style={{ overflow: "hidden" }}> */}
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Slider
              asNavFor={nav2}
              ref={(slider1) => setNav1(slider1)}
              slidesToShow={2}
              slidesToScroll={2}
            >
              {bookContent.map((content) => {
                return (
                  <div>
                    <img src={content} alt=""></img>
                  </div>
                );
              })}
            </Slider>
            <Slider
              asNavFor={nav1}
              ref={(slider2) => setNav2(slider2)}
              slidesToShow={20}
              swipeToSlide={true}
              focusOnSelect={true}
            >
              {bookContent.map((content) => {
                return (
                  <div>
                    <img src={content} alt=""></img>
                  </div>
                );
              })}
            </Slider>
          </>
        )}
        <div className="go-back">
          <Link to={linkTo}>
            <ArrowBackIosRoundedIcon style={{ color: 'blue', fontSize: 45 }} />
          </Link>
        </div>
      </Container>
    </React.Fragment>
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

/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
// import CssBaseline from '@mui/material/CssBaseline';
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
// import { Container } from "@mui/material";


const Footer = ({ bookContent, getContent, loading }) => {
  const bookId = useParams().id;
  const search = useParams().search;
  const linkTo = search ? `/search/${search}` : "/";
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slidesToShow, setSlidesToShow] = useState(5);
  const [slidesToShow2, setSlidesToShow2] = useState(5);

  useEffect(() => {
    getContent(bookId);

    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setSlidesToShow(5);
        setSlidesToShow2(20);
      } else if (window.innerWidth >= 700) {
        setSlidesToShow(4);
        setSlidesToShow2(15);
      } else if (window.innerWidth >= 500) {
        setSlidesToShow(2);
        setSlidesToShow2(10);
      } else {
        setSlidesToShow(1);
        setSlidesToShow2(5);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [getContent, bookId]);

  const setting1 = {
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
  };

  const setting2 = {
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow2,
    swipeToSlide: true,
    focusOnSelect: true,
  };





  return (
    <div style={{ overflowX: "hidden" }}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Slider
            {...setting1}
            asNavFor={nav2}
            ref={(slider1) => setNav1(slider1)}
          >
            {bookContent.map((content, index) => {
              return (
                <div>
                  <img style={{ height: "64.7vh" }} src={content} alt=""></img>
                  <div style={{ height: "5vh", backgroundColor: "#000000", position: "relative", textAlign: "center" }}><p style={{ fontSize: "15px", color: "#ffffff" }}>{index + 1}</p></div>
                  <div style={{ height: ".3vh" }}></div>
                </div>
              );
            })}
          </Slider>
          <Slider
            {...setting2}
            asNavFor={nav1}
            ref={(slider2) => setNav2(slider2)}
          >
            {bookContent.map((content, index) => {
              return (
                <div>
                  <img style={{ height: "16vh" }} src={content} alt=""></img>
                  <div style={{ height: "4vh", backgroundColor: "#000000", position: "relative", textAlign: "center" }}><p style={{ fontSize: "10px", color: "#ffffff" }}>{index + 1}</p></div>
                </div>
              );
            })}
          </Slider>
        </>
      )}
      <div className="go-back">
        <Link to={linkTo}>
          <ArrowBackIosRoundedIcon style={{ color: '#e6e6e6', fontSize: 45 }} />
        </Link>
      </div>
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

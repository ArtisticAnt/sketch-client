import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { Grid, Container } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import MediaCard from "./MediaCard";
import NoSearch from "./NoSearch";
// import Spinner from "./Spinner";
import { authGet, moreSearch } from "../actions/book";

const Search = ({ authSearch, loading, authGet, searchPage, moreSearch }) => {
  const [searchWord, setSearchWord] = useState('');
  const word = useParams().word;
  useEffect(() => {
    if (word !== searchWord) {
      authGet(word);
      setSearchWord(word);
    }
  }, [authGet, moreSearch, searchPage, searchWord, word]);

  useBottomScrollListener(() => {
    moreSearch(searchPage, word);
  });

  return (
    <div style={{ marginTop: "60px" }} className="mt-4">
      <Container>
        <Grid container spacing={6} className="cardPosition">
          {authSearch.length ? (
            authSearch.map((book, index) => {
              return (
                <Grid item xl={3} lg={4} md={6} xs={12} key={index}>
                  <Link to={`/book/${book.lid}/${word}`}>
                    <MediaCard
                      title={book.artistName}
                      imgURL={
                        book.frontPage
                          ? book.frontPage
                          : "http://s3.amazonaws.com/data.arthousecoop.com/attachments/380709/standard/S8-02.jpg"
                      }
                      countryCode={book.address.countryCode}
                      city={book.address.city}
                      stateName={book.address.stateName}
                    />
                  </Link>
                </Grid>
              );
            })
          ) : (
            <div className="no-search">
              <NoSearch />
            </div>
          )}
        </Grid>
        <div className="go-back1">
          <Link to="/">
            <ArrowBackIosRoundedIcon style={{ color: '#000000', fontSize: 45 }} />
          </Link>
        </div>
      </Container>
    </div>
  );
};

Search.propTypes = {
  authSearch: PropTypes.array,
  load: PropTypes.bool,
  word: PropTypes.string,
  authGet: PropTypes.func,
  moreSearch: PropTypes.func,
  searchPage: PropTypes.number,
};

const mapStateToProps = (state) => ({
  authSearch: state.book.authSearch,
  loading: state.book.loading,
  word: state.book.word,
  searchPage: state.book.searchPage,
});

export default connect(mapStateToProps, { authGet, moreSearch })(Search);

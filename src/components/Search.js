import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

import { Grid, Container} from "@mui/material";
import { Link, useParams } from "react-router-dom";

import MediaCard from "./MediaCard";
import NoSearch from "./NoSearch";
import Spinner from "./Spinner";
import { authGet } from "../actions/book";

const Search = ({ authSearch, loading, authGet }) => {
  const word = useParams().word;
  useEffect(() => {
    authGet(word);
  }, [authGet, word]);
  return (
    <div className="mt-4">
      <Container>
        <Grid container spacing={6} className="cardPosition">
          {loading ? (
            <Spinner />
          ) : authSearch.length ? (
            authSearch.map((book, index) => {
              return (
                <Grid item xs={3} key={index}>
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
            <ArrowBackIosRoundedIcon style={{ color: 'blue', fontSize: 45 }} />
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
};

const mapStateToProps = (state) => ({
  authSearch: state.book.authSearch,
  loading: state.book.loading,
  word: state.book.word,
});

export default connect(mapStateToProps, { authGet })(Search);

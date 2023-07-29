import { Link } from "react-router-dom";
import MediaCard from "./MediaCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { loadBook, moreBook } from "../actions/book";
// import Spinner from "./Spinner";
// import { useDispatch } from "react-redux";

const Footer = ({ books, page, loadBook, moreBook, loading }) => {
  useEffect(() => {
    if (page === 0) {
      window.scrollTo(0, 0);
      loadBook();
    }

    const div = document.getElementById('image-container');

    function handleScroll() {
      if (div) {
        const rect = div.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 400) {
          console.log(page)
          moreBook(page);
        }
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

  }, [loadBook, moreBook, page]);
  // const dispatch = useDispatch();
  // function moreLoad() {
  //   dispatch(moreBook(page));
  // }
  return (
    <div className="m-4">
      <Container>
        <Grid container spacing={6} className="cardPosition">
          {/* {loading ? (
            <Spinner />
          ) : (
            <> */}
              {books.map((book, index) => {
                return (
                  <Grid item xs={3} key={index}>
                    <Link to={`/book/${book.lid}`}>
                      <MediaCard
                        title={book.artistName}
                        imgURL={book.frontPage}
                        countryCode={book.address.countryCode}
                        city={book.address.city}
                        stateName={book.address.stateName}
                      />
                    </Link>
                  </Grid>
                );
              })}
            {/* </>
          )} */}
        </Grid>
      </Container>
    </div>
  );
};

Footer.propTypes = {
  loadBook: PropTypes.func,
  moreBook: PropTypes.func,
  books: PropTypes.array,
  page: PropTypes.number,
};
const mapStateToProps = (state) => ({
  books: state.book.books,
  loading: state.book.loading,
  page: state.book.page,
});

export default connect(mapStateToProps, { loadBook, moreBook })(Footer);


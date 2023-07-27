import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { getContent } from "../actions/book";
import { Link, useParams } from "react-router-dom";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import Spinner from './Spinner';

const Footer = ({ bookContent, getContent, loading }) => {
  const bookId = useParams().id;
  const search = useParams().search;
  const item = useParams().item;
  const linkTo = search ? `/search/${search}/${item}` : "/";
  // console.log(linkTo);
  useEffect(() => {
    getContent(bookId);
    window.scrollTo(0, 0);
  }, [getContent, bookId]);

  return (
    <div>
      <ImageList rowHeight={1400} className="imageList" cols={2}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {bookContent.length ? (
              <>
                {bookContent.map((content, index) => (
                  <ImageListItem key={index} cols={index.cols || 1}>
                    <img src={content} alt="" className="image" />
                  </ImageListItem>
                ))}
              </>
            ) : (
              <h1>There is no Content</h1>
            )}
          </>
        )}
      </ImageList>
      <div className="go-back">
        <Link to={linkTo}>
          <ArrowBackIosRoundedIcon style={{ color: 'blue', fontSize: 45 }} />
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

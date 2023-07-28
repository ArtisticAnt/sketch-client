import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { getContent } from "../actions/book";
import { Link, useParams } from "react-router-dom";
// import { Container } from "@mui/material";
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import Spinner from './Spinner';
import ImageGallery from 'react-image-gallery';

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
  const images = [];
  bookContent.map((content, index) => {
    console.log(index);
    const image = { original: content, thumbnail: content };
    images.push(image);
  })
  const renderCustomItem = (item) => {
    return (
      <div className="custom-gallery-item">
        <div className="image-wrapper">
          <img src={item.original} alt={item.originalAlt} />
        </div>
      </div>
    );
  };

  const renderCustomThumbnail = (item) => {
    console.log(item)
    console.log(11)
    return (
      <div className="thumbnail">
        <img src={item.thumbnail} alt={item.thumbnailAlt} />
      </div>
    );
  };

  return (
    <div className="custom-gallery-container">
      {
        loading ? (
          <Spinner />
        ) : bookContent.length ? (
          <>
            <ImageGallery items={images}
              thumbnailPosition="left"
              renderItem={renderCustomItem}
              renderThumbInner={renderCustomThumbnail}
              showFullscreenButton={false}
              showPlayButton={false}
              showThumbnails={true}
              slideDuration={1000}
            />
          </>
        ) : (
          <h1 style={{ margin: "10rem" }}>There is no Content</h1>
        )
      }
      {/* <ImageList rowHeight={1400} className="imageList" cols={2}>
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
            <ImageGallery item={images} /> */}
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

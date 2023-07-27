// import { TextField, Box } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import logo from "../assets/img/sketch_logo.png";

// import { setWord } from "../actions/book";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";

const Navbar = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const authSearchDOM = document.getElementById("auth-search");
    const titleSearchDOM = document.getElementById("title-search");
    authSearchDOM.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        navigate(`/search/${event.target.value}/auth`);
      }
    });
    titleSearchDOM.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        navigate(`/search/${event.target.value}/title`);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className="navbar bg-dark">
      
    </nav>
  );
};

export default Navbar;

import { NavLink, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { useState } from "react";
import LogoImg from "../assets/img/sketch_logo.png";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputchange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchInputKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/search/${event.target.value}`);
    }
  };

  return (
    <div className="navbar">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          style={{ backgroundColor: "black !important" }}
        >
          <Toolbar className="nav-item">
            <NavLink to="/">
              <img src={LogoImg} width="100px" height="90px" alt="Logo"></img>
            </NavLink>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="By Artistname,Locations…"
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={handleSearchInputchange}
                onKeyDown={handleSearchInputKeyDown}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;

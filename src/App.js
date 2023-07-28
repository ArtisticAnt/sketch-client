import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import NotFound from "./components/NotFound";
import Book from "./components/Book";
import Navbar from "./components/Navbar";
import Search from "./components/Search";

// Redux
import { Provider } from "react-redux";
import { store } from "./store";

import "./App.scss";
// import "../styles/scss/image-gallery.scss"

const App = () => {
  console.log(process.env.REACT_APP_API_URL);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/book/:id/" element={<Book />} />
          <Route path="/book/:id/:search" element={<Book />} />
          <Route path="/search/:word" element={<Search />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import MovieDetails from "./pages/movie-details";
import Movies from "./pages/movies";
import Header from "./shared/components/header";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:type/:catagory" element={<Movies />} />
        <Route path="/:type/details/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
};

export default App;

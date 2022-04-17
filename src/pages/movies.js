import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { NavLink, useParams } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const params = useParams();

  const API_KEY = "ad014426caee6fb47d0e1527d3b351ad";

  const fetchAllMovies = async () => {
    try {
      const res = await fetch(
        ` https://api.themoviedb.org/3/${params.catagory}/${params.type}/day?api_key=${API_KEY}&page=${page}`
      );
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const allMovies = useQuery(["movie-list", page], fetchAllMovies, {
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      setMovies([...movies, ...res.results]);
    },
  });

  console.log(movies);
  return (
    <div className="bg-neutral-900 text-gray-300 flex  items-center flex-wrap flex-col flex-1 min-h-screen	">
      <p className="text-3xl font-semibold my-5">{params.type.toUpperCase()}</p>
      <div className="flex flex-wrap px-10 justify-center">
        {movies.map((e) => (
          <NavLink to={`/${params.type}/details/${e.id}`}>
            <div className="flex flex-col  mx-2 my-2">
              <img
                src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                alt=""
                className="w-40 rounded-2xl"
              />
              <span className=" text-gray-300 text-sm">Movie name</span>
            </div>
          </NavLink>
        ))}
      </div>
      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        View More
      </button>
    </div>
  );
};

export default Movies;

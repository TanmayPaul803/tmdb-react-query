import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import Lottie from "react-lottie";
import LoadingLottie from "../shared/lotties/loading.json";

function getRandomNumberBetween(total) {
  return Math.floor(Math.random() * total) + 1;
}

const Home = () => {
  const [randomMovie, setRandomMovie] = useState({});

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const API_KEY = "ad014426caee6fb47d0e1527d3b351ad";
  console.log(randomMovie);
  const fetchTrendingMovies = async () => {
    const res = await fetch(
      ` https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
    );
    return res.json();
  };
  const responseMovie = useQuery("get-movie", fetchTrendingMovies, {
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      console.log(res);
      setRandomMovie(
        res?.results[getRandomNumberBetween(res?.results?.length)]
      );
    },
  });

  const fetchTrendingTvShows = async () => {
    const res = await fetch(
      ` https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`
    );
    return res.json();
  };
  const responseTvShows = useQuery("get-tv-shows", fetchTrendingTvShows, {
    refetchOnWindowFocus: false,
  });

  const fetchPopulerKidsMovies = async () => {
    const res = await fetch(
      ` https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${API_KEY}`
    );
    return res.json();
  };
  const responsePopulerKidsMovies = useQuery(
    "get-populer-kids-movies",
    fetchPopulerKidsMovies,
    {
      refetchOnWindowFocus: false,
    }
  );

  console.log(responseMovie);

  if (
    responseMovie.isLoading ||
    responseTvShows.isLoading ||
    responsePopulerKidsMovies.isLoading
  ) {
    return (
      <div className="bg-neutral-900 h-screen flex items-center justify-center">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    );
  }
  return (
    <div>
      <div className="bg-neutral-900 flex px-20 py-8 text-gray-300 ">
        <div className="w-1/2 flex flex-col justify-center">
          <p className="font-bold text-4xl">{randomMovie?.original_title}</p>
          <div className="my-12">{randomMovie?.overview}</div>
          <div>
            <button class="bg-rose-800 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full mr-3">
              Watch now
            </button>
            <button class="border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 font-bold py-2 px-4 rounded-full">
              Watch trailer
            </button>
          </div>
        </div>
        <div>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${randomMovie.poster_path}`}
              alt=""
              className="w-80 rounded-2xl"
            />
          </div>
        </div>
      </div>

      <div className="bg-neutral-800 ">
        <div className="py-2">
          <div className="flex  justify-between px-10  items-center py-1 py-1 mt-2 mb-2">
            <div className="text-gray-200 font-bold text-lg">
              Trending Movies
            </div>
            <NavLink to="/movies/trending">
              <button class="  hover:text-gray-700 text-white font-bold py-1 px-4 rounded-full mr-3 border border-white">
                View more
              </button>
            </NavLink>
          </div>
          <div className="flex overflow-hidden items-center justify-between	px-10">
            {(responseMovie?.data?.results.slice(0, 10) || []).map((e) => (
              <NavLink to={`/movie/details/${e.id}`}>
                <div className="flex flex-col text-center mr-3 my-2 hover:cursor-pointer">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                    alt=""
                    className="w-40 rounded-2xl"
                  />
                  <span className="font-semibold text-gray-300 text-sm truncate overflow-hidden w-40">
                    {e.title}
                  </span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="py-2">
          <div className="flex  justify-between px-10 items-center py-1  py-1 mt-2 mb-2">
            <div className="text-gray-200 font-bold text-lg">
              Popular Tv Shows
            </div>
            <NavLink to="/tv/trending">
              <button class="  hover:text-gray-700 text-white font-bold py-1 px-4 rounded-full mr-3 border border-white">
                View more
              </button>
            </NavLink>
          </div>
          <div className="flex overflow-hidden items-center justify-between	px-10">
            {(responseTvShows?.data?.results.slice(0, 10) || []).map((e) => (
              <NavLink to={`/tv/details/${e.id}`}>
                <div className="flex flex-col text-center mr-3 my-2 hover:cursor-pointer">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                    alt=""
                    className="w-40 rounded-2xl"
                  />
                  <span className="font-semibold text-gray-300 text-sm truncate overflow-hidden w-40">
                    {e.name}
                  </span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="py-2">
          <div className="flex  justify-between px-10 items-center py-1 mt-2 mb-2">
            <div className="text-gray-200 font-bold text-lg">
              Popular Kids Movies
            </div>
            {/* <button class="   hover:text-black text-white font-bold py-1 px-4 rounded-full mr-3 border border-white">
              View more
            </button> */}
          </div>
          <div className="flex overflow-hidden items-center justify-between	px-10">
            {(responsePopulerKidsMovies?.data?.results?.slice(0, 10) || []).map(
              (e) => (
                <NavLink to={`/movie/details/${e.id}`}>
                  <div className="flex flex-col text-center mr-3 my-2 hover:cursor-pointer">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                      alt=""
                      className="w-40 rounded-2xl"
                    />
                    <span className="font-semibold text-gray-300 text-sm truncate overflow-hidden w-40">
                      {e.title}
                    </span>
                  </div>
                </NavLink>
              )
            )}
          </div>
          {/* <div className="h-screen">
            <Splide aria-label="My Favorite Images ">
              <div>
                <SplideSlide>
                  <div className="	">
                    <img
                      src={`https://images.pexels.com/photos/11062038/pexels-photo-11062038.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`}
                      alt="Image 2"
                      className="object-cover flex w-full "
                    />
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <img src="image2.jpg" alt="Image 2" />
                </SplideSlide>
              </div>
            </Splide>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;

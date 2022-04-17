import React, { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { NavLink, useParams } from "react-router-dom";
import Lottie from "react-lottie";
import LoadingLottie from "../shared/lotties/loading.json";

const MovieDetails = () => {
  const API_KEY = "ad014426caee6fb47d0e1527d3b351ad";

  const param = useParams();
  const parentRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [param.id]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const fetchMovieDetails = async () => {
    const res = await fetch(
      ` https://api.themoviedb.org/3/${param.type}/${param.id}?api_key=${API_KEY}`
    );
    return res.json();
  };
  const movieDetails = useQuery(
    ["get-populer-kids-movies", param.id, param.type],
    fetchMovieDetails,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  );

  const fetchCredits = async () => {
    const res = await fetch(
      ` https://api.themoviedb.org/3/${param.type}/${param.id}/credits?api_key=${API_KEY}`
    );
    return res.json();
  };
  const creditsDetails = useQuery(
    ["get-credites", param.id, param.type],
    fetchCredits,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  );

  const fetchSimilerMovies = async () => {
    const res = await fetch(
      ` https://api.themoviedb.org/3/${param.type}/${param.id}/similar?api_key=${API_KEY}`
    );
    return res.json();
  };
  const similerMovies = useQuery(
    ["similer-movies", param.id, param.type],
    fetchSimilerMovies,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  );

  const fetchMovieVideos = async () => {
    const res = await fetch(
      ` https://api.themoviedb.org/3/${param.type}/${param.id}/videos?api_key=${API_KEY}`
    );
    return res.json();
  };
  const movieVideos = useQuery(
    ["movie-video", param.id, param.type],
    fetchMovieVideos,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  );

  if (
    movieDetails.isLoading ||
    creditsDetails.isLoading ||
    similerMovies.isLoading ||
    movieVideos.isLoading
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
        {/* <img
          src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80"
          className="absolute top-0 right-0 z-index--2 "
        /> */}
        <div>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails?.data?.poster_path}`}
              alt=""
              className="w-96 rounded-2xl mr-12"
            />
          </div>
        </div>

        <div className="w-1/2 flex flex-col justify-center">
          <p className="font-bold text-4xl">
            {movieDetails?.data?.title || movieDetails?.data?.name}
          </p>
          <div className="flex my-2">
            {(movieDetails?.data?.genres || []).map((e) => (
              <p
                class="border border-gray-500 text-gray-500 py-1.5 px-2 mx-1 rounded-full text-xs"
                key={e?.name}
              >
                {e?.name}
              </p>
            ))}
          </div>
          <div className="my-12">{movieDetails?.data?.overview}</div>
          <div>
            <p className="text-xl">Casts</p>

            <div className="flex">
              {(creditsDetails?.data?.cast?.slice(0, 4) || []).map((e) => (
                <div className="flex flex-col  mr-3 my-2" key={e.id}>
                  <img
                    src={
                      e?.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${e?.profile_path}`
                        : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7RbuAj7zoRZSIDcV_nz2LyZZjwiOETmn7kg&usqp=CAU`
                    }
                    alt="cast"
                    className="w-28 rounded-sm"
                  />
                  <span className=" text-gray-300 text-sm truncate overflow-hidden w-28">
                    {e.name}
                  </span>
                </div>
              ))}
            </div>
            <div>sd</div>
          </div>
        </div>
      </div>

      {movieVideos?.data?.results?.length ? (
        <div
          className="bg-black flex flex-col items-center h-screen"
          ref={parentRef}
        >
          <p className="text-gray-300  px-20 py-8 font-bold">
            International Trailer
          </p>
          <iframe
            width="80%"
            height="80%"
            src={`https://www.youtube.com/embed/${movieVideos?.data?.results[0].key}`}
          ></iframe>
        </div>
      ) : null}

      <div className="py-2 bg-neutral-900">
        <div className="flex  justify-between px-10 items-center py-1  py-1 mt-2 mb-2">
          <div className="text-gray-200 font-bold text-lg">
            Popular Tv Shows
          </div>
        </div>
        <div className="flex overflow-hidden items-center justify-between	px-10">
          {(similerMovies?.data?.results || []).map((e) => (
            <NavLink to={`/${param.type}/details/${e.id}`} key={e.id}>
              <div
                className="flex flex-col text-center mr-3 my-2 hover:cursor-pointer"
                key={e.id}
              >
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
    </div>
  );
};

export default MovieDetails;
